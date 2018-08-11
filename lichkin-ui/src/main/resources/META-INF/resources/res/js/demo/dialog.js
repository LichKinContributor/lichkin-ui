LK.UI.button({
  text : 'btn1',
  click : function() {
    LK.UI.openDialog({
      title : 'tip',
      url : '/dictMgmt/index',
      size : {
        rows : 15,
        cols : 4
      },
      formContent : false
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn1',
  click : function() {
    LK.UI.openDialog({
      title : 'tip'
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn2',
  click : function() {
    LK.UI.openDialog({
      icon : 'tip'
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn3',
  click : function() {
    LK.UI.openDialog({
      title : 'tip',
      icon : 'tip'
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn4',
  click : function() {
    LK.UI.openDialog({
      url : _CTX + '/demo/dialog-embedded'
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn5',
  click : function() {
    LK.UI.openDialog({
      content : '内容'
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn6',
  click : function() {
    LK.UI.openDialog({
      content : '<div style="background-color:black;color:white;">HTML内容</div>'
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn7',
  click : function() {
    LK.UI.openDialog({
      size : {
        width : 300,
        height : 100
      }
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn8',
  click : function() {
    LK.UI.openDialog({
      size : {
        cols : 2,
        rows : 1
      },
      onAfterCreate : function($plugin, $contentBar) {
        LK.UI.form({
          $appendTo : $contentBar,
          plugins : [
              {
                plugin : 'datepicker',
                options : {
                  name : 'tip'
                }
              }, {
                plugin : 'droplist',
                options : {
                  name : 'tip',
                  data : [
                    {
                      text : '男',
                      value : 'MALE'
                    }
                  ]
                }
              }
          ]
        });
      }
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn9',
  click : function() {
    LK.UI.openDialog({
      size : {
        cols : 1,
        rows : 1
      },
      buttons : [
          {
            icon : 'ok',
            text : 'ok',
            cls : 'success'
          }, {
            icon : 'save',
            text : 'save',
            cls : 'warning'
          }, {
            icon : 'cancel',
            text : 'cancel',
            cls : 'danger'
          }
      ]
    });
  }
}).appendTo('body');
LK.UI.button({
  text : 'btn10',
  click : function() {
    LK.UI.openDialog({
      mask : false
    });
  }
}).appendTo('body');

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
}).appendTo('body');

LK.UI.button({
  text : 'btn12',
  click : function() {
    LK.UI.openDialog({
      size : {
        cols : 5,
        rows : 5
      },
      buttons : [
        {
          icon : 'ok',
          text : 'ok',
          cls : 'success',
          click : function() {
            LK.UI.openDialog({
              size : {
                cols : 4,
                rows : 4
              },
              buttons : [
                {
                  icon : 'ok',
                  text : 'ok',
                  cls : 'success',
                  click : function() {
                    LK.UI.openDialog({
                      size : {
                        cols : 1,
                        rows : 1
                      },
                      mask : false
                    });
                    LK.UI.openDialog({
                      size : {
                        cols : 4,
                        rows : 3
                      }
                    });
                    LK.UI.openDialog({
                      size : {
                        cols : 4,
                        rows : 2
                      }
                    });
                    LK.UI.openDialog({
                      size : {
                        cols : 1,
                        rows : 1
                      },
                      mask : false
                    });
                    LK.UI.openDialog({
                      size : {
                        cols : 4,
                        rows : 1
                      }
                    });
                  }
                }
              ]
            });
          }
        }
      ]
    });
  }
}).appendTo('body');