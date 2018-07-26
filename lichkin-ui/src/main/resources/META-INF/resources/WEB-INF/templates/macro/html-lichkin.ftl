<#include "/_define.ftl"/>

<#macro html type="">

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
			<@lichkin@cssTag url="/webjars/font-awesome/web-fonts-with-css/css/fontawesome-all${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/ueditor/themes/default/css/ueditor.css" />
			<@lichkin@cssTag url="/webjars/datepicker/datepicker.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/themes/default/lichkin-${calculateType}${compressSuffix}.css" />
			<#if webDebug==true>
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-icon${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-text${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-button${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-droplist${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-textbox${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datepicker${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog${compressSuffix}.css" />
			<#else>
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugins${compressSuffix}.css" />
			</#if>
			<@lichkin@cssTag url="/res/css/app.css" />
			<#nested "link"/>
		</#if>
		<#if section="style">
			<style>#lichkin-html{padding:0px;margin:0px;border:none;}.lichkin-body{padding:0px;margin:0px;border:none;}</style>
			<style id="lichkin-icons"></style>
			<style>
				<#nested "style"/>
			</style>
			<style>.lichkin-hidden-icon{background-image:none !important;}</style>
		</#if>
		<#if section="body-attributes"><#nested "body-attributes"/></#if>
		<#if section="body-content">
			<#nested "body-content"/>
		</#if>
		<#if section="javascript-contents-before-links">
			let _CTX='${ctx}',_LANG='${locale}',_MAPPING_PAGES='${mappingPages}',_MAPPING_API='${mappingApi}';
			<#nested "javascript-contents-before-links"/>
		</#if>
		<#if section="javascript-links">
			<@lichkin@jsTag url="/webjars/jquery/jquery${compressSuffix}.js"/>
			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/i18n/${locale}${compressSuffix}.js" />
			<@lichkin@jsTag url="/res/js/i18n/${locale}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-${calculateType}${compressSuffix}.js" />
			<#-- 三方 -->
			<@lichkin@jsTag url="/webjars/spark-md5/spark-md5${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/ueditor/ueditor.config.js" />
			<@lichkin@jsTag url="/webjars/ueditor/ueditor.all.js" />
			<@lichkin@jsTag url="/webjars/ueditor/lang/${locale}/${locale}.js" />
			<@lichkin@jsTag url="/webjars/datepicker/datepicker.js" />
			<@lichkin@jsTag url="/webjars/datepicker/i18n/datepicker.${locale}.js" />
			<#if webDebug==true>
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-core${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-icon${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-text${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-button${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-droplist${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-textbox${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datepicker${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog${compressSuffix}.js" />
			<#else>
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugins${compressSuffix}.js" />
			</#if>
			<#nested "javascript-links"/>
		</#if>
		<#if section="javascript-contents-after-links">
			let $win = $(window), $doc = $(document), $body = $('body');
			<#nested "javascript-contents-after-links"/>
		</#if>
	</@html>
<#else>
	<div id="${mappingUri}" class="lichkin-body" <#nested "body-attributes"/>>
		<#nested "body-content"/>
		<#nested "javascript-links"/>
	</div>
</#if>

</#macro>