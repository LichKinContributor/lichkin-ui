;
/**
 * 初始化控件，提供简写代码。
 * @param text 文字
 */
LKUI.text = function(text) {
  return LK.UI.text({
    text : text
  });
};

// 文字控件参数
LK.UI.textOptions = $.extend({},
// @see LK.UI.plugin
LK.UI.coreOptions,
// 控件特有参数
{
  // 是否采用原文
  original : false,
  // 文字
  text : null,
  // 文字大小
  fontSize : LK.pluginFontSize,
  // 高度
  height : LK.rowHeight
});

/**
 * 文字控件
 */
LK.UI('plugins', 'text', function(options) {
  options.createPlugin = function(id) {
    // 创建控件对象
    var $plugin = $('<span id="' + id + '" class="lichkin-text">' + (options.original ? options.text : $.LKGetI18NWithPrefix(options.i18nKey, options.text)) + '</span>');

    // 特殊样式
    $plugin.css({
      'padding' : LK.textPaddingTB + 'px ' + LK.textPaddingLR + 'px',
      'height' : options.height - 2 * LK.textPaddingTB + 'px',
      'line-height' : options.height - 2 * LK.textPaddingTB + 'px',
      'font-size' : options.fontSize + 'px'
    });

    // 返回控件对象
    return $plugin;
  };

  // 创建控件对象
  var $plugin = LK.UI.plugin(options);
  // 缓存参数
  $plugin.data('LKOPTIONS', options);
  // 返回控件对象
  return $plugin;
}, LK.UI.textOptions);