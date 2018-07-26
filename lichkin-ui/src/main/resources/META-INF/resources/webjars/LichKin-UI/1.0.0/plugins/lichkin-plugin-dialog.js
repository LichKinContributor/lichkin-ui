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
      $('.lichkin-dialog-mask').css('z-index', $topDlg.css('z-index') - 1);
    } else {
      $('.lichkin-dialog-mask').remove();
    }

    // 触发对话框关闭后事件
    options.onAfterClose();
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
  var $titleIcon = LKUI.icon(options.icon).appendTo($titleBar);
  // 标题栏标题
  var $titleTitle = $('<div class="lichkin-title">' + options.title + '</div>').appendTo($titleBar);
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
    options.size.width = options.size.cols * 254;
  }

  if (typeof options.size.height == 'undefined') {
    if (typeof options.size.rows == 'undefined') {
      options.size.rows = 10;
    }
    options.size.height = options.size.rows * 30;
  }

  // 添加内容栏
  var $contentBar = $('<div class="lichkin-dialog-contentBar" style="width:' + options.size.width + 'px;height:' + options.size.height + 'px;"></div>').appendTo($plugin);

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
      }
    });
  } else {// 填充页面
    $contentBar.append(options.content);
  }

  // 添加按钮栏
  if (options.buttons.length != 0) {
    var $buttonsBar = $('<div class="lichkin-dialog-buttonsBar"></div>').appendTo($plugin);
    for (var i = 0; i < options.buttons.length; i++) {
      var button = options.buttons[i];
      (function(button) {
        var click = button.click;
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
    'top' : ($doc.height() - options.size.height - 45) / 2 + 'px'
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

  // 返回控件对象
  return $plugin;
}, {
  // 控件ID
  id : '',
  // 对话框标题
  title : LK.i18n.dialogTitle,
  // 图标
  icon : 'page',
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
    width : 508,
    // 对话框内容高度
    height : 300,
    // 表格列数
    cols : 2,
    // 表格行数
    rows : 10
  },
  /**
   * 对话框按钮数组
   * @see LK.UI.button（click方法被重写，第一个参数保持按钮控件不变，增加第二个参数当前对话框控件。）
   */
  buttons : [],

  // 事件
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
