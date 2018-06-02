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
 * 控件核心实现（框架内部使用）
 */
LK.UI._core = {
  /** 缓存的对象 */
  cached : {},

  /**
   * 缓存对象
   * @param plugin 控件类型
   * @param $plugin 控件对象
   * @param options 创建对象时的参数
   * @param options[id] 控件ID
   * @return 缓存后的对象
   */
  cache : function(plugin, $plugin, options) {
    if (typeof this.cached[plugin] == 'undefined') {
      this.cached[plugin] = {};
    }
    this.cached[plugin][options.id] = $plugin;
    this.cached[plugin][options.id].options = options;
    return $plugin;
  },

  /**
   * 获取缓存对象
   * @param id 控件ID
   */
  getCached : function(id) {
    var $plugin = $('#' + id);
    return this.cached[$plugin.data('plugin')][id];
  },

  /**
   * 获取所有缓存的控件
   * @param plugin 控件类型
   */
  getAllCached : function(plugin) {
    return this.cached[plugin];
  },

  /**
   * 调用所有缓存的控件
   * @param plugin 控件类型
   * @param func 调用的方法。参数1：具体控件对象；参数2:所有控件对象。
   */
  callEachCached : function(plugin, func) {
    for ( var key in this.cached[plugin]) {
      func(this.cached[plugin][key], this.cached[plugin]);
    }
  },

  /**
   * 清除缓存对象
   * @param plugin 控件类型
   * @param id 控件ID
   */
  removeCached : function(plugin, id) {
    var $plugin = this.cached[plugin][id];
    delete this.cached[plugin][id];
    $plugin.remove();
  }
};

/**
 * 获取UI控件对象
 */
LK.UI('plugins', 'getUIPlugin', function(options) {
  if (options.id != '') {
    return LK.UI._core.getCached(options.id);
  }
  if (options.dataId != '') {
    return LK.UI._core.getCached($('[data-id=' + options.dataId + ']').attr('id'));
  }
  if (options.$obj != null) {
    return LK.UI._core.getCached(options.$obj.attr('id'));
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
