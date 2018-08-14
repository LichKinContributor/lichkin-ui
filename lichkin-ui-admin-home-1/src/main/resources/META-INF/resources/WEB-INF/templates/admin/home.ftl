<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="link">
		<@lichkin@cssTag/>
	</#if>
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
    'dictMgmt':           {cols:4,rows:10},
    'roleMgmt':           {cols:2.5,rows:10},
    'adminMgmt':          {cols:4,rows:20},
    'userMgmt':           {cols:4,rows:20},
    'loginLog':           {cols:4,rows:20},
    'operLog-Admin':      {cols:4,rows:20},
    'operLog-User':       {cols:4,rows:20},
    'operLog-Employee':   {cols:4,rows:20},
    'errorLog':           {cols:4,rows:20},
    'appVersionMgmt':     {cols:4,rows:20},
    'appBannerMgmt':      {cols:4,rows:20},
    'appNewsMgmt':        {cols:4,rows:20},
    'appFeedbackMgmt':    {cols:4,rows:20},
    'appScoreMgmt':       {cols:4,rows:20},
    'websiteBannerMgmt':  {cols:4,rows:20},
    'websiteNewsMgmt':    {cols:4,rows:20},
    'compMgmt':           {cols:4,rows:20},
    'deptMgmt':           {cols:4,rows:20},
    'employeeMgmt':       {cols:4,rows:20},
};
	</#if>
	<#if section="javascript-links-icons">
		<@lichkin@jsTag url="/res/js/admin/home/icons.js" />
	</#if>
</@html>