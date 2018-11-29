;

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

  // 宽度不同时，工具栏行数不同，将影响高度的设置
  var width = $plugin.width() + 2;
  var height = $plugin.height();
  var toolbarboxHeight = 0;
  var bottomContainerHeight = 25;
  if (width >= 2026 + 2) {
    toolbarboxHeight = 32;
  } else if (width >= 1017 + 2) {
    toolbarboxHeight = 57;
  } else if (width >= 693 + 2) {
    toolbarboxHeight = 82;
  } else {
    throw 'map width is too small.';
  }

  // 创建map对象
  var map = new AMap.Map($plugin.data('LKOPTIONS').id, {
    resizeEnable : true
  });

  if (options.overlay == 'Circle') {
    var circle = new AMap.Circle({
      strokeWeight : 6,
      strokeOpacity : 0.2,
      fillOpacity : 0.4,
      strokeStyle : 'solid',
    });
    circle.setMap(map);

    var json = {};

    var circleEditor = null;
    var radius = 50;// 半径
    // 点击事件
    map.on('click', function(e) {
      var longitude = e.lnglat.getLng();
      var latitude = e.lnglat.getLat();
      var LngLat = new AMap.LngLat(longitude, latitude);
      circle.setCenter(LngLat);
      circle.setRadius(radius);
      map.setFitView([
        circle
      ]);

      json['longitude'] = longitude;
      json['latitude'] = latitude;
      json['radius'] = radius;
      $plugin.LKSetValues(json, true);
      $plugin.LKValidate();

      if (circleEditor == null) {
        circleEditor = new AMap.CircleEditor(map, circle);
        circleEditor.open();
        // 移动圆点事件
        circleEditor.on('move', function(event) {
          json['longitude'] = event.lnglat.lng;
          json['latitude'] = event.lnglat.lat;
          $plugin.LKSetValues(json, true);
        });
        // 调整半径事件
        circleEditor.on('adjust', function(event) {
          radius = event.radius;
          json['radius'] = radius;
          $plugin.LKSetValues(json, true);
        });
      }
    });

    if (options.value != null && options.value != '') {
      var jsonValue = options.value;
      if (!isJSON(jsonValue)) {
        jsonValue = JSON.parse(jsonValue);
      }

      var longitude = jsonValue.longitude;
      var latitude = jsonValue.latitude;
      circle.setCenter(new AMap.LngLat(longitude, latitude));
      if (jsonValue.radius) {
        radius = jsonValue.radius;
      }
      circle.setRadius(radius);
      map.setFitView([
        circle
      ]);

      json['longitude'] = longitude;
      json['latitude'] = latitude;
      json['radius'] = radius;

      if (circleEditor == null) {
        circleEditor = new AMap.CircleEditor(map, circle);
        circleEditor.open();
        // 移动圆点事件
        circleEditor.on('move', function(event) {
          json['longitude'] = event.lnglat.lng;
          json['latitude'] = event.lnglat.lat;
          $plugin.LKSetValues(json, true);
        });
        // 调整半径事件
        circleEditor.on('adjust', function(event) {
          radius = event.radius;
          json['radius'] = radius;
          $plugin.LKSetValues(json, true);
        });
      }
    }
  }

  if (options.value != null && options.value != '') {
    var jsonValue = options.value;
    if (!isJSON(jsonValue)) {
      jsonValue = JSON.parse(jsonValue);
    }

    if (options.overlay == 'Marker') {
      var marker = new AMap.Marker({
        position : new AMap.LngLat(jsonValue.longitude, jsonValue.latitude)
      });
      map.add(marker);
      map.setFitView([
        marker
      ]);
    }
  }

  $plugin.LKValidate();

  // 缓存参数
  $plugin.data('map', map);

  // TODO readonly

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
  overlay : 'Marker'
}));
