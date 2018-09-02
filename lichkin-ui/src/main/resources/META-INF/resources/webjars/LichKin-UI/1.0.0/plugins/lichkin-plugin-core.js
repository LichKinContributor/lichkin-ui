;
/** 常用功能对象 */
var LKUI = {};

/**
 * 添加控件实现代码
 * @param provider 控件提供者
 * @param plugin 控件类型
 * @param func 具体实现方法
 * @param defaultValues 控件所有参数默认值（框架内部实现，自定义实现方法不处理该参数。）
 */
LK.UI = function(provider, plugin, func, defaultValues) {
  // 确定控件提供者
  if (typeof LK.UI['__'] == 'undefined') {
    LK.UI['__'] = {};
  }
  LK.UI['__'][plugin] = provider;

  // 添加解析器
  if (typeof LK.UI[plugin] == 'undefined') {
    LK.UI[plugin] = function(x, y) {
      return LK.UI['_'](plugin, x, y);
    };
  }

  // 添加实现方法
  if (typeof LK.UI[provider] == 'undefined') {
    LK.UI[provider] = {};
  }
  LK.UI[provider][plugin] = func;

  // 添加默认值
  if (provider == 'plugins') {
    LK.UI[plugin].defaultValues = defaultValues;
  }
};

/**
 * 处理UI实现方法（框架内部调用）
 * @param plugin 控件类型
 * @param options 自定义的参数
 */
