<#include "/macro/html-lichkin-index.ftl"/>

<@html ;section>
	<#if section="body-content">
		<div class="loginBoxOut">
		  <div class="loginBoxMid">
		    <div class="loginBoxIn">
		      <div class="logoBox"></div>
		      <h1 class="systemName"></h1>
		      <div class="loginNameBox inputBox"></div>
		      <div class="pwdBox inputBox"></div>
		      <div class="loginButtonBox"></div>
		      <div class="copyrightBox"></div>
		    </div>
		  </div>
		</div>
	</#if>
	<#if section="javascript-contents-after-links-bofore-init">
var width = 600;
$('.loginBoxIn').css('width', width);

LK.UI.textbox({
  $appendTo : $('.loginNameBox'),
  validator : true,
  name: 'loginName',
  icon : 'loginName',
  width : width * 0.8
});

LK.UI.textbox({
  $appendTo : $('.pwdBox'),
  validator : true,
  name: 'pwd',
  icon : 'pwd',
  width : width * 0.8
});

var $loginBtn = LK.UI.button({
  $appendTo : $('.loginButtonBox'),
  id : 'loginBtn',
  _text : {
    text : 'loginBtnName'
  },
  cls : 'info'
});

var beforeToHome = function() {
};
	</#if>
	<#if section="javascript-contents-after-links-after-init">
$loginBtn.css('margin-left', (width - $loginBtn.outerWidth()) / 2);
var backgroundIndex = 1;
var backgroundIndexMax = 3;
var changeBackgournd = function() {
  $('.loginBoxOut').css('background-image', 'url(' + _CTX + '/res/img/admin/index/slide_' + backgroundIndex + '.jpg)');
  backgroundIndex++;
  backgroundIndex = backgroundIndex > backgroundIndexMax ? 1 : backgroundIndex;
};
changeBackgournd();
setInterval(changeBackgournd, 5000);
	</#if>
</@html>
