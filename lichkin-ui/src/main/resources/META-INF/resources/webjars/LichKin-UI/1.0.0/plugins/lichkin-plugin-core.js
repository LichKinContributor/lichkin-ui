;
/** 常用功能对象 */
let LKUI = {};

/**
 * 添加控件实现代码
 * @param provider 控件提供者
 * @param plugin 控件类型
 * @param func 具体实现方法
 * @param defaultValues 控件所有参数默认值（框架内部实现，自定义实现方法不处理该参数。）
 */
LK.UI = function(provider, plugin, func, defaultValues) {
  // 确定控件提供者
  if (typeof LK.UI['__'] == 'undefined') {
    LK.UI['__'] = {};
  }
  LK.UI['__'][plugin] = provider;

  // 添加解析器
  if (typeof LK.UI[plugin] == 'undefined') {
    LK.UI[plugin] = function(x, y) {
      return LK.UI['_'](plugin, x, y);
    };
  }

  // 添加实现方法
  if (typeof LK.UI[provider] == 'undefined') {
    LK.UI[provider] = {};
  }
  LK.UI[provider][plugin] = func;

  // 添加默认值
  if (provider == 'plugins') {
    LK.UI[plugin].defaultValues = defaultValues;
  }
};

/**
 * 处理UI实现方法（框架内部调用）
 * @param plugin 控件类型
 * @param options 自定义的参数
 */
LK.UI._ = function(plugin, options) {
  // 自动补全默认参数，并且不支持默认参数中未定义的参数。
  var defaultValues = $.extend(true, {}, LK.UI[plugin].defaultValues);
  options = $.extend({}, defaultValues, options);
  for ( var key in options) {
    if (key == 'UI') {
      continue;
    }
    var containsKey = false;
    for ( var defaultKey in defaultValues) {
      if (defaultKey === key) {
        containsKey = true;
        delete defaultValues[defaultKey];
        break;
      }
    }
    if (!containsKey) {
      delete options[key];
    }
  }

  // 调用时显式指定了UI类型，则调用该UI方法。
  var provider = options.UI;
  if (typeof provider != 'undefined') {
    return LK.UI[provider][plugin](options);
  }

  // 使用该控件类型指定的UI实现。
  return LK.UI[LK.UI['__'][plugin]][plugin](options);
};

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 使用LKUI实现全控件管理
   * @param funcName 控件具体方法名
   * @param options 控件具体方法需要的参数。部分方法可扩展实现代码简写方式。
   */
  LKUI : function(funcName, options) {
    var $plugin = this;

    // 首先验证是否为LKUI控件
    var plugin = $plugin.data('plugin-type');
    if (plugin == '') {
      throw 'is not a LK UI object.';
    }
    var lkOptions = $plugin.data('LKOPTIONS');
    if (lkOptions == '') {
      throw 'is not a LK UI object.';
    }
    // 赋值方便后续调用
    $plugin.options = lkOptions;

    // 没有传入参数，视为获取控件对象。
    if (typeof funcName == 'undefined') {
      return $plugin;
    }

    // 验证参数是否正确
    if (!isString(funcName)) {
      throw 'illegal arguments';
    }

    switch (funcName) {
      case 'active':
        if (plugin == 'dialog') {
          LK.UI._dialog.active($plugin, options);
          return;
        }
        break;
      case 'reload':
        if (plugin == 'droplist' || plugin == 'tree' || plugin == 'datagrid') {
          LKUI._reload(options, $plugin);
          return;
        }
        break;
      case 'getSelected':
        if (plugin == 'droplist' || plugin == 'datagrid') {
          return LKUI._getSelected(options, $plugin);
        }
        break;
      case 'getSelectedData':
        if (plugin == 'droplist' || plugin == 'datagrid') {
          return LKUI._getSelected(options, $plugin).data();
        }
        break;
      case 'getSelectedIds':
        if (plugin == 'droplist' || plugin == 'datagrid') {
          var ids = new Array();
          var datas = LKUI._getSelected(options, $plugin).data();
          for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            ids.push(data.id);
          }
          return ids.join(LK.SPLITOR);
        }
        break;
      case 'getChecked':
        if (plugin == 'tree') {
          return LKUI._getChecked(options, $plugin);
        }
        break;
      case 'getCheckedData':
        if (plugin == 'tree') {
          var data = new Array();
          var checkedes = LKUI._getChecked(options, $plugin);
          for (var i = 0; i < checkedes.length; i++) {
            data.push($(checkedes[i]).data());
          }
          return data;
        }
        break;
      case 'getCheckedId':
        if (plugin == 'tree') {
          var id = new Array();
          var checkedes = LKUI._getChecked(options, $plugin);
          for (var i = 0; i < checkedes.length; i++) {
            id.push($(checkedes[i]).data('id'));
          }
          return id.join(LK.SPLITOR);
        }
        break;
      default:
        // 没有该方法
        break;
    }

    // 未实现
    throw 'not implemented at all.';
  },

  /**
   * 验证表单
   */
  _validate : function() {
    var $plugin = this;// 当前对象为控件对象
    var plugin = $plugin.data('plugin-type');// 取控件类型
    var $value = $plugin.find('.lichkin-' + plugin + '-value');// 取控件值对象
    var value = $value.val();// 取控件值
    var validator = $value.data('validator');// 取验证器
    if (validator != '') {
      if (LK.UI.validator[validator](value)) {
        $plugin.removeClass('lichkin-' + plugin + '-invalid');// 验证通过清除样式
      } else {
        $plugin.addClass('lichkin-' + plugin + '-invalid');// 验证未通过增加样式
        return false;// 验证未通过返回失败
      }
    }
    return true;// 验证通过或无验证器返回成功
  },

  /**
   * 验证表单
   */
  validate : function() {
    var $frm = this;// 当前对象为表单对象
    if ($frm[0].tagName != 'FORM') {// 非表单对象不处理
      return;
    }
    var flag = true;// 整体验证状态
    var serializeArray = $frm.serializeArray();// 取所有表单值
    for (var i = 0; i < serializeArray.length; i++) {// 遍历表单值
      if (!$frm.find('[name=' + serializeArray[i].name + ']').parent('.lichkin-plugin')._validate()) {
        flag = false;
      }
    }
    return flag;
  }

});

