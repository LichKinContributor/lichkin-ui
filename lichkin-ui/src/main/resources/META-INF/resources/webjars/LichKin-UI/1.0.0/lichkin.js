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
 * 显示标准时间格式
 * @param time 日期（yyyyMMddHHmmss或yyyyMMddHHmmssSSS）
 * @return 标准日期格式（yyyy-MM-dd HH:mm:ss）
 */
var showStandardTime = function(time) {
  if (time && (time.length == 14 || time.length == 17)) {
    return time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2) + ' ' + time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2);
  }
  return '';
};

/**
 * 时间格式化
 * @param fmt 格式化
 * @return 格式化后的时间
 */
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth() + 1,
    "d+" : this.getDate(),
    "h+" : this.getHours(),
    "m+" : this.getMinutes(),
    "s+" : this.getSeconds(),
    "q+" : Math.floor((this.getMonth() + 3) / 3),
    "S" : this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for ( var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

/**
 * 重新设置时间
 * @param type [string] 格式化单key
 * @param cnt [int] 数量
 * @return 时间
 */
Date.prototype.reset = function(type, cnt) {
  switch (type) {
    case 'y':
      this.setFullYear(this.getFullYear() + cnt);
      break;
    case 'M':
      this.setMonth(this.getMonth() + cnt);
      break;
    case 'd':
      this.setDate(this.getDate() + cnt);
      break;
    case 'H':
      this.setHours(this.getHours() + cnt);
      break;
    case 'm':
      this.setMinutes(this.getMinutes() + cnt);
      break;
    case 's':
      this.setSeconds(this.getSeconds() + cnt);
      break;
    case 'S':
      this.setMilliseconds(this.getMilliseconds() + cnt);
      break;
    default:
      break;
  }
  return this;
};

/**
 * 当前日期
 * @return yyyy-MM-dd
 */
var today = function() {
  return new Date().format('yyyy-MM-dd');
};

/**
 * 当前日期的上个月日期
 * @return yyyy-MM-dd
 */
var lastMonthDay = function() {
  return new Date().reset('M', -1).format('yyyy-MM-dd');
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
 * JQuery扩展
 */
$.extend($, {

  /**
   * 获取i18n内容
   * @param ... 多层键（或用.分割）
   * @return i18n内容
   */
  LKGetI18N : function() {
    var key;
    var keys = arguments;
    var value;

    if (keys.length == 1) {
      key = keys[0];
      if (key == null) {
        return '';
      }
      keys = key.split('.');
    }

    if (keys.length == 1) {
      key = keys[0];
      keys = key.split('.');
      value = LKI18N[keys[0]];
      if (isString(value)) {
        return value;
      }
      if (_LANG == 'en') {
        return key;
      }
      throw 'can not read from i18n by key -> ' + key;
    } else {
      for (var i = 0; i < keys.length; i++) {
        if (i == 0) {
          value = LKI18N[keys[i]];
        } else {
          value = value[keys[i]];
        }
      }
      if (isString(value)) {
        return value;
      }
      throw 'can not read from i18n by key -> ' + key;
    }
  },

  /**
   * 获取i18n内容
   * @param prefix 前缀
   * @param key 键
   */
  LKGetI18NWithPrefix : function(prefix, key) {
    if (key == null) {
      return '';
    }
    try {
      return $.LKGetI18N(prefix + key);
    } catch (e) {
      try {
        return $.LKGetI18N(key);
      } catch (e) {
        return 'error[' + prefix + key + ']';
      }
    }
  },

  /**
   * 设置i18n内容
   * @param key 键
   * @param value 值
   */
  LKPutI18N : function(key, value) {
    if (isString(key) && isString(value)) {
      LKI18N[key] = value;
    }
  },

  /**
   * 设置i18n内容
   * @param json 键值对
   */
  LKExtendI18N : function(json) {
    if (typeof json != 'undefined' && isJSON(json) && !$.isEmptyObject(json)) {
      $.extend(LKI18N, json);
    }
  }

});

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
$.extend(LK, {

  // 控件文字颜色
  pluginFontColor : '#2e6da4',
  // 控件文字颜色
  pluginInvalidFontColor : '#d43f3a',
  // 控件文字大小
  pluginFontSize : 12,
  // 表单内控件距离顶部间距
  topGap : 3,
  // 表单内控件距离左部间距
  leftGap : 6,
  // 表单内控件键宽
  fieldKeyWidth : 113,// 七个汉字
  // 列宽
  colWidth : 174,// UEditor最小宽度为695
  // 行高
  rowHeight : 30,
  // 文本上下内边距
  textPaddingTB : 3,
  // 文本左右内边距
  textPaddingLR : 6,

  // 标准分隔符
  SPLITOR : '#@#',

  // 标准字段分隔符
  FIELD_SPLITOR : '@#@',

  // 版本号
  VERSION : {
    versionX : 1,
    versionY : 0,
    versionZ : 0
  },

  // 默认主题
  defaultTheme : {
    size : {
      primary : {
        font : 12
      }
    },
    color : {
      light2 : {
        border : '#6eade4',
        background : '#ffffff',
        font : 'var(--lichkin-plugin-light-light-border-color)'
      },
      light : {
        border : '#4e8dc4',
        background : '#ffffff',
        font : 'var(--lichkin-plugin-light-border-color)'
      },
      primary : {
        border : '#2e6da4',
        background : '#ffffff',
        font : 'var(--lichkin-plugin-border-color)'
      },
      dark : {
        border : '#0e4d84',
        background : '#ffffff',
        font : 'var(--lichkin-plugin-dark-border-color)'
      },
      dark2 : {
        border : '#002d64',
        background : '#ffffff',
        font : 'var(--lichkin-plugin-dark-dark-border-color)'
      },
      selected : {
        border : 'var(--lichkin-plugin-light-light-background-color)',
        background : 'var(--lichkin-plugin-light-light-border-color)',
        font : 'var(--lichkin-plugin-light-light-background-color)'
      },
      hover : {
        border : 'var(--lichkin-plugin-dark-dark-background-color)',
        background : 'var(--lichkin-plugin-dark-dark-border-color)',
        font : 'var(--lichkin-plugin-dark-dark-background-color)'
      },
      selectedHover : {
        border : 'var(--lichkin-plugin-dark-background-color)',
        background : 'var(--lichkin-plugin-dark-border-color)',
        font : 'var(--lichkin-plugin-dark-background-color)'
      },
      inverse : {
        border : 'var(--lichkin-plugin-dark-border-color)',
        background : 'var(--lichkin-plugin-border-color)',
        font : 'var(--lichkin-plugin-background-color)'
      },
      invalid : {
        border : '#d43f3a',
        background : '#ffe6e6',
        font : 'var(--lichkin-plugin-border-color-invalid)'
      }
    }
  },

  // 扩展主题
  extendThemes : {
    green : {
      color : {
        light2 : {
          border : '#8cee8c'
        },
        light : {
          border : '#6cce6c'
        },
        primary : {
          border : '#4cae4c'
        },
        dark : {
          border : '#2c8e2c'
        },
        dark2 : {
          border : '#0c6e0c'
        }
      }
    },
    orange : {
      color : {
        light2 : {
          border : '#ffe276'
        },
        light : {
          border : '#ffc256'
        },
        primary : {
          border : '#eea236'
        },
        dark : {
          border : '#ce8216'
        },
        dark2 : {
          border : '#ae6200'
        }
      }
    },
    red : {
      color : {
        light2 : {
          border : '#ff7f7a'
        },
        light : {
          border : '#f45f5a'
        },
        primary : {
          border : '#d43f3a'
        },
        dark : {
          border : '#b41f1a'
        },
        dark2 : {
          border : '#940000'
        },
        invalid : {
          border : '#2e6da4',
          background : '#c2e3ff'
        }
      }
    }
  },

  /**
   * 更换主题
   * @param config 配置
   */
  changeTheme : function(config) {
    var config = $.extend(true, {}, this.defaultTheme, isJSON(config) ? config : {});

    color = config.color;
    size = config.size;

    LK.pluginFontColor = color.primary.font;
    LK.pluginFontSize = size.primary.font;

    var theme = '\r\n:root{\r\n';

    theme += '--lichkin-plugin-light-light-border-color:' + color.light2.border + ';\r\n';
    theme += '--lichkin-plugin-light-light-background-color:' + color.light2.background + ';\r\n';
    theme += '--lichkin-plugin-light-light-font-color:' + color.light2.font + ';\r\n';

    theme += '--lichkin-plugin-light-border-color:' + color.light.border + ';\r\n';
    theme += '--lichkin-plugin-light-background-color:' + color.light.background + ';\r\n';
    theme += '--lichkin-plugin-light-font-color:' + color.light.font + ';\r\n';

    theme += '--lichkin-plugin-border-color:' + color.primary.border + ';\r\n';
    theme += '--lichkin-plugin-background-color:' + color.primary.background + ';\r\n';
    theme += '--lichkin-plugin-font-color:' + color.primary.font + ';\r\n';

    theme += '--lichkin-plugin-dark-border-color:' + color.dark.border + ';\r\n';
    theme += '--lichkin-plugin-dark-background-color:' + color.dark.background + ';\r\n';
    theme += '--lichkin-plugin-dark-font-color:' + color.dark.font + ';\r\n';

    theme += '--lichkin-plugin-dark-dark-border-color:' + color.dark2.border + ';\r\n';
    theme += '--lichkin-plugin-dark-dark-background-color:' + color.dark2.background + ';\r\n';
    theme += '--lichkin-plugin-dark-dark-font-color:' + color.dark2.font + ';\r\n';

    theme += '--lichkin-plugin-border-color-selected:' + color.selected.border + ';\r\n';
    theme += '--lichkin-plugin-background-color-selected:' + color.selected.background + ';\r\n';
    theme += '--lichkin-plugin-font-color-selected:' + color.selected.font + ';\r\n';

    theme += '--lichkin-plugin-border-color-hover:' + color.hover.border + ';\r\n';
    theme += '--lichkin-plugin-background-color-hover:' + color.hover.background + ';\r\n';
    theme += '--lichkin-plugin-font-color-hover:' + color.hover.font + ';\r\n';

    theme += '--lichkin-plugin-border-color-selected-hover:' + color.selectedHover.border + ';\r\n';
    theme += '--lichkin-plugin-background-color-selected-hover:' + color.selectedHover.background + ';\r\n';
    theme += '--lichkin-plugin-font-color-selected-hover:' + color.selectedHover.font + ';\r\n';

    theme += '--lichkin-plugin-border-color-inverse:' + color.inverse.border + ';\r\n';
    theme += '--lichkin-plugin-background-color-inverse:' + color.inverse.background + ';\r\n';
    theme += '--lichkin-plugin-font-color-inverse:' + color.inverse.font + ';\r\n';

    theme += '--lichkin-plugin-border-color-invalid:' + color.invalid.border + ';\r\n';
    theme += '--lichkin-plugin-background-color-invalid:' + color.invalid.background + ';\r\n';
    theme += '--lichkin-plugin-font-color-invalid:' + color.invalid.font + ';\r\n';

    theme += '--lichkin-plugin-font-size:' + size.primary.font + 'px;\r\n';

    theme += '}\r\n';
    $('#lichkin-themes').html(theme);
  },

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
        timeout : 3000,
        msg : 'undefined',
        jsonMsg : false
      };
    } else if (isNumber(options)) {
      // 传入的是数字，则转换为标准格式。
      options = {
        timeout : 3000,
        msg : String(options),
        jsonMsg : false
      };
    } else if (isString(options)) {
      // 传入的是字符串，则转换为标准格式。
      options = {
        timeout : 3000,
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
   * 确认提示窗
   * @param options [string|number|JSON] 自定义的参数
   * @param callbackOk 确定按钮回调方法
   * @param callbackCancel 取消按钮回调方法
   */
  confirm : function(options, callbackOk, callbackCancel) {
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
          msg : 'Invalid format for param options.msg when invoke LK.confirm'
        });
        return;
      }
    } else {
      // 传入的参数不支持，报错！
      this.log({
        type : 'assert',
        msg : 'Invalid format for param options when invoke LK.confirm'
      });
      return;
    }

    if (typeof callbackOk == 'undefined') {
      callbackOk = function() {
      };
    } else if (isString(callbackOk)) {
      callbackOk = window[callbackOk];
      if (typeof callbackOk != 'function') {
        // 传入的参数不支持，报错！
        this.log({
          type : 'assert',
          msg : 'Invalid format for param options.callbackOk when invoke LK.confirm'
        });
        return;
      }
    } else if (typeof callbackOk != 'function') {
      // 传入的参数不支持，报错！
      this.log({
        type : 'assert',
        msg : 'Invalid format for param options.callbackOk when invoke LK.confirm'
      });
      return;
    }

    if (typeof callbackCancel == 'undefined') {
      callbackCancel = function() {
      };
    } else if (isString(callbackCancel)) {
      callbackCancel = window[callbackCancel];
      if (typeof callbackCancel != 'function') {
        // 传入的参数不支持，报错！
        this.log({
          type : 'assert',
          msg : 'Invalid format for param options.callbackCancel when invoke LK.confirm'
        });
        return;
      }
    } else if (typeof callbackCancel != 'function') {
      // 传入的参数不支持，报错！
      this.log({
        type : 'assert',
        msg : 'Invalid format for param options.callbackCancel when invoke LK.confirm'
      });
      return;
    }

    // 调用具体实现方法
    LK[this.type].confirm(options, callbackOk, callbackCancel);
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
   * @param withoutCalc 排除计算逻辑
   */
  paramUrl : function(startFromQuestion, param, withoutCalc) {
    var url = (startFromQuestion ? '?' : '&') + (withoutCalc ? 'timestamp=' : '_$=') + new Date().getTime();
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
   * 解析URL
   * @param url 地址
   * @param isPageUrl 是否为页面地址
   * @param param [JSON] 参数
   * @param withoutCalc 排除计算逻辑
   */
  resolveUrl : function(url, isPageUrl, param, withoutCalc) {
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

        url = _CTX + _MAPPING_API + url;
      }
    }

    return url + LK.paramUrl((url.indexOf('?') < 0), param, withoutCalc);
  },

  /**
   * 跳转页面
   * @param url 跳转地址
   * @param param 参数
   * @param withoutBackUrl 不包含backUrl参数
   */
  Go : function(url, param, withoutBackUrl) {
    window.location.href = LK.resolveUrl(url, true, $.extend(param,

    withoutBackUrl == true ? {} : {
      backUrl : window.location.href.substr(window.location.href.indexOf(window.location.host) + window.location.host.length).replace(/timestamp=\d{13}/g, '').replace(/\?\&/g, '?')
    }

    ), true);
  },

  /**
   * 返回页面
   */
  GoBack : function() {
    window.location.href = serverDatas.backUrl;
  },

  /**
   * 打开新页面
   * @param url 页面地址
   * @param param 参数
   */
  openWin : function(url, param) {
    window.open(LK.resolveUrl(url, true, param, true));
  },

  /**
   * AJAX请求
   * @param options 自定义的参数
   * @param options[async] [boolean] 是否为异步调用（仅数据请求生效）
   * @param options[method] [string] 约定值（设置无效）
   * @param options[headers] [string] 约定值（设置无效）
   * @param options[dataType] [string] 约定值（设置无效）
   * @param options[contentType] [string] 约定值（设置无效）
   * @param options[url] [string] 自动拼接前缀与后缀
   * @param options[isPageUrl] [boolean] true:页面请求;false:数据请求;
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
      isPageUrl : false,
      showLoading : options.isPageUrl ? false : true,
      showSuccess : false,
      showError : true,
      timeout : 'LK_ajax_timeout',
      success : 'LK_ajax_success',
      error : 'LK_ajax_error'
    }, options, {
      url : LK.resolveUrl(options.url, options.isPageUrl, options.param),
      data : JSON.stringify($.extend(true, {}, options.data, {
        datas : {
          clientType : 'JAVASCRIPT'
        }
      }, {
        datas : LK.VERSION
      })),
      method : 'POST',
      headers : {
        'Accept-Language' : _LANG
      }
    }, options.isPageUrl ? {
      async : false,
      dataType : 'text',
      contentType : 'text/html;charset=UTF-8',
    } : {
      dataType : 'json',
      contentType : 'application/json;charset=UTF-8',
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
      if (options.isPageUrl) {
        success(responseDatas, options);
      } else {
        if (responseDatas.errorCode == 0) {
          success(responseDatas.datas, options);
        } else {
          error(responseDatas.errorCode, responseDatas.errorMessage, options);
        }
      }
    };

    options.error = function() {
      loadingTimeout = false;
      setTimeout(function() {
        if (options.showLoading) {
          LK.closeLoading(loadingId);
        }
      }, 333);
      error(-999, $.LKGetI18N('ajaxError'), options);
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
   * @param fullScreen true:全屏;false:退出全屏.
   */
  toggleFullScreen : function(fullScreen) {
    var isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    if (typeof fullScreen != 'undefined') {
      isFullscreen = !fullScreen;
    }
    if (!isFullscreen) {
      (document.documentElement.requestFullscreen && document.documentElement.requestFullscreen())

      || (document.documentElement.mozRequestFullScreen && document.documentElement.mozRequestFullScreen())

      || (document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen())

      || (document.documentElement.msRequestFullscreen && document.documentElement.msRequestFullscreen());
    } else {
      document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
    }
  }

});

// ajax请求超时跳转页面
LK.ajax.timeoutPageUrl = '/index';
// ajax请求超时时长
LK.ajax.timeoutValue = 30000;

/**
 * AJAX请求超时默认回调方法。
 * @param options 调用ajax方法时传入的参数
 */
var LK_ajax_timeout = function(options) {
  LK.toast($.LKGetI18N('timeout'));
  setTimeout(function() {
    LK.Go(LK.ajax.timeoutPageUrl, {}, true);
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
