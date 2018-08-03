;

/**
 * JQuery扩展
 */
$.extend($, {

  /**
   * 打开对话框
   * @param options 参数
   * @see LK.UI.openDialog
   */
  LKOpenDialog : function(options) {
    return LK.UI.openDialog(options);
  },

  /**
   * 获取最上层对话框
   */
  LKGetTopDialog : function() {
    return LK.UI._dialog.getTop();
  }

});

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 激活对话框
   * @param activeFocus 是否触发对话框被聚焦后事件
   */
  LKActiveDialog : function(activeFocus) {
    if (this.LKGetPluginType() != 'dialog') {
      throw 'current jquery object is not a dialog plugin.';
    }
    LK.UI._dialog.active(this, activeFocus);
  },

  /**
   * 激活对话框
   * @param id 对话框控件主键
   */
  LKCloseDialog : function(id) {
    if (this.LKGetPluginType() != 'dialog') {
      throw 'current jquery object is not a dialog plugin.';
    }
    LK.UI._dialog.close(id, this);
  }

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
   * @param $plugin 控件对象
   * @param activeFocus 是否触发对话框被聚焦后事件
   */
  active : function($plugin, activeFocus) {
    $('.lichkin-dialog').removeClass('lichkin-dialog-focus');
    $plugin.addClass('lichkin-dialog-focus');
    $plugin.css('z-index', (this.maxZIndex += 2));
    if (activeFocus) {
      // 触发对话框被聚焦后事件
      $plugin.data('LKOPTIONS').onFocus($plugin);
    }
  },

  /**
   * 获取最上层对话框
   */
  getTop : function() {
    var $topDlg;
    $('.lichkin-dialog').each(function() {
      var $that = $(this);
      if (!$topDlg || ($topDlg.css('z-index') < $that.css('z-index'))) {
        $topDlg = $that;
      }
    });
    return $topDlg;
  },

  /**
   * 关闭对话框
   * @param id 对话框控件主键
   * @param $plugin 控件对象
   */
  close : function(id, $plugin) {
    var $plugin = (typeof $plugin == 'undefined' ? $('#' + id) : $plugin);

    var options = $plugin.data('LKOPTIONS');

    // 触发对话框关闭前事件
    options.onBeforeClose($plugin);

    // 清除控件
    $plugin.remove();

    // 聚焦最上层对话框
    var $topDlg = this.getTop();
    if ($topDlg) {
      // 切换并触发聚焦事件
      this.active($topDlg, true);
      this.resetMaskZIndex();
    } else {
      $('.lichkin-dialog-mask').remove();
    }

    // 触发对话框关闭后事件
    options.onAfterClose();
  },

  /**
   * 重设遮罩层
   */
  resetMaskZIndex : function() {
    var $mask = $('.lichkin-dialog-mask');
    if ($mask.length == 0) {
      return;
    }
    var zIndex = 0;
    var noMask = true;
    $('.lichkin-dialog').each(function() {
      var $that = $(this);
      if ($that.data('LKOPTIONS').mask == true) {
        noMask = false;
        var currentZIndex = parseInt($that.css('z-index'));
        if (currentZIndex > zIndex) {
          zIndex = currentZIndex;
        }
      }
    });
    if (noMask) {
      $mask.remove();
    } else {
      $mask.css('z-index', (zIndex - 1));
    }
  }

};

/**
 * 打开对话框
 */
