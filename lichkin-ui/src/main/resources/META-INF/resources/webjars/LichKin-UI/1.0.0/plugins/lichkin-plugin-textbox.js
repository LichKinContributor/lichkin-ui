;
/**
 * 文本框
 */
LK.UI('plugins', 'textbox', function(options) {
  // 创建控件对象
  var $plugin = $('<input type="text" class="lichkin-textbox" />');
  if (typeof options.attr != 'undefined') {
    $plugin.attr(options.attr);
  }

  // 渲染控件
  var $obj = $(options.$obj);
  if ($obj) {
    $obj.append($plugin);
  }

  // 返回控件对象
  return $plugin;
}, {
  // 待渲染对象
  $obj : $('body'),
  // HTML标签定义的属性
  attr : {}
});
