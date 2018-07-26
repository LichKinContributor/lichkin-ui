
LK.i18n.busAppKey='客户端唯一标识';
LK.UI.form({
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
          value : 'com.lichkin.app.android.demo2',
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
        }
      }, {
        plugin : 'droplist',
        options : {
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
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'name2'
        }
      }
  ]
});