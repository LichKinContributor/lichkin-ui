<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div id="demo"></div>
	</#if>
	<#if section="javascript-links">
		<@lichkin@jsTag />
	</#if>
</@html>