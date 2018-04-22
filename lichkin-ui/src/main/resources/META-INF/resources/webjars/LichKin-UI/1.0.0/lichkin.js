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
   * @param options[url] 页面地址
   */
  loadPage : function(options) {
    // JQuery提供的load、html等方法读取内容后会使用同步方式加载脚本文件，已经明确给出了不建议使用，也许未来就不给用了。
    // 这样做的主要原因是，因为毕竟动态加载的过程不是主页面的加载进行。
    // 那么前置脚本如果没有加载完成，后续的所有操作都可能会产生问题。
    // 样式文件虽然加载不会引起同步问题的产生，但是也同样存在该问题。
    // 规避该问题可以使用约定的方式避免。
    // 1、内嵌页面需要的样式都在页面顶端使用style定义。
    // 2、内嵌页面需要的脚本都写在单独的脚本文件中。
    // 3、内嵌页面中不允许直接书写脚本代码。
    $.ajax({
      method : 'GET',// 内嵌页面必须是GET请求内容
      url : options.url,
      dataType : 'text',// 内嵌页面必须的不能包含脚本文件，因而其本质就是个文本内容。
      success : function(text) {
        var $obj = options.$obj;
        // 请求成功后将文本内容加入到DOM元素上
        $obj[0].innerHTML = text;
        // 动态加载脚本文件
        var head = document.getElementsByTagName("head")[0];
        $obj.find('script').each(function() {
          var $this = $(this).remove()[0];
          var src = $this.src;
          var script = document.createElement("script");
          script.type = "text/javascript";
          if (src) {
            script.src = src;
          } else {
            script.innerHTML = $this.innerHTML;
          }
          head.appendChild(script);
        });
      }
    });
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
