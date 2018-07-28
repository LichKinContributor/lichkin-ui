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

  var $value = $plugin.LKGetValueObj();

  $value.bind({
    'keyup' : function() {
      $plugin.LKSetValues($plugin.LKGetValue().extarctInteger());
    }
  });

  // 按钮
  var height = (LK.rowHeight - 2) / 2 - 4 + 'px';
  var $button = $('<a href="javascript:;" class="lichkin-numberspinner-button" style="height:' + (LK.rowHeight - 2) + 'px"></a>').appendTo($plugin).LKAddPluginClass(plugin, 'button');
  var $span = $('<span class="lichkin-numberspinner-button-container"></span>').appendTo($button);
  LK.UI.icon({
    size : 16,
    icon : 'spinner-plus'
  }).appendTo($span).css({
    'height' : height,
    'background-size' : height
  }).click(function() {
    var value = $plugin.LKGetValue().extarctInteger();
    if (value == '' || value == '-') {
      $plugin.LKSetValues(0);
    } else {
      $plugin.LKSetValues(parseInt(value) + 1);
    }
    $plugin.LKValidate();
  }).find('i').css({
    'height' : height,
    'line-height' : height
  });
  LK.UI.icon({
    size : 16,
    icon : 'spinner-minus'
  }).appendTo($span).css({
    'height' : height,
    'background-size' : height
  }).click(function() {
    var value = $plugin.LKGetValue().extarctInteger();
    if (value == '' || value == '-') {
      $plugin.LKSetValues(0);
    } else {
      $plugin.LKSetValues(parseInt(value) - 1);
    }
    $plugin.LKValidate();
  }).find('i').css({
    'height' : height,
    'line-height' : height
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
  cols : 1,
  // rows : 1,
  linkages : [],
  onLinkaged : function($plugin, linkage) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  }
});
