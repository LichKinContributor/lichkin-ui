;
/**
 * 初始化控件，提供简写代码。
 * @param text 按钮文字
 * @param icon 按钮图标
 * @param click 按钮点击事件
 * @param tip 按钮提示信息
 */
LKUI.button = function(text, icon, click, tip) {
  return LK.UI.button({
    text : text,
    icon : icon,
    click : click,
    tip : tip
  });
};

/**
 * 按钮控件
 */
LK.UI('plugins', 'button', function(options) {
  // 设置id
  var id = options.id = (options.id != '') ? options.id : 'LK_' + randomInRange(100000, 999999);

  // 创建控件对象
  var $plugin = $('<a id="' + id + '" href="javascript:;" class="lichkin-button"></a>');
  $plugin.css('height', LK.rowHeight - 2 + 'px');

  // 增加样式
  if (options.cls != null) {
    $plugin.addClass('lichkin-button-' + options.cls);
  }

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
  if (options.icon != null) {
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
  if (options.text != null) {
    $span.append(LKUI.text(options.text));
  }

  // 点击事件
  $plugin.click(function() {
    options.click($plugin);
  });

  // 提示信息
  if (options.tip != null) {
    $plugin.attr('title', $.LKGetI18N(options.tip));
  } else if (options.text != null) {
    $plugin.attr('title', $.LKGetI18N(options.text));
  } else if (options.icon != null) {
    $plugin.attr('title', $.LKGetI18N(options.icon));
  }

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
  // 图标控件
  $icon : null,
  // 图标控件约定的内容
  _icon : null,
  // 图标
  icon : null,
  // 文字控件
  $text : null,
  // 文字控件约定的内容
  _text : null,
  // 文字
  text : null,
  /**
   * 点击事件
   * @param $plugin 当前按钮控件
   */
  click : function($plugin) {
  },
  // 按钮提示信息
  tip : null,
  // 样式
  cls : null,
  // 样式
  style : {}
});