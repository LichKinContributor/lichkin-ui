<#include "/_define.ftl"/>

<#macro html css=false,js=true,i18nJs=false,i18nJsAddition=false,iconsJs=false,iconsJsAddition=false>

<#assign _$=_$!"">
<#assign jsBridge=jsBridge!"">

<#assign calculateType="">
<#if _$=="">
	<#if jsBridge=="">
		<#assign calculateType="web">
	<#else>
		<#assign calculateType="app">
	</#if>
</#if>

<#if calculateType!="">
	<#include "html.ftl"/>
	<#if ctx="/ui">
		<#assign webDebug=true>
		<#assign compressSuffix="">
	</#if>

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
			<@lichkin@cssTag url="/webjars/LichKin-UI/themes/default/lichkin-web" />
			<#if calculateType=="app">
			<@lichkin@cssTag url="/webjars/LichKin-UI/themes/default/lichkin-app" />
			</#if>
			<@lichkin@cssTag url="/webjars/datepicker/datepicker" />
			<@lichkin@cssTag url="/webjars/timepicker/timePicker" />
			<#nested "link-bofore-plugins"/>
			<#if webDebug==true>
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-icon" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-text" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-button" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-textbox" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-droplist" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datepicker" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-timepicker" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-numberspinner" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-tree" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datagrid" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form" />
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog" />
			<#else>
				<@lichkin@cssTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-simple" />
			</#if>
			<#if ctx!="/ui">
				<@lichkin@cssTag url="/res/css/app" />
			</#if>
			<#nested "link"/>
			<#if css==true>
				<@lichkin@cssTag/>
			</#if>
			<#nested "link-after-self"/>
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
			let LK = {
			  /**
			   * 转换为标准路径，即使用/作为分隔符，并以/开头，不以/结尾。
			   * @param path 路径
			   * @return 标准路径
			   */
			  toStandardPath : function(path) {
			    if (typeof path == 'undefined' || '' == path || '/' == path) {
			      return '';
			    }
			    path = path.replace(new RegExp("\\\\"), '/');
			    if (!path.startsWith('/')) {
			      path = '/' + path;
			    }
			    if (path.endsWith('/')) {
			      path = path.substring(0, path.lastIndexOf('/'));
			    }
			    return path;
			  }
			};

			// 转为标准路径
			let _CTX = LK.toStandardPath('${ctx}');
			let _RES = _CTX + '/res';
			let _JS = _RES + '/js';
			let _CSS = _RES + '/css';
			let _IMG = _RES + '/img';

			// 其它服务器参数
			_LANG='${locale}',_MAPPING_PAGES='${mappingPages}',_MAPPING_API='${mappingApi}',_WEB_DEBUG=false,_COMPRESS_SUFFIX='${compressSuffix}',LKI18N={};
			<#if webDebug==true>_WEB_DEBUG=true;</#if>
			<#nested "javascript-contents-before-links"/>
		</#if>
		<#if section="javascript-links">
			<@lichkin@jsTag url="/webjars/jquery/jquery"/>
			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/i18n/${locale}" />

			<#if webDebug==true>
				<#if i18nJs==true>
					<@lichkin@jsTag url="/res/js${mappingUri}/i18n/${locale}" />
				</#if>
			<#else>
				<@lichkin@jsTag url="/res/js/i18n/${locale}" />
			</#if>

			<#if i18nJsAddition==true>
				<@lichkin@jsTag url="/res/js${mappingUri}/i18n/addition/${locale}" />
			</#if>

			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-${calculateType}" />

			<#nested "javascript-links-bofore-plugins"/>
			<@lichkin@jsTag url="/webjars/datepicker/datepicker" />
			<@lichkin@jsTag url="/webjars/datepicker/i18n/datepicker.${locale}" />
			<@lichkin@jsTag url="/webjars/timepicker/jquery-timepicker" />
			<#if webDebug==true>
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
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-datagrid" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-form" />
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugin-dialog" />
			<#else>
				<@lichkin@jsTag url="/webjars/LichKin-UI/plugins/lichkin-plugins-simple" />
			</#if>

			<#nested "javascript-links-after-plugins"/>

			<#if webDebug==true>
				<#if iconsJs==true>
					<@lichkin@jsTag url="/res/js${mappingUri}/icons" />
				</#if>
			<#else>
				<@lichkin@jsTag url="/res/js/icons" />
			</#if>

			<#if iconsJsAddition==true>
				<@lichkin@jsTag url="/res/js${mappingUri}/icons-addition" />
			</#if>

			<@lichkin@jsTag url="/res/js/icons-init" />

			<#nested "javascript-links"/>

            <script type="text/javascript">
              var serverDatas = JSON.parse('${serverDatasJson}');
            </script>
			<#if ctx!="/ui">
            	<@lichkin@jsTag url="/res/js/app" />
			</#if>
			<#if js==true>
				<@lichkin@jsTag/>
			</#if>

            <#if calculateType!="app">
            <script type="text/javascript">
              if (typeof window['${mappingUri}'.replace(/\//g,'_')] != 'undefined') {
                window['${mappingUri}'.replace(/\//g,'_')](serverDatas);
              }
            </script>
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
        <script type="text/javascript">
           window['${mappingUri}' + '_invoke'] = function() {
             var functionName = '${mappingUri}'.replace(/\//g, '_');
             if (typeof window[functionName] != 'undefined') {
               window[functionName](JSON.parse('${serverDatasJson}'));
             } else {
               window[functionName + '_Interval'] = setInterval(function loadPage() {
                 if (typeof window[functionName] != 'undefined') {
                   clearInterval(window[functionName + '_Interval']);
                   window[functionName](JSON.parse('${serverDatasJson}'));
                 }
               }, 100);
             }
           }
        </script>
		<#nested "body-content"/>
		<#if js==true>
			<@lichkin@jsTag/>
		</#if>
	</div>
</#if>

</#macro>