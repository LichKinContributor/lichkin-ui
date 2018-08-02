<#include "/macro/html-lichkin.ftl"/>

<@html ;section>
	<#if section="style">
		.title {font-size:32px;background-color:black;color:white;padding:5px 0px 5px 20px;}
		.title span {font-size:24px;cursor:pointer;border:1px solid white;margin-left:5px;padding:3px;}
		.content {height:150px;padding-left:10px;}
	</#if>
	<#if section="body-attributes">style="background-color:#CCCCCC;"</#if>
	<#if section="body-content">
		<div class="title">联动（需要在同一表单中）全有值</div>
		<div class="content"><form id="demo"></form></div>
		<div class="title">联动（需要在同一表单中）三级联动无值</div>
		<div class="content"><form id="demo2"></form></div>
		<div class="title">联动（需要在同一表单中）二级联动无值</div>
		<div class="content"><form id="demo3"></form></div>
		<div class="title">联动（需要在同一表单中）一级联动无值</div>
		<div class="content"><form id="demo4"></form></div>
		<div class="title">联动（需要在同一表单中）全无值</div>
		<div class="content"><form id="demo5"></form></div>
	</#if>
	<#if section="javascript-contents-after-links">
		LK.UI.droplist({
		  name : 'busAppKey',
		  value : 'com.lichkin.app.android.demo2',
		  url : '/L/SysDictionary/Droplist',
		  param : {
		    categoryCode : 'appKey'
		  },
		  $appendTo : $('#demo'),
		  linkages : [
		      'busClientType', 'versions'
		  ]
		});

		LK.UI.droplist({
		  name : 'busClientType',
		  value : 'IOS',
		  url : '/L/SysAppVersion/ClientType/Droplist',
		  $appendTo : $('#demo'),
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
		});

		LK.UI.droplist({
		  name : 'versions',
		  value : '1.0.0',
		  url : '/L/SysAppVersion/Droplist',
		  $appendTo : $('#demo'),
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
		});

		LK.UI.droplist({
		  name : 'busAppKey',
		  value : 'com.lichkin.app.android.demo2',
		  url : '/L/SysDictionary/Droplist',
		  param : {
		    categoryCode : 'appKey'
		  },
		  $appendTo : $('#demo2'),
		  linkages : [
		      'busClientType', 'versions'
		  ]
		});

		LK.UI.droplist({
		  name : 'busClientType',
		  value : 'IOS',
		  url : '/L/SysAppVersion/ClientType/Droplist',
		  $appendTo : $('#demo2'),
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
		});

		LK.UI.droplist({
		  name : 'versions',
		  url : '/L/SysAppVersion/Droplist',
		  $appendTo : $('#demo2'),
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
		});

		LK.UI.droplist({
		  name : 'busAppKey',
		  value : 'com.lichkin.app.android.demo2',
		  url : '/L/SysDictionary/Droplist',
		  param : {
		    categoryCode : 'appKey'
		  },
		  $appendTo : $('#demo3'),
		  linkages : [
		      'busClientType', 'versions'
		  ]
		});

		LK.UI.droplist({
		  name : 'busClientType',
		  url : '/L/SysAppVersion/ClientType/Droplist',
		  $appendTo : $('#demo3'),
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
		});

		LK.UI.droplist({
		  name : 'versions',
		  value : '1.0.0',
		  url : '/L/SysAppVersion/Droplist',
		  $appendTo : $('#demo3'),
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
		});

		LK.UI.droplist({
		  name : 'busAppKey',
		  url : '/L/SysDictionary/Droplist',
		  param : {
		    categoryCode : 'appKey'
		  },
		  $appendTo : $('#demo4'),
		  linkages : [
		      'busClientType', 'versions'
		  ]
		});

		LK.UI.droplist({
		  name : 'busClientType',
		  value : 'IOS',
		  url : '/L/SysAppVersion/ClientType/Droplist',
		  $appendTo : $('#demo4'),
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
		});

		LK.UI.droplist({
		  name : 'versions',
		  value : '1.0.0',
		  url : '/L/SysAppVersion/Droplist',
		  $appendTo : $('#demo4'),
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
		});

		LK.UI.droplist({
		  name : 'busAppKey',
		  url : '/L/SysDictionary/Droplist',
		  param : {
		    categoryCode : 'appKey'
		  },
		  $appendTo : $('#demo5'),
		  linkages : [
		      'busClientType', 'versions'
		  ]
		});

		LK.UI.droplist({
		  name : 'busClientType',
		  url : '/L/SysAppVersion/ClientType/Droplist',
		  $appendTo : $('#demo5'),
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
		});

		LK.UI.droplist({
		  name : 'versions',
		  url : '/L/SysAppVersion/Droplist',
		  $appendTo : $('#demo5'),
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
		});
	</#if>
</@html>