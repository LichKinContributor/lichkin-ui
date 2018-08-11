;

// 扩展图标
$.LKExtendICON({
  'plus' : 'chevron-up',
  'minus' : 'chevron-down',
});

/**
 * 数字微调器内部实现相关
 */
LK.UI._numberspinner = {

  /**
   * 校验取值范围
   * @param $value 值对象
   * @param min 最小值
   * @param max 最大值
   */
  checkRange : function($value, min, max) {
    var value = parseInt($value.val());
    if (value != 'NaN') {
      if (min != null && value < min) {
        $value.val(min);
      }
      if (max != null && value > max) {
        $value.val(max);
      }
    }
  }

};

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
      LK.UI._numberspinner.checkRange($value, options.min, options.max);
    }
  });

  // 按钮
  var buttonHeight = (height - (3.5 + 1 + 3.5)) / 2;
  var $button = $('<a href="javascript:;" class="lichkin-numberspinner-button"></a>').appendTo($plugin).LKAddPluginClass(plugin, 'button');
  $button.css('height', height);
  var $span = $('<span class="lichkin-numberspinner-button-container"></span>').appendTo($button);
  LK.UI.icon({
    size : 16,
    icon : 'plus'
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
    LK.UI._numberspinner.checkRange($value, options.min, options.max);
    $plugin.LKValidate();
  }).find('i').css({
    'height' : buttonHeight,
    'line-height' : buttonHeight + 'px',
    'font-size' : buttonHeight + 'px'
  }).attr('title', $.LKGetI18N('plus'));
  LK.UI.icon({
    size : 16,
    icon : 'minus'
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
    LK.UI._numberspinner.checkRange($value, options.min, options.max);
    $plugin.LKValidate();
  }).find('i').css({
    'height' : buttonHeight,
    'line-height' : buttonHeight + 'px',
    'font-size' : buttonHeight + 'px'
  }).attr('title', $.LKGetI18N('minus'));

  LK.UI._numberspinner.checkRange($value, options.min, options.max);
  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特有参数
{
  // 最大值
  max : null,
  // 最小值
  min : null
}));
