;

/**
 * 日期控件
 */
LK.UI('plugins', 'datepicker', function(options) {
  // 控件类型
  var plugin = 'datepicker';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var $value = $plugin.LKGetValueObj();

  // 加载日期控件
  $value.datepicker({
    format : options.format,
    autoHide : true,
    language : _LANG
  });

  $value.bind({
    'change' : function() {
      $plugin.LKValidate();
      $plugin.data('LKOPTIONS').onChange($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
    }
  });

  // 日期按钮
  var $button = LK.UI.button({
    _icon : {
      size : 24,
      icon : 'datepicker'
    },
    tip : LK.i18n.datepicker
  }).appendTo($plugin).LKAddPluginClass(plugin, 'button');

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

  format : 'yyyy-mm-dd'
});
