$.extend(LK.i18n, {
  'category' : '类目',
  'categoryCode' : '类目编码',
  'categoryName' : '类目名称',
  'busAppKey' : '客户端唯一标识',
  'busClientType' : '客户端类型',
  'versions' : '客户端版本号',
  'startTime' : '开始时间',
  'textbox' : '文本框',
  'droplist' : '下拉框',
  'numberspinner' : '数字微调器'

});

LK.UI.datagrid({
  url : '/L/SysCategory',
  valueFieldName : 'categoryCode',
  $appendTo : $('#demo'),
  multiSelect : true,
  title : 'category',
  icon : 'page',
  titleTools : [
      {
        icon : 'tip',
        click : function() {
          alert();
        }
      }, {
        icon : 'warning',
        click : function() {
          alert();
        }
      }, {
        icon : 'page',
        click : function() {
          alert();
        }
      }
  ],
  searchForm : [
      {
        plugin : 'textbox',
        options : {
          name : 'textbox'
        }
      }, {
        plugin : 'datepicker',
        options : {
          name : 'startTime'
        }
      }, {
        plugin : 'numberspinner',
        options : {
          name : 'numberspinner'
        }
      }, {
        plugin : 'droplist',
        options : {
          name : 'busAppKey',
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
      }
  ],
  value : 'USING_STATUS#@#GENDER',
  columns : [
    {
      'name' : 'categoryCode',
      'text' : 'categoryCode',
      'width' : '200'
    }
  ]
});