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
    alert((typeof options.original != 'undefined' && options.original == true ? options.msg : $.LKGetI18N(options.msg)));
    if (typeof callback == 'function') {
      callback();
    }
  },

  confirm : function(options, callbackOk, callbackCancel) {
    // 默认无使用实现，交由控件做具体实现。
    LK.log({
      type : 'assert',
      msg : 'confirm does not has implements.'
    });
    return;
  },

  showLoading : function() {
    var loadingId = 'loading_' + randomInRange(10000, 99999);
    if (!isJSON(this.loadingIds)) {
      this.loadingIds = {};
    }
    if (isEmptyJSON(this.loadingIds)) {
      var $loading = $('<div class="lichkin-loading"></div>').appendTo('body');
      var $center = $('<div class="center"></div>').appendTo($loading);
      var $container = $('<div class="container"></div>').appendTo($center);
      for (var i = 2; i <= 10; i++) {
        $container.append('<div class="object" style="-webkit-animation-name:loadingAnimate;-webkit-animation-delay:0.' + (i - 1) + 's;animation-delay:0.' + (i - 1) + 's;"></div>');
      }
      $loading.show();
    }
    this.loadingIds[loadingId] = loadingId;
    return loadingId;
  },

  closeLoading : function(loadingId) {
    delete this.loadingIds[loadingId];
    if (isEmptyJSON(this.loadingIds)) {
      $loading = $('.lichkin-loading');
      if ($loading) {
        $loading.remove();
      }
    }
  }

};
