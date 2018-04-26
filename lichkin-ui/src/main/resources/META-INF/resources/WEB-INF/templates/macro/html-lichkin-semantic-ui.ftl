<#macro html type="">

<#include "html-lichkin.ftl"/>
	
<@html "web";section>
	<#if section="meta">
		<#nested "meta"/>
	</#if>
	<#if section="link">
		<@lichkin@cssTag url="/webjars/Semantic-UI/semantic${compressSuffix}.css" />
		<@lichkin@cssTag url="/webjars/LichKin-UI/lichkin-web-semantic-ui${compressSuffix}.css" />
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
		<@lichkin@jsTag url="/webjars/Semantic-UI/semantic${compressSuffix}.js"/>
		<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-web-semantic-ui${compressSuffix}.js" />
		<#nested "javascript-links"/>
	</#if>
	<#if section="javascript-contents">
		<#nested "javascript-contents"/>
	</#if>
</@html>

</#macro>