;
/**
 * 原生JavaScript代码实现
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
 * 判断是否为布尔
 * @param boolean 布尔
 */
var isBoolean = function(bool) {
  return typeof bool == 'boolean';
};

// BASE64编码正则
var _BASE64_CODE_REGEXP_STR = '([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)';

/**
 * 判断是否为BASE64编码
 * @param base64 BASE64编码
 */
var isBASE64 = function(base64) {
  return new RegExp('^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,' + _BASE64_CODE_REGEXP_STR + '$').test(base64);
};

/**
 * 判断是否为BASE64编码
 * @param base64 BASE64编码
 */
var isSubBASE64 = function(base64) {
  return new RegExp('^' + _BASE64_CODE_REGEXP_STR + '$').test(base64);
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
    "H+" : this.getHours(),
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
 * 当前日期的下个月日期
 * @return yyyy-MM-dd
 */
var nextMonthDay = function() {
  return new Date().reset('M', 1).format('yyyy-MM-dd');
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
 * 转换为标准路径，即使用/作为分隔符，并以/开头，不以/结尾。
 * @param path 路径
 * @return 标准路径
 */
var toStandardPath = function(path) {
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
};
