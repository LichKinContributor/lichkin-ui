<#include "/_define.ftl"/>

<#macro html css=false,js=true,i18nJs=false,i18nJsAddition=false,iconsJs=false,iconsJsAddition=false>
<#--
	当ctx为ui时，启用UI开发状态。
	1、不使用压缩文件。
	2、不使用合并文件。
	3、取消launcher相关文件的加载。
-->
<#assign uiDev=false>
<#if ctx="/ui">
	<#assign uiDev=true><#-- 启用UI开发状态 -->
	<#assign compressSuffix=""><#-- 不使用压缩文件 -->
</#if>

<#--
	dialog控件加载页面时会设置_$值，以区分是否为内嵌页面。
	1、非内嵌页面：提供所有代码段实现；引入ui框架相关。管理端index页面、管理端main页面使用、其它标准页面使用。
		1.1、非交互页面使用web相关文件。
		1.2、是交互页面使用web相关文件基础上额外引入app相关文件。
		1.3、启用交互调试时（web方式实现交互逻辑，便于开发时脱离客户端独立开发页面。）
	2、是内嵌页面：提供body-attributes、style、body-content代码段实现；支持引入页面对应js文件；管理端其它页面只能在此基础上实现，所有用到的ui框架都在main页面中引入，以降低流量。
-->
<#assign _$=_$!"">
<#assign jsBridge=jsBridge!"">
<#assign jsBridgeTest=jsBridgeTest!"false">
<#assign calculateType="">
<#if _$=="">
	<#if jsBridge=="false">
		<#assign calculateType="web">
	<#else>
		<#assign calculateType="app">
	</#if>
</#if>

<#if calculateType=="app" || calculateType=="web"><#-- 非内嵌页面 -->
	<#include "html.ftl"/>

	<@html ;section>
		<#if section="DOCTYPE">
<#-- DOCTYPE -->
<!DOCTYPE html>
		</#if>
		<#if section="meta">
			<#nested "meta"/>
<#-- meta -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<#-- meta -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
			<#if calculateType=="web"><#-- 标准页面；兼容IE -->
<#-- meta -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
			</#if>
			<#nested "meta@"/>
		</#if>
		<#if section="link">
			<#nested "link"/>
<#-- icon -->
<link href="${ctx}/res/img/favicon.ico" type="image/x-icon" rel="shortcut icon">

			<#nested "link-bofore-thirdparty"/>

<#-- 三方控件css -->
<#-- fontawesome-all.css -->
<@lichkin@cssTag url="/webjars/font-awesome/web-fonts-with-css/css/fontawesome-all" />
<#-- datepicker.css -->
<@lichkin@cssTag url="/webjars/datepicker/datepicker" />
<#-- timePicker.css -->
<@lichkin@cssTag url="/webjars/timepicker/timePicker" />

			<#nested "link-bofore-lichkin"/>

<#-- lichkin-web.css -->
<@lichkin@cssTag url="/webjars/LichKin-UI/themes/default/lichkin-web" />

			<#if calculateType=="app"><#-- 交互页面；额外引入app相关文件 -->
<#-- lichkin-app.css -->
<@lichkin@cssTag url="/webjars/LichKin-UI/themes/default/lichkin-app" />
			</#if>

			<#nested "link-bofore-plugins"/>

			<#if webDebug==true || uiDebug==true || uiDev==true><#-- 页面调试状态或UI调试状态或UI开发状态；使用单独文件 -->
<#-- lichkin-plugin-*.css -->
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-icon" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-text" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-button" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-textbox" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-droplist" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datepicker" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-timepicker" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-numberspinner" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-tree" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datagrid" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog" />
			<#else><#-- 非调试状态；使用合并文件 -->
<#-- lichkin-plugins-simple.css -->
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-simple" />
			</#if>

			<#nested "link-bofore-app"/>

			<#if uiDev!=true><#-- 非UI调试状态；引入launcher相关文件的加载 -->
<#-- app.css -->
<@lichkin@cssTag url="/res/css/app" />
			</#if>

			<#nested "link-before-self"/>

			<#if css==true>
<#-- 页面对应的css -->
<@lichkin@cssTag/>
			</#if>

			<#nested "link@"/>
		</#if>
		<#if section="style">
			<style><#nested "style"/></style>
			<style>#lichkin-html{padding:0px;margin:0px;border:none;}.lichkin-body{padding:0px;margin:0px;border:none;}</style>
			<style id="lichkin-icons"></style>
			<style id="lichkin-themes"></style>
			<style id="lichkin-styles"></style>
			<#nested "style@"/>
		</#if>
		<#if section="body-attributes"><#nested "body-attributes"/></#if>
		<#if section="body-content">
			<#nested "body-content"/>
<#-- lichkin-base.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-base" />
			<#nested "body-content@"/>
		</#if>
		<#if section="javascript-contents-before-links">
			<#nested "javascript-contents-before-links"/>
// 全局变量
let LK = {};
let _CTX = toStandardPath('${ctx}');// 转为标准路径
let _RES = _CTX + '/res';
let _JS = _RES + '/js';
let _CSS = _RES + '/css';
let _IMG = _RES + '/img';

