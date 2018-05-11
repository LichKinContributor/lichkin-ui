;
/**
 * 基于ligerUI实现
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

var providerLigerUI = 'ligerUI';

/**
 * 获取UI控件对象
 */
LK.UI(providerLigerUI, 'getUIPlugin', function(options) {
  var $obj = options.$obj;
  if (options.id != '') {
    $obj = $('#' + options.id);
  }
  if (options.dataId != '') {
    $obj = $('[data-id=' + options.dataId + ']');
  }
  return $.ligerui.get($obj);
});

/**
 * 打开对话框
 * @param options 自定义的参数，具体参数参见lichkin-web.js。
 */
LK.UI(providerLigerUI, 'openDialog', function(options) {
  options.isHidden = false;// 不支持隐藏功能，强制设值。

  options.onClose = options.onBeforeClose;
  options.onClosed = options.onAfterClose;

  options.modal = options.mask;

  if (options.buttons.length == 0) {
    delete options.buttons;
  }

  if (options.id == '') {
    options.id = randomInRange(10000, 99999);
  }

  var url = options.url;
  delete options.url;
  if (url != '') {
    options.content = '';

    var $dlg = $.ligerDialog.open(options);
    LK.loadPage({
      $obj : $($dlg.element).find('.l-dialog-content'),
      url : url
    });
    return $dlg;
  } else {
    return $.ligerDialog.open(options);
  }
});

/**
 * 将对话框激活
 */
LK.UI(providerLigerUI, 'activeDialog', function(options) {
  if (options.dataId != '') {
    options.dataId = 'dlg_' + options.dataId;
  }
  LK.UI.getUIPlugin(options).active();
});
