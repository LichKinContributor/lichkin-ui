<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {height:150px;padding-left:10px;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">初始化</div>
		<div class="content" id="demo"></div>
		<div class="title">Validator</div>
		<div class="content" id="demo2"></div>
		<div class="title">多行</div>
		<div class="content" id="demo3"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.textbox({$appendTo:$('#demo')});
		LK.UI.textbox({$appendTo:$('#demo'),id:'a'});
		LK.UI.textbox({$appendTo:$('#demo'),name:'a'});
		LK.UI.textbox({$appendTo:$('#demo'),value:'a'});

		LK.UI.textbox({$appendTo:$('#demo2'),validator:true});

		LK.UI.textbox({$appendTo:$('#demo3'),rows:2});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:2,validator:true});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:3});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:3,validator:true});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:4});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:4,validator:true});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:5});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:5,validator:true});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:6});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:6,validator:true});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:7});
		LK.UI.textbox({$appendTo:$('#demo3'),rows:7,validator:true});
	</#if>
</@html>