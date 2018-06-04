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
   * 初始化控件
   * @param plugin 控件类型
   * @param options 创建控件时的参数
   */
  LKUIinit : function(plugin, options) {
    var that = this;
    that.data('LKUI', plugin);
    that.data('LKOPTIONS', options);
    return that;
  },

  /**
   * 使用LKUI实现全控件管理
   * @param funcName 控件具体方法名
   * @param options 控件具体方法需要的参数。部分方法可扩展实现代码简写方式。
   */
  LKUI : function(funcName, options) {
    var that = this;

    // 首先验证是否为LKUI控件
    var plugin = that.data('LKUI');
    var lkOptions = that.data('LKOPTIONS');
    if (typeof plugin == 'undefined' || typeof lkOptions == 'undefined') {
      throw 'this is not a LK plugin.';
    }

    // 没有传入参数，视为获取控件对象。
    if (typeof funcName == 'undefined') {
      that.options = lkOptions;
      return that;
    }

    // 验证参数是否正确
    if (!isString(funcName)) {
      throw 'illegal arguments';
    }

    switch (funcName) {
      case 'change':
        if (plugin == 'icon') {
          return that.LKUIicon(funcName, options);
        }
      case 'clear':
        if (plugin == 'icon') {
          return that.LKUIicon(funcName, options);
        }
      case 'has':
        if (plugin == 'icon') {
          return that.LKUIicon(funcName, options);
        }
    }

    // 未实现
    throw 'not implemented at all.';
  }

});

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
