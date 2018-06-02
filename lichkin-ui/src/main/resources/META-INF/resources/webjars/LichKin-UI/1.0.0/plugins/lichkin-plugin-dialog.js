;
/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 使用LKUI开头+控件名命名扩展
   * @param funcName 控件具体方法名
   * @param options 控件具体方法需要的参数。部分方法可扩展实现代码简写方式。
   */
  LKUIdialog : function(funcName, options) {
    // 第一个参数为字符串时，即为调用该类型控件的方法。
    if (isString(funcName)) {
      switch (funcName) {
        case 'active':
          LK.UI.activeDialog({
            $obj : this
          });
          return;
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
   * @param activeFocus 是否触发对话框被聚焦后事件
   */
  switchTo : function($current, activeFocus) {
    LK.UI._core.callEachCached(this.plugin, function($plugin, $plugins) {
      $plugin.removeClass('lichkin-dialog-focus');
    });
    $current.addClass('lichkin-dialog-focus');
    $current.css('z-index', this.maxZIndex++);
    if (activeFocus) {
      // 触发对话框被聚焦后事件
      $current.options.onFocus($current.options, $current);
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
    var $plugin = LK.UI.getUIPlugin({
      UI : 'plugins',
      id : id
    })
    // 触发对话框关闭前事件
    $plugin.options.onBeforeClose($plugin.options, $plugin);

    // 清除控件
    LK.UI._core.removeCached(this.plugin, id);

    // 聚焦最上层对话框
    var $topDlg = this.getTop();
    if ($topDlg) {
      // 切换并触发聚焦事件
      LK.UI._dialog.switchTo($topDlg, true);
    }

    // 触发对话框关闭后事件
    $plugin.options.onAfterClose($plugin.options);
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
    LK.UI._dialog.switchTo($plugin, true);
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

      // 添加按钮
      var $button = LKUI.button(button.text).appendTo($buttonsBar);

      // 添加按钮图标
      if (button.icon) {
        $button.children().prepend(LKUI.icon(button.icon));
      }

      // 绑定按钮点击事件
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
  })), true);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});