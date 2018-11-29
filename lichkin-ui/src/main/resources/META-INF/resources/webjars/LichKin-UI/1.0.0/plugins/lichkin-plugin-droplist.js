;

// 扩展图标
$.LKExtendICON({
  'dropdown' : 'caret-square-down',
});

/**
 * 下拉列表内部实现相关
 */
LK.UI._droplist = {

  /**
   * 设置值
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param values 值数组
   * @param isCreateEvent 是否为创建是调用
   * @param undoOnChange true:不触发onChange事件;false:触发onChange事件;
   */
  setValues : function($plugin, $container, values, isCreateEvent, change) {
    var valueArr = [];
    var textArr = [];

    if (values === null) {
      $container.find('li.selected').each(function() {
        var data = $(this).data();
        valueArr.push(data.value);
        textArr.push(data.text);
      });
    } else {
      var $nodes = $container.find('li');
      $nodes.removeClass('selected');
      if (!Array.isArray(values)) {
        values = [
          values
        ];
      }

      $nodes.each(function() {
        var $that = $(this);
        var data = $that.data();
        for (var i = 0; i < values.length; i++) {
          if (data.value == '' + values[i]) {
            $that.addClass('selected');
            valueArr.push(data.value);
            textArr.push(data.text);
            break;
          }
        }
      });
    }

    $plugin.LKSetValues(valueArr, isCreateEvent, change);
    $plugin.LKSetTexts(textArr);
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   */
  addDatas : function($plugin, $container, datas) {
    var height = $plugin.data('LKOPTIONS').height;
    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      if (data.value == null) {
        data.value = '-';
      }
      var $li = $('<li></li>').appendTo($container).LKAddPluginClass('droplist', 'node');
      $li.data(data);
      $li.append(LK.UI.text({
        original : true,
        text : data.text,
        height : height + 1
      }));
    }
  }

};

/**
 * 下拉列表控件
 */
LK.UI('plugins', 'droplist', function(options) {
  // 控件类型
  var plugin = 'droplist';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var id = $plugin.attr('id');

  // 下拉内容
  var width = $plugin.data('LKOPTIONS').width;
  var height = $plugin.data('LKOPTIONS').height;
  var $popup = $('<div id="' + id + '_popup"></div>').appendTo('body').LKAddPluginClass(plugin, 'popup');
  $popup.data('plugin-id', id);
  $popup.css({
    'width' : width + 'px',
    'height' : (height + 2) * 6 + 'px'
  });
  if (options.cls != '') {
    $popup.addClass(options.cls);
  }

  // 下拉内容显示/隐藏
  $popup.mouseover(function() {
    $popup.show();
  }).mouseout(function() {
    $popup.hide();
  });

  // 包装层
  var $wrapper = $('<div title=' + $.LKGetI18N('dropdown') + '></div>').appendTo($plugin).LKAddPluginClass(plugin, 'wrapper');
  $wrapper.css('height', height);
  var $text = LK.UI.text({
    height : height
  }).appendTo($wrapper).LKAddPluginClass(plugin, 'text').css({
    'width' : width - 2 * LK.textPaddingLR + 'px'
  });

  // 下拉按钮
  var $button = LK.UI.button({
    height : height + 2,
    icon : {
      size : height,
      icon : 'dropdown'
    }
  }).appendTo($plugin).LKAddPluginClass(plugin, 'button');

  // 数据容器
  var $container = $('<ul></ul>').appendTo($popup).LKAddPluginClass(plugin, 'dataContainer');

  // 默认地址
  if (options.data == null && options.url == '') {
    var cachedDictionaryDatas = LK.cachedDictionaryDatas(options.param.categoryCode);
    if (cachedDictionaryDatas && cachedDictionaryDatas.length != 0) {
      options.data = cachedDictionaryDatas;
    } else {
      options.url = '/GetDictionaryList';
    }
  }

  // 加载数据
  LK.UI.load({
    $plugin : $plugin,
    isCreateEvent : true,
    options : options
  });

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// @see LK.UI.load
LK.UI.loadOptions,
// 控件特有参数
{
  // 支持多选
  multiSelect : false,
  // 是否可以取消选中（仅在单选情况下起作用）
  cancelable : true
}));

$('body').mousedown(function(e) {
  var $that = $(e.target);
  if ($that.is('.lichkin-droplist-wrapper') || $that.is('.lichkin-droplist-wrapper .lichkin-droplist-text')) {
    var $plugin = $that.parents('.lichkin-droplist:first');
    if ($plugin.data('LKOPTIONS').readonly == true) {
      return;
    }
    var $popup = $plugin.LKGetPopup();
    if ($popup.is(':hidden')) {
      $('.lichkin-droplist-popup').hide();
      var offset = $plugin.offset();
      $popup.css({
        'top' : offset.top + $plugin.height() + 2,
        'left' : offset.left
      });
      $popup.show();
    } else {
      $popup.hide();
    }
    e.stopImmediatePropagation();
  } else {
    if ($that.is('.lichkin-droplist-popup') || $that.is('.lichkin-droplist-popup .lichkin-droplist-dataContainer')) {
    } else if ($that.is('.lichkin-droplist-popup .lichkin-droplist-dataContainer li') || $that.is('.lichkin-droplist-popup .lichkin-droplist-dataContainer li .lichkin-text')) {
      if (!$that.is('li')) {
        $that = $that.parent('li');
      }
      var $popup = $that.parents('.lichkin-droplist-popup:first');
      var $plugin = $('#' + $popup.data('plugin-id'));
      var options = $plugin.data('LKOPTIONS');
      if (options.multiSelect) {
        $that.toggleClass('selected');
        $plugin.LKInvokeSetValues(null);
      } else {
        if (options.cancelable == true) {
          $plugin.LKInvokeSetValues(($that.hasClass('selected') ? '' : $that.data('value')));
        } else {
          var value = $that.data('value');
          if (value != $plugin.LKGetValue()) {
            $plugin.LKInvokeSetValues(value);
          }
        }
        $popup.hide();
      }
      $plugin.LKlinkage($that.data('value'), false);
      $plugin.LKValidate();
    } else {
      $('.lichkin-droplist-popup').hide();
    }
  }
});

/**
 * 字典缓存处理
 */
// 需要缓存的字典类目编码
LK.needCacheCategoryCodes = [];
// 字典数据缓存对象
LK.dictionaryCache = {};

/**
 * 是否需要缓存字典数据
 * @param categoryCode 类目编码
 */
LK.needCacheCategoryCode = function(categoryCode) {
  for (var i = 0; i < LK.needCacheCategoryCodes.length; i++) {
    if (LK.needCacheCategoryCodes[i] == categoryCode) {
      return true;
    }
  }
  return false;
};

/**
 * 缓存字典数据
 * @param categoryCode 类目编码
 * @param datas 数据
 */
LK.cacheDictionaryDatas = function(categoryCode, datas) {
  if (LK.needCacheCategoryCode(categoryCode)) {
    LK.dictionaryCache[categoryCode] = datas;
  }
};

/**
 * 获取缓存的字典数据
 * @param categoryCode 类目编码
 */
LK.cachedDictionaryDatas = function(categoryCode) {
  if (LK.needCacheCategoryCode(categoryCode)) {
    return LK.dictionaryCache[categoryCode];
  }
  return null;
};
