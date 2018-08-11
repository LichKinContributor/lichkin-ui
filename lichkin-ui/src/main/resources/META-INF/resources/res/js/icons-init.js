// 绑定图标样式
(function() {
  for ( var key in LK.UI._icon.mappings) {
    LK.UI.bindIcon({
      icon : key,
      fontAwesome : LK.UI._icon.mappings[key]
    });
  }
  for ( var key in LK.UI._icon.originalMappings) {
    LK.UI.bindIcon({
      icon : key,
      originalFontAwesome : LK.UI._icon.originalMappings[key]
    });
  }
})();