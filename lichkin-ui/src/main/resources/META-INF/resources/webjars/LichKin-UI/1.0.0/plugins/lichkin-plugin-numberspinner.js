;

/**
 * 数字微调器控件
 */
LK.UI('plugins', 'numberspinner', function(options) {
  // 控件类型
  var plugin = 'numberspinner';

  options.rows = 1;

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var height = $plugin.data('LKOPTIONS').height;

  var $value = $plugin.LKGetValueObj();

  $value.bind({
    'keyup' : function() {
      $plugin.LKSetValues($plugin.LKGetValue().extarctInteger());
    }
  });

  // 按钮
  var buttonHeight = (height - (3.5 + 1 + 3.5)) / 2;
  var $button = $('<a href="javascript:;" class="lichkin-numberspinner-button"></a>').appendTo($plugin).LKAddPluginClass(plugin, 'button');
  $button.css('height', height);
  var $span = $('<span class="lichkin-numberspinner-button-container"></span>').appendTo($button);
  LK.UI.icon({
    size : 16,
    icon : 'spinner-plus'
  }).appendTo($span).css({
    'height' : buttonHeight,
    'background-size' : buttonHeight + 'px'
  }).click(function() {
    var value = $plugin.LKGetValue().extarctInteger();
    if (value == '' || value == '-') {
      $plugin.LKSetValues(0);
    } else {
      $plugin.LKSetValues(parseInt(value) + 1);
    }
    $plugin.LKValidate();
  }).find('i').css({
    'height' : buttonHeight,
    'line-height' : buttonHeight + 'px',
    'font-size' : buttonHeight + 'px'
  });
  LK.UI.icon({
    size : 16,
    icon : 'spinner-minus'
  }).appendTo($span).css({
    'height' : buttonHeight,
    'background-size' : buttonHeight + 'px'
  }).click(function() {
    var value = $plugin.LKGetValue().extarctInteger();
    if (value == '' || value == '-') {
      $plugin.LKSetValues(0);
    } else {
      $plugin.LKSetValues(parseInt(value) - 1);
    }
    $plugin.LKValidate();
  }).find('i').css({
    'height' : buttonHeight,
    'line-height' : buttonHeight + 'px',
    'font-size' : buttonHeight + 'px'
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
  // rows : 1,
  cls : '',
  linkages : [],
  onLinkaged : function($plugin, linkage) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  }
});
