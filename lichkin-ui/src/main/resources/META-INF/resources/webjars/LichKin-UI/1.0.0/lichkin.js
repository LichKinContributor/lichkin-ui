;
/**
 * 原生JavaScript代码实现，或使用JQuery的代码实现。
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

/**
 * 判断是否为JSON对象
 * @param json JSON对象
 */
let isJSON = function(json) {
  return (typeof json == 'object') && Object.prototype.toString.call(json).toLowerCase() == "[object object]" && !json.length;
};

/**
 * 是否为空JSON
 * @param json JSON对象
 */
let isEmptyJSON = function(json) {
  for ( var name in json) {
    return false;
  }
  return true;
};

/**
 * 判断是否为字符串
 * @param str 字符串
 */
let isString = function(str) {
  return typeof str == 'string';
};

/**
 * 判断是否为数字
 * @param number 数字
 */
let isNumber = function(number) {
  return typeof number == 'number';
};

/**
 * 生成随机值
 * @param min 最小值
 * @param max 最大值
 * @return 随机值
 */
let randomInRange = function(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

/** 全局定义顶层对象 */
let LK = {

  /**
   * 输出日志
   * @param options [string|number|JSON] 自定义的参数
   * @param options.type [string] 日志类型。debug;info;warn;error.
   * @param options.msg [string|number|JSON] 日志内容。
   * @param options.jsonMsg [boolean] 参数msg为JSON格式时true，否则false。（框架内部设置，无需传入）
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
    } else if (isNumber(options)) {
      // 传入的是数字，则转换为标准格式。
      options = {
        type : 'debug',
        msg : String(options),
        jsonMsg : false
      };
    } else if (isString(options)) {
      // 传入的是字符串，则转换为标准格式。
      options = {
        type : 'debug',
        msg : options,
        jsonMsg : false
      };
    } else if (isJSON(options)) {
      // 传入的是JOSN数据格式
      // 处理type参数
      if (typeof options.type == 'undefined') {
        // 处理msg参数
        if (typeof options.msg == 'undefined') {
          // 没有传入msg参数
          options.type = 'debug';
          options.msg = 'undefined';
          options.jsonMsg = false;
        } else if (isNumber(options.msg)) {
          // 传入的msg是数字类型，则将数字转为字符串。
          options.type = 'debug';
          options.msg = String(options.msg);
          options.jsonMsg = false;
        } else if (isString(options.msg)) {
          // 传入的msg是字符串类型，不做处理。
          options.type = 'debug';
          options.jsonMsg = false;
        } else if (isJSON(options.msg)) {
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
        } else if (isNumber(options.msg)) {
          // 传入的msg是数字类型，则将数字转为字符串。
          options.msg = String(options.msg);
          options.jsonMsg = false;
        } else if (isString(options.msg)) {
          // 传入的msg是字符串类型，不做处理。
          options.jsonMsg = false;
        } else if (isJSON(options.msg)) {
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
   * 显示提示窗
   * @param options [string|number|JSON] 自定义的参数
   * @param options.timeout [number] 弹出时长，单位：毫秒。
   * @param options.msg [string|number|JSON] 提示内容。
   * @param options.jsonMsg [boolean] 参数msg为JSON格式时true，否则false。（框架内部设置，无需传入）
   */
  toast : function(options) {
    // 根据各种支持的类型将options转换为标准JSON格式
    if (typeof options == 'undefined') {
      // 没有传入参数，则全部设置成默认值。
      options = {
        timeout : 1000,
        msg : 'undefined',
        jsonMsg : false
      };
    } else if (isNumber(options)) {
      // 传入的是数字，则转换为标准格式。
      options = {
        timeout : 1000,
        msg : String(options),
        jsonMsg : false
      };
    } else if (isString(options)) {
      // 传入的是字符串，则转换为标准格式。
      options = {
        timeout : 1000,
        msg : options,
        jsonMsg : false
      };
    } else if (isJSON(options)) {
      // 传入的是JOSN数据格式
      // 处理msg参数
      if (typeof options.msg == 'undefined') {
        // 没有传入msg参数
        options.msg = JSON.stringify(options);
        options.jsonMsg = true;
        for ( var key in options) {
          if (key != 'msg' && key != 'jsonMsg' && key != 'timeout') {
            delete options[key];
          }
        }
      } else if (isNumber(options.msg)) {
        // 传入的msg是数字类型，则将数字转为字符串。
        options.msg = String(options.msg);
        options.jsonMsg = false;
      } else if (isString(options.msg)) {
        // 传入的msg是字符串类型，不做处理。
        options.jsonMsg = false;
      } else if (isJSON(options.msg)) {
        // 传入的msg是JSON类型，则将msg转为JSON对应的字符串。
        options.msg = JSON.stringify(options.msg);
        options.jsonMsg = true;
      } else {
        // 传入的参数不支持，报错！
        this.log({
          type : 'assert',
          msg : 'Invalid format for param options.msg when invoke LK.toast'
        });
        return;
      }
      // 处理timeout参数
      if (typeof options.timeout == 'undefined') {
        options.timeout = 1000;
      } else if (isNumber(options.timeout)) {
      } else if (isString(options.timeout)) {
        options.timeout = parseInt(options.timeout);
        if (options.timeout == 'NaN') {
          // 传入的参数不支持，报错！
          this.log({
            type : 'assert',
            msg : 'Invalid format for param options.timeout when invoke LK.toast'
          });
          return;
        }
      } else {
        // 传入的参数不支持，报错！
        this.log({
          type : 'assert',
          msg : 'Invalid format for param options.timeout when invoke LK.toast'
        });
        return;
      }
    } else {
      // 传入的参数不支持，报错！
      this.log({
        type : 'assert',
        msg : 'Invalid format for param options when invoke LK.toast'
      });
      return;
    }

    // 调用具体实现方法
    LK[this.type].toast(options);
  },

  /**
   * 显示警示窗
   * @param options [string|number|JSON] 自定义的参数
   * @param options.msg [string|number|JSON] 提示内容。
   * @param options.jsonMsg [boolean] 参数msg为JSON格式时true，否则false。（框架内部设置，无需传入）
   * 
   * @param callback 按钮点击后回调方法
   */
  alert : function(options, callback) {
    // 根据各种支持的类型将options转换为标准JSON格式
    if (typeof options == 'undefined') {
      // 没有传入参数，则全部设置成默认值。
      options = {
        msg : 'undefined',
        jsonMsg : false
      };
    } else if (isNumber(options)) {
      // 传入的是数字，则转换为标准格式。
      options = {
        msg : String(options),
        jsonMsg : false
      };
    } else if (isString(options)) {
      // 传入的是字符串，则转换为标准格式。
      options = {
        msg : options,
        jsonMsg : false
      };
    } else if (isJSON(options)) {
      // 传入的是JOSN数据格式
      // 处理msg参数
      if (typeof options.msg == 'undefined') {
        // 没有传入msg参数
        options.msg = JSON.stringify(options);
        options.jsonMsg = true;
        for ( var key in options) {
          if (key != 'msg' && key != 'jsonMsg') {
            delete options[key];
          }
        }
      } else if (isNumber(options.msg)) {
        // 传入的msg是数字类型，则将数字转为字符串。
        options.msg = String(options.msg);
        options.jsonMsg = false;
      } else if (isString(options.msg)) {
        // 传入的msg是字符串类型，不做处理。
        options.jsonMsg = false;
      } else if (isJSON(options.msg)) {
        // 传入的msg是JSON类型，则将msg转为JSON对应的字符串。
        options.msg = JSON.stringify(options.msg);
        options.jsonMsg = true;
      } else {
        // 传入的参数不支持，报错！
        this.log({
          type : 'assert',
          msg : 'Invalid format for param options.msg when invoke LK.alert'
        });
        return;
      }
    } else {
      // 传入的参数不支持，报错！
      this.log({
        type : 'assert',
        msg : 'Invalid format for param options when invoke LK.alert'
      });
      return;
    }

    if (typeof callback == 'undefined') {
    } else if (isString(callback)) {
      callback = window[callback];
      if (typeof callback != 'function') {
        // 传入的参数不支持，报错！
        this.log({
          type : 'assert',
          msg : 'Invalid format for param options.callback when invoke LK.alert'
        });
        return;
      }
    } else if (typeof callback != 'function') {
      // 传入的参数不支持，报错！
      this.log({
        type : 'assert',
        msg : 'Invalid format for param options.callback when invoke LK.alert'
      });
      return;
    }

    // 调用具体实现方法
    LK[this.type].alert(options, callback);
  },

  /**
   * 显示加载效果
   * @return loadingId 加载对话框ID
   */
  showLoading : function() {
    // 调用具体实现方法
    return LK[this.type].showLoading();
  },

  /**
   * 关闭加载效果
   * @param loadingId 加载对话框ID
   */
  closeLoading : function(loadingId) {
    // 调用具体实现方法
    LK[this.type].closeLoading(loadingId);
  },

  /**
   * 将参数转为URL地址
   * @param param [JSON] 参数
   */
  paramUrl : function(param) {
    var url = '?_$=' + new Date().getTime();
    if (typeof param != 'undefined') {
      for ( var key in param) {
        var value = param[key];
        if (isString(value) || isNumber(value)) {
          url += '&' + key + '=' + value;
        }
      }
    }
    return url;
  },

  /**
   * 基于JQuery.ajax实现动态加载内嵌式页面
   * @param options 自定义的参数
   * @param options[$obj] [$Object] 页面内容要写入的DOM元素对应的JQuery对象
   * @param options[url] [string] 自动拼接前缀与后缀
   * @param options[param] [JSON] 参数将转为URL地址。
   * @param options[data] [JSON] 自动转换为RequestBody内容。
   * @param options[showLoading] [boolean] 是否显示加载效果
   * @param options[timeout] [function|string] 超时回调时，方法或方法名。
   */
  loadPage : function(options) {
    var loadingId = '';
    var loadingTimeout = true;
    options = $.extend({
      showLoading : true
    }, options, {
      method : 'POST',
      dataType : 'text',
      contentType : 'text/html;charset=UTF-8',
      headers : {
        'Accept-Language' : _LANG
      },
      url : _CTX + options.url + _MAPPING_PAGES + this.paramUrl(options.param),
      data : JSON.stringify($.extend({}, options.data)),
      success : function(text) {
        loadingTimeout = false;
        setTimeout(function() {
          if (options.showLoading) {
            LK.closeLoading(loadingId);
          }
        }, 333);
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
      },
      error : function() {
        loadingTimeout = false;
        setTimeout(function() {
          if (options.showLoading) {
            LK.closeLoading(loadingId);
          }
        }, 333);
      }
    });

    var timeout = options.timeout;
    if (typeof timeout == 'number') {
      timeout = 'LK_loadPage_timeout';
    }
    if (isString(timeout)) {
      timeout = window[timeout];
    }
    delete options.timeout;

    if (options.showLoading) {
      loadingId = LK.showLoading();
    }

    $.ajax(options);

    setTimeout(function() {
      if (loadingTimeout) {
        if (options.showLoading) {
          LK.closeLoading(loadingId);
        }
        timeout(options);
      }
    }, LK.ajax.timeoutValue);
  },

  /**
   * AJAX请求
   * @param options 自定义的参数
   * @param options[url] [string] 自动拼接前缀与后缀
   * @param options[data] [JSON] 转换为RequestBody内容
   * @param options[showLoading] [boolean] 是否显示加载效果
   * @param options[showSuccess] [boolean] 调用默认业务成功回调方法时是否显示提示信息
   * @param options[showError] [boolean] 调用默认业务失败回调方法时是否显示提示信息
   * @param options[timeout] [function|string] 超时回调时，方法或方法名。
   * @param options[success] [function|string] 业务成功时，回调方法或方法名。
   * @param options[error] [function|string] 请求错误或业务失败时，回调方法或方法名。
   */
  ajax : function(options) {
    var loadingId = '';
    var loadingTimeout = true;
    options = $.extend({
      showLoading : true,
      showSuccess : false,
      showError : true,
      timeout : 'LK_ajax_timeout',
      success : 'LK_ajax_success',
      error : 'LK_ajax_error'
    }, options, {
      url : _CTX + options.url + _MAPPING_DATAS,
      data : JSON.stringify($.extend({}, options.data)),
      method : 'POST',
      dataType : 'json',
      contentType : 'application/json;charset=UTF-8',
      headers : {
        'Accept-Language' : _LANG
      }
    });

    var timeout = options.timeout;
    if (isNumber(timeout)) {
      timeout = 'LK_ajax_timeout';
    }
    if (isString(timeout)) {
      timeout = window[timeout];
    }
    delete options.timeout;

    var success = options.success;
    if (isString(success)) {
      success = window[success];
    }

    var error = options.error;
    if (isString(error)) {
      error = window[error];
    }

    options.success = function(responseDatas) {
      loadingTimeout = false;
      setTimeout(function() {
        if (options.showLoading) {
          LK.closeLoading(loadingId);
        }
      }, 333);
      if (responseDatas.errorCode == 0) {
        success(responseDatas.datas, options);
      } else {
        error(responseDatas.errorCode, responseDatas.errorMessage, options);
      }
    };

    options.error = function() {
      loadingTimeout = false;
      setTimeout(function() {
        if (options.showLoading) {
          LK.closeLoading(loadingId);
        }
      }, 333);
      error(-999, LK.i18n.ajaxError, options);
    };

    if (options.showLoading) {
      loadingId = LK.showLoading();
    }

    $.ajax(options);

    setTimeout(function() {
      if (loadingTimeout) {
        if (options.showLoading) {
          LK.closeLoading(loadingId);
        }
        timeout(options);
      }
    }, LK.ajax.timeoutValue);
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

// loadPage请求超时时长
LK.loadPage.timeoutValue = 30000;

/**
 * loadPage超时默认回调方法。
 * @param options 调用loadPage方法时传入的参数
 */
var LK_loadPage_timeout = function(options) {
  LK.loadPage(options);
};

// ajax请求超时跳转页面
LK.ajax.timeoutPageUrl = _CTX + '/index.html';
// ajax请求超时时长
LK.ajax.timeoutValue = 30000;

/**
 * AJAX请求超时默认回调方法。
 * @param options 调用ajax方法时传入的参数
 */
var LK_ajax_timeout = function(options) {
  LK.toast(LK.i18n.timeout);
  setTimeout(function() {
    window.location.href = LK.ajax.timeoutPageUrl;
  }, 2000);
};

/**
 * AJAX请求业务成功默认回调方法。
 * @param datas 响应数据
 * @param options 调用ajax方法时传入的参数
 */
var LK_ajax_success = function(datas, options) {
  if (options.showSuccess) {
    LK.toast(datas);
  }
};

/**
 * AJAX请求业务失败默认回调方法。
 * @param errorCode 错误编码
 * @param errorMessage 错误信息
 * @param options 调用ajax方法时传入的参数
 */
var LK_ajax_error = function(errorCode, errorMessage, options) {
  if (options.showError) {
    LK.toast(errorMessage);
  }
};