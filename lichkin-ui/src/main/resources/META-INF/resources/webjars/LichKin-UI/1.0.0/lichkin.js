;
/**
 * 原生JavaScript代码实现，或使用JQuery的代码实现。
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

/**
 * 判断是否为JSON对象
 * @param json JSON对象
 */
var isJSON = function(json) {
  return (typeof json == 'object') && Object.prototype.toString.call(json).toLowerCase() == "[object object]" && !json.length;
};

/**
 * 判断是否为空JSON
 * @param json JSON对象
 */
var isEmptyJSON = function(json) {
  if (isJSON(json)) {
    for ( var name in json) {
      return false;
    }
    return true;
  }
  return false;
};

/**
 * 判断是否为字符串
 * @param str 字符串
 */
var isString = function(str) {
  return typeof str == 'string';
};

/**
 * 判断是否为数字
 * @param number 数字
 */
var isNumber = function(number) {
  return typeof number == 'number';
};

/**
 * 生成随机值
 * @param min 最小值
 * @param max 最大值
 * @return 随机值
 */
var randomInRange = function(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

/**
 * 日期格式化
 * @param time 日期
 * @return 标准日期格式（yyyy-MM-dd HH:mm:ss）
 */
var formatterTime = function(time) {
  return time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2) + ' ' + time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2);
};

/**
 * 判断字符串开头
 */
String.prototype.startsWith = function(str) {
  return new RegExp("^" + str).test(this);
};

/**
 * 判断字符串结尾
 */
String.prototype.endsWith = function(str) {
  return new RegExp(str + "$").test(this);
};

/**
 * 提取整数
 */
String.prototype.extarctInteger = function() {
  var arr = this.match(/[\-0-9]/g);
  if (Array.isArray(arr)) {
    if (arr[0] == '0') {
      return '0';
    } else if (arr[0] == '-') {
      if (arr[1] && arr[1] == '0') {
        return '-';
      } else {
        arr[0] = '';
        return '-' + arr.join('').replace(/\-/g, '');
      }
    } else {
      return arr.join('').replace(/\-/g, '');
    }
  }
  return '';
};

/**
 * 扩展JQuery功能
 */
$.fn.extend({

  /**
   * 获取对象的class属性并转换为数组形式返回
   */
  getClassArr : function() {
    var cls = this.attr("class");
    if (cls) {
      return cls.match(/[^\x20\t\r\n\f]+/g) || [];
    }
    return [];
  }

});

/** 全局定义顶层对象 */
var LK = {

  // 控件文字大小
  pluginFontSize : 12,
  // 控件文字颜色
  pluginFontColor : '#2e6da4',
  // 控件文字颜色
  pluginInvalidFontColor : '#d43f3a',
  // 表单内控件距离顶部间距
  topGap : 10,
  // 表单内控件距离左部间距
  leftGap : 10,
  // 表单内控件键宽
  fieldKeyWidth : 200,// 七个汉字
  // 列宽
  colWidth : 200,// UEditor最小宽度为695
  // 行高
  rowHeight : 30,
  // 文本上下内边距
  textPaddingTB : 3,
  // 文本左右内边距
  textPaddingLR : 6,

  // 标准分隔符
  SPLITOR : '#@#',

  // 版本号
  VERSION : {
    versionX : 1,
    versionY : 0,
    versionZ : 0
  },

  // 请求子路径
  SUB_URL : '/Admin',

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
      callback = function() {
      };
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
   * @param startFromQuestion 是否从问号开始
   * @param param [JSON] 参数
   */
  paramUrl : function(startFromQuestion, param) {
    var url = (startFromQuestion ? '?' : '&') + '_$=' + new Date().getTime();
    if (isJSON(param)) {
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
   * 转换为标准路径，即使用/作为分隔符，并以/开头，不以/结尾。
   * @param path 路径
   * @return 标准路径
   */
  toStandardPath : function(path) {
    if (typeof path == 'undefined' || '' == path || '/' == path) {
      return '';
    }
    path = path.replace(new RegExp("\\\\"), '/');
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    if (path.endsWith('/')) {
      path = path.substring(0, path.lastIndexOf('/'));
    }
    return path;
  },

  /**
   * 解析URL
   * @param url 地址
   * @param isPageUrl 是否为页面地址
   * @param param [JSON] 参数
   */
  resolveUrl : function(url, isPageUrl, param) {
    if (!isString(url)) {
      return null;
    }

    if (!url.startsWith('http')) {
      url = LK.toStandardPath(url);
      if (isPageUrl) {
        if (!url.startsWith(_CTX)) {
          url = _CTX + url;
        }
        if (!url.endsWith(_MAPPING_PAGES)) {
          if (url.indexOf('?') > 0) {
            url = url.replace('?', _MAPPING_PAGES + '?');
          } else {
            url += _MAPPING_PAGES;
          }
        }
      } else {
        if (url.startsWith(_MAPPING_API)) {
          url = url.substring(_MAPPING_API.length);
        }

        if (url.startsWith('/Web')) {
          url = url.substring('/Web'.length);
        }

        if (url.startsWith(LK.SUB_URL)) {
          url = url.substring(LK.SUB_URL.length);
        }

        url = _CTX + _MAPPING_API + '/Web' + LK.SUB_URL + url;
      }
    }

    return url + LK.paramUrl((url.indexOf('?') < 0), param);
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
   * @param options[onAfterLoading] [function] 页面加载后事件
   * @param options[onAfterRender] [function] 页面渲染后事件
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
      url : LK.resolveUrl(options.url, true, options.param),
      data : JSON.stringify($.extend({}, options.data)),
      success : function(text) {
        setTimeout(function() {
          options.onAfterLoading(options);
        }, 333);
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
        setTimeout(function() {
          options.onAfterRender(options);
        }, 333);
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
      url : LK.resolveUrl(options.url, false),
      data : JSON.stringify($.extend({}, options.data, {
        clientType : 'JAVASCRIPT'
      }, LK.VERSION)),
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
  },

  /**
   * 切换全屏显示状态
   */
  toggleFullScreen : function() {
    var isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    if (!isFullscreen) {
      var el = document.documentElement;
      (el.requestFullscreen && el.requestFullscreen()) || (el.mozRequestFullScreen && el.mozRequestFullScreen()) || (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen());
    } else {
      document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
    }
  }

};

// 转为标准路径
_CTX = LK.toStandardPath(_CTX);

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
LK.ajax.timeoutPageUrl = _CTX + '/index' + _MAPPING_PAGES;
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
