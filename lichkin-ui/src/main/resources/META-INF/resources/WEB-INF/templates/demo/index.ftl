<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {padding-left:10px;}
		.content ul li a {font-size: 20px;}
	</#if>
	<#if section="body-content">
		<div class="title">icon</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">icon</a></li>
				<li><a href="javascript:;">icon-has</a></li>
				<li><a href="javascript:;">icon-change</a></li>
			</ul>
		</div>
		<div class="title">text</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">text</a></li>
			</ul>
		</div>
		<div class="title">button</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">button</a></li>
			</ul>
		</div>
		<div class="title">droplist</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">droplist</a></li>
				<li><a href="javascript:;">droplist-linkage</a></li>
			</ul>
		</div>
		<div class="title">textbox</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">textbox</a></li>
			</ul>
		</div>
		<div class="title">ueditor</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">ueditor</a></li>
			</ul>
		</div>
		<div class="title">datepicker</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">datepicker</a></li>
			</ul>
		</div>
		<div class="title">dialog</div>
		<div class="content">
			<ul>
				<li><a href="javascript:;">dialog</a></li>
			</ul>
		</div>
	</#if>
	<#if section="javascript-contents-after-links">
		$('a').each(function(){
			$(this).click(function(){
				window.open(_CTX + '/demo/' + $(this).html() + _MAPPING_PAGES);
			});
		});
	</#if>
</@html>