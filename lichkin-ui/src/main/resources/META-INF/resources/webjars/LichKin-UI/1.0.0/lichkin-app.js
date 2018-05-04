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
    if (typeof callback == 'function') {
      window.WebViewJavascriptBridge.callHandler('alert', options, function(responseData) {
        callback();
      });
    } else {
      window.WebViewJavascriptBridge.callHandler('alert', options);
    }
  }

};