LK.UI._ = function(plugin, options) {
  // 自动补全默认参数，并且不支持默认参数中未定义的参数。
  var defaultValues = $.extend(true, {}, LK.UI[plugin].defaultValues);
  options = $.extend({}, defaultValues, options);
  for ( var key in options) {
    if (key == 'UI') {
      continue;
    }
    var containsKey = false;
    for ( var defaultKey in defaultValues) {
      if (defaultKey === key) {
        containsKey = true;
        delete defaultValues[defaultKey];
        break;
      }
    }
    if (!containsKey) {
      delete options[key];
    }
  }

  // 调用时显式指定了UI类型，则调用该UI方法。
  var provider = options.UI;
  if (typeof provider != 'undefined') {
    return LK.UI[provider][plugin](options);
  }

  // 使用该控件类型指定的UI实现。
  return LK.UI[LK.UI['__'][plugin]][plugin](options);
};

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 验证表单
   */
  LKValidate : function() {
    var $plugin = this;

    if ($plugin[0].tagName == 'FORM') {
      var flag = true;

      $plugin.find('.lichkin-plugin').each(function() {
        var $subPlugin = $(this);
        var name = $subPlugin.data('LKName');
        if (isString(name) && name != '') {
          if (!$(this).LKValidate()) {
            flag = false;
          }
        }
      });

      return flag;
    }

    var plugin = $plugin.LKGetPluginType();
    var $value = this.LKGetValueObj();// 取控件值对象
    var validator = $value.data('validator');// 取验证器
    if (validator != '') {
      var value = $value.val();// 取控件值
      var validatores = validator.split(',');
      for (var i = 0; i < validatores.length; i++) {
        if (!LK.UI.validator[validatores[i]](value)) {
          $plugin.LKAddPluginClass(plugin, 'invalid');// 验证未通过增加样式
          switch (plugin) {
            case 'droplist':
              $plugin.LKGetPopup().LKAddPluginClass(plugin, 'popup-invalid');
              break;
            case 'ueditor':
              $plugin.data('ue').ready(function() {
                $plugin.find('.edui-default .edui-editor-iframeholder iframe').contents().find('body').css('color', LK.pluginInvalidFontColor);
              });
              break;
          }
          $plugin.parents('.lichkin-form-field:first').addClass('lichkin-form-field-invalid');
          return false;// 验证未通过返回失败
        }
      }
      $plugin.removeClass([
          'lichkin-plugin-invalid', 'lichkin-' + plugin + '-invalid'
      ]);// 验证通过清除样式
      switch (plugin) {
        case 'droplist':
          $plugin.LKGetPopup().removeClass([
              'lichkin-plugin-popup-invalid', 'lichkin-' + plugin + '-popup-invalid'
          ]);
          break;
        case 'ueditor':
          $plugin.data('ue').ready(function() {
            $plugin.find('.edui-default .edui-editor-iframeholder iframe').contents().find('body').css('color', LK.pluginFontColor);
          });
          break;
      }
      $plugin.parents('.lichkin-form-field:first').removeClass('lichkin-form-field-invalid');
    }

    return true;// 验证通过或无验证器返回成功
  },

  /**
   * 获取弹层对象
   */
  LKGetPopup : function() {
    return $('#' + this.attr('id') + '_popup');
  },

  /**
   * 获取控件类型
   */
  LKGetPluginType : function() {
    var plugin = this.data('plugin-type');// 取控件类型
    if (!isString(plugin)) {// 不是控件
      throw 'current jquery object is not a lichkin plugin.';
    }
    return plugin;
  },

  /**
   * 获取控件数据容器对象
   */
  LKGetDataContainer : function() {
    var plugin = this.LKGetPluginType();
    if (plugin == 'droplist') {
      return this.LKGetPopup().find('.lichkin-' + plugin + '-dataContainer');
    } else {
      return this.find('.lichkin-' + plugin + '-dataContainer');
    }
  },

  /**
   * 清空数据
   * @param isCreateEvent 是否为创建是调用
   */
  LKClearDatas : function(isCreateEvent) {
    this.LKGetDataContainer().children().remove();
    this.LKSetValues([], isCreateEvent);
    this.LKSetTexts([]);
  },

  /**
   * 获取控件值对象
   */
  LKGetValueObj : function() {
    var selector = '.lichkin-' + this.LKGetPluginType() + '-value';
    if (this.is(selector)) {
      return this;
    }
    return this.find(selector);
  },

  /**
   * 获取控件值
   */
  LKGetValue : function() {
    if (this.LKGetPluginType() == 'ueditor') {
      return this.data('ue').getContent();
    }
    return this.LKGetValueObj().val();
  },

  /**
   * 设置控件值
   * @param values 值
   * @param isCreateEvent 是否为创建是调用
   */
  LKSetValues : function(values, isCreateEvent) {
    var currentValue = values;
    if (Array.isArray(values)) {
      currentValue = values.join(LK.SPLITOR);
    }
    if (this.LKGetPluginType() == 'ueditor') {
      if (typeof values == 'undefined') {
        currentValue = '';
      }
      var ue = this.data('ue');
      ue.ready(function() {
        ue.setContent(currentValue);
      });
    } else {
      this.LKGetValueObj().val(currentValue);
    }
    if (typeof isCreateEvent == 'undefined' || isCreateEvent != true) {
      this.data('LKOPTIONS').onChange(this, this.LKGetValues(), this.LKGetValue(), currentValue);
    }
  },

  /**
   * 获取控件值
   */
  LKGetValues : function() {
    var value = this.LKGetValue();
    if (value == '') {
      return [];
    }
    return value.split(LK.SPLITOR);
  },

  /**
   * 获取控件显示对象
   */
  LKGetTextObj : function() {
    return this.find('.lichkin-' + this.LKGetPluginType() + '-text');
  },

  /**
   * 获取控件显示值
   */
  LKGetText : function() {
    return this.LKGetTextObj().html();
  },

  /**
   * 设置控件显示值
   * @param texts 显示值数组
   */
  LKSetTexts : function(texts) {
    if (Array.isArray(texts)) {
      this.LKGetTextObj().html(texts.join(','));
    } else if (isString(texts)) {
      this.LKGetTextObj().html(texts);
    }
  },

  /**
   * 获取控件显示值
   */
  LKGetTexts : function() {
    return this.LKGetText().split(',');
  },

  /**
   * 加载数据
   * @param params[url] 数据请求地址
   * @param params[param] 数据请求参数
   * @param params[data] 数据（优先处理数据，没有数据才会尝请求服务器。）
   * @param linkage 联动信息
   */
  LKLoad : function(params, linkage) {
    var options = this.data('LKOPTIONS');

    if (isJSON(params)) {
      if (isString(params.url)) {
        options.url = params.url;
      }

      if (isJSON(params.param)) {
        options.param = params.param;
      }

      if (params.data) {
        options.data = params.data;
      }
    }

    LK.UI.load({
      $plugin : this,
      isCreateEvent : false,
      options : options,
      linkage : linkage
    });
  },

  /**
   * 获取FORM对象
   */
  LKGetForm : function() {
    return this.parents('form').first();
  },

  /**
   * 获取同表单中的控件对象
   * @param name 同一表单下控件值名
   */
  LKGetSiblingPlugin : function(name) {
    return this.LKGetForm().find('[name=' + name + ']').parents('.lichkin-plugin').first();
  },

  /**
   * 获取同表单中的控件对象
   * @param name 同一表单下控件值名
   */
  LKGetSiblingPlugins : function(name) {
    var $plugins = [];
    this.LKGetForm().find('[name=' + name + ']').each(function() {
      $plugins.push($(this).parents('.lichkin-plugin').first());
    });
    return $plugins;
  },

  /**
   * 获取控件值名
   */
  LKGetName : function() {
    return this.LKGetValueObj().attr('name');
  },

  /**
   * 判断是否是这个控件
   * @param name 同一表单下控件值名
   */
  LKis : function(name) {
    return this.LKGetName() == name;
  },

  /**
   * 触发联动
   * @param linkageCurrentValue 触发联动的控件当前值
   * @param isCreateEvent 是否为初始化事件
   */
  LKlinkage : function(linkageCurrentValue, isCreateEvent) {
    var linkages = this.data('LKOPTIONS').linkages;
    var linkagesLength = linkages.length;
    if (linkagesLength != 0) {
      var $linkage = this;
      var linkageName = this.LKGetName();
      var linkageValues = this.LKGetValues();
      var linkageValue = this.LKGetValue();
      var linkage = {
        $linkage : $linkage,
        linkageName : linkageName,
        linkageValues : linkageValues,
        linkageValue : linkageValue,
        linkageCurrentValue : linkageCurrentValue,
        isCreateEvent : isCreateEvent
      };
      for (var i = 0; i < linkagesLength; i++) {
        var $plugins = $linkage.LKGetSiblingPlugins(linkages[i]);
        for (var i = 0; i < $plugins.length; i++) {
          var $plugin = $plugins[i];
          $plugin.data('LKOPTIONS').onLinkaged($plugin, linkage);
          $plugin.LKValidate();
        }
      }
    }
  },

  /**
   * 获取实现类对象
   */
  LKGetImplementor : function() {
    return LK.UI['_' + this.LKGetPluginType()];
  },

  /**
   * 调用添加数据方法
   * @param datas 数据集
   */
  LKInvokeAddDatas : function(datas) {
    this.LKGetImplementor().addDatas(this, this.LKGetDataContainer(), datas);
  },

  /**
   * 调用设置值方法
   * @param values 值
   * @param isCreateEvent 是否为创建是调用
   */
  LKInvokeSetValues : function(values, isCreateEvent) {
    if (typeof values == 'undefined') {
      values = [];
    } else if (isString(values)) {
      values = values.split(LK.SPLITOR);
    }
    var plugin = this.LKGetPluginType();
    if (plugin == 'droplist' || plugin == 'datagrid' || plugin == 'tree' || plugin == 'cropper' || plugin == 'selector') {
      this.LKGetImplementor().setValues(this, this.LKGetDataContainer(), values, isCreateEvent);
    } else {
      this.LKSetValues(values, isCreateEvent);
    }
  },

  /**
   * 获取数据集
   */
  LKGetDatas : function() {
    return this.data('LKDatas');
  },

  /**
   * 添加控件样式
   * @param plugin 控件类型
   * @param cls 样式名称
   */
  LKAddPluginClass : function(plugin, cls) {
    this.addClass([
        'lichkin-plugin-' + cls, 'lichkin-' + plugin + '-' + cls
    ]);
    return this;
  },

  /**
   * 获取值控件对应的数据集
   */
  LKGetValueDatas : function() {
    var results = [];
    var values = this.LKGetValues();
    if (values.length != 0) {
      var valueFieldName = this.data('LKOPTIONS').valueFieldName;
      var datas = this.LKGetDatas();
      out: for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < datas.length; j++) {
          if (values[i] == datas[j][valueFieldName]) {
            results.push(datas[j]);
            continue out;
          }
        }
      }
    }
    return results;
  }

});

