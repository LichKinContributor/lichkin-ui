;

/**
 * JQuery扩展
 */
$.extend($, {

  /**
   * 设置icon内容
   * @param json 键值对
   * @param original 是否为组合图标
   */
  LKExtendICON : function(json, original) {
    if (typeof json != 'undefined' && isJSON(json) && !$.isEmptyObject(json)) {
      if (typeof original == 'undefined') {
        $.extend(LK.UI._icon.mappings, json);
      } else {
        $.extend(LK.UI._icon.originalMappings, json);
      }
    }
  }

});

/**
 * 初始化控件，提供简写代码。
 * @param icon 图标
 * @param size 图标大小
 * @param type 图标类型
 */
LKUI.icon = function(icon, size, type) {
  return LK.UI.icon({
    icon : icon,
    size : size,
    type : type
  });
};

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 使用LKUI开头+控件名命名扩展
   * @param funcName 控件具体方法名
   * @param options 控件具体方法需要的参数。部分方法可扩展实现代码简写方式。
   */
  LKUIicon : function(funcName, options) {
    // 第一个参数为字符串时，即为调用该类型控件的方法。
    if (isString(funcName)) {
      switch (funcName) {
        case 'change':
          if (isString(options)) {
            // 提供最常用方法调用逻辑，简化代码。
            options = {
              icon : options
            };
          }
          // 有返回值的方法返回调用结果
          return LK.UI.changeIcon($.extend({
            $icon : this
          }, options));// 需要对象的方法，将当前对象传入调用。
        case 'clear':// 提供额外的调用方法
          return LK.UI.changeIcon($.extend({
            $icon : this
          }));
        case 'has':
          if (isString(options)) {
            // 提供最常用方法调用逻辑，简化代码。
            options = {
              icon : options
            };
          }
          return LK.UI.hasIcon($.extend({
            $icon : this
          }, options));
        default:
          // 没有该方法
          break;
      }
    }
    // 参数非法
    throw 'illegal arguments';
  }

});

// 图标类型。true:使用图片图标;false:使用文字图标;
LK.UI.iconType = false;

/**
 * 图标控件内部实现相关
 */
LK.UI._icon = {

  /** 控件类型 */
  plugin : 'icon',

  /** 图标与FontAwesome映射关系 */
  mappings : {
    'save' : 'save',
    'ok' : 'check',
    'cancel' : 'times',
  },

  /** 图标与FontAwesome原文映射关系 */
  originalMappings : {
    'loading' : '<i class="fa fa-spinner fa-spin"></i>',
  },

  /**
   * 获取图标对应的FontAwesome
   * @param icon 图标
   * @param style 样式
   * @param size 大小
   */
  getFontAwesome : function(icon, style, size) {
    var fa = this.mappings[icon];
    if (fa) {
      $fa = $('<i class="fa fa-' + fa + '"></i>');
      if (typeof style != 'undefined' && !$.isEmptyObject(style)) {
        $fa.css(style);
      }
      return $fa.prop('outerHTML');
    }

    fa = this.originalMappings[icon];
    if (fa) {
      $fa = $(fa);
      if (typeof style != 'undefined' && !$.isEmptyObject(style)) {
        $fa.css(style);
        $fa.find('i').css(style);
        $fa.find('i:last').css('font-size', size * 0.4 + 'px');
      }
      return $fa.prop('outerHTML');
    }

    return '';
  }

};

/**
 * 绑定图标
 */
LK.UI('plugins', 'bindIcon', function(options) {
  $('#lichkin-icons').append('.lichkin-icon-' + options.icon + '{background-image:url("' + LK.toStandardPath(_CTX) + '/res/img/icons/' + options.icon + '.' + ((options.icon == 'loading') ? 'gif' : 'png') + '");}');

  if (options.fontAwesome != '') {
    LK.UI._icon.mappings[options.icon] = options.fontAwesome;
    return;
  }

  if (options.originalFontAwesome != '') {
    LK.UI._icon.originalMappings[options.icon] = options.originalFontAwesome;
    return;
  }
}, {
  // 图标
  icon : '',
  // 文字图标
  fontAwesome : '',
  // 文字图标原文
  originalFontAwesome : ''
});

// 图标控件参数
LK.UI.iconOptions = $.extend({},
// @see LK.UI.plugin
LK.UI.coreOptions,
// 控件特有参数
{
  // 图标大小
  size : 16,
  // 图标
  icon : null,
  // 图标类型
  type : null,
  // I样式
  iStyle : {}
});

/**
 * 图标控件
 */
LK.UI('plugins', 'icon', function(options) {
  // 大小动态设置
  var size = options.size;
  options.style = $.extend({
    'background-size' : (size * 0.75) + 'px',
    'background-position' : (size * 0.125) + 'px',
    'width' : size + 'px',
    'height' : size + 'px'
  }, options.style);
  options.iStyle = $.extend({
    'font-size' : (size * 0.75) + 'px',
    'width' : size + 'px',
    'height' : size + 'px',
    'line-height' : size + 'px'
  }, options.iStyle);

  options.createPlugin = function(id) {
    // 创建控件对象
    var $plugin = $('<span id="' + id + '" class="lichkin-icon"></span>');

    // 不传图标时即只创建空白控件
    if (options.icon != null) {
      // 设置具体图标
      $plugin.addClass('lichkin-icon-' + options.icon);
      // 设置文字图标
      if (((options.type == null) ? LK.UI.iconType : options.type) == false) {
        $plugin.addClass('lichkin-hidden-icon');// 文字图标环境下隐藏图片图标
        $plugin.append(LK.UI._icon.getFontAwesome(options.icon, options.iStyle, size));
      }
    }

    // 返回控件对象
    return $plugin;
  };

  // 创建控件对象
  var $plugin = LK.UI.plugin(options);
  // 缓存参数
  $plugin.data('LKOPTIONS', options);
  // 返回控件对象
  return $plugin;
}, LK.UI.iconOptions);

/**
 * 判断是否包含图标
 */
LK.UI('plugins', 'hasIcon', function(options) {
  return options.$icon.hasClass('lichkin-icon-' + options.icon);
}, {
  // 图标控件
  $icon : '',
  // 待替换的图标
  icon : ''
});

/**
 * 更换图标
 */
LK.UI('plugins', 'changeIcon', function(options) {
  var $icon = options.$icon;

  // 文字图标环境下隐藏图片图标
  var type = (((options.type == null) ? LK.UI.iconType : options.type) == false);
  if (type && !$icon.hasClass('lichkin-hidden-icon')) {
    $icon.addClass('lichkin-hidden-icon');
  }

  if (!type && $icon.hasClass('lichkin-hidden-icon')) {
    $icon.removeClass('lichkin-hidden-icon');
  }

  // 清除图标
  var classes = $icon.getClassArr();
  for (var i = 0; i < classes.length; i++) {
    var cls = classes[i];
    if (cls.match(/lichkin-icon-[a-zA-Z]/)) {
      $icon.removeClass(cls);
    }
  }
  // 清除文字图标
  $icon.children().remove();

  // 不传图标时即只做清除
  if (options.icon != '') {
    // 更换图标
    $icon.addClass('lichkin-icon-' + options.icon);
    if (type) {
      // 更换文字图标
      $icon.append(LK.UI._icon.getFontAwesome(options.icon, $icon.data('LKOPTIONS').iStyle));
    }
  }
  return $icon;
}, {
  // 图标控件
  $icon : '',
  // 待替换的图标
  icon : '',
  // 图标类型
  type : null
});
