;

// 扩展图标
$.LKExtendICON({
  'datepicker' : 'calendar-alt',
});

/**
 * 日期控件
 */
LK.UI('plugins', 'datepicker', function(options) {
  // 控件类型
  var plugin = 'datepicker';

  options.rows = 1;

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var currentDateName = $plugin.LKGetName();
  if (currentDateName == 'startDate') {
    if (options.maxDateObj == null) {
      options.maxDateObj = 'endDate';
    }
  } else if (currentDateName == 'endDate') {
    if (options.minDateObj == null) {
      options.minDateObj = 'startDate';
    }
  }

  var $value = $plugin.LKGetValueObj();
  $value.attr('title', $.LKGetI18N('datepicker'));

  var minDateObj = options.minDateObj;
  var maxDateObj = options.maxDateObj;

  var minDate = options.minDate;
  var maxDate = options.maxDate;

  // 加载日期控件
  $value.datepicker({
    format : options.format,
    autoHide : true,
    language : _LANG,
    startDate : minDate,
    endDate : maxDate,
    show : function() {
      var $container = $.LKGetTopDialog();
      if (!$container) {
        $container = $body;
      }
      var minValue = minDate;
      if (minDateObj != null) {
        var $minDatePlugin = $container.LKGetSubPlugin(minDateObj);
        if ($minDatePlugin != null) {
          var minDatePluginValue = $minDatePlugin.LKGetValue();
          if (minDatePluginValue) {
            if (minValue) {
              minValue = minDatePluginValue < minValue ? minValue : minDatePluginValue;
            } else {
              minValue = minDatePluginValue;
            }
          }
        }
      }
      if (minValue != null) {
        $plugin.LKGetValueObj().datepicker('setStartDate', minValue);
      }

      var maxValue = maxDate;
      if (maxDateObj != null) {
        var $maxDatePlugin = $container.LKGetSubPlugin(maxDateObj);
        if ($maxDatePlugin != null) {
          var maxDatePluginValue = $maxDatePlugin.LKGetValue();
          if (maxDatePluginValue) {
            if (maxValue) {
              maxValue = maxDatePluginValue > maxValue ? maxValue : maxDatePluginValue;
            } else {
              maxValue = maxDatePluginValue;
            }
          }
        }
      }
      if (maxValue != null) {
        $plugin.LKGetValueObj().datepicker('setEndDate', maxValue);
      }
    }
  });

  $value.bind({
    'change' : function() {
      $plugin.LKValidate();
      $plugin.data('LKOPTIONS').onChange($plugin, $plugin.LKGetValues(), $plugin.LKGetValue(), $value.val());
    }
  });

  if (options.readonly == true) {
    $value.unbind();
  }

  // 日期按钮
  var $button = LK.UI.button({
    icon : {
      size : 24,
      icon : 'datepicker'
    }
  }).appendTo($plugin).LKAddPluginClass(plugin, 'button');

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特有参数
{
  format : 'yyyy-mm-dd',
  minDate : '2018-11-01',
  maxDate : new Date().format('yyyy-MM-dd'),
  minDateObj : null,
  maxDateObj : null
}));