/**
 * 创建UI控件对象核心参数
 */
LK.UI.coreOptions = {
  /**
   * 创建控件
   * @param id 主键
   * @return 控件对象
   */
  createPlugin : function(id) {
    return null;
  },
  // 控件ID
  id : '',
  // 控件填充到对象
  $appendTo : null,
  // 控件渲染到对象
  $renderTo : null,
  // 国际化前缀
  i18nKey : '',
  // 样式
  cls : null,
  // 样式
  style : {},
  // 属性
  attr : {}
};

/**
 * 创建UI控件对象
 */
LK.UI('plugins', 'plugin', function(options) {
  // 设置id
  var id = options.id = (options.id != '') ? options.id : 'LK_' + randomInRange(100000, 999999);

  // 创建控件
  var $plugin = options.createPlugin(id);

  if (options.$appendTo == true) {
    var $topDialog = $.LKGetTopDialog();
    if ($topDialog) {
      options.$appendTo = $topDialog.find('.lichkin-body');
    } else {
      options.$appendTo = $('body');
    }
  }

  if (options.$appendTo != null) {// 填充对象
    $plugin.appendTo(options.$appendTo);
  } else if (options.$renderTo != null) { // 渲染对象
    $plugin.insertAfter(options.$renderTo);
    options.$renderTo.remove();
  }

  // 增加样式
  if (options.cls != null) {
    $plugin.addClass(options.cls);
  }

  // 设置样式
  if (!$.isEmptyObject(options.style)) {
    $plugin.css(options.style);
  }

  // 设置样式
  if (!$.isEmptyObject(options.attr)) {
    $plugin.attr(options.attr);
  }

  // 返回控件对象
  return $plugin;
}, LK.UI.coreOptions);

