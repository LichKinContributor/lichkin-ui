;
/**
 * 初始化控件，提供简写代码。
 */
LKUI.tree = function(id, url, data) {
  return LK.UI.tree({
    id : id,
    url : url,
    data : data
  });
};

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 使用LKUI开头+控件名命名扩展
   * @param funcName 控件具体方法名
   * @param options 控件具体方法需要的参数。部分方法可扩展实现代码简写方式。
   */
  LKUItree : function(funcName, options) {
    // 第一个参数为字符串时，即为调用该类型控件的方法。
    if (isString(funcName)) {
      switch (funcName) {
        case 'getCheckedNodes':
          return LK.UI.getTreeCheckedNodes({
            $obj : this,
            statusArr : options
          });
        case 'getCheckedIds':
          return LK.UI.getTreeCheckedIds({
            $obj : this,
            statusArr : options
          });
        default:
          // 没有该方法
          break;
      }
    }
    // 参数非法
    throw 'illegal arguments';
  }

});

/**
 * 树形控件内部实现相关
 */
LK.UI._tree = {

  /** 控件类型 */
  plugin : 'tree',

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
    this.uncheck($checkbox);

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
      // checkbox联动
      if (that.isChecked($checkbox) == true) {
        that.uncheck($checkbox);
        $(this).siblings('.lichkin-tree-nodes-container').find('.lichkin-tree-node-checkbox').each(function() {
          that.uncheck($(this));
        });
        that.checkParents($(this), false);
      } else {
        that.check($checkbox);
        $(this).siblings('.lichkin-tree-nodes-container').find('.lichkin-tree-node-checkbox').each(function() {
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
    if ($container.length == 0) {
      return;
    }

    var tristate = false;
    var $checkbox = $container.parent('li').siblings('li').children('.lichkin-tree-node-container').children('.lichkin-tree-node-checkbox');
    for (var i = 0; i < $checkbox.length; i++) {
      if (this.isChecked($($checkbox[i])) != check) {
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
      if (!tristate && this.isChecked($container.children('.lichkin-tree-node-checkbox')) == check) {
        this.check($parentCheckbox);
      } else {
        this.tristate($parentCheckbox);
      }
    } else {
      if (!tristate && this.isChecked($container.children('.lichkin-tree-node-checkbox')) == check) {
        this.uncheck($parentCheckbox);
      } else {
        this.tristate($parentCheckbox);
      }
    }

    this.checkParents($parentContainer, check);
  },

  /**
   * 获取选中节点ID数组
   * @param $plugin 控件对象
   * @param statusArr 选中状态数组
   */
  getCheckedIds : function($plugin, statusArr) {
    var ids = new Array();
    $plugin.find('.lichkin-tree-node-checkbox').each(function() {
      for (var i = 0; i < statusArr.length; i++) {
        if ($(this).hasClass('lichkin-icon-checkbox-' + statusArr[i])) {
          ids.push($(this).data('id'));
        }
      }
    });
    return ids;
  },

  /**
   * 获取选中节点
   * @param $plugin 控件对象
   * @param statusArr 选中状态数组
   */
  getCheckedNodes : function($plugin, statusArr) {
    var nodes = new Array();
    $plugin.find('.lichkin-tree-node-checkbox').each(function() {
      for (var i = 0; i < statusArr.length; i++) {
        if ($(this).hasClass('lichkin-icon-checkbox-' + statusArr[i])) {
          nodes.push($(this));
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
  // 设置id
  if (options.id == '') {
    options.id = randomInRange(10000, 99999);
  }

  // 创建控件对象
  var $plugin = $('<div id="' + options.id + '" data-id="tree_' + options.id + '" data-plugin="tree" class="lichkin-tree"></div>');

  // 添加节点容器
  var $container = $('<ul class="lichkin-tree-nodes-container"></ul>').appendTo($plugin);

  // 数据方式增加节点
  if (options.data.length != 0) {
    LK.UI._tree.addNodes(options.data, $container, 0);
  } else {
    // 请求方式增加节点
    if (options.url != '') {
      LK.ajax({
        success : function(responseDatas) {
          LK.UI._tree.addNodes(responseDatas, $container, 0);
        }
      });
    }
  }

  // 返回控件对象
  return LK.UI._core.cache('tree', $plugin, options);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 数据来源地址
  url : '',
  // 数据
  data : []
});

/**
 * 获取选中树形控件节点ID数组
 */
LK.UI('plugins', 'getTreeCheckedIds', function(options) {
  // 切换并触发聚焦事件
  return LK.UI._tree.getCheckedIds(LK.UI.getUIPlugin($.extend(true, {}, options, {
    UI : 'plugins'
  })), options.statusArr);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null,
  // 选中状态数组
  statusArr : [
      'checked', 'tristate'
  ]
});

/**
 * 获取选中树形控件节点数组
 */
LK.UI('plugins', 'getTreeCheckedNodes', function(options) {
  // 切换并触发聚焦事件
  return LK.UI._tree.getCheckedNodes(LK.UI.getUIPlugin($.extend(true, {}, options, {
    UI : 'plugins'
  })), options.statusArr);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null,
  // 选中状态数组
  statusArr : [
      'checked', 'tristate'
  ]
});