<#macro html type="">

<#include "html-lichkin.ftl"/>
	
<@html "web";section>
	<#if section="meta">
		<#nested "meta"/>
	</#if>
	<#if section="link">
		<@lichkin@cssTag url="${ctx}/webjars/Semantic-UI/2.3.1/semantic${compressSuffix}.css" />
		<@lichkin@cssTag url="${ctx}/webjars/LichKin-UI/1.0.0/lichkin-web-semantic-ui${compressSuffix}.css" />
		<#nested "link"/>
	</#if>
	<#if section="style">
		<#nested "style"/>
	</#if>
	<#if section="body-attributes"><#nested "body-attributes"/></#if>
	<#if section="body-content">
		<#nested "body-content"/>
	</#if>
	<#if section="javascript-links">
		<@lichkin@jsTag url="${ctx}/webjars/Semantic-UI/2.3.1/semantic${compressSuffix}.js"/>
		<@lichkin@jsTag url="${ctx}/webjars/LichKin-UI/1.0.0/lichkin-web-semantic-ui${compressSuffix}.js" />
		<#nested "javascript-links"/>
	</#if>
	<#if section="javascript-contents">
		<#nested "javascript-contents"/>
	</#if>
</@html>

</#macro>