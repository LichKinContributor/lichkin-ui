;
/**
 * 表单控件
 */
LK.UI('plugins', 'form', function(options) {
  // 创建控件对象
  // 设置id
  var id = options.id = (options.id != '') ? options.id : 'LK_' + randomInRange(100000, 999999);

  // 创建UI控件对象
  var $plugin = $('<form id="' + id + '" class="lichkin-form" data-plugin-type="form"></form>');

  if (options.$appendTo != null) {// 填充对象
    $plugin.appendTo(options.$appendTo);
  } else if (options.$renderTo != null) { // 渲染对象
    $plugin.insertAfter(options.$renderTo);
    options.$renderTo.remove();
  } else {// 填充到body
    $plugin.appendTo('body');
  }

  // 添加具体控件
  for (var i = 0; i < options.plugins.length; i++) {
    var plugin = options.plugins[i];
    var name = plugin.options.name;
    if (!isString(name)) {
      throw 'plugin name must be setted as a form plugin.';
    }
    if (plugin.plugin == 'hidden') {
      var $hiddenInput = $('<input type="hidden" name="' + name + '" />').appendTo($form);
      if (typeof plugin.options.value != 'undefined') {
        $hiddenInput.val(plugin.options.value);
      }
      continue;
    }
    var $field = $('<div class="lichkin-form-field"></div>').appendTo($plugin);

    var textKey = name;
    if (typeof plugin.textKey != 'undefined') {
      textKey = plugin.textKey;
    }
    if (typeof LK.i18n[textKey] != 'undefined') {
      textKey = LK.i18n[textKey];
    }
    var $fieldKey = $('<div class="lichkin-form-field-key"></div>').appendTo($field).append(LKUI.text(textKey + ' :')).css('width', LK.fieldKeyWidth - 10 + 'px');

    var $fieldValue = $('<div class="lichkin-form-field-value"></div>').appendTo($field);
    plugin.options.$appendTo = $fieldValue;
    plugin.options.inForm = true;
    LK.UI[plugin.plugin](plugin.options);
  }

  // 清除浮动
  $('<div style="clear:both;"></div>').appendTo($plugin);

  // 触发事件
  options.onAfterCreate($plugin);

  // 返回控件对象
  return $plugin;
}, {
  // 控件ID
  id : '',
  // 控件填充到对象
  $appendTo : null,
  // 控件渲染到对象
  $renderTo : null,

  /**
   * 控件数组
   * @param plugin 控件类型
   * @param textKey 控件显示名键，需配置对应的i18n。
   * @param options 具体控件参数
   */
  plugins : [],
  /**
   * 表单创建结束事件
   * @param $plugin 控件对象
   */
  onAfterCreate : function($plugin) {
  }
});