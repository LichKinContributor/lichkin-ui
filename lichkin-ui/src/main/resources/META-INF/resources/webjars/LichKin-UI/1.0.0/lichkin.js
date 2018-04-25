;
/**
 * 原生JavaScript代码实现，或使用JQuery的代码实现。
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

/** 全局定义顶层对象 */
let LK = {

  /**
   * 基于JQuery.ajax实现动态加载内嵌式页面
   * @param options 自定义的参数
   * @param options[$obj] 页面内容要写入的DOM元素对应的JQuery对象
   * @param options[method] GET/POST
   * @param options[url] 拼接前缀与后缀
   * @param options[data] 当method='POST'时，自动转换为RequestBody内容。
   */
  loadPage : function(options) {
    options = $.extend({
      method : 'POST',
      dataType : 'text',
      contentType : 'text/html;charset=UTF-8',
      headers : {
        'Accept-Language' : _LANG
      }
    }, options, {
      data : $.extend({}, options.data)
    }, {
      url : _CTX + options.url + _MAPPING_PAGES,
      data : (options.method == 'GET') ? options.data : JSON.stringify(options.data),
      success : function(text) {
        var $obj = options.$obj;
        $obj[0].innerHTML = text;
        var head = document.getElementsByTagName("head")[0];
        $obj.find('script').each(function() {
          var that = $(this).remove()[0];
          var src = that.src;
          var script = document.createElement("script");
          script.type = "text/javascript";
          if (src) {
            script.src = src;
          } else {
            script.innerHTML = that.innerHTML;
          }
          head.appendChild(script);
        });
      }
    });

    $.ajax(options);
  },

  /**
   * AJAX请求
   * @param options 自定义的参数
   * @param options[url] 拼接前缀与后缀
   * @param options[data] 转换为RequestBody内容
   * @param $options JQuery定义的参数
   */
  ajax : function(options, $options) {
    options = $.extend({
      method : 'POST',
      dataType : 'json',
      contentType : 'application/json;charset=UTF-8',
      headers : {
        'Accept-Language' : _LANG
      }
    }, options, {
      url : _CTX + options.url + _MAPPING_DATAS,
      data : JSON.stringify($.extend({}, options.data))
    }, $options);

    $.ajax(options);
  }

};

/**
 * 添加控件实现代码
 * @param provider 控件提供者
 * @param plugin 控件类型
 * @param func 具体实现方法
 */
LK.UI = function(provider, plugin, func) {
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
};

/**
 * 处理UI实现方法（框架内部调用）
 * @param plugin 控件类型
 * @param options 自定义的参数
 * @param uiOptions 三方库定义的参数
 */
LK.UI._ = function(plugin, options, uiOptions) {
  // 非空验证
  if (typeof options == 'undefined') {
    options = {};
  }

  // 调用时显式指定了UI类型，则调用该UI方法。
  var provider = options.UI;
  if (typeof provider != 'undefined') {
    return LK.UI[provider][plugin](options, uiOptions);
  }

  // 使用该控件类型指定的UI实现。
  return LK.UI[LK.UI['__'][plugin]][plugin](options, uiOptions);
};