// 其它服务器参数
let _LANG='${locale}',_MAPPING_PAGES='${mappingPages}',_MAPPING_API='${mappingApi}',_WEB_DEBUG=${webDebug?c},_COMPRESS_SUFFIX='${compressSuffix}',_BACK_URL='${backUrl}',LKI18N={};

			<#nested "javascript-contents-before-links@"/>
		</#if>
		<#if section="javascript-links">
			<#nested "javascript-links"/>
<#-- jquery.js -->
<@lichkin@jsTag url="/webjars/jquery/jquery"/>

<script type="text/javascript">
// 全局变量
let $win = $(window), $doc = $(document), $body = $('body');
</script>

			<#nested "javascript-links-bofore-lichkin"/>

<#-- lichkin.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin" />

<#-- lichkin-UI-i18n.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/i18n/${locale}" />

			<#if webDebug==true || uiDebug==true || uiDev==true><#-- 页面调试状态或UI调试状态或UI开发状态；不使用合并文件 -->
				<#if i18nJs==true>
<#-- 页面对应的i18n.js -->
<@lichkin@jsTag url="/res/js${mappingUri}/i18n/${locale}" />
				</#if>

				<#if i18nJsAddition==true>
<#-- 页面对应的i18n-addition.js -->
<@lichkin@jsTag url="/res/js${mappingUri}/i18n/addition/${locale}" />
				</#if>
			<#else>
<#-- 合并的i18n.js -->
<@lichkin@jsTag url="/res/js/i18n/${locale}" />
			</#if>

<#-- lichkin-web.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-web" />

			<#if calculateType=="app"><#-- 交互页面；额外引入app相关文件 -->
<#-- 交互页面；相关调整 -->
<script type="text/javascript">
LK.asApp = true;
LK.pluginFontSize = 13;
LK.fieldKeyWidth = 123;
LK.rowHeight = 36;
</script>
				<#if jsBridgeTest=="false"><#-- 非交互调试；额外引入app相关文件 -->
<#-- lichkin-app.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-app" />
				</#if>
			</#if>

			<#nested "javascript-links-bofore-thirdparty"/>

<#-- 三方控件js -->
<#-- datepicker.js -->
<@lichkin@jsTag url="/webjars/datepicker/datepicker" />
<#-- datepicker-i18n.js -->
<@lichkin@jsTag url="/webjars/datepicker/i18n/datepicker.${locale}" />
<#-- timepicker.js -->
<@lichkin@jsTag url="/webjars/timepicker/jquery-timepicker" />

			<#nested "javascript-links-bofore-plugins"/>

			<#if webDebug==true || uiDebug==true || uiDev==true><#-- 页面调试状态或UI调试状态或UI开发状态；使用单独文件 -->
<#-- lichkin-plugin-*.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-core" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-icon" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-text" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-button" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-textbox" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-droplist" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datepicker" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-timepicker" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-numberspinner" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-tree" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datagrid" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog" />
			<#else>
<#-- lichkin-plugins-simple.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-simple" />
			</#if>

			<#nested "javascript-links-bofore-app"/>

			<#if webDebug==true || uiDebug==true || uiDev==true><#-- 页面调试状态或UI调试状态或UI开发状态；不使用合并文件 -->
				<#if iconsJs==true>
<#-- 页面对应的icons.js -->
<@lichkin@jsTag url="/res/js${mappingUri}/icons" />
				</#if>

				<#if iconsJsAddition==true>
<#-- 页面对应的icons-addition.js -->
<@lichkin@jsTag url="/res/js${mappingUri}/icons-addition" />
				</#if>
			<#else>
<#-- 合并的icons.js -->
<@lichkin@jsTag url="/res/js/icons" />
			</#if>

<#-- icons-init -->
<@lichkin@jsTag url="/res/js/icons-init" />

<#-- serverDatasJson -->
<script type="text/javascript">
var serverDatas = JSON.parse('${serverDatasJson}');
</script>

			<#if uiDev!=true><#-- 非UI调试状态；引入launcher相关文件的加载 -->
<#-- app.js -->
<@lichkin@jsTag url="/res/js/app" />
			</#if>

			<#nested "javascript-links-bofore-self"/>

<script type="text/javascript">
			<#nested "javascript-contents-before-self"/>
</script>

			<#if js==true>
<#-- 页面对应的js -->
<@lichkin@jsTag/>
			</#if>
			<#nested "javascript-links@"/>
		</#if>
		<#if section="javascript-contents-after-links">
			<#nested "javascript-contents-after-links"/>
			<#nested "javascript-contents-after-links@"/>
		</#if>
	</@html>
<#else><#-- 是内嵌页面 -->
	<div id="${mappingUri}" class="lichkin-body" <#nested "body-attributes"/>>
<#--style--><style><#nested "style"/></style>
			<#nested "body-content"/>
		<#if js==true>
<@lichkin@jsTag/>
		</#if>
	</div>
</#if>

</#macro>