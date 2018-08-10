<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="link">
		<@lichkin@cssTag/>
	</#if>
	<#if section="style">
	</#if>
	<#if section="body-attributes"></#if>
	<#if section="body-content">
		<div id="lichkin-content-container"></div>
		<div id="lichkin-menus-container">
			<div id="lichkin-menus-container-getted">
				<div id="lichkin-menus-container-getted-ROOT" class="lichkin-menus-container-getted" style="display:block;"></div>
			</div>
		</div>
		<div id="lichkin-menus-container-common"></div>
		<div id="lichkin-task-starter-container"></div>
		<div id="lichkin-tasks-bar">
			<div id="lichkin-tasks-container"></div>
		</div>
	</#if>
	<#if section="javascript-contents-before-links">
var menuSizes = {
    'dictMgmt':           {width:1172,height:495},
    'roleMgmt':           {cols:1,rows:1},
    'userMgmt':           {cols:1,rows:1},
    'loginLog':           {cols:1,rows:1},
    'operLog-Admin':      {cols:1,rows:1},
    'operLog-User':       {cols:1,rows:1},
    'operLog-Employee':   {cols:1,rows:1},
    'errorLog':           {cols:1,rows:1},
    'appVersionMgmt':     {cols:1,rows:1},
    'appBannerMgmt':      {cols:1,rows:1},
    'appNewsMgmt':        {cols:1,rows:1},
    'appFeedbackMgmt':    {cols:1,rows:1},
    'appScoreMgmt':       {cols:1,rows:1},
    'websiteBannerMgmt':  {cols:1,rows:1},
    'websiteNewsMgmt':    {cols:1,rows:1},
    'compMgmt':           {cols:1,rows:1},
    'deptMgmt':           {cols:1,rows:1},
    'employeeMgmt':       {cols:1,rows:1},
};
	</#if>
	<#if section="javascript-links">
		<@lichkin@jsTag/>
	</#if>
</@html>