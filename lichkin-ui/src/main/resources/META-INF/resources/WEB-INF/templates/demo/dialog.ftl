<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {height:150px;padding-left:10px;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.openDialog({url:'/demo/icon'});
		LK.UI.openDialog({url:'/demo/icon-change',title:'通过width/height设置大小',size:{width:300,height:100}});
		LK.UI.openDialog({url:'/demo/icon-change',title:'通过cols/rows设置大小',size:{cols:1,rows:1}});
	</#if>
</@html>