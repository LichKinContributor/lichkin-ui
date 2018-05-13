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
			<@lichkin@cssTag url="/webjars/LichKin-UI/lichkin-${calculateType}${compressSuffix}.css" />
			<#nested "link"/>
		</#if>
		<#if section="style">
			<style>#lichkin-html{padding:0px;margin:0px;border:none;}.lichkin-body{padding:0px;margin:0px;border:none;}</style>
			<style id="lichkin-icons"></style>
			<style>
				<#nested "style"/>
			</style>
		</#if>
		<#if section="body-attributes"><#nested "body-attributes"/></#if>
		<#if section="body-content">
			<#nested "body-content"/></#if>
		<#if section="javascript-contents-before-links">
			let _CTX='${ctx}',_LANG='${locale}',_MAPPING_PAGES='${mappingPages}',_MAPPING_DATAS='${mappingDatas}',_MAPPING_API='${mappingApi}';
			<#nested "javascript-contents-before-links"/>
		</#if>
		<#if section="javascript-links">
			<@lichkin@jsTag url="/webjars/jquery/jquery${compressSuffix}.js"/>
			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin${compressSuffix}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/i18n/${locale}${compressSuffix}.js" />
			<@lichkin@jsTag url="/res/js/i18n/${locale}.js" />
			<@lichkin@jsTag url="/webjars/LichKin-UI/lichkin-${calculateType}${compressSuffix}.js" />
			<#nested "javascript-links"/>
		</#if>
		<#if section="javascript-contents-after-links">
			let $win = $(window), $doc = $(document), $body = $('body');
			LK.UI.icons = ['ALIEN','UNKNOWN','SECRECY','FEMALE','MALE','page','folder','starter','starter-closed','starter-back','menu-next','sysMgmt','roleMgmt','userMgmt','dictMgmt','loginLog','operLog','errorLog','appMgmt','appVersionMgmt','appBannerMgmt','appNewsMgmt','appFeedbackMgmt','appScoreMgmt','websiteMgmt','websiteBannerMgmt','websiteNewsMgmt','orgMgmt','compMgmt','deptMgmt','employeeMgmt','workflowMgmt','dictTimeMgmt','employeeAttendance'];
			LK.UI.icons.fontAwesome = false;
			<#nested "javascript-contents-after-links"/>
			if (!LK.UI.icons.fontAwesome) {
				var $iconsStyle = $('#lichkin-icons');
				$iconsStyle.append('.lichkin-icon .fa, .lichkin-icon .fas{display:none;}');
				for (var i = 0; i < LK.UI.icons.length; i++) {
					var icon = LK.UI.icons[i];
					$iconsStyle.append('.lichkin-icon-' + icon + '{background-image:url("../../res/img/icons/' + icon + '.png") !important;}');
				}
			}
		</#if>
	</@html>
<#else>
	<div id="${mappingUri}" class="lichkin-body" <#nested "body-attributes"/>>
		<#nested "link"/>
		<style>
			<#nested "style"/>
		</style>
		<#nested "body-content"/>
		<#nested "javascript-links"/>
		<script type="text/javascript">
			<#nested "javascript-contents"/>
		</script>
	</div>
</#if>

</#macro>