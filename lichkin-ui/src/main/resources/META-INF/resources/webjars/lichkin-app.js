;
// 使用WebViewJavascriptBridge时，需先监听事件初始化。
document.addEventListener('WebViewJavascriptBridgeReady', function onBridgeReady(event) {
  event.bridge.init();
}, false);