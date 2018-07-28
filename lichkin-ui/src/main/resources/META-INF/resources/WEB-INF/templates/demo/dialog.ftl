<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="body-content">
		<div id="buttons"></div>
	</#if>
	<#if section="javascript-contents-after-links">
		$.extend(LK.i18n, {
		  'textarea' : '多行文本框',
		  'busAppKey' : '客户端唯一标识',
		  'busClientType' : '客户端类型',
		  'versions' : '客户端版本号',
		  'startTime' : '开始时间',
		  'content' : '内容',
		  'textbox' : '文本框',
		  'droplist' : '下拉框',
  	      'numberspinner' : '数字微调器'
		});
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
			btn11:'混合form',
			btn12:'遮罩测试',
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
			LK.UI.openDialog({size:{cols:2,rows:1},onAfterCreate:function($plugin, $contentBar){LK.UI.form({$appendTo:$contentBar,plugins:[{plugin:'datepicker',options:{name:'tip'}},{plugin:'droplist',options:{name:'tip',data:[{text:'男',value:'MALE'}]}}]});}});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn9',click:function(){
			LK.UI.openDialog({size:{cols:1,rows:1},buttons:[{icon:'ok',text:'ok',cls:'success'},{icon:'save',text:'save',cls:'warning'},{icon:'cancel',text:'cancel',cls:'danger'}]});
		}}).appendTo('#buttons');
		LK.UI.button({text:'btn10',click:function(){
			LK.UI.openDialog({mask:false});
		}}).appendTo('#buttons');

		LK.UI.button({
		  text : 'btn11',
		  click : function() {
		    LK.UI.openDialog({
		      size : {
		        cols : 5,
		        rows : 14
		      },
		      onAfterCreate : function($plugin, $contentBar) {
		        LK.UI.form({
		          $appendTo : $contentBar,
		          values : {
		            'busAppKey' : 'com.lichkin.app.android.demo2',
		            'busClientType' : 'ANDROID',
		            'versions' : '1.0.0',
		            'startTime' : '2018-07-26',
		            'content' : 'fffffffffffffffff',
		            'textbox' : 'fffff',
		            'droplist' : 'MALE',
		            'textarea' : 'ffff',
    				'numberspinner' : '123'
		          },
		          plugins : [
		              {
		                plugin : 'ueditor',
		                options : {
		                  name : 'content',
		                  validator : true
		                }
		              }, {
		                plugin : 'textbox',
		                options : {
		                  name : 'textarea',
		                  rows : 7,
		                  validator : true
		                }
		              }, {
		                plugin : 'datepicker',
		                options : {
		                  name : 'startTime',
		                  validator : true
		                }
		              }, {
		                plugin : 'droplist',
		                options : {
		                  name : 'droplist',
		                  validator : true,
		                  data : [
		                    {
		                      text : '男',
		                      value : 'MALE'
		                    }
		                  ]
		                }
		              }, {
		                plugin : 'droplist',
		                options : {
		                  name : 'busAppKey',
		                  validator : true,
		                  url : '/L/SysDictionary/Droplist',
		                  param : {
		                    categoryCode : 'appKey'
		                  },
		                  linkages : [
		                      'busClientType', 'versions'
		                  ]
		                }
		              }, {
		                plugin : 'droplist',
		                options : {
		                  name : 'busClientType',
		                  validator : true,
		                  url : '/L/SysAppVersion/ClientType/Droplist',
		                  linkages : [
		                    'versions'
		                  ],
		                  onLinkaged : function($plugin, linkage) {
		                    switch (linkage.linkageName) {
		                      case 'busAppKey':
		                        if (linkage.linkageValue == '') {
		                          $plugin.LKClearDatas();
		                        } else {
		                          $plugin.LKLoad({
		                            param : {
		                              busAppKey : linkage.linkageValue
		                            }
		                          }, linkage);
		                        }
		                        break;
		                    }
		                  }
		                }
		              }, {
		                plugin : 'droplist',
		                options : {
		                  name : 'versions',
		                  validator : true,
		                  url : '/L/SysAppVersion/Droplist',
		                  onLinkaged : function($plugin, linkage) {
		                    switch (linkage.linkageName) {
		                      case 'busAppKey':
		                        $plugin.LKClearDatas();
		                        break;
		                      case 'busClientType':
		                        if (linkage.linkageValue == '') {
		                          $plugin.LKClearDatas();
		                        } else {
		                          $plugin.LKLoad({
		                            param : {
		                              busAppKey : $plugin.LKGetSiblingPlugin('busAppKey').LKGetValue(),
		                              busClientType : linkage.linkageValue
		                            }
		                          }, linkage);
		                        }
		                        break;
		                    }
		                  }
		                }
		              }, {
		                plugin : 'textbox',
		                options : {
		                  name : 'textbox',
		                  validator : true
		                }
		              }, {
				        plugin : 'numberspinner',
				        options : {
				          name : 'numberspinner',
				          validator : true
				        }
				      }
		          ]
		        });
		      }
		    });
		  }
		}).appendTo('#buttons');

		LK.UI.button({text:'btn12',click:function(){
			LK.UI.openDialog({size:{cols:5,rows:5},buttons:[{icon:'ok',text:'ok',cls:'success',click:function(){
				LK.UI.openDialog({size:{cols:4,rows:4},buttons:[{icon:'ok',text:'ok',cls:'success',click:function(){
					LK.UI.openDialog({size:{cols:1,rows:1},mask:false});
					LK.UI.openDialog({size:{cols:4,rows:3}});
					LK.UI.openDialog({size:{cols:4,rows:2}});
					LK.UI.openDialog({size:{cols:1,rows:1},mask:false});
					LK.UI.openDialog({size:{cols:4,rows:1}});
				}}]});
			}}]});
		}}).appendTo('#buttons');
	</#if>
</@html>