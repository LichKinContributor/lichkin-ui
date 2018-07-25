;

/**
 * 文本框控件
 */
LK.UI('plugins', 'textbox', function(options) {
  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : options.line == 1 ? 'textbox' : 'textarea',
    options : options
  });

  var $value = $plugin.LKGetValueObj();
  $value.css('height', options.line * 30 - 2 + 'px');

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
  linkages : [],
  onLinkaged : function($plugin, $linkage, linkageValues, linkageValue, linkageCurrentValue) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  },

  // 行数
  line : 1
});
