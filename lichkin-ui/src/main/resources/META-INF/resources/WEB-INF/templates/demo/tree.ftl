<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {height:300px;padding-left:10px;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">初始化</div>
		<div class="content" id="demo"></div>
		<div class="content" id="demo2"></div>
	</#if>
	<#if section="javascript-links">
		<@lichkin@jsTag />
	</#if>
</@html>