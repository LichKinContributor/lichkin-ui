$.extend(LK.i18n, {
  'rows14' : '14行',
  'busAppKey' : '客户端唯一标识',
  'busClientType' : '客户端类型',
  'versions' : '客户端版本号',
  'startTime' : '开始时间',
  'content' : '内容',
  'textbox' : '文本框'
});

LK.UI.form({
  values : {
    'rows14' : 'fffffffffffffff',
    'busAppKey' : 'com.lichkin.app.android.demo2',
    'busClientType' : 'ANDROID',
    'versions' : '1.0.0',
    'startTime' : '2018-07-26',
    'content' : 'fffffffffffffffff',
    'textbox' : 'fffff'
  },
  plugins : [
      {
        plugin : 'textbox',
        options : {
          name : 'rows14',
          rows : 14
        }
      }, {
        plugin : 'ueditor',
        options : {
          name : 'content'
        }
      }, {
        plugin : 'datepicker',
        options : {
          name : 'startTime'
        }
      }, {
        plugin : 'droplist',
        options : {
          name : 'busAppKey',
          url : '/L/SysDictionary/Droplist',
          param : {
            categoryCode : 'appKey'
          },
          $appendTo : $('#demo'),
          linkages : [
              'busClientType', 'versions'
          ]
        }
      }, {
        plugin : 'droplist',
        options : {
          name : 'busClientType',
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
        }
      }, {
        plugin : 'droplist',
        options : {
          name : 'versions',
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
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'textbox'
        }
      }
  ]
});