;
/**
 * 基于ligerUI实现
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */

/**
 * 打开对话框
 * @param options 自定义的参数，具体参数参见lichkin-web.js。
 */
LK.UI('ligerUI', 'openDialog', function(options) {
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