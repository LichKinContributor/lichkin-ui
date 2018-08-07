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

/**
 * 文字控件
 */
LK.UI('plugins', 'text', function(options) {
  // 设置id
  var id = options.id = (options.id != '') ? options.id : 'LK_' + randomInRange(100000, 999999);

  // 创建控件对象
  var $plugin = $('<span id="' + id + '" class="lichkin-text">' + (options.original ? options.text : $.LKGetI18N(options.text)) + '</span>');

  $plugin.css({
    'padding' : LK.textPaddingTB + 'px ' + LK.textPaddingLR + 'px',
    'height' : LK.rowHeight - 2 * LK.textPaddingTB + 'px',
    'line-height' : LK.rowHeight - 2 * LK.textPaddingTB - 2 + 'px'
  });

  // 设置样式
  if (!$.isEmptyObject(options.style)) {
    $plugin.css(options.style);
  }

  if (options.$appendTo != null) {// 填充对象
    $plugin.appendTo(options.$appendTo);
  } else if (options.$renderTo != null) { // 渲染对象
    $plugin.insertAfter(options.$renderTo);
    options.$renderTo.remove();
  }

  // 返回控件对象
  return $plugin;
}, {
  // 控件ID
  id : '',
  // 控件填充到对象
  $appendTo : null,
  // 控件渲染到对象
  $renderTo : null,
  // 是否采用原文
  original : false,
  // 文字
  text : null,
  // 样式
  style : {}
});