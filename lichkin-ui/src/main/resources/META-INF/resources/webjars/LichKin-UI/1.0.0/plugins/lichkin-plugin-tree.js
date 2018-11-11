;

// 扩展图标
$.LKExtendICON({
  'page' : 'file',
  'folder' : 'folder',
});

// 扩展组合图标
$.LKExtendICON({
  'checkbox-checked' : '<span><i class="far fa-square"></i><i class="fa fa-check"></i></span>',
  'checkbox-tristate' : '<span><i class="far fa-square"></i><i class="fa fa-square"></i></span>',
  'checkbox-unchecked' : '<span><i class="far fa-square"></i><i class="fa"></i></span>',
}, true);

/**
 * 编码工具类
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */
var LKCodeUtils = {

  /** 编码长度 */
  LENGHT : 7,

  /** 层级编码 */
  strs : [
      "A", "B", "C", "D", "E", "F", "G", "H"
  ],

  /**
   * 获取所有上级编码数组
   * @param code 编码
   * @return 上级编码数组
   */
  getParentCodes : function(code) {
    var arr = code.split(/A|B|C|D|E|F|G|H/);
    arr = arr.splice(1, arr.length - 2);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = (typeof arr[i - 1] == 'undefined' ? '' : arr[i - 1]) + this.strs[i] + arr[i];
    }
    return arr;
  },

  /**
   * 真实编码
   * @param currentCode 当前编码
   * @return 编码
   */
  realCode : function(currentCode) {
    for (var i = this.strs.length - 1; i >= 0; i--) {
      var x = parseInt(currentCode.substring((i * (this.LENGHT + 1)) + 1, (i + 1) * (this.LENGHT + 1)));
      if (x != 0) {
        return currentCode.substring(0, ((i + 1) * (this.LENGHT + 1)));
      }
    }
    return null;
  },

  /**
   * 补全编码
   * @param code 编码
   * @return 编码
   */
  fillCode : function(code) {
    var len = code.length / (this.LENGHT + 1);
    for (var i = len; i < this.strs.length; i++) {
      code += this.strs[i];
      for (var j = 0; j < this.LENGHT; j++) {
        code += '0';
      }
    }
    return code;
  }

};

/**
 * 树形控件内部实现相关
 */
