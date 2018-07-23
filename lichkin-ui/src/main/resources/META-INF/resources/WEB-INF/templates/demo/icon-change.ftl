<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {height:150px;}
		#demo .lichkin-icon i {color:blue;}
		#demo2 .lichkin-icon i {color:green;}
		#demo3 .lichkin-icon i {color:orange;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">
			改变图标
			<span onclick="LK.UI.changeIcon({$icon:$icon,icon:'dictMgmt',type:true});">dictMgmt</span>
			<span onclick="LK.UI.changeIcon({$icon:$icon,icon:'roleMgmt',type:false});">roleMgmt</span>
			<span onclick="LK.UI.changeIcon({$icon:$icon,icon:'userMgmt',type:true});">userMgmt</span>
			<span onclick="LK.UI.changeIcon({$icon:$icon,icon:'compMgmt',type:false});">compMgmt</span>
			<span onclick="LK.UI.changeIcon({$icon:$icon,icon:''});">clear</span>
		</div>
		<div class="content" id="demo"></div>
		<div class="title">
			简写代码1
			<span onclick="$icon2.LKUIicon('change',{icon:'dictMgmt',type:true});">dictMgmt</span>
			<span onclick="$icon2.LKUIicon('change',{icon:'roleMgmt',type:false});">roleMgmt</span>
			<span onclick="$icon2.LKUIicon('change',{icon:'userMgmt',type:true});">userMgmt</span>
			<span onclick="$icon2.LKUIicon('change',{icon:'compMgmt',type:false});">compMgmt</span>
			<span onclick="$icon2.LKUIicon('change',{icon:''});">clear</span>
			<span onclick="$icon2.LKUIicon('clear');">clear</span>
		</div>
		<div class="content" id="demo2"></div>
		<div class="title">
			简写代码2
			<span onclick="$icon3.LKUIicon('change','dictMgmt');">dictMgmt</span>
			<span onclick="$icon3.LKUIicon('change','roleMgmt');">roleMgmt</span>
			<span onclick="$icon3.LKUIicon('change','userMgmt');">userMgmt</span>
			<span onclick="$icon3.LKUIicon('change','compMgmt');">compMgmt</span>
			<span onclick="$icon3.LKUIicon('change');">clear</span>
			<span onclick="$icon3.LKUIicon('clear');">clear</span>
		</div>
		<div class="content" id="demo3"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		var $icon = LKUI.icon('sysMgmt',128).appendTo('#demo');
		var $icon2 = LKUI.icon('sysMgmt',128).appendTo('#demo2');
		var $icon3 = LKUI.icon('sysMgmt',128).appendTo('#demo3');
	</#if>
</@html>