/**
 * 创建UI控件对象参数
 */
LK.UI.createOptions = $.extend({},
// @see LK.UI.plugin
LK.UI.coreOptions,
// 控件特有参数
{
  // 只读
  readonly : false,
  // 值对象名称
  name : '',
  // 验证器方法名
  validator : null,
  // 值对象值
  value : null,
  // 是否在表单中
  inForm : false,
  // inForm=true时是否包含field
  withField : true,
  // 表单显示名
  key : null,
  /**
   * 表单显示名替换内容
   * @param regex 正则表达式
   * @param replacement 替换结果
   */
  keyTextReplaces : [],
  // 宽度（特殊情况下使用）
  width : null,
  // 高度（特殊情况下使用）
  height : null,
  // 列数
  cols : 1,
  // 行数
  rows : 1,

  // 联动控件名称（需在同一表单中）
  linkages : [],
  /**
   * 控件被联动事件
   * @param $plugin 当前控件
   * @param linkage[$linkage] 触发联动的控件
   * @param linkage[linkageName] 触发联动的控件表单值名
   * @param linkage[linkageValues] 触发联动的控件值
   * @param linkage[linkageValue] 触发联动的控件值
   * @param linkage[linkageCurrentValue] 触发联动的控件当前值
   */
  onLinkaged : function($plugin, linkage) {
  },
  /**
   * 值改变事件
   * @param $plugin 当前控件
   * @param pluginValues 控件值
   * @param pluginValue 控件值
   * @param currentValue 当前值
   */
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  }
});

