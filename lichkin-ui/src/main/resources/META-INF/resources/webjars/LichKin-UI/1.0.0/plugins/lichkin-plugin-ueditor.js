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
  var width = $plugin.data('LKOPTIONS').width;
  var height = $plugin.data('LKOPTIONS').height;
  var lines = 1;
  if (width >= 2059) {
    lines = 1;
  } else if (width >= 1039) {
    lines = 2;
  } else if (width >= 702) {
    lines = 3;
  } else {
    throw 'ueditor width is too small.';
  }

  // 创建UEditor对象
  var ue = UE.getEditor($plugin.data('LKOPTIONS').id, {
    autoHeightEnabled : false,
    initialFrameWidth : width,
    initialFrameHeight : height - 7 - 25 - 24 * lines
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
  cols : 4,
  rows : 14,
  linkages : [],
  onLinkaged : function($plugin, linkage) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  }
});
