<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {height:150px;}
		#demo .lichkin-icon i {color:blue;}
		#demo2 .lichkin-icon i {color:green;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">
			是否含有图标
			<span onclick="alert(LK.UI.hasIcon({$icon:$icon,icon:'sysMgmt'}));">sysMgmt</span>
			<span onclick="alert(LK.UI.hasIcon({$icon:$icon,icon:'dictMgmt'}));">dictMgmt</span>
		</div>
		<div class="content" id="demo"></div>
		<div class="title">
			简写代码
			<span onclick="alert($icon2.LKUIicon('has',{icon:'sysMgmt'}));">sysMgmt</span>
			<span onclick="alert($icon2.LKUIicon('has',{icon:'dictMgmt'}));">dictMgmt</span>
		</div>
		<div class="content" id="demo2"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		var $icon = LKUI.icon('sysMgmt',128).appendTo('#demo');
		var $icon2 = LKUI.icon('sysMgmt',128).appendTo('#demo2');
	</#if>
</@html>