LK.UI('plugins', 'openDialog', function(options) {
  // 控件类型
  var plugin = 'dialog';

  // 实现类
  var implementor = LK.UI['_' + plugin];

  // 创建控件对象
  // 设置id
  var id = options.id = (options.id != '') ? options.id : 'LK_' + randomInRange(100000, 999999);

  // 创建UI控件对象
  var $plugin = $('<div id="' + id + '" data-id="' + plugin + '_' + id + '" class="lichkin-' + plugin + '" data-plugin-type="' + plugin + '"></div>').appendTo('body');

  // 控件点击事件
  $plugin.mousedown(function() {
    // 切换并触发聚焦事件
    implementor.active($plugin, true);
  });

  // 添加标题栏
  var $titleBar = $('<div class="lichkin-dialog-titleBar"></div>').appendTo($plugin);
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
  if (options.icon != null) {
    LKUI.icon(options.icon, 24).appendTo($titleBar);
  }
  // 标题栏标题
  var $titleTitle = $('<div class="lichkin-title">' + $.LKGetI18N(options.title) + '</div>').appendTo($titleBar);
  // 标题栏按钮
  var $titleButtons = $('<div class="lichkin-buttons"></div>').appendTo($titleBar);
  // 标题栏关闭按钮
  var $titleButtonClose = LKUI.icon('close').appendTo($titleButtons).click(function() {
    // 关闭对话框
    implementor.close(null, $plugin);
  });

  if (typeof options.size.width == 'undefined') {
    if (typeof options.size.cols == 'undefined') {
      options.size.cols = 2;
    }
    options.size.width = options.formContent == true ? (options.size.cols * (LK.colWidth + LK.fieldKeyWidth + LK.leftGap)) : (options.size.cols * LK.colWidth);
  }

  if (typeof options.size.height == 'undefined') {
    if (typeof options.size.rows == 'undefined') {
      options.size.rows = 10;
    }
    options.size.height = options.formContent == true ? (options.size.rows * (LK.rowHeight + LK.topGap)) : (options.size.rows * LK.rowHeight);
  }

  // 添加内容栏
  var $contentBar = $('<div class="lichkin-dialog-contentBar"></div>').appendTo($plugin).css({
    'width' : options.size.width,
    'height' : options.size.height
  });

  if (options.url != '') {// 加载页面
    // 触发页面加载前事件
    options.onBeforeLoading($plugin);
    LK.loadPage({
      $obj : $contentBar,
      url : options.url,
      param : options.param,
      data : options.data,
      onAfterLoading : function(opts) {
        // 触发页面加载后事件
        options.onAfterLoading($plugin);
      },
      onAfterRender : function(opts) {
        if ($contentBar.find('.lichkin-body').height() > $contentBar.height()) {
          $contentBar.css('width', $contentBar.outerWidth() + 17);
        }
      }
    });
  } else {// 填充页面
    $contentBar.append(options.content);
  }

  // 添加按钮栏
  var $buttonsBar = $('<div class="lichkin-dialog-buttonsBar"></div>');
  if (options.buttons.length != 0) {
    $buttonsBar.appendTo($plugin);
    for (var i = 0; i < options.buttons.length; i++) {
      var button = options.buttons[i];
      (function(button) {
        var click = button.click;
        if (typeof click != 'function') {
          click = function() {
          };
        }
        $buttonsBar.append(LK.UI.button($.extend(button, {
          click : function($button) {
            click($button, $plugin);
          }
        })));
      })(button);
    }
  }

  // 定位&大小
  $plugin.css({
    'left' : ($doc.width() - options.size.width) / 2 + 'px',
    'top' : ($doc.height() - options.size.height - $titleBar.height() - (options.buttons.length != 0 ? $buttonsBar.height() : 0)) / 2 + 'px'
  });

  // 切换
  implementor.active($plugin, false);

  // 缓存参数
  $plugin.data('LKOPTIONS', options);

  if (options.mask) {
    var maskZIndex = LK.UI._dialog.maxZIndex - 1;
    var $mask = $('.lichkin-dialog-mask');
    if ($mask.length != 0) {
      $mask.css('z-index', maskZIndex);
    } else {
      $('<div class="lichkin-dialog-mask" style="z-index:' + maskZIndex + ';"></div>').appendTo('body').show();
    }
  }

  options.onAfterCreate($plugin, $contentBar);

  // 返回控件对象
  return $plugin;
}, {
  // 控件ID
  id : '',
  // 对话框标题
  title : null,
  // 图标
  icon : null,
  // 对话框加载页面地址
  url : '',
  // 对话框加载页面参数
  param : {},
  // 对话框加载页面数据
  data : {},
  // 对话框文本内容
  content : '',
  // 是否增加遮罩层
  mask : true,
  // 对话框大小
  size : {
    // 对话框内容宽度
    width : 2 * LK.colWidth,
    // 对话框内容高度
    height : 10 * LK.rowHeight,
    // 表格列数
    cols : 2,
    // 表格行数
    rows : 10
  },
  // 表单内容，决定大小的设置。
  formContent : true,
  /**
   * 对话框按钮数组
   * @see LK.UI.button（click方法被重写，第一个参数保持按钮控件不变，增加第二个参数当前对话框控件。）
   */
  buttons : [],

  // 事件
  /**
   * 控件创建结束
   * @param $plugin 当前对话框对象
   * @param $contentBar 内容栏
   */
  onAfterCreate : function($plugin, $contentBar) {
  },
  /**
   * 页面加载前
   * @param $plugin 当前对话框对象
   */
  onBeforeLoading : function($plugin) {
  },
  /**
   * 页面加载后
   * @param $plugin 当前对话框对象
   */
  onAfterLoading : function($plugin) {
  },
  /**
   * 对话框被聚焦后
   * @param $plugin 当前对话框对象
   */
  onFocus : function($plugin) {
  },
  /**
   * 对话框关闭前
   * @param $plugin 当前对话框对象
   */
  onBeforeClose : function($plugin) {
  },
  /**
   * 对话框关闭后
   */
  onAfterClose : function() {
  }
});

$('body').keydown(function(e) {
  if (e.keyCode == 27) {// ESC关闭最顶层对话框
    var $plugin = $.LKGetTopDialog();
    if ($plugin && $plugin.length != 0) {
      $plugin.LKCloseDialog();
    }
  }
});

// 重新实现
LK.web.alert = function(options, callback) {
  $.LKOpenDialog({
    title : 'tip',
    icon : 'tip',
    content : '<div style="padding:30px 10px;height:40px;line-height:40px;text-align:center;font-size:16px;color:' + LK.pluginFontColor + ';">' + options.msg + '</div>',
    size : {
      width : 300,
      height : 100,
    },
    onAfterClose : function() {
      callback();
    }
  });
};

/**
 * 确认提示窗
 * @param msg 提示信息
 * @param callbackOk 确定按钮回调方法
 * @param callbackCancel 取消按钮回调方法
 */
LK.web.confirm = function(msg, callbackOk, callbackCancel) {
  if (typeof callbackOk == 'undefined') {
    callbackOk = function() {
    };
  }
  if (typeof callbackCancel == 'undefined') {
    callbackCancel = function() {
    };
  }
  $.LKOpenDialog({
    title : 'warning',
    icon : 'warning',
    content : '<div style="padding:30px 10px;height:40px;line-height:40px;text-align:center;font-size:16px;color:' + LK.pluginFontColor + ';">' + msg + '</div>',
    size : {
      width : 300,
      height : 100,
    },
    buttons : [
        {
          icon : 'ok',
          text : 'ok',
          cls : 'success',
          click : function($button, $dialog) {
            callbackOk();
            $dialog.LKCloseDialog();
          }
        }, {
          icon : 'cancel',
          text : 'cancel',
          cls : 'danger',
          click : function($button, $dialog) {
            callbackCancel();
            $dialog.LKCloseDialog();
          }
        }
    ]
  });
};
