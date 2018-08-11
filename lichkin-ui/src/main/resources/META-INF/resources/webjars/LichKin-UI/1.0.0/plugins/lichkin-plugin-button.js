;

// 按钮控件参数
LK.UI.buttonOptions = $.extend({},
// @see LK.UI.plugin
LK.UI.coreOptions,
// 控件特有参数
{
  // 图标 @see LK.UI.icon
  icon : null,
  // 文字 @see LK.UI.text
  text : null,
  /**
   * 点击事件
   * @param $plugin 当前按钮控件
   */
  click : function($plugin) {
  },
  // 按钮提示信息
  tip : 'click',
  // 按钮高度
  height : LK.rowHeight
});

/**
 * 按钮控件
 */
LK.UI('plugins', 'button', function(options) {
  options.createPlugin = function(id) {
    // 创建控件对象
    var $plugin = $('<a id="' + id + '" href="javascript:;" class="lichkin-button"></a>');
    $plugin.css('height', options.height - 2 + 'px');

    // 按钮容器
    var $span = $('<span class="lichkin-button-container"></span>').appendTo($plugin);

    // 图标
    var iconSize = false;
    var $icon = null;
    if (options.icon != null) {
      if (isString(options.icon)) {
        options.icon = $.extend({}, LK.UI.iconOptions, {
          icon : options.icon
        });
      } else {
        options.icon = $.extend({}, LK.UI.iconOptions, options.icon);
      }
      iconSize = options.icon.size;
      $.extend(options.icon, {
        style : {
          'margin' : (options.height - 2 - iconSize) / 2 + 'px'
        }
      });
      $icon = LK.UI.icon(options.icon).appendTo($span);
    }

    // 文字
    if (options.text != null) {
      if (isString(options.text)) {
        options.text = $.extend({}, LK.UI.textOptions, {
          text : options.text
        });
      } else {
        options.text = $.extend({}, LK.UI.textOptions, options.text);
      }
      if (iconSize != false) {
        options.text.style = $.extend({}, options.text.style, {
          'float' : 'right',
          'padding-left' : '0px'
        });
        options.text.size = iconSize * 0.75;
      }
      options.text.height = options.height - 2;
      LK.UI.text(options.text).appendTo($span);
    }

    // 点击事件
    $plugin.click(function() {
      options.click($plugin);
    });

    // 提示信息
    $plugin.attr('title', $.LKGetI18N(options.tip));

    // 返回控件对象
    return $plugin;
  };

  // 创建控件对象
  var $plugin = LK.UI.plugin(options);
  // 缓存参数
  $plugin.data('LKOPTIONS', options);
  // 返回控件对象
  return $plugin;
}, LK.UI.buttonOptions);