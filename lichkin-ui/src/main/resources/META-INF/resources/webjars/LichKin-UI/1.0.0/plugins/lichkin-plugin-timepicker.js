;

// 扩展图标
$.LKExtendICON({
  'timepicker' : 'clock',
});

/**
 * 时间控件
 */
LK.UI('plugins', 'timepicker', function(options) {
  // 控件类型
  var plugin = 'timepicker';

  options.rows = 1;

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var $value = $plugin.LKGetValueObj();
  $value.attr('title', $.LKGetI18N('timepicker'));

  // 加载时间控件
  $value.hunterTimePicker({
    callback : function(e) {
      $plugin.LKValidate();
      $plugin.data('LKOPTIONS').onChange($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
    }
  });

  if (options.readonly == true) {
    $value.unbind();
  }

  // 时间按钮
  var $button = LK.UI.button({
    icon : {
      size : 24,
      icon : 'timepicker'
    }
  }).appendTo($plugin).LKAddPluginClass(plugin, 'button');

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特有参数
{}));
