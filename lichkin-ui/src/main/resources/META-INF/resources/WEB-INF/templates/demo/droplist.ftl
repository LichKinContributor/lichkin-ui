<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
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
		<div class="title">
			Reload
			<span onclick="$droplist.LKLoad({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}});">reload</span>
			<span onclick="$('#gender').LKLoad({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}});">reload</span>
		</div>
		<div class="content" id="demo3"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.droplist({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}, $appendTo:$('#demo')});
		LK.UI.droplist({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}, $appendTo:$('#demo'), value:'MALE'});
		LK.UI.droplist({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}, $appendTo:$('#demo'), value:'MALE#@#FEMALE', multiSelect:true});

		LK.UI.droplist({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}, $appendTo:$('#demo2'), validator:true});
		LK.UI.droplist({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}, $appendTo:$('#demo2'), multiSelect:true, validator:'required'});

		LK.UI.droplist({url:'/L/SysDictionary/Droplist', param:{categoryCode:'GENDER'}, $appendTo:$('#demo3'), value:'MALE#@#FEMALE', multiSelect:true}).LKLoad();
		var $droplist = LK.UI.droplist({lazy:true, $appendTo:$('#demo3')});
		LK.UI.droplist({lazy:true, $appendTo:$('#demo3'), id:'gender'});
	</#if>
</@html>