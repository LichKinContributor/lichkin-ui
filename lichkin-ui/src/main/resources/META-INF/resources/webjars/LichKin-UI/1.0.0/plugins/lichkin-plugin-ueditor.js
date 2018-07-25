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

  // 创建UEditor对象
  var ue = UE.getEditor($plugin.data('LKOPTIONS').id, {
    autoHeightEnabled : false,
    initialFrameWidth : 886,
    initialFrameHeight : 315
  });

  ue.addListener('focus blur', function() {
    $plugin.LKValidate();
  });

  ue.addListener('keyup', function() {
    $plugin.LKValidate();
  });

  // 缓存参数
  $plugin.data('ue', ue);

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
  }
});
