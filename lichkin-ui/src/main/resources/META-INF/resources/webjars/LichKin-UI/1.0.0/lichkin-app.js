;
// 使用与客户端交互
LK.type = 'app';

// 使用WebViewJavascriptBridge时，需先监听事件初始化。
document.addEventListener('WebViewJavascriptBridgeReady', function onBridgeReady(event) {

  event.bridge.init(function(message, responseCallback) {
    if (responseCallback) {
      responseCallback(message);
    }
  });

  event.bridge.registerHandler("callJsFunc", function(data, responseCallback) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    LK[data.method](data, responseCallback);
  });

}, false);

/**
 * 具体实现方法
 */
LK.app = {

  log : function(options) {
    window.WebViewJavascriptBridge.callHandler('log', options);
  },

  toast : function(options) {
    window.WebViewJavascriptBridge.callHandler('toast', options);
  },

  alert : function(options, callback) {
    options.msg = (typeof options.original != 'undefined' && options.original == true ? options.msg : $.LKGetI18N(options.msg));
    if (typeof callback == 'function') {
      window.WebViewJavascriptBridge.callHandler('alert', options, function(responseData) {
        callback();
      });
    } else {
      window.WebViewJavascriptBridge.callHandler('alert', options);
    }
  },

  confirm : function(options, callbackOk, callbackCancel) {
    options.msg = (typeof options.original != 'undefined' && options.original == true ? options.msg : $.LKGetI18N(options.msg));
    window.WebViewJavascriptBridge.callHandler('confirm', options, function(responseData) {
      if (responseData.ok) {
        if (typeof callbackOk == 'function') {
          callbackOk();
        }
      } else {
        if (typeof callbackCancel == 'function') {
          callbackCancel();
        }
      }
    });
  },

  showLoading : function() {
    window.WebViewJavascriptBridge.callHandler('showLoading');
  },

  closeLoading : function() {
    window.WebViewJavascriptBridge.callHandler('closeLoading');
  },

  reload : function(loadingId) {
    window.WebViewJavascriptBridge.callHandler('reload');
  },

  openWin : function(url) {
    url = url.replace(/\&timestamp=[0-9]*&/, '&').replace(/\&timestamp=[0-9]*/, '').replace(/\?timestamp=[0-9]*&/, '?').replace(/\?timestamp=[0-9]*/, '');
    if (!url.startsWith('http')) {
      var prefix = window.location.protocol + '//' + window.location.hostname;
      if (window.location.port != 80) {
        prefix += ':' + window.location.port;
      }
      url = prefix + url;
    }
    window.WebViewJavascriptBridge.callHandler('openWin', {
      url : url
    });
  },

  closeWin : function() {
    window.WebViewJavascriptBridge.callHandler('closeWin');
  }

};