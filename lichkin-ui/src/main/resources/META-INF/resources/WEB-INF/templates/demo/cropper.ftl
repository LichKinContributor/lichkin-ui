<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {height:250px;padding-left:10px;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">初始化</div>
		<div class="content" id="demo"></div>
		<div class="content" id="demo1"></div>
		<div class="content" id="demo2"></div>
		<div class="content" id="demo3"></div>
		<div class="content" id="demo4"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.cropper({$appendTo:$('#demo'),validator:true});
		LK.UI.cropper({$appendTo:$('#demo')});

		//横向框
		LK.UI.cropper({$appendTo:$('#demo1'),value:'${ctx}/res/img/256_144.png',compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo1'),value:'${ctx}/res/img/144_256.png',compressWidth:144,compressHeight:256});
		LK.UI.cropper({$appendTo:$('#demo1'),value:'${ctx}/res/img/256_256.png',compressWidth:256,compressHeight:256});
		LK.UI.cropper({$appendTo:$('#demo1'),value:'${ctx}/res/img/512_144.png',compressWidth:512,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo1'),value:'${ctx}/res/img/144_512.png',compressWidth:144,compressHeight:512});

		//纵向框
		LK.UI.cropper({$appendTo:$('#demo2'),rows:7,value:'${ctx}/res/img/256_144.png',compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo2'),rows:7,value:'${ctx}/res/img/144_256.png',compressWidth:144,compressHeight:256});
		LK.UI.cropper({$appendTo:$('#demo2'),rows:7,value:'${ctx}/res/img/256_256.png',compressWidth:256,compressHeight:256});
		LK.UI.cropper({$appendTo:$('#demo2'),rows:7,value:'${ctx}/res/img/512_144.png',compressWidth:512,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo2'),rows:7,value:'${ctx}/res/img/144_512.png',compressWidth:144,compressHeight:512});

		LK.UI.cropper({$appendTo:$('#demo3'),cols:1,rows:3,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo3'),cols:1,rows:4,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo3'),cols:1,rows:5,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo3'),cols:1,rows:6,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo3'),cols:1,rows:7,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo3'),cols:1,rows:8,compressWidth:256,compressHeight:144});

		LK.UI.cropper({$appendTo:$('#demo4'),cols:2,rows:3,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo4'),cols:2,rows:4,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo4'),cols:2,rows:5,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo4'),cols:2,rows:6,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo4'),cols:2,rows:7,compressWidth:256,compressHeight:144});
		LK.UI.cropper({$appendTo:$('#demo4'),cols:2,rows:8,compressWidth:256,compressHeight:144});
	</#if>
</@html>