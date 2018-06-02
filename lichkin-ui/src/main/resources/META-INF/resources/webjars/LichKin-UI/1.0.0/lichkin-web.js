;
/**
 * 原生JavaScript代码实现，或使用JQuery的代码实现。
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

// 使用浏览器实现
LK.type = 'web';

/**
 * 具体实现方法
 */
LK.web = {

  log : function(options) {
    // IE或Edge浏览器不支持样式输出
    if (!!window.ActiveXObject || 'ActiveXObject' in window || window.navigator.userAgent.toLowerCase().indexOf('edge') > 0) {
      console.log(options.msg);
      return;
    }

    // 其它浏览器使用样式日志输出
    var styles = {
      'verbose' : 'color:#8C8C8C;background-color:#2b2b2b;',
      'debug' : 'color:#CECECE;background-color:#2b2b2b;',
      'info' : 'color:#8BBB00;background-color:#2b2b2b;',
      'warn' : 'color:#E69E0A;background-color:#2b2b2b;',
      'error' : 'color:#FF6B68;background-color:#2b2b2b;',
      'assert' : 'color:#FF0098;background-color:#2b2b2b;'
    };

    if (options.jsonMsg) {
      console.log('%c%s', styles[options.type], options.msg);
    } else {
      console.log('%c%s', styles[options.type], options.msg);
    }
  },

  toast : function(options) {
    var id = setInterval(function() {
      if ($('.lichkin-toast').length == 0) {
        var toast = $('<div class="lichkin-toast"><span>' + options.msg + '</span></div>').appendTo('body');
        toast.fadeIn(500);
        setTimeout(function() {
          toast.fadeOut(500, function() {
            toast.remove();
            clearInterval(id);
          });
        }, options.timeout);
      }
    }, 200);
  },

  alert : function(options, callback) {
    alert(options.msg);
    if (typeof callback == 'function') {
      callback();
    }
  },

  showLoading : function() {
    var loadingId = 'loading_' + randomInRange(10000, 99999);
    if (!isJSON(this.loadingIds)) {
      this.loadingIds = {};
    }
    if (isEmptyJSON(this.loadingIds)) {
      var $loading = $('<div class="lichkin-loading"></div>').appendTo('body');
      var $center = $('<div class="center"></div>').appendTo($loading);
      var $container = $('<div class="container"></div>').appendTo($center);
      for (var i = 2; i <= 10; i++) {
        $container.append('<div class="object" style="-webkit-animation-name:loadingAnimate;-webkit-animation-delay:0.' + (i - 1) + 's;animation-delay:0.' + (i - 1) + 's;"></div>');
      }
      $loading.show();
    }
    this.loadingIds[loadingId] = loadingId;
    return loadingId;
  },

  closeLoading : function(loadingId) {
    delete this.loadingIds[loadingId];
    if (isEmptyJSON(this.loadingIds)) {
      $loading = $('.lichkin-loading');
      if ($loading) {
        $loading.remove();
      }
    }
  }

};

/**
 * 控件核心实现（框架内部使用）
 */
LK.UI._core = {
  /** 缓存的对象 */
  cached : {},

  /**
   * 缓存对象
   * @param plugin 控件类型
   * @param $plugin 控件对象
   * @param options 创建对象时的参数
   * @param options[id] 控件ID
   * @return 缓存后的对象
   */
  cache : function(plugin, $plugin, options) {
    if (typeof this.cached[plugin] == 'undefined') {
      this.cached[plugin] = {};
    }
    this.cached[plugin][options.id] = $plugin;
    this.cached[plugin][options.id].options = options;
    return $plugin;
  },

  /**
   * 获取缓存对象
   * @param id 控件ID
   */
  getCached : function(id) {
    var $plugin = $('#' + id);
    return this.cached[$plugin.data('plugin')][id];
  },

  /**
   * 获取所有缓存的控件
   * @param plugin 控件类型
   */
  getAllCached : function(plugin) {
    return this.cached[plugin];
  },

  /**
   * 调用所有缓存的控件
   * @param plugin 控件类型
   * @param func 调用的方法。参数1：具体控件对象；参数2:所有控件对象。
   */
  callEachCached : function(plugin, func) {
    for ( var key in this.cached[plugin]) {
      func(this.cached[plugin][key], this.cached[plugin]);
    }
  },

  /**
   * 清除缓存对象
   * @param plugin 控件类型
   * @param id 控件ID
   */
  removeCached : function(plugin, id) {
    var $plugin = this.cached[plugin][id];
    delete this.cached[plugin][id];
    $plugin.remove();
  }
};

