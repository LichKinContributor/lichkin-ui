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