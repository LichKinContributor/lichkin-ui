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
  // 创建控件对象
  var $plugin = $('<span class="lichkin-text">' + (options.original ? options.text : $.LKGetI18N(options.text)) + '</span>');

  // 设置样式
  if (!$.isEmptyObject(options.style)) {
    $plugin.css(options.style);
  }

  // 返回控件对象
  return $plugin;
}, {
  // 是否采用原文
  original : false,
  // 文字
  text : null,
  // 样式
  style : {}
});