<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.content {height:150px;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">初始化</div>
		<div class="content" id="demo"></div>
		<div class="title">无图标</div>
		<div class="content" id="demo2"></div>
		<div class="title">无文字</div>
		<div class="content" id="demo3"></div>
		<div class="title">简写代码</div>
		<div class="content" id="demo4"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.button({icon:'tip',text:'tip',click:function(){alert();}}).appendTo('#demo');
		LK.UI.button({text:'tip',click:function(){alert();}}).appendTo('#demo2');
		LK.UI.button({icon:'tip',click:function(){alert();}}).appendTo('#demo3');

		LKUI.button('tip','tip',function(){alert();}).appendTo('#demo4');
		LKUI.button('tip',null,function(){alert();}).appendTo('#demo4');
		LKUI.button('tip','tip',function(){alert();}).appendTo('#demo4');
	</#if>
</@html>