/**
 * 创建UI控件对象
 */
LK.UI('plugins', 'create', function(opts) {
  // 创建控件对象的参数
  var options = opts.options;
  // 控件类型
  var plugin = opts.plugin;

  // 设置id
  var id = options.id = (options.id != '') ? options.id : 'LK_' + randomInRange(100000, 999999);

  // 创建UI控件对象
  var $plugin = $('<div id="' + id + '" data-id="' + plugin + '_' + id + '" class="lichkin-plugin lichkin-' + plugin + '" data-plugin-type="' + plugin + '"></div>');

  if (options.readonly == true) {
    $plugin.LKAddPluginClass(plugin, 'readonly');
  }

  var width = options.width;
  if (options.width == null) {
    if (plugin == 'datagrid') {
      width = options.width = options.inForm ? (LK.colWidth * options.cols) + (options.inForm ? (options.cols - 1) * (LK.fieldKeyWidth + LK.leftGap) : 0) - 2 : (LK.leftGap + LK.fieldKeyWidth + LK.colWidth) * options.cols;
    } else {
      width = options.width = (LK.colWidth * options.cols) + (options.inForm ? (options.cols - 1) * (LK.fieldKeyWidth + LK.leftGap) : 0) - 2;
    }
  } else {
    width = options.width = options.width + 2;
  }
  var height = options.height;
  if (options.height == null) {
    if (plugin == 'datagrid') {
      height = options.height = (LK.rowHeight + LK.topGap) * options.rows;
    } else {
      height = options.height = (LK.rowHeight * options.rows) + (options.inForm ? (options.rows - 1) * LK.topGap : 0) - 2;
    }
  } else {
    height = options.height = options.height + 2;
  }

  $plugin.css({
    width : width,
    height : height
  });

  // 验证器转换
  var validator = options.validator = options.validator == null ? '' : (options.validator == true ? 'required' : options.validator);

  // 记录初始化值
  $plugin.data('initValue', options.value);

  // 创建UI控件存值对象
  var $value = $((plugin == 'textbox' || plugin == 'datepicker' || plugin == 'timepicker' || plugin == 'numberspinner') ? '<input type="text" autocomplete="off"' + (plugin == 'datepicker' || plugin == 'timepicker' ? ' readonly="true"' : '') + ' />' : (plugin == 'textarea' ? '<textarea></textarea>' : '<input type="hidden" />')).appendTo($plugin);
  $value.LKAddPluginClass(plugin, 'value');
  $value.attr('name', options.name);
  $value.data({
    'validator' : validator,
    'plugin-type' : plugin
  });
  if (plugin == 'textbox' || plugin == 'datepicker' || plugin == 'timepicker' || plugin == 'textarea' || plugin == 'numberspinner') {
    var textHeight = height - 2 * LK.textPaddingTB;
    var textLineHeight = LK.rowHeight - 2 * LK.textPaddingTB - 2;
    if (textHeight < textLineHeight) {
      textLineHeight = textHeight;
    }
    $value.LKAddPluginClass(plugin, 'text').css({
      'padding' : LK.textPaddingTB + 'px ' + LK.textPaddingLR + 'px',
      'width' : width - 2 * LK.textPaddingLR + 'px',
      'height' : textHeight + 'px',
      'line-height' : textLineHeight + 'px',
      'display' : 'block'
    });
    if (options.readonly == true) {
      $value.attr('readonly', 'readonly');
    }
  }

  // 设置值
  if (plugin != 'ueditor' && options.value != null) {
    $value.val(options.value);
  }

  if (options.$appendTo == true) {
    var $topDialog = $.LKGetTopDialog();
    if ($topDialog) {
      options.$appendTo = $topDialog.find('.lichkin-body');
    } else {
      options.$appendTo = $('body');
    }
  }

  if (options.inForm && options.withField == true) {
    var $field = $('<div class="lichkin-form-field"></div>').appendTo(options.$appendTo);
    $field.css({
      'padding' : LK.topGap + 'px 0px 0px ' + LK.leftGap + 'px'
    });
    if (options.readonly == true) {
      $field.addClass('lichkin-form-field-readonly');
    }

    var keyText = $.LKGetI18NWithPrefix(options.i18nKey, (options.key == null ? options.name : options.key));
    if (options.keyTextReplaces.length != 0) {
      for (var i = 0; i < options.keyTextReplaces.length; i++) {
        var keyTextReplace = options.keyTextReplaces[i];
        keyText = keyText.replace(keyTextReplace.regex, keyTextReplace.replacement);
      }
    }
    var $fieldKey = $('<div class="lichkin-form-field-key"></div>').appendTo($field).append(LK.UI.text({
      original : true,
      text : keyText + ' :'
    })).css('width', LK.fieldKeyWidth);

    var $fieldValue = $('<div class="lichkin-form-field-value"></div>').appendTo($field);
    $plugin.appendTo($fieldValue);
  } else {
    if (options.$appendTo != null) {// 填充对象
      $plugin.appendTo(options.$appendTo);
    } else if (options.$renderTo != null) { // 渲染对象
      $plugin.insertAfter(options.$renderTo);
      options.$renderTo.remove();
    }
  }

  // 联动控件只能是lazy处理
  var $form = $plugin.LKGetForm();// 取FORM对象
  if ($form.length == 1) {// 是表单内控件才处理
    var linkagesData = $form.data('linkages');
    if (options.linkages.length != 0) {// 有联动控件先处理FORM中的数据
      if (typeof linkagesData == 'undefined') {
        linkagesData = options.linkages;
      } else {
        out: for (var i = 0; i < options.linkages.length; i++) {
          var linkageI = options.linkages[i];
          var contains = false;
          for (var i = 0; i < linkagesData.length; i++) {
            if (linkagesData[i] == linkageI) {
              continue out;
            }
          }
          if (!contains) {
            linkagesData.push(linkageI);
          }
        }
      }
      $form.data('linkages', linkagesData);
    }
    if (typeof linkagesData != 'undefined') {
      // 处理lazy
      for (var i = 0; i < linkagesData.length; i++) {
        if ($plugin.LKis(linkagesData[i])) {
          options.lazy = true;
          break;
        }
      }
    }
  }

  // 增加样式
  if (options.cls != null) {
    $plugin.addClass(options.cls);
  }

  // 设置样式
  if (!$.isEmptyObject(options.style)) {
    $plugin.css(options.style);
  }

  // 设置样式
  if (!$.isEmptyObject(options.attr)) {
    $plugin.attr(options.attr);
  }

  // 缓存参数
  $plugin.data('LKOPTIONS', options);
  if (options.inForm == true) {
    $plugin.data('LKName', options.name);
  }

  // 返回控件对象
  return $plugin;
}, {
  // 控件类型
  plugin : '',

  // 创建控件的参数
  options : LK.UI.createOptions

});

