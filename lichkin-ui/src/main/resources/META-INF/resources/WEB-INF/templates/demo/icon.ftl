<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.content {height:150px;}
		#demo .lichkin-icon i {color:blue;}
		#demo2 .lichkin-icon i {color:orange;}
		#demo4 .lichkin-icon i {color:green;}
		#demo6 .lichkin-icon i {background-color:green;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">设置大小</div>
		<div class="content" id="demo"></div>
		<div class="title">文字图标</div>
		<div class="content" id="demo2"></div>
		<div class="title">图片图标</div>
		<div class="content" id="demo3"></div>
		<div class="title">组合图标-文字图标</div>
		<div class="content" id="demo4"></div>
		<div class="title">组合图标-图片图标</div>
		<div class="content" id="demo5"></div>
		<div class="title">简写代码</div>
		<div class="content" id="demo6"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.icon({size:16,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:24,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:32,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:40,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:48,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:56,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:64,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:72,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:80,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:88,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:96,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:104,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:112,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:120,icon:'sysMgmt',type:false}).appendTo('#demo');
		LK.UI.icon({size:128,icon:'sysMgmt',type:false}).appendTo('#demo');

		LK.UI.icon({size:32,icon:'page',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'folder',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'starter',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'starter-closed',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'starter-back',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'menu-next',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'UNKNOWN',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'SECRECY',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'ALIEN',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'FEMALE',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'MALE',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'tip',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'warning',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'save',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'ok',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'cancel',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'edit',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'add',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'remove',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'release',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'upload',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'lock',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'unlock',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'resetPwd',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'view',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'cut',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'search',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'reset',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'close',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'dropdown',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'datepicker',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'spinner-plus',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'spinner-minus',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'sysMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'roleMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'userMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'dictMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'loginLog',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'operLog',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'errorLog',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'appMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'appVersionMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'appBannerMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'appNewsMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'appFeedbackMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'appScoreMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'websiteMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'websiteBannerMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'websiteNewsMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'orgMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'compMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'deptMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'employeeMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'workflowMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'dictTimeMgmt',type:false}).appendTo('#demo2');
		LK.UI.icon({size:32,icon:'employeeAttendance',type:false}).appendTo('#demo2');

		LK.UI.icon({size:32,icon:'page',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'folder',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'starter',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'starter-closed',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'starter-back',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'menu-next',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'UNKNOWN',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'SECRECY',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'ALIEN',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'FEMALE',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'MALE',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'tip',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'warning',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'save',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'ok',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'cancel',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'edit',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'add',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'remove',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'release',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'upload',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'lock',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'unlock',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'resetPwd',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'view',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'cut',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'search',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'reset',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'close',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'dropdown',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'datepicker',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'spinner-plus',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'spinner-minus',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'sysMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'roleMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'userMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'dictMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'loginLog',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'operLog',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'errorLog',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'appMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'appVersionMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'appBannerMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'appNewsMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'appFeedbackMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'appScoreMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'websiteMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'websiteBannerMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'websiteNewsMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'orgMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'compMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'deptMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'employeeMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'workflowMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'dictTimeMgmt',type:true}).appendTo('#demo3');
		LK.UI.icon({size:32,icon:'employeeAttendance',type:true}).appendTo('#demo3');

		LK.UI.icon({size:64,icon:'loading',type:false}).appendTo('#demo4');
		LK.UI.icon({size:16,icon:'checkbox-checked',type:false}).appendTo('#demo4');
		LK.UI.icon({size:16,icon:'checkbox-tristate',type:false}).appendTo('#demo4');
		LK.UI.icon({size:16,icon:'checkbox-unchecked',type:false}).appendTo('#demo4');

		LK.UI.icon({size:64,icon:'loading',type:true}).appendTo('#demo5');
		LK.UI.icon({size:16,icon:'checkbox-checked',type:true}).appendTo('#demo5');
		LK.UI.icon({size:16,icon:'checkbox-tristate',type:true}).appendTo('#demo5');
		LK.UI.icon({size:16,icon:'checkbox-unchecked',type:true}).appendTo('#demo5');

		LKUI.icon('sysMgmt',16,false).appendTo('#demo6');
		LKUI.icon('sysMgmt',16).appendTo('#demo6');
		LKUI.icon('sysMgmt').appendTo('#demo6');
	</#if>
</@html>