LK.UI._tree = {

  /**
   * 设置值
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param values 值数组
   * @param isCreateEvent 是否为创建是调用
   * @param undoOnChange true:不触发onChange事件;false:触发onChange事件;
   */
  setValues : function($plugin, $container, values, isCreateEvent, undoOnChange) {
    var valueArr = [];

    var $nodes = $container.find('li');
    var checkbox = $plugin.data('LKOPTIONS').checkbox == true;
    if (checkbox) {
      $nodes.each(function() {
        $(this).find('.lichkin-tree-node-checkbox').LKUIicon('change', 'checkbox-unchecked');
      });
    } else {
      $nodes.removeClass('selected');
    }
    if (!Array.isArray(values)) {
      values = [
        values
      ];
    }

    $nodes.each(function() {
      var $that = $(this);
      var data = $that.data();
      for (var i = 0; i < values.length; i++) {
        if (data.id == values[i]) {
          if (checkbox) {
            if (data.children.length == 0) {
              $that.find('.lichkin-tree-node-checkbox').LKUIicon('change', 'checkbox-checked');
              var parentCodes = LKCodeUtils.getParentCodes(LKCodeUtils.realCode(data.code)).reverse();
              for (var i = 0; i < parentCodes.length; i++) {
                var parentRealCode = parentCodes[i];
                var parentCode = LKCodeUtils.fillCode(parentRealCode);
                var childFillCode = parentCode.replace(parentRealCode, '').substring(LKCodeUtils.LENGHT + 1);
                var tristate = false;
                $container.find('[data-code^=' + parentRealCode + ']' + (childFillCode == '' ? '' : '[data-code$=' + childFillCode + ']') + '[data-code!=' + parentCode + '][data-code!=' + data.code + ']').find('.lichkin-tree-node-checkbox').each(function() {
                  if ($(this).LKUIicon('has', 'checkbox-unchecked')) {
                    tristate = true;
                  }
                });
                $container.find('[data-code=' + parentCode + ']').find('.lichkin-tree-node-checkbox').LKUIicon('change', tristate ? 'checkbox-tristate' : 'checkbox-checked');
              }
            }
          } else {
            $that.addClass('selected');
          }
          valueArr.push(data.id);
          break;
        }
      }
    });

    $plugin.LKSetValues(valueArr, isCreateEvent, undoOnChange);
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   */
  addDatas : function($plugin, $container, datas) {
    var options = $plugin.data('LKOPTIONS');
    this.addNodes($plugin, $container, datas, 0, options);
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   * @param level 级别
   * @param options 参数
   */
  addNodes : function($plugin, $container, datas, level, options) {
    for (var i = 0; i < datas.length; i++) {
      this.addNode($plugin, $container, datas[i], level + 1, options);
    }
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param data 数据
   * @param level 级别
   * @param options 参数
   */
  addNode : function($plugin, $container, data, level, options) {
    var that = this;

    // 初始化默认图标
    if (typeof data.params.icon == 'undefined' || !data.params.icon) {
      data.params.icon = (data.children.length == 0) ? 'page' : 'folder';
    }

    // 节点
    var $node = $('<li data-code=' + data.code + '></li>').appendTo($container).LKAddPluginClass('tree', 'node').css({
      'width' : $plugin.width()
    });

    $node.data(data);

    $node.click(function() {
      if (options.readonly == true) {
        return;
      }
      if (options.checkbox) {
        var realCode = LKCodeUtils.realCode(data.code);
        var $icon = $(this).find('.lichkin-tree-node-checkbox');
        var checked = $icon.LKUIicon('has', 'checkbox-checked');
        // 改变当前状态
        $icon.LKUIicon('change', 'checkbox-' + (checked ? 'unchecked' : 'checked'));
        // 联动下级
        $container.find('[data-code^=' + realCode + ']').find('.lichkin-tree-node-checkbox').each(function() {
          $(this).LKUIicon('change', 'checkbox-' + (checked ? 'unchecked' : 'checked'));
        });
        // 联动上级
        var parentCodes = LKCodeUtils.getParentCodes(realCode).reverse();
        for (var i = 0; i < parentCodes.length; i++) {
          var parentRealCode = parentCodes[i];
          var parentCode = LKCodeUtils.fillCode(parentRealCode);
          var childFillCode = parentCode.replace(parentRealCode, '').substring(LKCodeUtils.LENGHT + 1);
          var tristate = false;
          $container.find('[data-code^=' + parentRealCode + ']' + (childFillCode == '' ? '' : '[data-code$=' + childFillCode + ']') + '[data-code!=' + parentCode + '][data-code!=' + data.code + ']').find('.lichkin-tree-node-checkbox').each(function() {
            if ($(this).LKUIicon('has', 'checkbox-' + (checked ? 'checked' : 'unchecked')) || $(this).LKUIicon('has', 'checkbox-tristate')) {
              tristate = true;
            }
          });
          $container.find('[data-code=' + parentCode + ']').find('.lichkin-tree-node-checkbox').LKUIicon('change', tristate ? 'checkbox-tristate' : 'checkbox-' + (checked ? 'unchecked' : 'checked'));
        }
        var valueArr = [];
        $container.find('li').each(function() {
          if (!$(this).find('.lichkin-tree-node-checkbox').LKUIicon('has', 'checkbox-unchecked')) {
            valueArr.push($(this).data().id);
          }
        });
        $plugin.LKSetValues(valueArr, false);
      } else {
        if (options.multiSelect) {
          $(this).toggleClass('selected');
        } else {
          var selected = $(this).hasClass('selected');
          $container.find('li').removeClass('selected');
          if (options.cancelable) {
            if (selected) {
              $(this).removeClass('selected');
            } else {
              $(this).addClass('selected');
            }
          } else {
            $(this).addClass('selected');
          }
        }
        var valueArr = [];
        $container.find('li.selected').each(function() {
          valueArr.push($(this).data().id);
        });
        $plugin.LKSetValues(valueArr, false);
      }
      $plugin.LKlinkage(data.id, false);
      $plugin.LKValidate();
    });

    // 节点容器
    var $nodeContainer = $('<div></div>').appendTo($node).LKAddPluginClass('tree', 'node-containter').css({
      'width' : $plugin.width(),
      'height' : options.nodeHeight + 'px'
    });

    // 缩进 TODO
    for (var i = 0; i < level; i++) {
      $nodeContainer.append(LK.UI.icon({
        size : options.nodeHeight,
        style : {
          'float' : 'left',
        }
      }));
    }

    // 多选框
    if (options.checkbox == true) {
      var $checkbox = LK.UI.icon({
        icon : 'checkbox-unchecked',
        size : options.nodeHeight,
        style : {
          'float' : 'left'
        }
      }).data('id', data.id).appendTo($nodeContainer).LKAddPluginClass('tree', 'node-checkbox');
    } else {
      $nodeContainer.data('id', data.id);
      $nodeContainer.data(data);
    }

    // 节点图标
    $nodeContainer.append(LK.UI.icon({
      icon : data.params.icon,
      size : options.nodeHeight,
      style : {
        'float' : 'left'
      }
    }));

    // 节点文字
    $nodeContainer.append(LK.UI.text({
      original : !options.i18nText,
      text : data.name,
      height : options.nodeHeight,
      fontSize : options.nodeHeight * 0.75,
      style : {
        'float' : 'left'
      }
    }));

    // 清除浮动
    $node.append('<div style="clear:both;"></div>');

    // 添加子节点
    if (data.children.length != 0) {
      that.addNodes($plugin, $container, data.children, level, options);
    }
  }

};

/**
 * 树形控件
 */
LK.UI('plugins', 'tree', function(options) {
  // 控件类型
  var plugin = 'tree';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var width = $plugin.width() + (options.inForm ? 2 : 0);
  var height = $plugin.height();

  // 标题栏
  var $titleBar = $('<div></div>').LKAddPluginClass(plugin, 'titleBar');
  if (options.title != null || options.icon != null) {
    $titleBar.appendTo($plugin);
    $titleBar.css('width', width - 2);
    if (options.icon != null) {
      $titleBar.append(LK.UI.icon({
        'icon' : options.icon,
        'size' : 24
      }));
    }
    if (options.title != null) {
      $titleBar.append(LK.UI.text({
        'text' : options.title
      }));
    }
    if (options.showSearchButton) {
      LK.UI.button({
        $appendTo : $('<div class="lichkin-buttons"></div>').appendTo($titleBar),
        icon : {
          icon : 'search',
          size : 24
        },
        click : function($button) {
          $plugin.LKLoad();
        }
      });
    }
  }

  // 数据容器
  var $container = $('<ul></ul>').appendTo($plugin).LKAddPluginClass(plugin, 'dataContainer').LKAddPluginClass(plugin, 'nodes-containter');
  $container.css('height', height - 2 - $titleBar.outerHeight());

  // 加载数据
  LK.UI.load({
    $plugin : $plugin,
    isCreateEvent : true,
    options : options
  });

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特殊定义
{
  cols : 2,
  rows : 10
},
// @see LK.UI.load
LK.UI.loadOptions,
// 控件特有参数
{
  // 多选框（有多选框时，将执行联动上下级逻辑，取值将为多选框是已选中状态和半选中状态的数据。）
  checkbox : true,
  // 支持多选（仅在无多选框情况下起作用，取值将为已选中状态的数据。）
  multiSelect : true,
  // 是否可以取消选中（仅在单选情况下起作用）
  cancelable : true,
  // 显示内容是否使用i18n
  i18nText : true,
  // 标题
  title : null,
  // 图标
  icon : null,
  // 节点高度
  nodeHeight : LK.UI.iconOptions.size,
  // 是否查询按钮
  showSearchButton : true,
}));
