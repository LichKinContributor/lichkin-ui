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
      if (plugin == '-') {
        $plugin.append('<div class="lichkin-form-field" style="padding:' + LK.textPaddingTB + 'px 0px 0px ' + LK.textPaddingLR + 'px;width:' + (LK.fieldKeyWidth + LK.colWidth) + 'px;height:' + LK.rowHeight + 'px;"></div>');
        continue;
      }
      var name = plugin.options.name;
      if (!isString(name)) {
        throw 'plugin name must be setted as a form plugin.';
      }
      plugin.options.$appendTo = $plugin;
      plugin.options.inForm = true;
      if (typeof plugin.options.i18nKey == 'undefined') {
        plugin.options.i18nKey = options.i18nKey;
      }
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
      if (plugin.plugin == 'droplist') {
        if (plugin.options.value === null) {
          plugin.options.value = 'null';
        }
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
   * @param keepHidden 保留hidden控件值
   * @param keepInitValue 保留初始化控件值
   */
  LKFormBindData : function(data, keepHidden, keepInitValue) {
    var $frm = this.LKGetFormPlugin();
    var $subPlugins = $frm.find('.lichkin-plugin');
    var notClear = isJSON(data) && !$.isEmptyObject(data);

    $subPlugins.each(function() {
      var $subPlugin = $(this);
      var name = $subPlugin.data('LKName');
      if (isString(name) && name != '') {
        var value = notClear ? data[name] : '';
        if (keepInitValue && (typeof value == 'undefined' || value == '')) {
          // 如果值为空，有默认值 则设置为默认值
          value = $subPlugin.data('initValue') ? $subPlugin.data('initValue') : '';
        }

        var plugin = $subPlugin.LKGetPluginType();

        switch (plugin) {
          case 'hidden': {
            if (!keepHidden) {
              $subPlugin.val(value);
            }
          }
            break;
          case 'map':
            $subPlugin.LKSetValues(data, false, true);
            break;
          default: {
            $subPlugin.LKInvokeSetValues(value);
            $subPlugin.LKlinkage(value, false);
          }
            break;
        }
      }
    });
  },

  /**
   * 获取表单数据
   * @param ignoreNullValue true:忽略空值;false:不忽略空值;
   * @return JSON数据
   */
  LKFormGetData : function(ignoreNullValue) {
    var $frm = this.LKGetFormPlugin();

    var json = {};
    $frm.find('.lichkin-plugin').each(function() {
      var $subPlugin = $(this);
      var name = $subPlugin.data('LKName');
      if (isString(name) && name != '') {
        var plugin = $subPlugin.LKGetPluginType();
        var value = '';
        switch (plugin) {
          case 'hidden':
            value = $subPlugin.val();
            break;
          case 'map':
            value = $subPlugin.data('mapJson');
            break;
          default: {
            var options = $subPlugin.data('LKOPTIONS');
            if (options.readonly == true) {
              if (options.commitable == true) {// 只读情况下该参数才起作用
                value = $subPlugin.LKGetValue();
              }
            } else {
              value = $subPlugin.LKGetValue();
            }
          }
            break;
        }
        value = value == '' ? null : value;
        if (!ignoreNullValue || value != null) {
          // 值为json
          if (isJSON(value)) {
            json = $.extend(json, value);
          } else {
            if (typeof json[name] == 'undefined') {
              json[name] = value;
            } else {
              json[name] += LK.SPLITOR + value;
            }
          }
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
      options.$appendTo = $body;
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
        var opts = $.extend(true, {}, options);
        if (responseDatas) {
          out: for ( var key in responseDatas) {
            for (var i = 0; i < opts.plugins.length; i++) {
              var plugin = opts.plugins[i];
              if (plugin == '-') {
                continue;
              }
              if (plugin.plugin == 'map') {
                plugin.options.value = responseDatas;
                continue out;
              }
              var name = plugin.options.name;
              if (name == key) {
                plugin.options.value = responseDatas[key];
                continue out;
              }
            }
          }
          LK.UI._form.createSubPlugin($plugin, opts);
        } else {
          if (options.createSubPluginNoDatas == true) {
            LK.UI._form.createSubPlugin($plugin, opts);
          }
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
  // 国际化前缀
  i18nKey : '',

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
  },
  // 没有响应数据是否创建表单
  createSubPluginNoDatas : false,
});

/**
 * 表单工具类
 */
LK.UI.formUtils = {

  /**
   * 创建新插件数组
   * @param plugins 原插件数组
   * @param plugin 待添加插件（单个插件JSON或多个插件数组）
   * @param index 待添加位置
   * @return 新插件数组
   */
  newPlugins : function(plugins, plugin, index) {
    var newPlugins = [];
    if (plugins && plugins.length > 0) {
      $.extend(true, newPlugins, plugins);
    }
    if (typeof index == 'undefined') {
      if (Array.isArray(plugin)) {
        for (var i = 0; i < plugin.length; i++) {
          newPlugins.push(plugin[i]);
        }
      } else {
        newPlugins.push(plugin);
      }
    } else {
      if (Array.isArray(plugin)) {
        for (var i = 0; i < plugin.length; i++) {
          newPlugins.splice(index + i, 0, plugin[i]);
        }
      } else {
        newPlugins.splice(index, 0, plugin);
      }
    }
    return newPlugins;
  },

  /**
   * 设置只读属性
   * @param plugins 插件数组
   * @param readonlyPluginNames 需要设置只读属性的插件名数组
   * @return 新插件数组
   */
  newReadonlyPlugins : function(plugins, readonlyPlugins) {
    var newPlugins = $.extend(true, [], plugins);
    if (Array.isArray(readonlyPlugins) && readonlyPlugins.length > 0) {
      for (var i = 0; i < newPlugins.length; i++) {
        var plugin = newPlugins[i];
        if (plugin == '-') {
          continue;
        }
        for (var j = 0; j < readonlyPlugins.length; j++) {
          if (plugin.options.name == readonlyPlugins[j]) {
            plugin.options.readonly = true;
          }
        }
      }
    } else {
      for (var i = 0; i < newPlugins.length; i++) {
        var plugin = newPlugins[i];
        if (plugin == '-') {
          continue;
        }
        plugin.options.readonly = true;
      }
    }
    return newPlugins;
  },

  /**
   * 修改参数
   * @param plugins 原插件数组
   * @param pluginName 待修改参数的插件字段名
   * @param replace true:替换;false:添加.
   * @param newOptions 参数
   * @param arrayRepalce true:值为数组时直接替换;false:值为数组时追加值;
   */
  changeOptions : function(plugins, pluginName, replace, newOptions, arrayRepalce) {
    for (var i = 0; i < plugins.length; i++) {
      var plugin = plugins[i];
      if (plugin == '-') {
        continue;
      }
      if (plugin.options.name == pluginName) {
        var options = plugin.options;
        if (replace) {
          plugin.options = newOptions;
          plugin.options.name = pluginName;
        } else {
          plugin.options = $.extend(((typeof arrayRepalce != 'undeinfed' && arrayRepalce == true) ? {} : true), plugin.options, newOptions);
        }
        break;
      }
    }
  },

  /**
   * 删除插件
   * @param plugins 原插件数组
   * @param removePluginNames 需要设置只读属性的插件名数组
   */
  removePlugins : function(plugins, removePluginNames) {
    if (Array.isArray(removePluginNames)) {
      out: for (var i = plugins.length - 1; i >= 0; i--) {
        var plugin = plugins[i];
        if (plugin == '-') {
          continue;
        }
        for (var j = 0; j < removePluginNames.length; j++) {
          if (plugin.options.name == removePluginNames[j]) {
            plugins.splice(i, 1);
            continue out;
          }
        }
      }
    } else {
      for (var i = plugins.length - 1; i >= 0; i--) {
        var plugin = plugins[i];
        if (plugin == '-') {
          continue;
        }
        if (plugin.options.name == removePluginNames) {
          plugins.splice(i, 1);
          break;
        }
      }
    }
  }

};
