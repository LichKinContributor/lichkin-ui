;
/**
 * 原生JavaScript代码实现，或使用JQuery的代码实现。
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

// 使用浏览器实现
LK.type = 'web';

/**
 * 具体实现方法
 */
LK.web = {

  log : function(options) {
    // IE或Edge浏览器不支持样式输出
    if (!!window.ActiveXObject || 'ActiveXObject' in window || window.navigator.userAgent.toLowerCase().indexOf('edge') > 0) {
      console.log(options.msg);
      return;
    }

    // 其它浏览器使用样式日志输出
    var styles = {
      'verbose' : 'color:#8C8C8C;background-color:#2b2b2b;',
      'debug' : 'color:#CECECE;background-color:#2b2b2b;',
      'info' : 'color:#8BBB00;background-color:#2b2b2b;',
      'warn' : 'color:#E69E0A;background-color:#2b2b2b;',
      'error' : 'color:#FF6B68;background-color:#2b2b2b;',
      'assert' : 'color:#FF0098;background-color:#2b2b2b;'
    };

    if (options.jsonMsg) {
      console.log('%c%s', styles[options.type], options.msg);
    } else {
      console.log('%c%s', styles[options.type], options.msg);
    }
  },

  toast : function(options) {
    var id = setInterval(function() {
      if ($('.lichkin-toast').length == 0) {
        var toast = $('<div class="lichkin-toast"><span>' + options.msg + '</span></div>').appendTo('body');
        toast.fadeIn(500);
        setTimeout(function() {
          toast.fadeOut(500, function() {
            toast.remove();
            clearInterval(id);
          });
        }, options.timeout);
      }
    }, 200);
  },

  alert : function(options, callback) {
    alert(options.msg);
    if (typeof callback == 'function') {
      callback();
    }
  },

  showLoading : function() {
    var loadingId = 'loading_' + randomInRange(10000, 99999);
    if (!isJSON(this.loadingIds)) {
      this.loadingIds = {};
    }
    if (isEmptyJSON(this.loadingIds)) {
      var $loading = $('<div class="lichkin-loading"></div>').appendTo('body');
      var $center = $('<div class="center"></div>').appendTo($loading);
      var $container = $('<div class="container"></div>').appendTo($center);
      for (var i = 2; i <= 10; i++) {
        $container.append('<div class="object" style="-webkit-animation-name:loadingAnimate;-webkit-animation-delay:0.' + (i - 1) + 's;animation-delay:0.' + (i - 1) + 's;"></div>');
      }
      $loading.show();
    }
    this.loadingIds[loadingId] = loadingId;
    return loadingId;
  },

  closeLoading : function(loadingId) {
    delete this.loadingIds[loadingId];
    if (isEmptyJSON(this.loadingIds)) {
      $loading = $('.lichkin-loading');
      if ($loading) {
        $loading.remove();
      }
    }
  }

};

/**
 * 获取UI控件对象
 */
LK.UI('plugins', 'getUIPlugin', function(options) {
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});

/**
 * 文本框
 */
LK.UI('plugins', 'textbox', function(options) {
  // 创建控件对象
  var $plugin = $('<input type="text" class="lichkin-textbox" />');
  if (typeof options.attr != 'undefined') {
    $plugin.attr(options.attr);
  }

  // 渲染控件
  var $obj = $(options.$obj);
  if ($obj) {
    $obj.append($plugin);
  }

  // 返回控件对象
  return $plugin;
}, {
  // 待渲染对象
  $obj : $('body'),
  // HTML标签定义的属性
  attr : {}
});

/**
 * 打开对话框
 */
LK.UI('plugins', 'openDialog', function(options) {
}, {
  // 对话框ID，自动拼接dlg_前缀，存入生成后控件的data-id中。
  id : '',
  // 对话框标题
  title : LK.i18n.dialogTitle,
  // 对话框加载页面地址
  url : '',
  // 是否增加遮罩层
  mask : true,
  // 是否自适应屏幕
  fit : false,
  // 对话框宽度
  width : 640,
  // 对话框高度
  height : 360,
  // 对话框按钮数组
  buttons : [],

  // 事件

  // 页面加载结束后
  onBeforeLoading : function(options, $dlg) {
  },
  // 页面加载结束后
  onAfterLoading : function(options, $dlg) {
  },
  // 对话框被聚焦后
  onFocus : function(options, $dlg) {
  }
});

/**
 * 将对话框激活
 */
LK.UI('plugins', 'activeDialog', function(options) {
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});
