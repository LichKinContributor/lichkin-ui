<#include "/_define.ftl"/>

<#macro html type="",css=false,js=true,i18nJs=true,i18nJsAddition=false,iconsJs=true,iconsJsAddition=false>
	<#include "html-lichkin-simple.ftl"/>

	<@html type=type css=css js=js i18nJs=i18nJs i18nJsAddition=i18nJsAddition iconsJs=iconsJs iconsJsAddition=iconsJsAddition;section>
		<#if section="meta">
			<#nested "meta"/>
		</#if>
		<#if section="link-bofore-plugins">
			<@lichkin@cssTag url="/webjars/ueditor/themes/default/css/ueditor" />
            <@lichkin@cssTag url="/webjars/cropper/cropper" />
			<#nested "link-bofore-plugins"/>
		</#if>
		<#if section="link">
			<#if webDebug==true>
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-cropper" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector" />
			<#else>
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-complex" />
			</#if>
			<#nested "link"/>
		</#if>
		<#if section="link-after-self">
			<#nested "link-after-self"/>
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
		<#if section="javascript-links-bofore-plugins">
			<@lichkin@jsTag url="/webjars/spark-md5/spark-md5" />
			<@lichkin@jsTag url="/webjars/ueditor/ueditor.config" />
			<@lichkin@jsTag url="/webjars/ueditor/ueditor.all" />
			<@lichkin@jsTag url="/webjars/ueditor/lang/${locale}/${locale}" />
			<@lichkin@jsTag url="/webjars/cropper/cropper" />
			<#nested "javascript-links-bofore-plugins"/>
		</#if>
		<#if section="javascript-links-after-plugins">
			<#if webDebug==true>
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-cropper" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector" />
	
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector-employee" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector-product" />
			<#else>
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-complex" />
			</#if>
			<#nested "javascript-links-after-plugins"/>
		</#if>
		<#if section="javascript-links">
			<#nested "javascript-links"/>
		</#if>
		<#if section="javascript-contents-after-links">
			<#nested "javascript-contents-after-links"/>
		</#if>
	</@html>

</#macro>