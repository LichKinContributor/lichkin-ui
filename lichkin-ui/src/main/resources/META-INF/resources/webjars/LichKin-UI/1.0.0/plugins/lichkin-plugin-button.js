;
/**
 * 初始化控件，提供简写代码。
 */
LKUI.button = function(text, icon, click) {
  return LK.UI.button({
    text : text,
    icon : icon,
    click : click
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
  LKUIbutton : function(funcName, options) {
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
 * 按钮控件
 */
LK.UI('plugins', 'button', function(options) {
  // 创建控件对象
  var $plugin = $('<a href="javascript:;" class="lichkin-button"></a>');

  // 按钮容器
  var $span = $('<span class="lichkin-button-container"></span>').appendTo($plugin);

  // 图标控件
  if (options.$icon != null) {
    $span.append(options.$icon);
  }

  // 图标控件约定的内容
  if (options._icon != null) {
    $span.append(LK.UI.icon(options._icon));
  }

  // 图标
  if (options.icon != '') {
    $span.append(LKUI.icon(options.icon));
  }

  // 文字控件
  if (options.$text != null) {
    $span.append(options.$text);
  }

  // 文字控件约定的内容
  if (options._text != null) {
    $span.append(LK.UI.text(options._text));
  }

  // 文字
  if (options.text != '') {
    $span.append(LKUI.text(options.text));
  }

  // 点击事件
  $plugin.click(function() {
    options.click(options, $plugin);
  });

  // 返回控件对象
  return $plugin;
}, {
  // 图标控件
  $icon : null,
  // 图标控件约定的内容
  _icon : null,
  // 图标
  icon : '',
  // 文字控件
  $text : null,
  // 文字控件约定的内容
  _text : null,
  // 文字
  text : '',
  // 点击事件
  click : function(options, $button) {
  }
});