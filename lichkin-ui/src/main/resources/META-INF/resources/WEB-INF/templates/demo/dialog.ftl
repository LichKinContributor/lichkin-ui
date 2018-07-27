<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="body-content">
		<div id="buttons"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.button({text:'设置标题',click:function(){
			LK.UI.openDialog({title:'tip'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'设置图标',click:function(){
			LK.UI.openDialog({icon:'tip'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'设置图标标题',click:function(){
			LK.UI.openDialog({title:'tip',icon:'tip'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'使用地址加载内嵌页面',click:function(){
			LK.UI.openDialog({url:'/demo/dialog-embedded'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'使用内容直接渲染对话框',click:function(){
			LK.UI.openDialog({content:'内容'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'使用HTML内容直接渲染对话框',click:function(){
			LK.UI.openDialog({content:'<div style="background-color:black;color:white;">HTML内容</div>'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'使用地址加载内嵌页面-通过width/height设置大小',click:function(){
			LK.UI.openDialog({size:{width:300,height:100}});
		}}).appendTo('#buttons');
		LK.UI.button({text:'使用地址加载内嵌页面-通过cols/rows设置大小',click:function(){
			LK.UI.openDialog({size:{cols:1,rows:1}});
		}}).appendTo('#buttons');
		LK.UI.button({text:'设置按钮',click:function(){
			LK.UI.openDialog({buttons:[{icon:'ok',text:'确定',cls:'success'},{icon:'save',text:'保存',cls:'warning'},{icon:'cancel',text:'取消',cls:'danger'}]});
		}}).appendTo('#buttons');
		LK.UI.button({text:'不带遮罩',click:function(){
			LK.UI.openDialog({mask:false});
		}}).appendTo('#buttons');
	</#if>
</@html>