;
/**
 * 表单内部实现相关
 */
LK.UI._form = {

  /**
   * 创建子控件
   * @param $plugin 控件对象
   * @param options 创建表单时的参数
   */
  createSubPlugin : function($plugin, options) { // 添加具体控件
    for (var i = 0; i < options.plugins.length; i++) {
      var plugin = options.plugins[i];
      var name = plugin.options.name;
      if (!isString(name)) {
        throw 'plugin name must be setted as a form plugin.';
      }
      plugin.options.$appendTo = $plugin;
      plugin.options.inForm = true;
      if (typeof options.values[name] != 'undefined' && typeof plugin.options.value == 'undefined') {
        plugin.options.value = options.values[name];
      }
      if (plugin.plugin == 'hidden') {
        var $hiddenInput = $('<input type="hidden" class="lichkin-plugin lichkin-plugin-hidden" name="' + name + '" />').LKAddPluginClass('hidden', 'value').appendTo($plugin);
        $hiddenInput.data('plugin-type', 'hidden');
        $hiddenInput.data('validator', typeof plugin.options.validator == 'undefined' || plugin.options.validator == null ? '' : (plugin.options.validator == true ? 'required' : plugin.options.validator));
        $hiddenInput.data('LKName', name);
        $hiddenInput.val(plugin.options.value);
        continue;
      }
      LK.UI[plugin.plugin](plugin.options);
    }

    // 清除浮动
    $('<div style="clear:both;"></div>').appendTo($plugin);

    // 触发事件
    options.onAfterCreate($plugin);
  }

};

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 获取表单控件
   * @return 表单控件
   */
  LKGetFormPlugin : function() {
    if (this[0].tagName != 'FORM' || !this.hasClass('lichkin-form') || this.data('plugin-type') != 'form') {
      throw 'this method for lichkin from plugin only.';
    }
    return this;
  },

  /**
   * 绑定表单数据
   * @param data 数据集
   */
  LKFormBindData : function(data) {
    var $frm = this.LKGetFormPlugin();
    var $subPlugins = $frm.find('.lichkin-plugin');
    var notClear = isJSON(data) && !$.isEmptyObject(data);

    $subPlugins.each(function() {
      var $subPlugin = $(this);
      var name = $subPlugin.data('LKName');
      if (isString(name) && name != '') {
        var value = notClear ? data[name] : '';
        if (typeof value == 'undefined') {
          value = '';
        }
        var plugin = $subPlugin.LKGetPluginType();
        if (plugin == 'hidden') {
          $subPlugin.val(value);
        } else {
          $subPlugin.LKInvokeSetValues(value);
          $subPlugin.LKlinkage(value, false);
        }
      }
    });
  },

  /**
   * 获取表单数据
   * @return JSON数据
   */
  LKFormGetData : function() {
    var $frm = this.LKGetFormPlugin();

    var json = {};
    $frm.find('.lichkin-plugin').each(function() {
      var $subPlugin = $(this);
      var name = $subPlugin.data('LKName');
      if (isString(name) && name != '') {
        var plugin = $subPlugin.LKGetPluginType();
        var value = '';
        if (plugin == 'hidden') {
          value = $subPlugin.val();
        } else {
          value = $subPlugin.LKGetValue();
        }
        value = value == '' ? null : value;
        if (typeof json[name] == 'undefined') {
          json[name] = value;
        } else {
          json[name] += LK.SPLITOR + value;
        }
      }
    });

    return json;
  }

});

/**
 * 表单控件
 */
LK.UI('plugins', 'form', function(options) {
  // 创建控件对象
  // 设置id
  var id = options.id = (options.id != '') ? options.id : 'LK_' + randomInRange(100000, 999999);

  // 创建UI控件对象
  var $plugin = $('<form id="' + id + '" class="lichkin-form" data-plugin-type="form"></form>');

  if (options.$appendTo == true) {
    var $topDialog = $.LKGetTopDialog();
    if ($topDialog) {
      options.$appendTo = $topDialog.find('.lichkin-body');
    } else {
      options.$appendTo = $('body');
    }
  }

  if (options.$appendTo != null) {// 填充对象
    $plugin.appendTo(options.$appendTo);
  } else if (options.$renderTo != null) { // 渲染对象
    $plugin.insertAfter(options.$renderTo);
    options.$renderTo.remove();
  } else {
    $plugin.appendTo('body');
  }

  if (isString(options.url) && options.url != '') {
    LK.ajax({
      url : options.url,
      data : options.param,
      success : function(responseDatas) {
        if (responseDatas) {
          var opts = $.extend(true, {}, options);
          out: for ( var key in responseDatas) {
            for (var i = 0; i < opts.plugins.length; i++) {
              var plugin = opts.plugins[i];
              var name = plugin.options.name;
              if (name == key) {
                plugin.options.value = responseDatas[key];
                continue out;
              }
            }
          }
          LK.UI._form.createSubPlugin($plugin, opts);
        }
      }
    });
  } else {
    LK.UI._form.createSubPlugin($plugin, $.extend(true, {}, options));
  }

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
  // 表单中对应控件值
  values : {},
  // 数据请求地址
  url : '',
  // 数据请求参数
  param : {},
  /**
   * 表单创建结束事件
   * @param $plugin 控件对象
   */
  onAfterCreate : function($plugin) {
  }
});