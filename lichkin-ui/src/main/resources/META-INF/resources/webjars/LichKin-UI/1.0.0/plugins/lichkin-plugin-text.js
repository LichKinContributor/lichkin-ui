;
/**
 * 初始化控件，提供简写代码。
 */
LKUI.text = function(text) {
  return LK.UI.text({
    text : text
  });
};

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 使用LKUI开头+控件名命名扩展
   * @param funcName 控件具体方法名
   * @param options 控件具体方法需要的参数。部分方法可扩展实现代码简写方式。
   */
  LKUItext : function(funcName, options) {
    // 第一个参数为字符串时，即为调用该类型控件的方法。
    if (isString(funcName)) {
      switch (funcName) {
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
 * 文字控件
 */
LK.UI('plugins', 'text', function(options) {
  // 创建控件对象
  var $plugin = $('<span class="lichkin-text">' + options.text + '</span>');

  // 返回控件对象
  return $plugin;
}, {
  // 文字
  text : ''
});