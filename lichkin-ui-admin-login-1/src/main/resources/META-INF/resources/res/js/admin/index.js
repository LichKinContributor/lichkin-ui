$(function() {
  var width = 600;

  var $logo = $('<img src="' + _CTX + '/res/img/index/logo.png" />').appendTo('.logoBox');

  var $copyright = LK.UI.text({
    $appendTo : $('.copyrightBox'),
    original : true,
    text : $.LKGetI18N('copyright') + ' &copy;' + $.LKGetI18N('COPYRIGTH') + ' 2018-' + new Date().getFullYear()
  });

  $('.loginBoxIn').css('width', width);

  var $loginName = LK.UI.textbox({
    $appendTo : $('.loginNameBox'),
    validator : true,
    icon : 'loginName',
    width : width * 0.8
  });
  $loginName.find('input').attr('placeholder', $.LKGetI18N('loginName'));

  var $pwd = LK.UI.textbox({
    $appendTo : $('.pwdBox'),
    validator : true,
    icon : 'pwd',
    width : width * 0.8
  });
  $pwd.find('input').attr({
    'placeholder' : $.LKGetI18N('pwd'),
    'type' : 'password'
  });

  var $loginBtn = LK.UI.button({
    $appendTo : $('.loginButtonBox'),
    id : 'loginBtn',
    _text : {
      text : 'loginBtnName'
    },
    cls : 'info'
  });
  $loginBtn.css('margin-left', (width - $loginBtn.outerWidth()) / 2);

  $loginBtn.click(function() {
    if ($loginName.LKValidate() && $pwd.LKValidate()) {
      LK.ajax({
        url : '/Admin/AccountLogin',
        data : {
          loginName : $loginName.LKGetValue(),
          pwd : SparkMD5.hash($pwd.LKGetValue())
        },
        success : function() {
          window.location.href = _CTX + "/admin/home" + _MAPPING_PAGES
        }
      });
    }
  });
});

var backgroundIndex = 1;
var backgroundIndexMax = 3;
var changeBackgournd = function() {
  $('.loginBoxOut').css('background-image', 'url(' + _CTX + '/res/img/admin/index/slide_' + backgroundIndex + '.jpg)');
  backgroundIndex++;
  backgroundIndex = backgroundIndex > backgroundIndexMax ? 1 : backgroundIndex;
};
changeBackgournd();
setInterval(changeBackgournd, 5000);
