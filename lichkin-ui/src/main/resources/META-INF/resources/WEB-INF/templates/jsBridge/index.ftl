<#include "/macro/html-lichkin-simple.ftl"/>

<@html css=true js=true i18nJs=true i18nJsAddition=false iconsJs=false iconsJsAddition=false;section>
	<#if section="javascript-contents-before-self">
/* 页面 */
$('<div class="Title" style="background-color:#2e6da4;"></div>').appendTo($body).append(LK.UI.text({
  text : 'Page',
  style : {
    color : '#ffffff'
  }
}));
LK.UI.form({
  $appendTo : true,
  plugins : [
      {
        plugin : 'textbox',
        options : {
          name : 'webDebug',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'uiDebug',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'uiDev',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'ctx',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'locale',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'compressSuffix',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : '_$',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'jsBridge',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'jsBridgeTest',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'calculateType',
          readonly : true,
        }
      },
  ],
  values : {
  	'webDebug' : '${webDebug?c}',
  	'uiDebug' : '${uiDebug?c}',
  	'uiDev' : '${uiDev?c}',
  	'ctx' : '${ctx}',
  	'locale' : '${locale}',
  	'compressSuffix' : '${compressSuffix}',
  	'_$' : '${_$}',
  	'jsBridge' : '${jsBridge}',
  	'jsBridgeTest' : '${jsBridgeTest}',
  	'calculateType' : '${calculateType}',
  }
});
	</#if>
</@html>