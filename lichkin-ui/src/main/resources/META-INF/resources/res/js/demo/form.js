$.extend(LK.i18n, {
  'rows14' : '14行',
  'busAppKey' : '客户端唯一标识',
  'busClientType' : '客户端类型',
  'versions' : '客户端版本号',
  'startTime' : '开始时间',
  'content' : '内容',
  'textbox' : '文本框',
  'droplist' : '下拉框',
  'numberspinner' : '数字微调器',
  'datagrid' : '数据表格',
  'categoryCode' : '类目编码',
  'categoryName' : '类目名称'
});

LK.UI.form({
  values : {
    'rows14' : 'fffffffffffffff',
    'busAppKey' : 'com.lichkin.app.android.demo2',
    'busClientType' : 'ANDROID',
    'versions' : '1.0.0',
    'startTime' : '2018-07-26',
    'content' : 'fffffffffffffffff',
    'datagrid' : 'USING_STATUS',
    'textbox' : 'fffff',
    'droplist' : 'MALE',
    'numberspinner' : '123'
  },
  plugins : [
      {
        plugin : 'datagrid',
        options : {
          name : 'datagrid',
          validator : true,
          valueFieldName : 'categoryCode',
          url : '/L/SysCategory',
          $appendTo : $('#demo'),
          columns : [
              {
                'name' : 'categoryCode',
                'text' : 'categoryCode',
                'width' : '200'
              }, {
                'name' : 'categoryName',
                'text' : 'categoryName',
                'width' : '200'
              }
          ]
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'rows14',
          validator : true,
          rows : 14
        }
      }, {
        plugin : 'ueditor',
        options : {
          name : 'content',
          validator : true
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'rows14',
          validator : true,
          rows : 14
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