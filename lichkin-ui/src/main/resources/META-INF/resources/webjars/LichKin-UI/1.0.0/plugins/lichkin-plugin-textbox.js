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

  $value.bind({
    'change' : function() {
      $plugin.LKValidate();
      $plugin.data('LKOPTIONS').onChange($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
    },
    'keyup' : function() {
      $plugin.LKValidate();
      $plugin.data('LKOPTIONS').onChange($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
    }
  });

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, {
  // @see LK.UI.create
  id : '',
  $appendTo : null,
  $renderTo : null,
  name : '',
  validator : null,
  value : null,
  inForm : false,
  width : null,
  height : null,
  cols : 1,
  rows : 1,
  cls : '',
  linkages : [],
  onLinkaged : function($plugin, linkage) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  }
});
