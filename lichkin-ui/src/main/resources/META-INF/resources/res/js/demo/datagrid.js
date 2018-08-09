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
  url : '/L/SysDictionary',
  param : {
    categoryCode : 'nation'
  },
  $appendTo : $('#demo'),
  multiSelect : true,
  title : 'category',
  icon : 'page',
  titleTools : [
      {
        icon : 'tip',
        click : function() {
          console.log(arguments);
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
  tools : [
      {
        icon : 'add',
        click : function() {
          console.log(arguments);
        }
      }, {
        icon : 'edit',
        click : function() {
          alert();
        }
      }, {
        icon : 'remove',
        click : function() {
          alert();
        }
      }
  ],
  toolsAdd : {
    saveUrl : '/I/SysDictionary',
    dialog : {
      size : {
        cols : 1,
        rows : 3
      }
    },
    form : {
      plugins : [
          {
            plugin : 'textbox',
            textKey : 'tip',
            options : {
              name : 'dictName',
              validator : true
            }
          }, {
            plugin : 'textbox',
            textKey : 'tip',
            options : {
              name : 'dictCode',
              validator : true
            }
          }, {
            plugin : 'numberspinner',
            textKey : 'tip',
            options : {
              name : 'orderId',
              value : 0
            }
          }, {
            plugin : 'hidden',
            textKey : 'tip',
            options : {
              name : 'categoryCode',
              value : 'nation',
              validator : true
            }
          }

      ]
    }
  },
  toolsEdit : {
    saveUrl : '/U/SysDictionary',
    dialog : {
      size : {
        cols : 1,
        rows : 2
      }
    },
    form : {
      url : '/O/SysDictionary',
      plugins : [
          {
            plugin : 'textbox',
            textKey : 'tip',
            options : {
              name : 'dictName',
              validator : true
            }
          }, {
            plugin : 'numberspinner',
            textKey : 'tip',
            options : {
              name : 'orderId'
            }
          }, {
            plugin : 'hidden',
            textKey : 'tip',
            options : {
              name : 'categoryCode',
              value : 'nation',
              validator : true
            }
          }

      ]
    }
  },
  toolsRemove : {
    saveUrl : '/U/SysDictionary/UsingStatus'
  },
  cols : 6,
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
            categoryCode : 'APP_KEY'
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
        'name' : 'dictCode',
        'text' : 'dictCode',
        'width' : '200'
      }, {
        'name' : 'dictName',
        'text' : 'dictName',
        'width' : '200'
      }, {
        'name' : 'orderId',
        'text' : 'orderId',
        'width' : '200'
      }
  ]
});