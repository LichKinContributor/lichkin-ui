;
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

// 增加统一图标样式
(function() {
  var $icons = $('#lichkin-icons');
  $icons.append('.lichkin-hidden-icon{}');
  var sizes = [
      16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128
  ];
  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i];
    $icons.append('.lichkin-icon-' + size + '{background-size:' + size + 'px;width:' + size + 'px;height:' + size + 'px;}');
    $icons.append('.lichkin-icon-' + size + ' i{font-size:' + (size * 0.75) + 'px;width:' + size + 'px;height:' + size + 'px;line-height:' + size + 'px;}');
  }
})();

/**
 * 图标控件内部实现相关
 */
LK.UI._icon = {

  /** 控件类型 */
  plugin : 'icon',

  /** 图标与FontAwesome映射关系 */
  mappings : {},

  /** 图标与FontAwesome原文映射关系 */
  originalMappings : {},

  /**
   * 获取图标对应的FontAwesome
   * @param icon 图标
   */
  getFontAwesome : function(icon) {
    var fa = this.mappings[icon];
    if (fa) {
      return '<i class="fa fa-' + fa + '"></i>';
    }

    fa = this.originalMappings[icon];
    if (fa) {
      return fa;
    }

    return '';
  }

};

/**
 * 绑定图标
 */
LK.UI('plugins', 'bindIcon', function(options) {
  $('#lichkin-icons').append('.lichkin-icon-' + options.icon + '{background-image:url("../../res/img/icons/' + options.icon + '.' + ((options.icon == 'loading') ? 'gif' : 'png') + '") !important;}');

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

/**
 * 图标控件
 */
LK.UI('plugins', 'icon', function(options) {
  // 创建控件对象
  var $plugin = $('<span class="lichkin-icon lichkin-icon-' + options.size + '"></span>');

  // 不传图标时即只创建空白控件
  if (options.icon != '') {
    // 设置具体图标
    $plugin.addClass('lichkin-icon-' + options.icon);
    // 设置文字图标
    if (((options.type == null) ? LK.UI.iconType : options.type) == false) {
      $plugin.addClass('lichkin-hidden-icon');// 文字图标环境下隐藏图片图标
      $plugin.append(LK.UI._icon.getFontAwesome(options.icon));
    }
  }

  $plugin.data('LKOPTIONS', options);

  // 返回控件对象
  return $plugin;
}, {
  // 图标大小
  size : 16,
  // 图标
  icon : '',
  // 图标类型
  type : null
});

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
      $icon.append(LK.UI._icon.getFontAwesome(options.icon));
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

// 绑定图标样式
(function() {
  var mappings = {
    'page' : 'file',
    'folder' : 'folder',
    'starter' : 'chevron-circle-down',
    'starter-closed' : 'chevron-circle-up',
    'starter-back' : 'chevron-circle-left',
    'menu-next' : 'caret-right',
    'UNKNOWN' : 'question',
    'SECRECY' : 'user-secret',
    'ALIEN' : 'bug',
    'FEMALE' : 'female',
    'MALE' : 'male',
    'save' : 'save',
    'ok' : 'check',
    'cancel' : 'times',
    'edit' : 'pencil-alt',
    'add' : 'plus',
    'remove' : 'trash-alt',
    'release' : 'arrow-alt-circle-up',
    'upload' : 'upload',
    'lock' : 'lock',
    'unlock' : 'unlock',
    'resetPwd' : 'key',
    'set' : 'cog',
    'eye' : 'eye',
    'cut' : 'cut',
    'search' : 'search',
    'reset' : 'redo-alt',
    'close' : 'times',
    'dropdown' : 'caret-square-down',
    'datepicker' : 'calendar-alt',
    'sysMgmt' : 'cog',
    'roleMgmt' : 'user-secret',
    'userMgmt' : 'user',
    'dictMgmt' : 'book',
    'loginLog' : 'address-book',
    'operLog' : 'book-open',
    'errorLog' : 'times',
    'appMgmt' : 'mobile-alt',
    'appVersionMgmt' : 'code-branch',
    'appBannerMgmt' : 'film',
    'appNewsMgmt' : 'newspaper',
    'appFeedbackMgmt' : 'comment',
    'appScoreMgmt' : 'star',
    'websiteMgmt' : 'desktop',
    'websiteBannerMgmt' : 'film',
    'websiteNewsMgmt' : 'newspaper',
    'orgMgmt' : 'sitemap',
    'compMgmt' : 'building',
    'deptMgmt' : 'suitcase',
    'employeeMgmt' : 'user-friends',
    'workflowMgmt' : 'project-diagram',
    'dictTimeMgmt' : 'clock',
    'employeeAttendance' : 'calendar-check'
  };
  for ( var key in mappings) {
    LK.UI.bindIcon({
      icon : key,
      fontAwesome : mappings[key]
    });
  }
  var originalMappings = {
    'loading' : '<i class="fa fa-spinner fa-spin"></i>',
    'checkbox-checked' : '<span style="position:relative;left:-1px;"><i class="far fa-square" style="position:absolute;left:-7px;top:0px;font-size:16px;"></i><i class="fa fa-check" style="position:absolute;left:-7px;top:0px;font-size:8px;"></i></span>',
    'checkbox-tristate' : '<span style="position:relative;left:-1px;"><i class="far fa-square" style="position:absolute;left:-7px;top:0px;font-size:16px;"></i><i class="fa fa-square" style="position:absolute;left:-7px;top:0px;font-size:8px;"></i></span>',
    'checkbox-unchecked' : '<span style="position:relative;left:-1px;"><i class="far fa-square" style="position:absolute;left:-7px;top:0px;font-size:16px;"></i></span>'
  };
  for ( var key in originalMappings) {
    LK.UI.bindIcon({
      icon : key,
      originalFontAwesome : originalMappings[key]
    });
  }
})();