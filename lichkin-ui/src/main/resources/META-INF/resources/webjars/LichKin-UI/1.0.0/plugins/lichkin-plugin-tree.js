;
/**
 * 初始化控件，提供简写代码。
 * @param url 数据请求地址
 * @param param 请求参数
 */
LKUI.tree = function(url, param) {
  return LK.UI.tree({
    url : url,
    param : param
  });
};

/**
 * 树形控件内部实现相关
 */
LK.UI._tree = {

  /**
   * 获取数据容器对象
   * @param $plugin 控件对象
   */
  getDataContainer : function($plugin) {
    return $plugin.children('ul.lichkin-tree-nodes-container');
  },

  /**
   * 获取选中项
   * @param $plugin 控件对象
   */
  getSelected : function($plugin) {
    return this.getDataContainer($plugin).find('li.selected');
  },

  /**
   * 添加数据
   * @param $container 数据容器对象
   * @param datas 数据集
   */
  addDatas : function($container, datas) {
    this.addNodes(datas, $container, 0);
  },

  /**
   * 添加节点
   * @param json 节点数据
   * @param $nodesContainer 节点集容器对象
   * @param level 节点级别
   */
  addNodes : function(json, $nodesContainer, level) {
    for (var i = 0; i < json.length; i++) {
      this.addNode(json[i], $nodesContainer, level + 1);
    }
  },

  /**
   * 添加节点
   * @param json 节点数据
   * @param $nodesContainer 节点集容器对象
   * @param level 节点级别
   */
  addNode : function(json, $nodesContainer, level) {
    var that = this;

    // 初始化默认图标
    if (json.icon == '') {
      json.icon = (json.children.length == 0) ? 'page' : 'folder';
    }

    // 节点
    var $node = $('<li class="lichkin-tree-node"></li>').appendTo($nodesContainer);

    // 节点容器
    var $nodeContainer = $('<div class="lichkin-tree-node-container"></div>').appendTo($node);

    // 缩进 TODO
    for (var i = 0; i < level; i++) {
      $nodeContainer.append(LKUI.icon());
    }

    // checkbox
    var $checkbox = LKUI.icon().addClass('lichkin-tree-node-checkbox').data('id', json.id).appendTo($nodeContainer);
    // 默认不选状态
    that.uncheck($checkbox);

    // 节点图标
    $nodeContainer.append(LKUI.icon(json.icon));

    // 节点文字
    $nodeContainer.append('<div class="lichkin-text">' + json.menuName + '</div>');

    // 清除浮动
    $node.append('<div style="clear:both;"></div>');

    // HOVER效果
    $nodeContainer.mouseover(function() {
      $(this).addClass('lichkin-tree-node-container-hover');
    }).mouseout(function() {
      $(this).removeClass('lichkin-tree-node-container-hover');
    }).click(function() {
      var $that = $(this);

      // checkbox联动
      if (that.isChecked($checkbox) == true) {
        that.uncheck($checkbox);
        $that.siblings('.lichkin-tree-nodes-container').find('.lichkin-tree-node-checkbox').each(function() {
          that.uncheck($(this));
        });
        that.checkParents($(this), false);
      } else {
        that.check($checkbox);
        $that.siblings('.lichkin-tree-nodes-container').find('.lichkin-tree-node-checkbox').each(function() {
          that.check($(this));
        });
        that.checkParents($(this), true);
      }
    });

    // 添加子节点
    if (json.children.length != 0) {
      that.addNodes(json.children, $('<ul class="lichkin-tree-nodes-container"></ul>').appendTo($node), level);
    }
  },

  /**
   * 切换到选中状态
   * @param $checkbox checkbox控件
   */
  check : function($checkbox) {
    $checkbox.LKUIicon('change', 'checkbox-checked');
  },

  /**
   * 切换到中间状态
   * @param $checkbox checkbox控件
   */
  tristate : function($checkbox) {
    $checkbox.LKUIicon('change', 'checkbox-tristate');
  },

  /**
   * 切换到不选状态
   * @param $checkbox checkbox控件
   */
  uncheck : function($checkbox) {
    $checkbox.LKUIicon('change', 'checkbox-unchecked');
  },

  /**
   * 判断是否为选中状态
   * @param $checkbox checkbox控件
   * @return 选中返回true，不选中返回false，中间状态返回null.
   */
  isChecked : function($checkbox) {
    if ($checkbox.LKUIicon('has', 'checkbox-checked')) {
      return true;
    }
    if ($checkbox.LKUIicon('has', 'checkbox-unchecked')) {
      return false;
    }
    if ($checkbox.LKUIicon('has', 'checkbox-tristate')) {
      return null;
    }
  },

  /**
   * 联动上级控件
   * @param $container 当前控件
   * @param check true:选中;false:不选.
   */
  checkParents : function($container, check) {
    var that = this;

    if ($container.length == 0) {
      return;
    }

    var tristate = false;
    var $checkbox = $container.parent('li').siblings('li').children('.lichkin-tree-node-container').children('.lichkin-tree-node-checkbox');
    for (var i = 0; i < $checkbox.length; i++) {
      if (that.isChecked($($checkbox[i])) != check) {
        tristate = true;
        break;
      }
    }

    var $parentContainer = $container.parent('li').parent('ul').siblings('.lichkin-tree-node-container');
    if ($parentContainer.length == 0) {
      return;
    }
    var $parentCheckbox = $parentContainer.children('.lichkin-tree-node-checkbox');
    if (check) {
      if (!tristate && that.isChecked($container.children('.lichkin-tree-node-checkbox')) == check) {
        that.check($parentCheckbox);
      } else {
        that.tristate($parentCheckbox);
      }
    } else {
      if (!tristate && that.isChecked($container.children('.lichkin-tree-node-checkbox')) == check) {
        that.uncheck($parentCheckbox);
      } else {
        that.tristate($parentCheckbox);
      }
    }

    that.checkParents($parentContainer, check);
  },

  /**
   * 获取选中节点
   * @param $plugin 控件对象
   * @param statusArr 选中状态数组
   */
  getChecked : function($plugin, statusArr) {
    var nodes = new Array();
    $plugin.find('.lichkin-tree-node-checkbox').each(function() {
      var $that = $(this);

      for (var i = 0; i < statusArr.length; i++) {
        if ($that.hasClass('lichkin-icon-checkbox-' + statusArr[i])) {
          nodes.push($that);
        }
      }
    });
    return nodes;
  }

};

/**
 * 树形控件
 */
LK.UI('plugins', 'tree', function(options) {
  // 控件类型
  var plugin = 'tree';

  // 创建控件对象
  var $plugin = LKUI._createUIPlugin(plugin, options);

  // 存值对象
  var $value = LKUI._createUIPluginValue(options, plugin, $plugin);

  // 添加节点容器
  var $container = $('<ul class="lichkin-tree-nodes-container"></ul>').appendTo($plugin);

  // 加载数据
  if (options.lazy != true) {
    LKUI._load(options, plugin, $container);
  }

  // 返回控件对象
  return $plugin;
}, {
  // @see createUIPlugin
  id : '',
  $appendTo : null,

  // @see createUIPluginValue
  name : '',
  validator : '',

  // 创建时不加载数据。需要通过reload方法触发数据的加载。
  lazy : false,
  // 支持多选
  multiSelect : false,

  // @see load
  url : '',
  param : {},
  data : [],
  onBeforeAddDatas : function(responseDatas, url, param) {
    return responseDatas;
  },
  onAfterAddDatas : function(responseDatas, url, param) {
  },
  onLoadDatasError : function(ajaxErrorArguments, url, param) {
  }
});
