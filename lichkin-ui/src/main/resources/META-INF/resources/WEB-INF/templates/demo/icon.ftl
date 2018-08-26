<#include "/macro/html-lichkin.ftl"/>

<@html iconsJs=false;section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.content {height:150px;}
	</#if>
	<#if section="body-content">
		<div class="title">文字图标</div>
		<div class="content" id="demo1"></div>
		<div class="title">图片图标</div>
		<div class="content" id="demo2"></div>
		<div class="title">图标比对</div>
		<div class="content" id="demo3"></div>
	</#if>
</@html>