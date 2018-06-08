;
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
    $plugin.css('z-index', this.maxZIndex++);
    if (activeFocus) {
      // 触发对话框被聚焦后事件
      $plugin.options.onFocus($plugin);
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
   */
  close : function(id) {
    var $plugin = LKUI._getUIPlugin({
      id : id
    });
    // 触发对话框关闭前事件
    $plugin.options.onBeforeClose($plugin.options, $plugin);

    // 清除控件
    $plugin.remove();

    // 聚焦最上层对话框
    var $topDlg = this.getTop();
    if ($topDlg) {
      // 切换并触发聚焦事件
      $topDlg.LKUI('active', true);
    }

    // 触发对话框关闭后事件
    $plugin.options.onAfterClose($plugin.options);
  }

};

/**
 * 打开对话框
 */
LK.UI('plugins', 'openDialog', function(options) {
  // 控件类型
  var plugin = 'dialog';

  // 创建控件对象
  var $plugin = LKUI._createUIPlugin(plugin, options);

  // 控件点击事件
  $plugin.mousedown(function() {
    // 切换并触发聚焦事件
    $plugin.LKUI('active', true);
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
  var $titleIcon = LKUI.icon(options.icon).appendTo($titleBar);
  // 标题栏标题
  var $titleTitle = $('<div class="lichkin-title">' + options.title + '</div>').appendTo($titleBar);
  // 标题栏按钮
  var $titleButtons = $('<div class="lichkin-buttons"></div>').appendTo($titleBar);
  // 标题栏关闭按钮
  var $titleButtonClose = LKUI.icon('close').appendTo($titleButtons).click(function() {
    // 关闭对话框
    LK.UI._dialog.close(options.id);
  });

  // 添加内容栏
  var $contentBar = $('<div class="lichkin-dialog-contentBar" style="width:' + options.size.width + 'px;height:' + options.size.height + 'px;"></div>').appendTo($plugin);
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
      (function(button) {
        $buttonsBar.append(LKUI.button(button.text, button.icon, function() {
          button.click($plugin, options);
        }));
      })(button);
    }
  }

  // 定位&大小
  $plugin.css({
    'left' : ($doc.width() - options.size.width) / 2 + 'px',
    'top' : ($doc.height() - options.size.height - 45) / 2 + 'px'
  });

  // 切换
  $plugin.LKUI('active', false);

  // 返回控件对象
  return $plugin;
}, {
  // @see createUIPlugin
  id : '',
  $appendTo : 'body',// 对话框只能添加到body上

  // 对话框标题
  title : LK.i18n.dialogTitle,
  // 图标
  icon : 'page',
  // 对话框加载页面地址
  url : '',
  // 是否增加遮罩层
  mask : true,
  // 对话框大小
  size : {
    // 对话框内容宽度
    width : 640,
    // 对话框内容高度
    height : 360
  },
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
