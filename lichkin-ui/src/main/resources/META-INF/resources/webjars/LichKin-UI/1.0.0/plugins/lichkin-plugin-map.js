;

/**
 * 下拉列表内部实现相关
 */
LK.UI._map = {

  /**
   * 设置值
   * @param $plugin 控件对象
   * @param jsonValue JSON值
   * @param isDefaultValue 是否默认值
   */
  setValues : function($plugin, jsonValue, isDefaultValue) {
    var map = $plugin.data('map');
    var options = $plugin.data('LKOPTIONS');
    switch (options.overlay) {
      case 'Circle': {
        var circle = $plugin.data('circle');
        circle.setCenter(new AMap.LngLat(jsonValue.longitude, jsonValue.latitude));
        circle.setRadius(jsonValue.radius);
        // 缩放
        map.setFitView([
          circle
        ]);
        $plugin.data('mapJson', jsonValue);

        if (!isDefaultValue) {
          $plugin.LKGetValueObj().val('true');
        }
        $plugin.LKValidate();
      }
        break;
      default:
        break;
    }
  }

};

/**
 * 地图控件
 */
LK.UI('plugins', 'map', function(options) {
  // 控件类型
  var plugin = 'map';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var $value = $plugin.LKGetValueObj();

  var mapJson = $.extend({
    longitude : 120.7449066639,
    latitude : 31.2692525940,
    radius : 1000
  }, (options.value == null || isEmptyJSON(options.value)) ? {} : options.value);
  $plugin.data('mapJson', mapJson);

  // 创建map对象
  var map = new AMap.Map($plugin.data('LKOPTIONS').id, {
    resizeEnable : true
  });

  if (options.readonly) {
    map.setMapStyle('amap://styles/whitesmoke');
  }

  // 点击事件
  map.on('click', function(e) {
    LK.UI._map.setValues($plugin, {
      longitude : e.lnglat.getLng(),
      latitude : e.lnglat.getLat(),
      radius : $plugin.data('mapJson').radius
    }, false);
  });
  $plugin.data('map', map);

  switch (options.overlay) {
    case 'Circle': {
      var circle = new AMap.Circle({
        strokeWeight : 6,
        strokeOpacity : 0.2,
        fillOpacity : 0.4,
        strokeStyle : 'solid',
      });
      circle.setMap(map);
      $plugin.data('circle', circle);

      LK.UI._map.setValues($plugin, mapJson, (mapJson.longitude == 120.7449066639 && mapJson.latitude == 31.2692525940 && mapJson.radius == 1000));
      var circleEditor = new AMap.CircleEditor(map, circle);
      circleEditor.open();
      // 移动圆点事件
      circleEditor.on('move', function(event) {
        var json = $plugin.data('mapJson');
        json.longitude = event.lnglat.lng;
        json.latitude = event.lnglat.lat;
      });
      // 调整半径事件
      circleEditor.on('adjust', function(event) {
        var json = $plugin.data('mapJson');
        json.radius = event.radius;
      });

      if (options.value == null || isEmptyJSON(options.value)) {
        $plugin.LKValidate();
      }
    }
      break;
    case 'Marker': {
      var marker = new AMap.Marker({
        position : new AMap.LngLat(mapJson.longitude, mapJson.latitude),
        icon : options.markerIcon == null ? null : options.markerIcon,
        title : options.markerTitle == null ? null : options.markerTitle,
      });

      if (mapJson.markerTitle) {
        marker.setLabel({
          offset : new AMap.Pixel(20, -20),
          content : '<div class="lichkin-plugin-map-marker-label">' + mapJson.address + '</div>'
        });
      }

      map.add(marker);
      map.setFitView([
        marker
      ]);
    }
      break;
    default:
      break;
  }

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特殊定义
{
  cols : 4,
  rows : 14,
},
// 控件特有参数
{
  // 覆盖物（具体类型查看地图API,默认为点标记）
  overlay : 'Marker',
  // Marker标题（overlay为Marker时生效）
  markerTitle : null,
  // Marker图表（overlay为Marker时生效）
  markerIcon : null,
}));
