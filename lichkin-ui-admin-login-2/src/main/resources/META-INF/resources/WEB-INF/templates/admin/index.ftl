<#include "/macro/html-lichkin-index.ftl"/>

<@html ;section>
	<#if section="body-content">
	  <div class="logoBox"></div>
	  <div class="htmleaf-container">
	    <div class="wrapper">
	      <div class="container">
	        <h1 class="systemName"></h1>
	        <form class="form">
	          <input name="loginName">
	          <input name="pwd">
	          <button type="submit" id="login-button"></button>
	        </form>
	      </div>
	      <ul class="bg-bubbles">
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	        <li></li>
	      </ul>
	    </div>
	  </div>
	  <div class="copyrightBox"></div>
	</#if>
	<#if section="javascript-contents-after-links-bofore-init">
var $loginBtn = $('#login-button');
$loginBtn.html($.LKGetI18N('loginBtnName'));

var beforeToHome = function() {
  $('form').fadeOut(500);
  $('.wrapper').addClass('form-success');
};
	</#if>
</@html>
