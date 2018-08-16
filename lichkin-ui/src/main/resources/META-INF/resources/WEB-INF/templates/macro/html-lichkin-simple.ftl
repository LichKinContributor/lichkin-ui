<#include "/_define.ftl"/>

<#macro html type="",css=false,js=true,i18nJs=false,i18nJsAddition=false,iconsJs=false,iconsJsAddition=false>

<#assign _$=_$!"">
<#assign calculateType=type>
<#if type=="" && _$=="">
	<#assign calculateType="web">
</#if>

<#if calculateType!="">
	<#include "html.ftl"/>

	<@html ;section>
		<#if section="DOCTYPE">
			<!DOCTYPE html>
		</#if>
		<#if section="meta">
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
			<#if calculateType=="web">
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
			</#if>
			<#nested "meta"/>
		</#if>
		<#if section="link">
			<link href="${ctx}/res/img/favicon.ico" type="image/x-icon" rel="shortcut icon">
			<@lichkin@cssTag url="/webjars/font-awesome/web-fonts-with-css/css/fontawesome-all" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/themes/default/lichkin-${calculateType}" />
			<#nested "link-bofore-plugins"/>
			<#if webDebug==true>
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-icon" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-text" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-button" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-textbox" />
			<#else>
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-simple" />
			</#if>
			<#nested "link"/>
			<#if css==true>
				<@lichkin@cssTag/>
			</#if>
		</#if>
		<#if section="style">
			<style>#lichkin-html{padding:0px;margin:0px;border:none;}.lichkin-body{padding:0px;margin:0px;border:none;}</style>
			<style id="lichkin-icons"></style>
			<style><#nested "style"/></style>
			<style id="lichkin-themes"></style>
			<style id="lichkin-styles"></style>
		</#if>
		<#if section="body-attributes"><#nested "body-attributes"/></#if>
		<#if section="body-content">
			<#nested "body-content"/>
		</#if>
		<#if section="javascript-contents-before-links">
			let LK={},_CTX='${ctx}',_LANG='${locale}',_MAPPING_PAGES='${mappingPages}',_MAPPING_API='${mappingApi}',_WEB_DEBUG=false,_COMPRESS_SUFFIX='${compressSuffix}',LKI18N={};
			<#if webDebug==true>_WEB_DEBUG=true;</#if>
			<#nested "javascript-contents-before-links"/>
		</#if>
		<#if section="javascript-links">
			<@lichkin@jsTag url="/webjars/jquery/jquery"/>
			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin" />

			<#if webDebug==true>
				<@lichkin@jsTag url="/webjars/LichKin-UI/i18n/${locale}" />
				<#if i18nJs==true>
					<@lichkin@jsTag url="/res/js${mappingUri}/i18n/${locale}" />
				</#if>
				<#if i18nJsAddition==true>
					<@lichkin@jsTag url="/res/js${mappingUri}/i18n/addition/${locale}" />
				</#if>
			<#else>
				<@lichkin@jsTag url="/res/js/i18n/${locale}" />
			</#if>

			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-${calculateType}" />

			<#nested "javascript-links-bofore-plugins"/>
			<#if webDebug==true>
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-core" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-icon" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-text" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-button" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-textbox" />
			<#else>
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-simple" />
			</#if>

			<#nested "javascript-links-after-plugins"/>

			<#if webDebug==true>
				<#if iconsJs==true>
					<@lichkin@jsTag url="/res/js${mappingUri}/icons" />
				</#if>
				<#if iconsJsAddition==true>
					<@lichkin@jsTag url="/res/js${mappingUri}/icons-addition" />
				</#if>
				<@lichkin@jsTag url="/res/js/icons-init" />
			<#else>
				<@lichkin@jsTag url="/res/js/icons" />
			</#if>

			<#nested "javascript-links"/>

			<#if js==true>
				<@lichkin@jsTag/>
			</#if>
		</#if>
		<#if section="javascript-contents-after-links">
			let $win = $(window), $doc = $(document), $body = $('body');
			<#nested "javascript-contents-after-links"/>
		</#if>
	</@html>
<#else>
	<div id="${mappingUri}" class="lichkin-body" <#nested "body-attributes"/>>
		<style><#nested "style"/></style>
		<#nested "body-content"/>
		<#if js==true>
			<@lichkin@jsTag/>
		</#if>
	</div>
</#if>

</#macro>