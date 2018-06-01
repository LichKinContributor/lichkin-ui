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
  var $titleIcon = $('<div class="lichkin-icon lichkin-icon-16 lichkin-icon-' + options.icon + '"><i class="fa fa-' + options.fontAwesome + '"></i></div>').appendTo($titleBar);
  // 标题栏标题
  var $titleTitle = $('<div class="lichkin-title">' + options.title + '</div>').appendTo($titleBar);
  // 标题栏按钮
  var $titleButtons = $('<div class="lichkin-buttons"></div>').appendTo($titleBar);
  // 标题栏关闭按钮
  var $titleButtonClose = $('<div class="lichkin-icon lichkin-icon-16 lichkin-icon-close"><i class="fa fa-times"></i></div>').appendTo($titleButtons);
  $titleButtonClose.click(function() {
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
  // 获取到控件
  var $plugin = LK.UI.getUIPlugin($.extend(true, {}, options, {
    UI : 'plugins'
  }));
  // 切换并触发聚焦事件
  LK.UI._dialog.switchTo($plugin, $plugin.options);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});
