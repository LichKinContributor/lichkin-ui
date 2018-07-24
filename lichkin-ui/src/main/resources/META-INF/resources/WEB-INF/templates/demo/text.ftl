<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.content {height:150px;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">初始化</div>
		<div class="content" id="demo"></div>
		<div class="title">简写代码</div>
		<div class="content" id="demo2"></div>
		<div class="title">样式</div>
		<div class="content" id="demo3"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.text({text:'文字'}).appendTo('#demo');

		LKUI.text('文字').appendTo('#demo2');

		LK.UI.text({text:'文字',style:{'font-size':'32px','color':'red'}}).appendTo('#demo3');
	</#if>
</@html>