/**
 * 获取UI控件对象
 */
LK.UI('plugins', 'getUIPlugin', function(options) {
  if (options.id != '') {
    return LK.UI._core.getCached(options.id);
  }
  if (options.dataId != '') {
    return LK.UI._core.getCached($('[data-id=' + options.dataId + ']').attr('id'));
  }
  if (options.$obj != null) {
    return LK.UI._core.getCached($obj.attr('id'));
  }
  return null;
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});

/**
 * 图标控件
 */
LK.UI('plugins', 'icon', function(options) {
  // 创建控件对象
  var $plugin = $('<div class="lichkin-icon lichkin-icon-' + options.size + '"></div>');

  // 设置具体图标
  if (options.icon != '') {
    $plugin.addClass('lichkin-icon-' + options.icon);
  }

  if (options.fontAwesomes.length == 0) {
    // 增加文字图标
    var $fa = $('<i class="fa"></i>').appendTo($plugin);

    // 设置具体文字图标
    if (options.fontAwesome != '') {
      $fa.addClass('fa-' + options.fontAwesome);
    }
  } else {
    var $span = $('<span style="position:relative;"></span>').appendTo($plugin);
    for (var i = 0; i < options.fontAwesomes.length; i++) {
      var fa = options.fontAwesomes[i];
      $span.append('<i class="' + fa.type + ' fa-' + fa.value + '" style="position:absolute;left:' + fa.left + 'px;top:' + fa.top + 'px;font-size:' + options.size + 'px;"></i>');
    }
  }

  // 返回控件对象
  return $plugin;
}, {
  // 图标大小
  size : 16,
  // 图标
  icon : '',
  // 文字图标
  fontAwesome : '',
  // 组合文字图标
  fontAwesomes : []
});

/**
 * 文本框
 */
LK.UI('plugins', 'textbox', function(options) {
  // 创建控件对象
  var $plugin = $('<input type="text" class="lichkin-textbox" />');
  if (typeof options.attr != 'undefined') {
    $plugin.attr(options.attr);
  }

  // 渲染控件
  var $obj = $(options.$obj);
  if ($obj) {
    $obj.append($plugin);
  }

  // 返回控件对象
  return $plugin;
}, {
  // 待渲染对象
  $obj : $('body'),
  // HTML标签定义的属性
  attr : {}
});

/**
 * 对话框内部实现相关
 */
LK.UI._dialog = {

  /** 控件类型 */
  plugin : 'dialog',

  /** 最大层级数 */
  maxZIndex : 8888,

  /**
   * 切换对话框
   * @param $current 要切换的对话框对象
   * @param options 切换后需要调用聚焦事件传入
   */
  switchTo : function($current, options) {
    LK.UI._core.callEachCached(this.plugin, function($plugin, $plugins) {
      $plugin.removeClass('lichkin-dialog-focus');
    });
    $current.addClass('lichkin-dialog-focus');
    $current.css('z-index', this.maxZIndex++);
    if (options) {
      // 触发对话框被聚焦后事件
      options.onFocus(options, $current);
    }
  },

  /**
   * 获取最上层对话框
   */
  getTop : function() {
    var $topDlg;
    LK.UI._core.callEachCached(this.plugin, function($plugin, $plugins) {
      if (!$topDlg || ($topDlg.css('z-index') < $plugin.css('z-index'))) {
        $topDlg = $plugin;
      }
    });
    return $topDlg;
  },

  /**
   * 关闭对话框
   */
  close : function(id) {
    // 触发对话框关闭前事件
    options.onBeforeClose(options, $plugin);

    // 清除控件
    LK.UI._core.removeCached(this.plugin, id);

    // 聚焦最上层对话框
    var $topDlg = this.getTop();
    if ($topDlg) {
      // 切换并触发聚焦事件
      LK.UI._dialog.switchTo($topDlg, $topDlg.options);
    }

    // 触发对话框关闭后事件
    options.onAfterClose(options);
  }

};

/**
 * 打开对话框
 */
