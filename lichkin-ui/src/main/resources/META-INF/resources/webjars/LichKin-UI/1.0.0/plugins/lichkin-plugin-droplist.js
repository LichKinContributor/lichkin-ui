;
/**
 * 下拉列表内部实现相关
 */
LK.UI._droplist = {

  /**
   * 获取数据容器对象
   * @param $plugin 控件对象
   */
  getDataContainer : function($plugin) {
    return $plugin.find('.lichkin-droplist-content').children('ul');
  },

  /**
   * 获取选中项
   * @param $plugin 控件对象
   */
  getSelected : function($plugin) {
    return this.getDataContainer($plugin).find('li.selected');
  },

  /**
   * 添加数据
   * @param $container 数据容器对象
   * @param datas 数据集
   */
  addDatas : function($container, datas) {
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
  var $plugin = LKUI._createUIPlugin(plugin, options);

  // 存值对象
  var $value = LKUI._createUIPluginValue(options, plugin, $plugin);

  // 控制器
  var $controller = $('<div class="lichkin-' + plugin + '-controller"></div>').appendTo($plugin);
  var $text = LK.UI.text().appendTo($controller);

  // 下拉内容
  var $content = $('<div class="lichkin-' + plugin + '-content"></div>').appendTo($plugin);

  // 下拉内容显示/隐藏
  $content.mouseover(function() {
    $content.show();
  }).mouseout(function() {
    $content.hide();
  });

  // 下拉按钮
  var $button = LK.UI.button({
    _icon : {
      size : 24,
      icon : 'dropdown'
    },
    click : function(btnOptions, $btn) {
      $btn.siblings('.lichkin-' + plugin + '-content').toggle();
    },
    tip : LK.i18n.dropdown,
    cls : 'lichkin-' + plugin + '-button'
  }).appendTo($plugin);

  // 数据容器
  var $container = $('<ul></ul>').appendTo($content);
  // 点击事件
  $container.click(function(e) {
    if (e.target != this) {
      var $row = $target = $(e.target);
      if (e.target.tagName != 'LI') {
        $row = $target.parents('li').first();
      }
      if (options.multiSelect) {
        $row.toggleClass('selected');
        var $selecteds = $container.children('.selected');
        if ($selecteds.length == 0) {
          $value.val('');
          $text.html('');
        } else {
          var textHtml = new Array();
          var valueHtml = new Array();
          for (var i = 0; i < $selecteds.length; i++) {
            var $selected = $($selecteds[i]);
            textHtml.push($selected.data('text'));
            valueHtml.push($selected.data('value'));
          }
          $text.html(textHtml.join(','));
          $value.val(valueHtml.join(LK.SPLITOR));
        }
      } else {
        var flag = $row.hasClass('selected');
        $container.children().removeClass('selected');
        if (flag) {
          $text.html('');
          $value.val('');
        } else {
          $row.addClass('selected');
          $text.html($row.data('text'));
          $value.val($row.data('value'));
        }
        $container.parent().hide();
      }
      $plugin._validate();
    }
  });

  // 加载数据
  if (options.lazy != true) {
    LKUI._load(options, plugin, $container);
  }

  // 返回控件对象
  return $plugin;
}, {
  // @see createUIPlugin
  id : '',
  $appendTo : null,

  // @see createUIPluginValue
  name : '',
  validator : '',

  // 创建时不加载数据。需要通过reload方法触发数据的加载。
  lazy : false,
  // 支持多选
  multiSelect : false,

  // @see load
  url : '',
  param : {},
  data : [],
  onBeforeAddDatas : function(responseDatas, url, param) {
    return responseDatas;
  },
  onAfterAddDatas : function(responseDatas, url, param) {
  },
  onLoadDatasError : function(ajaxErrorArguments, url, param) {
  }
});