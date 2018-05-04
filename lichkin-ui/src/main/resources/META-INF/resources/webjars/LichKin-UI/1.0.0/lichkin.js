;
/**
 * 原生JavaScript代码实现，或使用JQuery的代码实现。
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

/** 全局定义顶层对象 */
let LK = {

  /**
   * 判断是否为JSON对象
   * @param json JSON对象
   */
  isJSON : function(json) {
    return (typeof json == 'object') && Object.prototype.toString.call(json).toLowerCase() == "[object object]" && !json.length;
  },

  /**
   * 判断是否为字符串
   * @param str 字符串
   */
  isString : function(str) {
    return typeof str == 'string';
  },

  /**
   * 判断是否为数字
   * @param number 数字
   */
  isNumber : function(number) {
    return typeof number == 'number';
  },

  /**
   * 输出日志
   * @param options [string|number|JSON] 自定义的参数
   * @param options.type [string] 日志类型。debug;info;warn;error.
   * @param options.msg [string|number|JSON] 日志内容。字符串类型或JSON字符串。
   * @param options.jsonMsg [boolean] 参数msg为JSON格式时true，参数msg为字符串时false。
   */
  log : function(options) {
    // 根据各种支持的类型将options转换为标准JSON格式
    if (typeof options == 'undefined') {
      // 没有传入参数，则全部设置成默认值。
      options = {
        type : 'debug',
        msg : 'undefined',
        jsonMsg : false
      };
    } else if (this.isNumber(options)) {
      // 传入的是数字，则转换为标准格式。
      options = {
        type : 'debug',
        msg : String(options),
        jsonMsg : false
      };
    } else if (this.isString(options)) {
      // 传入的是字符串，则转换为标准格式。
      options = {
        type : 'debug',
        msg : options,
        jsonMsg : false
      };
    } else if (this.isJSON(options)) {
      // 传入的是JOSN数据格式
      // 处理type参数
      if (typeof options.type == 'undefined') {
        // 处理msg参数
        if (typeof options.msg == 'undefined') {
          // 没有传入msg参数
          options.type = 'debug';
          options.msg = 'undefined';
          options.jsonMsg = false;
        } else if (this.isNumber(options.msg)) {
          // 传入的msg是数字类型，则将数字转为字符串。
          options.type = 'debug';
          options.msg = String(options.msg);
          options.jsonMsg = false;
        } else if (this.isString(options.msg)) {
          // 传入的msg是字符串类型，不做处理。
          options.type = 'debug';
          options.jsonMsg = false;
        } else if (this.isJSON(options.msg)) {
          // 传入的msg是JSON类型，则将msg转为JSON对应的字符串。
          options.type = 'debug';
          options.msg = JSON.stringify(options.msg);
          options.jsonMsg = true;
        } else {
          // 传入的msg参数不支持。
          options = {
            type : 'assert',
            msg : 'Invalid format for param options.msg when invoke LK.log',
            jsonMsg : false
          };
        }
      } else {
        // 有type类型，则判断type类型是否在显示范围内。
        if (options.type != 'verbose' && options.type != 'debug' && options.type != 'info' && options.type != 'warn' && options.type != 'error' && options.type != 'assert') {
          // 不在实现范围内，则将type参数设置成默认值。
          options.type = 'debug';
        }
        // 处理msg参数
        if (typeof options.msg == 'undefined') {
          // 没有传入msg参数
          options.msg = 'undefined';
          options.jsonMsg = false;
        } else if (this.isNumber(options.msg)) {
          // 传入的msg是数字类型，则将数字转为字符串。
          options.msg = String(options.msg);
          options.jsonMsg = false;
        } else if (this.isString(options.msg)) {
          // 传入的msg是字符串类型，不做处理。
          options.jsonMsg = false;
        } else if (this.isJSON(options.msg)) {
          // 传入的msg是JSON类型，则将msg转为JSON对应的字符串。
          options.msg = JSON.stringify(options.msg);
          options.jsonMsg = true;
        } else {
          // 传入的msg参数不支持。
          options.type = 'assert';
          options.msg = 'Invalid format for param options.msg when invoke LK.log';
          options.jsonMsg = false;
        }
      }
    } else {
      // 传入的参数不支持，转换成标准格式。
      options = {
        type : 'assert',
        msg : 'Invalid format for param options when invoke LK.log',
        jsonMsg : false
      };
    }

    // 调用具体实现方法
    LK[this.type].log(options);
  },

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
  },

  /**
   * 识别身份证（汉王云）
   * @param options 自定义的参数
   * @param options[uid] 服务器IP地址
   * @param options[key] 汉王云Key
   * @param options[$image] 读取图片的input
   * @param options[callback] 回调方法
   */
  readIDCard : function(options) {
    var reader = new FileReader();
    reader.readAsDataURL(options.$image[0].files[0]);
    reader.onload = function(e) {
      var str = reader.result;
      str = str.substring(str.indexOf(',') + 1);
      data = {
        uid : options.uid,
        image : str
      };
      $.ajax({
        type : "POST",
        contentType : "application/octet-stream",
        datatype : "json",
        crossDomain : false,
        jsonp : 'callback',
        url : "http://api.hanvon.com/rt/ws/v1/ocr/idcard/recg?key=" + options.key + "&code=8d497db3-7341-4f1f-875a-2f5444884515",
        data : JSON.stringify(data),
        async : true,
        success : function(data) {
          options.callback(data);
        }
      });
    }
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
