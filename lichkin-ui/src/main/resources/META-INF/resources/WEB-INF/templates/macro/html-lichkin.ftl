<#include "/_define.ftl"/>

<#macro html css=false,js=true,i18nJs=true,i18nJsAddition=false,iconsJs=true,iconsJsAddition=false>
	<#include "html-lichkin-simple.ftl"/>

	<@html css=css js=js i18nJs=i18nJs i18nJsAddition=i18nJsAddition iconsJs=iconsJs iconsJsAddition=iconsJsAddition;section>
		<#if section="meta">
			<#nested "meta"/>
		</#if>
		<#if section="meta@">
			<#nested "meta@"/>
		</#if>
		<#if section="link">
			<#nested "link"/>
		</#if>
		<#if section="link-bofore-thirdparty">
			<#nested "link-bofore-thirdparty"/>
		</#if>
		<#if section="link-bofore-lichkin">
<#-- 三方控件css -->
<#-- ueditor.css -->
<@lichkin@cssTag url="/webjars/ueditor/themes/default/css/ueditor" />
<#-- cropper.css -->
<@lichkin@cssTag url="/webjars/cropper/cropper" />
			<#nested "link-bofore-lichkin"/>
		</#if>
		<#if section="link-bofore-plugins">
			<#nested "link-bofore-plugins"/>
		</#if>
		<#if section="link-bofore-app">
			<#if webDebug==true || uiDebug==true || uiDev==true><#-- 页面调试状态或UI调试状态或UI开发状态；使用单独文件 -->
<#-- lichkin-plugin-*.css -->
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-cropper" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-map" />
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector" />
			<#else>
<#-- lichkin-plugins-complex.css -->
<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-complex" />
			</#if>
			<#nested "link-bofore-app"/>
		</#if>
		<#if section="link-before-self">
			<#nested "link-before-self"/>
		</#if>
		<#if section="link@">
			<#nested "link@"/>
		</#if>
		<#if section="style">
			<#nested "style"/>
		</#if>
		<#if section="style@">
			<#nested "style@"/>
		</#if>
		<#if section="body-attributes"><#nested "body-attributes"/></#if>
		<#if section="body-content">
			<#nested "body-content"/>
		</#if>
		<#if section="body-content@">
			<#nested "body-content@"/>
		</#if>
		<#if section="javascript-contents-before-links">
			<#nested "javascript-contents-before-links"/>
		</#if>
		<#if section="javascript-contents-before-links@">
			<#nested "javascript-contents-before-links@"/>
		</#if>
		<#if section="javascript-links">
			<#nested "javascript-links"/>
		</#if>
		<#if section="javascript-links-bofore-lichkin">
			<#nested "javascript-links-bofore-lichkin"/>
		</#if>
		<#if section="javascript-links-bofore-thirdparty">
			<#nested "javascript-links-bofore-thirdparty"/>
		</#if>
		<#if section="javascript-links-bofore-plugins">
<#-- 三方控件js -->
<#-- spark-md5.js -->
<@lichkin@jsTag url="/webjars/spark-md5/spark-md5" />
<#-- ueditor.config.js -->
<@lichkin@jsTag url="/webjars/ueditor/ueditor.config" />
<#-- ueditor.js -->
<@lichkin@jsTag url="/webjars/ueditor/ueditor.all" />
<#-- ueditor-i18n.js -->
<@lichkin@jsTag url="/webjars/ueditor/lang/${locale}/${locale}" />
<#-- cropper.js -->
<@lichkin@jsTag url="/webjars/cropper/cropper" />
<#-- amap.js -->
<@lichkin@jsTag url="https://webapi.amap.com/maps?${AmapParams!}" />
			<#nested "javascript-links-bofore-plugins"/>
		</#if>
		<#if section="javascript-links-bofore-app">
			<#if webDebug==true || uiDebug==true || uiDev==true><#-- 页面调试状态或UI调试状态或UI开发状态；使用单独文件 -->
<#-- lichkin-plugin-*.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-cropper" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-map" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector-employee" />
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector-product" />
			<#else>
<#-- lichkin-plugins-complex.js -->
<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-complex" />
			</#if>
			<#nested "javascript-links-bofore-app"/>
		</#if>
		<#if section="javascript-links-bofore-self">
			<#nested "javascript-links-bofore-self"/>
		</#if>
		<#if section="javascript-contents-before-self">
			<#nested "javascript-contents-before-self"/>
		</#if>
		<#if section="javascript-links@">
			<#nested "javascript-links@"/>
		</#if>
		<#if section="javascript-contents-after-links">
			<#nested "javascript-contents-after-links"/>
		</#if>
		<#if section="javascript-contents-after-links@">
			<#nested "javascript-contents-after-links@"/>
		</#if>
	</@html>

</#macro>