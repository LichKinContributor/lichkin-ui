;

/**
 * 文本框控件
 */
LK.UI('plugins', 'textbox', function(options) {
  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : options.rows == 1 ? 'textbox' : 'textarea',
    options : options
  });

  var $value = $plugin.LKGetValueObj();

  if (options.maxlength != null) {
    $value.attr({
      maxlength : options.maxlength
    });
  }

  $value.bind({
    'change' : function() {
      $plugin.LKValidate();
      $plugin.data('LKOPTIONS').onChange($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
    },
    'keyup' : function() {
      $plugin.LKValidate();
      $plugin.data('LKOPTIONS').onChange($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
    },
    'keypress' : function(event) {
      if (event.keyCode == '13') {
        $plugin.data('LKOPTIONS').enterKeyClick($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
      }
    }
  });

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特有参数
{
  maxlength : null,
  /**
   * 回车响应时间
   * @param $plugin 当前控件
   * @param pluginValues 控件值
   * @param pluginValue 控件值
   * @param currentValue 当前值
   */
  enterKeyClick : function($plugin, pluginValues, pluginValue, currentValue) {
  }
}));
