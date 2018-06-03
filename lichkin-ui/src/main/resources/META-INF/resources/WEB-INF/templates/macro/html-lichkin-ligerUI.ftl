<#macro html type="">

<#include "html-lichkin.ftl"/>
 
<@html "${type}";section>
  	<#if section="meta">
  		<#nested "meta"/>
  	</#if>
  	<#if section="link">
  		<#nested "link"/>
  	</#if>
  	<#if section="style">
  		<#nested "style"/>
  	</#if>
  	<#if section="body-attributes"><#nested "body-attributes"/></#if>
  	<#if section="body-content">
  		<#nested "body-content"/>
  	</#if>
	<#if section="javascript-contents-before-links">
		<#nested "javascript-contents-before-links"/>
	</#if>
  	<#if section="javascript-links">
  		<#nested "javascript-links"/>
  	</#if>
  	<#if section="javascript-contents">
  		<#nested "javascript-contents"/>
  	</#if>
	<#if section="javascript-contents-after-links">
		<#nested "javascript-contents-after-links"/>
	</#if>
  </@html>

</#macro>