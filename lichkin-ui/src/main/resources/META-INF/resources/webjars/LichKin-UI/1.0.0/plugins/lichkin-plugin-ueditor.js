;

/**
 * 富文本编辑控件
 */
LK.UI('plugins', 'ueditor', function(options) {
  // 控件类型
  var plugin = 'ueditor';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var $value = $plugin.LKGetValueObj();

  // 宽度不同时，工具栏行数不同，将影响高度的设置
  var width = $plugin.width() + 2;
  var height = $plugin.height();
  var toolbarboxHeight = 0;
  var bottomContainerHeight = 25;
  if (width >= 2026 + 2) {
    toolbarboxHeight = 32;
  } else if (width >= 1017 + 2) {
    toolbarboxHeight = 57;
  } else if (width >= 693 + 2) {
    toolbarboxHeight = 82;
  } else {
    throw 'ueditor width is too small.';
  }

  // 创建UEditor对象
  var ue = UE.getEditor($plugin.data('LKOPTIONS').id, {
    autoHeightEnabled : false,
    initialFrameWidth : width - 2,
    initialFrameHeight : height - toolbarboxHeight - bottomContainerHeight
  });

  if (options.value != null) {
    ue.ready(function() {
      ue.setContent(options.value);
    });
  }

  ue.addListener('focus blur', function() {
    if (ue.getContent()) {
      $value.val('true');
    } else {
      $value.val('');
    }
    $plugin.LKValidate();
  });

  ue.addListener('keyup', function() {
    if (ue.getContent()) {
      $value.val('true');
    } else {
      $value.val('');
    }
    $plugin.LKValidate();
  });

  // 缓存参数
  $plugin.data('ue', ue);

  if (options.value == null) {
    $plugin.LKValidate();
  }

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特殊定义
{
  cols : 4,
  rows : 14,
},
// 控件特有参数
{}));