LK.UI('plugins', 'openDialog', function(options) {
  // 设置id
  if (options.id == '') {
    options.id = randomInRange(10000, 99999);
  }

  // 创建控件对象
  var $plugin = $('<div id="' + options.id + '" data-id="dlg_' + options.id + '" data-plugin="dialog" class="lichkin-dialog"></div>');

  // 控件点击事件
  $plugin.click(function() {
    // 切换并触发聚焦事件
    LK.UI._dialog.switchTo($plugin, options);
  });

  // 添加标题栏
  var $titleBar = $('<div class="lichkin-dialog-titleBar" style="width:' + options.contentWidth + 'px;"></div>').appendTo($plugin);
  // 标题栏拖拽
  $titleBar.mousedown(function(e) {
    var left = parseInt($plugin.css('left'));
    var top = parseInt($plugin.css('top'));
    var maxX = $doc.width() - $plugin.outerWidth(true);
    var maxY = $doc.height() - $plugin.outerHeight(true) - 45;
    $doc.mousemove(function(me) {
      var resultX = left + me.pageX - e.pageX;
      if (resultX < 0) {
        resultX = 0;
      } else if (resultX > maxX) {
        resultX = maxX;
      }
      $plugin.css('left', resultX + 'px');
      var resultY = top + me.pageY - e.pageY;
      if (resultY < 0) {
        resultY = 0;
      } else if (resultY > maxY) {
        resultY = maxY;
      }
      $plugin.css('top', resultY + 'px');
    });
    $doc.mouseup(function() {
      $doc.off('mousemove');
    });
  });
  // 标题栏图标
  var $titleIcon = LK.UI.icon({
    icon : options.icon,
    fontAwesome : options.fontAwesome
  }).appendTo($titleBar);
  // 标题栏标题
  var $titleTitle = $('<div class="lichkin-title">' + options.title + '</div>').appendTo($titleBar);
  // 标题栏按钮
  var $titleButtons = $('<div class="lichkin-buttons"></div>').appendTo($titleBar);
  // 标题栏关闭按钮
  var $titleButtonClose = LK.UI.icon({
    icon : 'close',
    fontAwesome : 'times'
  }).appendTo($titleButtons).click(function() {
    // 关闭对话框
    LK.UI._dialog.close(options.id);
  });

  // 添加内容栏
  var $contentBar = $('<div class="lichkin-dialog-contentBar" style="width:' + options.contentWidth + 'px;height:' + options.contentHeight + 'px;"></div>').appendTo($plugin);
  // 加载页面
  // 触发页面加载前事件
  options.onBeforeLoading(options, $plugin);
  LK.loadPage({
    $obj : $contentBar,
    url : options.url,
    onAfterLoading : function(opts) {
      // 触发页面加载后事件
      options.onAfterLoading(options, $plugin);
    }
  });

  // 添加按钮栏
  if (options.buttons.length != 0) {
    var $buttonsBar = $('<div class="lichkin-dialog-buttonsBar"></div>').appendTo($plugin);
    for (var i = 0; i < options.buttons.length; i++) {
      var button = options.buttons[i];
      var $button = $('<div class="lichkin-button"></div>').appendTo($buttonsBar);
      var $buttonIcon = LK.UI.icon().appendTo($button);
      if (typeof button.icon != 'undefined') {
        $buttonIcon.addClass('lichkin-icon-' + button.icon);
      }
      if (typeof button.fontAwesome != 'undefined') {
        $buttonIcon.children('i').addClass('fa-' + button.fontAwesome);
      }
      $button.append('<div class="lichkin-text">' + button.text + '</div>');
      $button.click(function() {
        button.click($plugin, options);
      });
    }
  }

  // 定位&大小
  $plugin.css({
    'left' : ($doc.width() - options.contentWidth) / 2 + 'px',
    'top' : ($doc.height() - options.contentHeight - 45) / 2 + 'px',
    'width' : options.contentWidth + 2 + 'px',
    'height' : 26 + options.contentHeight + 'px'
  });

  // 添加到页面
  $plugin.appendTo('body');

  // 切换
  LK.UI._dialog.switchTo($plugin);

  // 返回控件对象
  return LK.UI._core.cache('dialog', $plugin, options);
}, {
  // 对话框ID，自动拼接dlg_前缀，存入生成后控件的data-id中。
  id : '',
  // 对话框标题
  title : LK.i18n.dialogTitle,
  // 图标
  icon : 'page',
  // 文字图标
  fontAwesome : 'file',
  // 对话框加载页面地址
  url : '',
  // 是否增加遮罩层
  mask : true,
  // 对话框内容宽度
  contentWidth : 640,
  // 对话框内容高度
  contentHeight : 360,
  // 对话框按钮数组
  buttons : [],

  // 事件

  // 页面加载前
  onBeforeLoading : function(options, $dlg) {
  },
  // 页面加载后
  onAfterLoading : function(options, $dlg) {
  },
  // 对话框被聚焦后
  onFocus : function(options, $dlg) {
  },
  // 对话框关闭前
  onBeforeClose : function(options, $dlg) {
  },
  // 对话框关闭后
  onAfterClose : function(options) {
  }
});

