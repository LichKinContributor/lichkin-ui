<#include "/macro/html-lichkin.ftl"/>

<@html "";section>
	<#if section="body-content">
		<div id="buttons"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		$.extend(LK.i18n,{
			btn1:'设置标题',
			btn2:'设置图标',
			btn3:'设置图标标题',
			btn4:'使用地址加载内嵌页面',
			btn5:'使用内容直接渲染对话框',
			btn6:'使用HTML内容直接渲染对话框',
			btn7:'使用地址加载内嵌页面-通过width/height设置大小',
			btn8:'使用地址加载内嵌页面-通过cols/rows设置大小',
			btn9:'设置按钮',
			btn10:'不带遮罩',
		});
		LK.UI.button({text:'btn1',click:function(){
			LK.UI.openDialog({title:'tip'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn2',click:function(){
			LK.UI.openDialog({icon:'tip'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn3',click:function(){
			LK.UI.openDialog({title:'tip',icon:'tip'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn4',click:function(){
			LK.UI.openDialog({url:'/demo/dialog-embedded'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn5',click:function(){
			LK.UI.openDialog({content:'内容'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn6',click:function(){
			LK.UI.openDialog({content:'<div style="background-color:black;color:white;">HTML内容</div>'});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn7',click:function(){
			LK.UI.openDialog({size:{width:300,height:100}});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn8',click:function(){
			LK.UI.openDialog({size:{cols:1,rows:1},onAfterCreate:function($plugin, $contentBar){LK.UI.form({$appendTo:$contentBar,plugins:[{plugin:'droplist',options:{name:'tip',data:[{text:'男',value:'MALE'}]}}]});}});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn9',click:function(){
			LK.UI.openDialog({size:{cols:1,rows:1},buttons:[{icon:'ok',text:'ok',cls:'success'},{icon:'save',text:'save',cls:'warning'},{icon:'cancel',text:'cancel',cls:'danger'}]});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn10',click:function(){
			LK.UI.openDialog({mask:false});
		}}).appendTo('#buttons');
	</#if>
</@html>