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
   */
  setValues : function($plugin, $container, values) {
    var valueArr = [];
    var textArr = [];

    if (values == null) {
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

    $plugin.LKSetValues(valueArr);
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
      var $li = $('<li></li>').appendTo($container);
      $li.data(data);
      $li.append(LKUI.text(data.text));
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

  // 下拉内容
  var $popup = $('<div></div>').appendTo($plugin).LKAddPluginClass(plugin, 'popup');

  // 下拉内容显示/隐藏
  $popup.mouseover(function() {
    $popup.show();
  }).mouseout(function() {
    $popup.hide();
  });

  // 包装层
  var $wrapper = $('<div></div>').appendTo($plugin).LKAddPluginClass(plugin, 'wrapper');
  var $text = LK.UI.text().appendTo($wrapper).LKAddPluginClass(plugin, 'text');
  $wrapper.click(function() {
    $popup.toggle();
  });

  // 下拉按钮
  var $button = LK.UI.button({
    _icon : {
      size : 24,
      icon : 'dropdown'
    },
    click : function(btnOptions, $btn) {
      $popup.toggle();
    },
    tip : LK.i18n.dropdown
  }).appendTo($plugin).LKAddPluginClass(plugin, 'button');

  // 数据容器
  var $container = $('<ul></ul>').appendTo($popup).LKAddPluginClass(plugin, 'dataContainer');
  // 点击事件
  $container.click(function(e) {
    if (e.target != this) {
      var $row = $target = $(e.target);
      if (e.target.tagName != 'LI') {
        $row = $target.parents('li').first();
      }
      if (options.multiSelect) {
        $row.toggleClass('selected');
        $plugin.LKInvokeSetValues(null);
      } else {
        $plugin.LKInvokeSetValues(($row.hasClass('selected') ? '' : $row.data('value')));
        $container.parent().hide();
      }
      $plugin.LKlinkage($row.data('value'), false);
      $plugin.LKValidate();
    }
  });

  // 加载数据
  LK.UI.load({
    $plugin : $plugin,
    isCreateEvent : true,
    options : options
  });

  // 返回控件对象
  return $plugin;
}, {
  // @see createUIPlugin
  id : '',
  $appendTo : null,
  $renderTo : null,
  name : '',
  validator : null,
  value : null,
  linkages : [],
  onLinkaged : function($plugin, $linkage, linkageValues, linkageValue, linkageCurrentValue) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  },

  // @see load
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
  multiSelect : false
});