/**
 * 将对话框激活
 */
LK.UI('plugins', 'activeDialog', function(options) {
  // 切换并触发聚焦事件
  LK.UI._dialog.switchTo(LK.UI.getUIPlugin($.extend(true, {}, options, {
    UI : 'plugins'
  })), $plugin.options);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
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
    if (json.children.length == 0) {
      if (json.icon == '') {
        json.icon = 'page';
      }
      if (json.fontAwesome == '') {
        json.fontAwesome = 'file';
      }
    } else {
      if (json.icon == '') {
        json.icon = 'folder';
      }
      if (json.fontAwesome == '') {
        json.fontAwesome = 'folder';
      }
    }

    // 节点
    var $node = $('<li class="lichkin-tree-node"></li>').appendTo($nodesContainer);

    // 节点容器
    var $nodeContainer = $('<div class="lichkin-tree-node-container"></div>').appendTo($node);

    // 缩进 TODO
    for (var i = 0; i < level; i++) {
      $nodeContainer.append(LK.UI.icon());
    }

    // checkbox
    var $checkbox = LK.UI.icon({
      fontAwesomes : [
        {
          type : 'far',
          value : 'square',
          left : -7,
          top : 0
        }
      ]
    }).addClass('lichkin-tree-node-checkbox').data('id', json.id).appendTo($nodeContainer);
    // 默认不选状态
    this.uncheck($checkbox);

    // 节点图标
    $nodeContainer.append(LK.UI.icon({
      icon : json.icon,
      fontAwesome : json.fontAwesome
    }));

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
    $checkbox.removeClass('lichkin-icon-checkbox-unchecked').removeClass('lichkin-icon-checkbox-tristate').addClass('lichkin-icon-checkbox-checked');
    var $span = $checkbox.children('span');
    $span.children('i').last().remove();
    $span.append('<i class="fa fa-check" style="position:absolute;left:-8px;top:0px;font-size:9px;"></i>');
  },

  /**
   * 切换到中间状态
   * @param $checkbox checkbox控件
   */
  tristate : function($checkbox) {
    $checkbox.removeClass('lichkin-icon-checkbox-checked').removeClass('lichkin-icon-checkbox-unchecked').addClass('lichkin-icon-checkbox-tristate');
    var $span = $checkbox.children('span');
    $span.children('i').last().remove();
    $span.append('<i class="fa fa-square" style="position:absolute;left:-8px;top:0px;font-size:9px;"></i>');
  },

  /**
   * 切换到不选状态
   * @param $checkbox checkbox控件
   */
  uncheck : function($checkbox) {
    $checkbox.removeClass('lichkin-icon-checkbox-checked').removeClass('lichkin-icon-checkbox-tristate').addClass('lichkin-icon-checkbox-unchecked');
    var $span = $checkbox.children('span');
    $span.children('i').remove();
    $span.append('<i class="far fa-square" style="position:absolute;left:-7px;top:0px;font-size:16px;"></i>');
    $span.append('<i class="far fa-square" style="position:absolute;left:-7px;top:0px;font-size:16px;"></i>');
  },

  /**
   * 判断是否为选中状态
   * @param $checkbox checkbox控件
   * @return 选中返回true，不选中返回false，中间状态返回null.
   */
  isChecked : function($checkbox) {
    if ($checkbox.hasClass('lichkin-icon-checkbox-checked')) {
      return true;
    }
    if ($checkbox.hasClass('lichkin-icon-checkbox-unchecked')) {
      return false;
    }
    if ($checkbox.hasClass('lichkin-icon-checkbox-tristate')) {
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
    $tree.find('.lichkin-tree-node-checkbox').each(function() {
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
    $tree.find('.lichkin-tree-node-checkbox').each(function() {
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