/**
 * 创建UI控件对象
 */
LK.UI('plugins', 'createUIPlugin', function(opts) {
  // 控件类型
  var plugin = opts.plugin;
  // 创建控件对象的参数
  var options = opts.options;

  // 设置id
  var id = (options.id == '') ? randomInRange(10000, 99999) : options.id;

  // 创建UI控件对象
  var $plugin = $('<div id="' + id + '" data-id="' + plugin + '_' + id + '" class="lichkin-plugin lichkin-' + plugin + '" data-plugin-type="' + plugin + '"></div>');

  // 填充对象
  if (options.$appendTo != null) {
    $plugin.appendTo(options.$appendTo);
  }

  // 渲染对象
  if (options.$renderTo != null) {
    options.$renderTo.prop('outerHTML', $plugin.prop('outerHTML'));
  }

  // 缓存参数
  $plugin.data('LKOPTIONS', options);

  // 返回控件对象
  return $plugin;
}, {
  // 控件类型
  plugin : '',
  // 创建控件对象的参数
  options : {
    // 控件ID
    id : '',
    // 控件填充到对象
    $appendTo : null,
    // 控件渲染到对象
    $renderTo : null
  }
});

/**
 * 创建UI控件对象（简写代码，框架内部使用。）
 * @param plugin 控件类型
 * @param optinos 创建控件对象的参数
 * @return 控件对象
 */
LKUI._createUIPlugin = function(plugin, options) {
  return LK.UI.createUIPlugin({
    UI : 'plugins',
    plugin : plugin,
    options : options
  });
};

/**
 * 创建UI控件存值对象
 */
LK.UI('plugins', 'createUIPluginValue', function(options) {
  // 验证器转换
  options.validator = options.validator == null ? 'required' : options.validator;

  // 创建UI控件存值对象
  var $value = $('<input class="lichkin-' + options.plugin + '-value" type="hidden" name="' + options.name + '" data-validator="' + options.validator + '" data-plugin-type="' + options.plugin + '" />').appendTo(options.$plugin);

  return $value;
}, {
  // 控件类型
  plugin : '',
  // 控件对象
  $plugin : null,

  // 表单对象
  name : '',
  // 验证器方法名
  validator : ''
});

/**
 * 创建UI控件存值对象（简写代码，框架内部使用。）
 * @param optinos 原方法支持的参数
 * @param plugin 控件类型
 * @param $plugin 控件对象
 * @return 控件对象
 */
LKUI._createUIPluginValue = function(options, plugin, $plugin) {
  return LK.UI.createUIPluginValue($.extend(true, {}, options, {
    UI : 'plugins',
    plugin : plugin,
    $plugin : $plugin
  }));
};

/**
 * 获取UI控件对象
 */
LK.UI('plugins', 'getUIPlugin', function(options) {
  if (options.id != '') {
    return $('#' + options.id).LKUI();
  }
  if (options.dataId != '') {
    return $('[data-id=' + options.dataId + ']').LKUI();
  }
  if (options.$obj != null) {
    return options.$obj.LKUI();
  }
  return null;
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});

/**
 * 获取UI控件对象（简写代码，框架内部使用。）
 * @param optinos 原方法支持的参数
 * @return 控件对象
 */
LKUI._getUIPlugin = function(options) {
  return LK.UI.getUIPlugin($.extend(true, {}, options, {
    UI : 'plugins'
  }));
};

