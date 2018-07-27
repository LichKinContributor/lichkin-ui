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
  var $plugin = $('<span class="lichkin-text">' + $.LKGetI18N(options.text) + '</span>');

  // 设置样式
  $plugin.css(options.style);

  // 返回控件对象
  return $plugin;
}, {
  // 文字
  text : '',
  // 样式
  style : {}
});