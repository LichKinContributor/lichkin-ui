;
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
   */
  setValues : function($plugin, $container, values, isCreateEvent) {
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
          if (data.value == values[i]) {
            $that.addClass('selected');
            valueArr.push(data.value);
            textArr.push(data.text);
            break;
          }
        }
      });
    }

    $plugin.LKSetValues(valueArr, isCreateEvent);
    $plugin.LKSetTexts(textArr);
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   */
  addDatas : function($plugin, $container, datas) {
    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      var $li = $('<li></li>').appendTo($container).LKAddPluginClass('droplist', 'node');
      $li.data(data);
      $li.append(LK.UI.text({
        original : true,
        text : data.text,
        style : {
          'height' : LK.rowHeight - 7 + 'px',
          'line-height' : LK.rowHeight - 7 + 'px'
        }
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
    'height' : LK.rowHeight * 6 - 1 + 'px',
    'top' : height + 1 + 'px'
  });

  // 下拉内容显示/隐藏
  $popup.mouseover(function() {
    $popup.show();
  }).mouseout(function() {
    $popup.hide();
  });

  // 包装层
  var $wrapper = $('<div title=' + $.LKGetI18N('dropdown') + '></div>').appendTo($plugin).LKAddPluginClass(plugin, 'wrapper');
  var $text = LK.UI.text().appendTo($wrapper).LKAddPluginClass(plugin, 'text').css({
    'height' : height + 'px',
    'line-height' : LK.rowHeight - 2 + 'px'
  });

  // 下拉按钮
  var $button = LK.UI.button({
    _icon : {
      size : 24,
      icon : 'dropdown'
    }
  }).appendTo($plugin).LKAddPluginClass(plugin, 'button');

  // 数据容器
  var $container = $('<ul></ul>').appendTo($popup).LKAddPluginClass(plugin, 'dataContainer');

  // 加载数据
  LK.UI.load({
    $plugin : $plugin,
    isCreateEvent : true,
    options : options
  });

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, {
  // @see LK.UI.create
  id : '',
  $appendTo : null,
  $renderTo : null,
  name : '',
  validator : null,
  value : null,
  inForm : false,
  cols : 1,
  rows : 1,
  linkages : [],
  onLinkaged : function($plugin, linkage) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  },

  // @see LK.UI.load
  lazy : false,
  url : '',
  param : {},
  data : null,
  onBeforeAddDatas : function($plugin, responseDatas, url, param) {
    return responseDatas;
  },
  onAfterAddDatas : function($plugin, responseDatas, url, param) {
  },
  onLoadDatasError : function($plugin, ajaxErrorArguments, url, param) {
  },

  // 支持多选
  multiSelect : false,
  // 是否可以取消选中（仅在单选情况下起作用）
  cancelabel : true
});

$('body').mousedown(function(e) {
  var $that = $(e.target);
  if ($that.is('.lichkin-droplist-wrapper') || $that.is('.lichkin-droplist-wrapper .lichkin-droplist-text')) {
    var $plugin = $that.parents('.lichkin-droplist:first');
    var $popup = $plugin.LKGetPopup();
    if ($popup.is(':hidden')) {
      $('.lichkin-droplist-popup').hide();
      var offset = $plugin.offset();
      $popup.css({
        'top' : offset.top + LK.rowHeight,
        'left' : offset.left
      });
      $popup.show();
    } else {
      $popup.hide();
    }
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