/**
 * 获取选中项
 */
LK.UI('plugins', 'getSelected', function(options) {
  return LK.UI['_' + options.plugin].getSelected(LKUI._getUIPlugin(options));
}, {
  // 控件类型
  plugin : '',

  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});

/**
 * 获取选中项简写代码，框架内部使用。）
 * @param optinos 原方法支持的参数
 * @param $plugin 控件对象
 * @return 控件对象
 */
LKUI._getSelected = function(options, $plugin) {
  return LK.UI.getSelected($.extend(true, {}, options, {
    UI : 'plugins',
    plugin : $plugin.data('plugin-type'),
    $obj : $plugin
  }));
};

/**
 * 获取选中项
 */
LK.UI('plugins', 'getChecked', function(options) {
  return LK.UI['_' + options.plugin].getChecked(LKUI._getUIPlugin(options), options.statusArr);
}, {
  // 控件类型
  plugin : '',

  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null,

  // 选中状态数组
  statusArr : [
      'checked', 'tristate'
  ]
});

/**
 * 获取选中项简写代码，框架内部使用。）
 * @param optinos 原方法支持的参数
 * @param $plugin 控件对象
 * @return 选中项
 */
LKUI._getChecked = function(options, $plugin) {
  return LK.UI.getChecked($.extend(true, {}, options, {
    UI : 'plugins',
    plugin : $plugin.data('plugin-type'),
    $obj : $plugin
  }));
};

/**
 * 加载数据
 */
LK.UI('plugins', 'load', function(options) {
  var implementor = LK.UI['_' + options.plugin];

  // 数据方式增加行
  if (options.data.length != 0) {
    implementor.addDatas(options.$plugin, options.data);
    return;
  }

  // 请求方式增加行
  if (options.url != '') {
    LK.ajax({
      url : options.url,
      data : options.param,
      success : function(responseDatas) {
        if (responseDatas) {
          responseDatas = options.onBeforeAddDatas(responseDatas, options.url, options.param);
          implementor.addDatas(options.$plugin, responseDatas);
          options.onAfterAddDatas(responseDatas, options.url, options.param);
        }
      },
      error : function() {
        options.onLoadDatasError(arguments, options.url, options.param);
      }
    });
  }
}, {
  // 控件类型
  plugin : '',
  // 控件对象
  $plugin : null,

  // 重新加载的地址
  url : '',
  // 重新加载的参数
  param : {},
  // 重新加载的数据
  data : [],

  // 事件

  /**
   * 加载数据失败
   * @param responseDatas 响应数据
   * @param url 请求地址
   * @param param 请求参数
   * @return 待添加的数据
   */
  onBeforeAddDatas : function(responseDatas, url, param) {
    return responseDatas;
  },
  /**
   * 加载数据失败
   * @param responseDatas 响应数据
   * @param url 请求地址
   * @param param 请求参数
   */
  onAfterAddDatas : function(responseDatas, url, param) {
  },
  /**
   * 加载数据失败
   * @param ajaxErrorArguments AJAX请求失败参数列表
   * @param url 请求地址
   * @param param 请求参数
   */
  onLoadDatasError : function(ajaxErrorArguments, url, param) {
  }
});

/**
 * 加载数据简写代码，框架内部使用。）
 * @param optinos 原方法支持的参数
 * @param plugin 控件类型
 * @return 控件对象
 */
LKUI._load = function(options, plugin, $plugin) {
  LK.UI.load($.extend(true, {}, options, {
    UI : 'plugins',
    plugin : plugin,
    $plugin : $plugin
  }));
};

/**
 * 重新加载数据
 */
LK.UI('plugins', 'reload', function(options) {
  var $plugin = options.$plugin;

  var pluginOptions = $plugin.options;
  if (options.url != '') {
    pluginOptions.url = options.url;
  }

  pluginOptions.param = options.param;

  pluginOptions.data = [];
  if (options.data.length != 0) {
    pluginOptions.data = options.data;
  }

  var $container = LK.UI['_' + options.plugin].getDataContainer($plugin);
  $container.children().remove();
  LKUI._load(pluginOptions, options.plugin, $plugin);
}, {
  // 控件类型
  plugin : '',
  // 控件对象
  $plugin : null,

  // @see load
  url : '',
  param : {},
  data : []
});

/**
 * 重新加载数据简写代码，框架内部使用。）
 * @param optinos 原方法支持的参数
 * @param $plugin 控件对象
 * @return 控件对象
 */
LKUI._reload = function(options, $plugin) {
  return LK.UI.reload($.extend(true, {}, options, {
    UI : 'plugins',
    plugin : $plugin.data('plugin-type'),
    $plugin : $plugin
  }));
};

// 验证器集合
LK.UI.validator = {

  /**
   * 必填项验证
   */
  required : function(value) {
    if (value == '') {
      return false;
    }
    return true;
  }

};
