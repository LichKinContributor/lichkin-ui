<#include "/_define.ftl"/>

<#macro html type="",css=false,js=true>
	<#include "html-lichkin-simple.ftl"/>

	<@html type=type css=css js=js;section>
		<#if section="meta">
			<#nested "meta"/>
		</#if>
		<#if section="link-bofore-plugins">
			<@lichkin@cssTag url="/webjars/ueditor/themes/default/css/ueditor.css" />
			<@lichkin@cssTag url="/webjars/datepicker/datepicker.css" />
			<@lichkin@cssTag url="/webjars/timepicker/timePicker.css" />
            <@lichkin@cssTag url="/webjars/cropper/cropper${compressSuffix}.css" />
		</#if>
		<#if section="link">
			<#if webDebug==true>
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-droplist${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datepicker${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-timepicker${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-numberspinner${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-tree${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-cropper${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datagrid${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog${compressSuffix}.css" />
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector${compressSuffix}.css" />
			<#else>
			<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-complex${compressSuffix}.css" />
			</#if>
			<@lichkin@cssTag url="/res/css/app.css" />
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
		<#if section="javascript-links-bofore-plugins">
			<@lichkin@jsTag url="/webjars/spark-md5/spark-md5${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/ueditor/ueditor.config.js" />
			<@lichkin@jsTag url="/webjars/ueditor/ueditor.all.js" />
			<@lichkin@jsTag url="/webjars/ueditor/lang/${locale}/${locale}.js" />
			<@lichkin@jsTag url="/webjars/datepicker/datepicker.js" />
			<@lichkin@jsTag url="/webjars/datepicker/i18n/datepicker.${locale}.js" />
			<@lichkin@jsTag url="/webjars/timepicker/jquery-timepicker.js" />
			<@lichkin@jsTag url="/webjars/cropper/cropper.js" />
		</#if>
		<#if section="javascript-links-after-plugins">
			<#if webDebug==true>
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-droplist${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-ueditor${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datepicker${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-timepicker${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-numberspinner${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-tree${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-cropper${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datagrid${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector${compressSuffix}.js" />

			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-selector-employee${compressSuffix}.js" />
			<#else>
			<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-complex${compressSuffix}.js" />
			</#if>
		</#if>
		<#if section="javascript-links-icons">
			<#nested "javascript-links-icons"/>
		</#if>
		<#if section="javascript-contents-after-links">
			<#nested "javascript-contents-after-links"/>
		</#if>
	</@html>

</#macro>