/**
 * 加载数据参数
 */
LK.UI.loadOptions = {
  // 延迟加载
  lazy : false,
  // 数据请求地址
  url : '',
  // 数据请求参数
  param : {},
  // 数据（优先处理数据，没有数据才会尝请求服务器。）
  data : null,

  // 事件
  /**
   * 添加数据前
   * @param $plugin 当前控件
   * @param responseDatas 响应数据
   * @param url 请求地址
   * @param param 请求参数
   * @return 待添加的数据
   */
  onBeforeAddDatas : function($plugin, responseDatas, url, param) {
    return responseDatas;
  },
  /**
   * 添加数据后
   * @param $plugin 当前控件
   * @param responseDatas 响应数据
   * @param url 请求地址
   * @param param 请求参数
   */
  onAfterAddDatas : function($plugin, responseDatas, url, param) {
  },
  /**
   * 加载数据失败
   * @param $plugin 当前控件
   * @param ajaxErrorArguments AJAX请求失败参数列表
   * @param url 请求地址
   * @param param 请求参数
   */
  onLoadDatasError : function($plugin, ajaxErrorArguments, url, param) {
  }
};

/**
 * 加载数据
 */
LK.UI('plugins', 'load', function(opts) {
  // 调用本方法具体参数
  var options = opts.options;

  // 延迟加载不处理
  if (opts.isCreateEvent && options.lazy == true) {
    return;
  }

  // 控件对象
  var $plugin = opts.$plugin;

  // 数据方式增加行
  if (options.data != null) {
    $plugin.LKClearDatas(opts.isCreateEvent || (opts.linkage != null && opts.linkage.isCreateEvent == true));
    $plugin.LKInvokeAddDatas(options.data);
    $plugin.data('LKDatas', options.data);
    if (opts.isCreateEvent) {
      var initValue = $plugin.data('initValue');
      if (initValue != null) {
        $plugin.LKInvokeSetValues(initValue, true);
      }
      $plugin.LKlinkage(initValue, true);
    } else {
      if (opts.linkage != null && opts.linkage.isCreateEvent == true) {
        var initValue = $plugin.data('initValue');
        $plugin.LKInvokeSetValues(initValue, true);
        $plugin.LKlinkage(initValue, true);
      }
    }
    $plugin.LKValidate();
    return;
  }

  // 请求方式增加行
  if (options.url != '') {
    LK.ajax({
      url : options.url,
      data : options.param,
      success : function(responseDatas) {
        $plugin.LKClearDatas(opts.isCreateEvent || (opts.linkage != null && opts.linkage.isCreateEvent == true));
        if (responseDatas) {
          responseDatas = options.onBeforeAddDatas($plugin, responseDatas, options.url, options.param);
          $plugin.LKInvokeAddDatas(responseDatas);
          options.onAfterAddDatas($plugin, responseDatas, options.url, options.param);
          $plugin.data('LKDatas', responseDatas);
          if (opts.isCreateEvent) {
            var initValue = $plugin.data('initValue');
            if (initValue != null) {
              $plugin.LKInvokeSetValues(initValue, true);
            }
            $plugin.LKlinkage(initValue, true);
          } else {
            if (opts.linkage != null && opts.linkage.isCreateEvent == true) {
              var initValue = $plugin.data('initValue');
              $plugin.LKInvokeSetValues(initValue, true);
              $plugin.LKlinkage(initValue, true);
            }
          }
        } else {
          $plugin.LKlinkage(null, true);
        }
        $plugin.LKValidate();
      },
      error : function() {
        $plugin.LKClearDatas(opts.isCreateEvent || (opts.linkage != null && opts.linkage.isCreateEvent == true));
        options.onLoadDatasError($plugin, arguments, options.url, options.param);
        $plugin.data('LKDatas', null);
        $plugin.LKlinkage(null, true);
        $plugin.LKValidate();
      }
    });
    return;
  }

  throw 'load must be init with data or url.';
}, {
  // 控件对象
  $plugin : null,
  // 是否为创建是调用
  isCreateEvent : false,
  // 联动信息（被联动时加载数据需要传入，实现类不提供此参数。）
  linkage : null,

  // 创建控件的参数
  options : LK.UI.loadOptions
});

// 验证器集合
LK.UI.validator = {

  /**
   * 必填项验证
   */
  required : function(value) {
    if (value == '') {
      return false;
    }
    return true;
  },

  /**
   * 邮箱验证
   */
  email : function(value) {
    return value == ''
        || new RegExp(
            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i)
            .test(value);
  },

  /**
   * 手机号码验证
   */
  cellphone : function(value) {
    return value == '' || new RegExp(/^[1][0-9]{10}$/).test(value);
  },

  /**
   * 身份证号码验证
   */
  IDCard : function(value) {
    return value == '' || new RegExp(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i).test(value);
  },

  /**
   * url验证
   */
  url : function(value) {
    return value == ''
        || new RegExp(
            /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)
            .test(value);
  }

};
