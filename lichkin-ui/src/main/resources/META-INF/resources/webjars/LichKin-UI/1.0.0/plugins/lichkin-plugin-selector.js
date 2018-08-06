;
/**
 * 选择器内部实现相关
 */
LK.UI._selector = {

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

    if (values != null && values != '') {
      if (isString(values)) {
        values = [
          values
        ];
      }
      if (Array.isArray(values) && values.length != 0) {
        $container.find('li').each(function() {
          var data = $(this).data();
          for (var i = 0; i < values.length; i++) {
            if (data.value == values[i]) {
              valueArr.push(data.value);
              textArr.push(data.text);
              break;
            }
          }
        });
      }
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
      $('<li></li>').appendTo($container).data(datas[i]);
    }
  }

};

/**
 * 选择器控件
 */
LK.UI('plugins', 'selector', function(options) {
  // 控件类型
  var plugin = 'selector';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var width = $plugin.data('LKOPTIONS').width;
  var height = $plugin.data('LKOPTIONS').height;
  // 包装层
  var $wrapper = $('<div title=' + $.LKGetI18N('dropdown') + '></div>').appendTo($plugin).LKAddPluginClass(plugin, 'wrapper');
  $wrapper.css('height', height);
  var textHeight = height - 2 * LK.textPaddingTB;
  var textLineHeight = LK.rowHeight - 2 * LK.textPaddingTB - 2;
  if (textHeight < textLineHeight) {
    textLineHeight = textHeight;
  }
  var $text = LK.UI.text().appendTo($wrapper).LKAddPluginClass(plugin, 'text').css({
    'width' : width - 2 * LK.textPaddingLR + 'px',
    'height' : textHeight + 'px',
    'line-height' : textLineHeight + 'px',
    'margin-top' : (height + 2 - LK.rowHeight) / 2 + 'px'
  });

  // 点击事件
  options.dialog.id = $plugin.attr('id') + '_dialog';
  options.dialog.buttons.unshift({
    icon : 'cancel',
    text : 'cancel',
    cls : 'danger',
    click : function($button, $dialog, $contentBar) {
      $dialog.LKCloseDialog();
    }
  });
  options.dialog.buttons.unshift({
    icon : 'reset',
    text : 'reset',
    cls : 'warning',
    click : function($button, $dialog, $contentBar) {
      options.onResetButtonClick($button, $dialog, $contentBar, $plugin, $plugin.LKGetValue());
    }
  });
  options.dialog.buttons.unshift({
    icon : 'ok',
    text : 'ok',
    cls : 'success',
    click : function($button, $dialog, $contentBar) {
      $plugin.LKInvokeSetValues(options.onOkButtonClick($button, $dialog, $contentBar, $plugin, $plugin.LKGetValue()), false);
      $dialog.LKCloseDialog();
    }
  });
  $wrapper.click(function() {
    LK.UI.openDialog(options.dialog);
  });

  // 选择按钮
  var $button = LK.UI.button({
    _icon : {
      size : 24,
      icon : 'selector'
    }
  }).appendTo($plugin).LKAddPluginClass(plugin, 'button');
  $button.css('height', height);
  $button.find('.lichkin-icon').css('top', (height - 24) / 2 + 'px');

  // 数据容器
  var $container = $('<ul style="display:none;"></ul>').appendTo($plugin).LKAddPluginClass(plugin, 'dataContainer');

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
  /**
   * @see LK.UI.openDialog
   * @tip id为selector控件id+'_dialog'
   * @tip 内部已经提供了三个按钮（确定、还原、取消）
   */
  dialog : LK.UI.dialogOptions,

  /**
   * 对话框确定按钮点击事件
   * @param $button 按钮
   * @param $dialog 对话框
   * @param $contentBar 对话框内容栏
   * @param $plugin 选择器控件
   * @param value 选择器控件值
   * @return 结果值
   */
  onOkButtonClick : function($button, $dialog, $contentBar, $plugin, value) {
    return value;
  },

  /**
   * 对话框还原按钮点击事件
   * @param $button 按钮
   * @param $dialog 对话框
   * @param $contentBar 对话框内容栏
   * @param $plugin 选择器控件
   * @param value 选择器控件值
   */
  onResetButtonClick : function($button, $dialog, $contentBar, $plugin, value) {
  }
}));
