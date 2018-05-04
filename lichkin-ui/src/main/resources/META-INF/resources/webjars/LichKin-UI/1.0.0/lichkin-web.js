;
/**
 * 原生JavaScript代码实现，或使用JQuery的代码实现。
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

// 使用浏览器实现
LK.type = 'web';

/**
 * 具体实现方法
 */
LK.web = {

  log : function(options) {
    // IE或Edge浏览器不支持样式输出
    if (!!window.ActiveXObject || 'ActiveXObject' in window || window.navigator.userAgent.toLowerCase().indexOf('edge') > 0) {
      console.log(options.msg);
      return;
    }

    // 其它浏览器使用样式日志输出
    var styles = {
      'verbose' : 'color:#8C8C8C;background-color:#2b2b2b;',
      'debug' : 'color:#CECECE;background-color:#2b2b2b;',
      'info' : 'color:#8BBB00;background-color:#2b2b2b;',
      'warn' : 'color:#E69E0A;background-color:#2b2b2b;',
      'error' : 'color:#FF6B68;background-color:#2b2b2b;',
      'assert' : 'color:#FF0098;background-color:#2b2b2b;'
    };

    if (options.jsonMsg) {
      console.log('%c%s', styles[options.type], options.msg);
    } else {
      console.log('%c%s', styles[options.type], options.msg);
    }
  },

  toast : function(options) {
    var id = setInterval(function() {
      if ($('.lichkin-toast').length == 0) {
        var toast = $('<div class="lichkin-toast"><span>' + options.msg + '</span></div>').appendTo('body');
        toast.fadeIn(500);
        setTimeout(function() {
          toast.fadeOut(500, function() {
            toast.remove();
            clearInterval(id);
          });
        }, options.timeout);
      }
    }, 200);
  },

  alert : function(options, callback) {
    alert(options.msg);
    if (typeof callback == 'function') {
      callback();
    }
  }

};

/**
 * 文本框
 * @param options 自定义的参数
 * @param options[$obj] 待渲染对象
 * @param options[attr] HTML标签定义的属性
 */
LK.UI('plugins', 'textbox', function(options) {
  // 创建控件对象
  var $plugin = $('<input type="text" class="lichkin-textbox" />');
  if (typeof options.attr != 'undefined') {
    $plugin.attr(options.attr);
  }

  // 渲染控件
  var $obj = $(options.$obj);
  if ($obj) {
    $obj.append($plugin);
  }

  // 返回控件对象
  return $plugin;
});
