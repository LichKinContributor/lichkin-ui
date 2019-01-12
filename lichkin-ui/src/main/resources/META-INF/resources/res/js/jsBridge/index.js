/* 参数 */
$('<div class="Title"></div>').appendTo($body).append(LK.UI.text({
  text : 'Params',
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
          name : 'appKey',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'clientType',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'versionX',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'versionY',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'versionZ',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'token',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'compToken',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'uuid',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'screenWidth',
          readonly : true,
        }
      }, {
        plugin : 'textbox',
        options : {
          name : 'screenHeight',
          readonly : true,
        }
      }
  ],
  values : serverDatas
});

/* 交互 */
$('<div class="Title Title2"></div>').appendTo($body).append(LK.UI.text({
  text : 'JsBridge',
  style : {
    color : '#ffffff'
  }
}));
var addCodeBox = function(func) {
  var $box = $('<div class="code-box"></div>').appendTo($body);
  LK.UI.button({
    $appendTo : $box,
    text : 'Code',
    click : function($plugin) {
      LK.UI.openDialog({
        title : 'Code',
        icon : 'tip',
        mask : true,
        size : {
          width : $body.width() - 4,
          rows : 4
        },
        onAfterCreate : function($dialog, $contentBar) {
          var funcStr = func.toString().trim();
          var Code = funcStr.substring(funcStr.indexOf('function() {') + 'function() {'.length, funcStr.length - 1).trim();
          $contentBar.append(LK.UI.textbox({
            rows : 4,
            width : $contentBar.width() - 2,
            height : $contentBar.height() - 2,
            style : {
              border : 'none'
            },
            value : Code
          }));
        }
      });
    }
  });
  LK.UI.button({
    $appendTo : $box,
    text : 'Execute',
    click : function($plugin) {
      func();
    }
  });
};
var addCode = function(text, funcArr) {
  $('<div class="Title SubTitle"></div>').appendTo($body).append(LK.UI.text({
    text : text,
    style : {
      color : '#ffffff'
    }
  }));
  for (var i = 0; i < funcArr.length; i++) {
    addCodeBox(funcArr[i]);
  }
};

/* Reload */
addCode('Reload', [
  function() {
    LK.reload();
  }
]);

/* Log */
addCode('Log', [
    function() {
      LK.log({
        'jsonMsg' : false,
        'msg' : 'verbose',
        'type' : 'verbose'
      });
      LK.log({
        'jsonMsg' : false,
        'msg' : 'debug',
        'type' : 'debug'
      });
      LK.log({
        'jsonMsg' : false,
        'msg' : 'info',
        'type' : 'info'
      });
      LK.log({
        'jsonMsg' : false,
        'msg' : 'warn',
        'type' : 'warn'
      });
      LK.log({
        'jsonMsg' : false,
        'msg' : 'error',
        'type' : 'error'
      });
    }, function() {
      LK.log({
        'jsonMsg' : true,
        'msg' : JSON.stringify({
          'jsonMsg' : 'verbose'
        }),
        'type' : 'verbose'
      });
      LK.log({
        'jsonMsg' : true,
        'msg' : JSON.stringify({
          'jsonMsg' : 'debug'
        }),
        'type' : 'debug'
      });
      LK.log({
        'jsonMsg' : true,
        'msg' : JSON.stringify({
          'jsonMsg' : 'info'
        }),
        'type' : 'info'
      });
      LK.log({
        'jsonMsg' : true,
        'msg' : JSON.stringify({
          'jsonMsg' : 'warn'
        }),
        'type' : 'warn'
      });
      LK.log({
        'jsonMsg' : true,
        'msg' : JSON.stringify({
          'jsonMsg' : 'error'
        }),
        'type' : 'error'
      });
    }
]);

/* Toast */
addCode('Toast', [
    function() {
      LK.toast({
        'jsonMsg' : false,
        'msg' : 'msg'
      });
    }, function() {
      LK.toast({
        'jsonMsg' : true,
        'msg' : JSON.stringify({
          'msg' : 'msg'
        })
      });
    }
]);

/* Alert */
addCode('Alert', [
    function() {
      LK.alert({
        original : true,
        'jsonMsg' : false,
        'msg' : 'msg'
      });
    }, function() {
      LK.alert({
        original : true,
        'jsonMsg' : true,
        'msg' : JSON.stringify({
          'msg' : 'msg'
        })
      });
    }
]);

/* Loading */
addCode('Loading', [
  function() {
    var loadingId = LK.showLoading();
    setTimeout(function() {
      LK.closeLoading(loadingId);
    }, 3000);
  }
]);
