LK.home = {};
LK.home.$menusContainer = $('#lichkin-menus-container');
LK.home._menusContainer_width = LK.home.$menusContainer.width();
LK.home._menusContainer_height = LK.home.$menusContainer.height();

LK.home.$menusGettedContainer = $('#lichkin-menus-container-getted');
LK.home.$menusGettedContainerRoot = $('#lichkin-menus-container-getted-ROOT');
LK.home.$menusCommonContainer = $('#lichkin-menus-container-common');
LK.home.$photo = LK.UI.icon({
  $appendTo : LK.home.$menusCommonContainer,
  id : 'lichkin-menu-photo',
  icon : 'loading',
  size : 128
});
LK.home.commonMenus = {
  userInfo : {
    type : 'info',
    click : function() {
      LK.UI.openDialog({
        size : {
          cols : 1,
          rows : 3
        },
        title : 'view',
        icon : 'view',
        mask : true,
        buttons : [
          {
            text : 'cancel',
            icon : 'cancel',
            cls : 'danger',
            click : function($button, $dialog, $contentBar) {
              $dialog.LKCloseDialog();
            }
          }
        ],
        onAfterCreate : function($dialog, $contentBar) {
          LK.ajax({
            url : '/getUserInfo',
            success : function(data) {
              var $form = LK.UI.form({
                $appendTo : $contentBar,
                plugins : [
                    {
                      plugin : 'textbox',
                      options : {
                        name : 'userName',
                        value : data.userName,
                        readonly : true
                      }
                    }, {
                      plugin : 'textbox',
                      options : {
                        name : 'email',
                        value : data.email,
                        readonly : true
                      }
                    }, {
                      plugin : 'textbox',
                      options : {
                        name : 'gender',
                        value : $.LKGetI18N('GENDER', data.gender),
                        readonly : true
                      }
                    }
                ]
              });
            }
          });
        }
      });
    }
  },
  changePwd : {
    type : 'warning',
    click : function() {
      LK.UI.openDialog($.extend({}, {
        size : {
          cols : 1,
          rows : 3
        }
      }, {
        title : 'changePwd',
        icon : 'pwd',
        mask : true,
        buttons : [
            {
              text : 'save',
              icon : 'save',
              cls : 'warning',
              click : function($button, $dialog) {
                var $form = $dialog.find('form');
                if ($form.LKValidate()) {
                  LK.ajax({
                    url : '/U/SysAdminLogin/ModifyPassword',
                    data : {
                      pwdOld : SparkMD5.hash($('input[name=pwdOld]').val()),
                      pwdNew : SparkMD5.hash($('input[name=pwdNew]').val())
                    },
                    showSuccess : true,
                    success : function() {
                      $dialog.LKCloseDialog();
                      LK.alert('pwdModifiedSuccess');
                    }
                  });
                }
              }
            }, {
              text : 'cancel',
              icon : 'cancel',
              cls : 'danger',
              click : function($button, $dialog) {
                $dialog.LKCloseDialog();
              }
            }
        ],
        onAfterCreate : function($dialog, $contentBar) {
          LK.UI.form($.extend({}, {
            plugins : [
                {
                  plugin : 'textbox',
                  options : {
                    name : 'pwdOld',
                    validator : true
                  }
                }, {
                  plugin : 'textbox',
                  options : {
                    name : 'pwdNew',
                    validator : true
                  }
                }, {
                  plugin : 'textbox',
                  options : {
                    name : 'surePwdNew',
                    validator : true
                  }
                }
            ]
          }, {
            $appendTo : $contentBar,
          }));

          $('input[name=pwdOld]').attr({
            'type' : 'password'
          });

          $('input[name=pwdNew]').attr({
            'type' : 'password'
          });

          $('input[name=surePwdNew]').attr({
            'type' : 'password'
          });
        }
      }));
    }
  },
  changeTheme : {
    type : 'primary',
    click : function() {
      var size = 64;
      LK.UI.openDialog({
        title : 'changeTheme',
        mask : true,
        size : {
          width : size * (2 + 1 + Object.keys(LK.extendThemes).length),
          height : size * (2 + 1)
        },
        onAfterCreate : function($dialog, $contentBar) {
          var $container = $('<div></div>').css('padding', size + 'px').appendTo($contentBar);
          var css = {
            'cursor' : 'pointer',
            'width' : size + 'px',
            'height' : size + 'px',
            'float' : 'left'
          };
          $('<div></div>').css(css).css('background-color', LK.defaultTheme.color.primary.border).appendTo($container).click(function() {
            LK.changeTheme();
          });
          for ( var key in LK.extendThemes) {
            (function(key) {
              $('<div></div>').css(css).css('background-color', LK.extendThemes[key].color.primary.border).appendTo($container).click(function() {
                LK.changeTheme(LK.extendThemes[key]);
              });
            })(key);
          }
          $('<div style="clear:both;"></div>').appendTo($container);
        }
      });
    }
  },
  help : {
    type : 'success',
    click : function() {
    }
  },
  fullScreen : {
    type : 'info',
    click : function() {
      toggleFullScreen();
    }
  },
  exit : {
    type : 'danger',
    click : function() {
      window.location.href = _CTX + "/logout" + _MAPPING_PAGES;
    }
  }
};

LK.home.$taskStarterContainer = $('#lichkin-task-starter-container');
LK.home.$taskStarter = LK.UI.icon({
  $appendTo : LK.home.$taskStarterContainer,
  id : 'lichkin-task-starter',
  icon : 'starter',
  size : 32
}).attr('title', $.LKGetI18N('starter-closed'));

LK.home.$tasksContainer = $('#lichkin-tasks-container');
LK.home.currentTasks = new Array();

var toggleFullScreen = function(fullScreen) {
  var $existfullScreen = $('#lichkin-menu-fullScreen');
  if ($existfullScreen.html() == $.LKGetI18N('fullScreen')) {
    $existfullScreen.html($.LKGetI18N('existfullScreen'));
  } else {
    if (typeof fullScreen == 'undefined') {
      $existfullScreen.html($.LKGetI18N('fullScreen'));
    }
  }
  LK.toggleFullScreen(fullScreen);
};

$(function() {
  var fullScreenTip = $.LKGetI18N('fullScreenTip');
  LK.UI.openDialog({
    icon : 'tip',
    title : 'tip',
    content : '<div style="padding:10px;font-size:12px;">' + fullScreenTip + '</div>',
    size : {
      width : 20 + fullScreenTip.length * (_LANG == 'zh_CN' ? 12 : (12 / 2)),
      height : 20 + 12 * 1.5
    },
    onAfterClose : function() {
      toggleFullScreen(true);
    }
  });
  // 菜单显示隐藏控制
  $(document).click(function(e) {
    var target = $(e.target);
    if (target.is(LK.home.$taskStarterContainer) || target.parents('#lichkin-task-starter-container').length != 0) {
      if (LK.home.$menusContainer.is(':visible')) {
        if (LK.home.currentTasks.length == 0) {
          hideMainContainer();
        } else {
          taskGoBack();
        }
      } else {
        showMainContainer();
      }
      return;
    }

    if (target.is(LK.home.$menusContainer) || target.parents('#lichkin-menus-container').length != 0) {
      var menuItem = target;
      if (!target.is('.lichkin-menu-item')) {
        menuItem = target.parents('.lichkin-menu-item:first');
        if (menuItem.length == 0) {
          return;
        }
      }
      var data = menuItem.data('LKData');
      if (typeof data != 'undefined') {
        if (typeof data.params.url == 'undefined' || data.params.url == '') {
          return;
        }
      }
    }

    if (LK.home.$menusContainer.is(':visible')) {
      hideMainContainer();
    }
  });

  // 加载个人信息
  LK.ajax({
    url : '/getUserInfo',
    success : function(datas, options) {
      // 更换头像
      appendGenderPhoto(datas.gender, datas.photo);
    }
  });

  // 加载菜单
  LK.ajax({
    url : '/T/SysMenu/All',
    success : function(datas, options) {
      // 添加应用菜单
      addMenus(datas, LK.home.$menusGettedContainerRoot);

      // 添加其它通用菜单
      addCommonMenus();
    }
  });
});

/**
 * 添加头像
 * @param gender 性别
 * @param photoUrl 头像地址
 */
var appendGenderPhoto = function(gender, photoUrl) {
  var width = LK.home.$photo.width();
  LK.home.$photo.animate({
    'width' : '1px'
  }, 'slow', function() {
    if (photoUrl) {
      $(this).LKUIicon('clear').css('background-image', 'url(data:image/png;base64,' + photoUrl + ')');
    } else {
      $(this).css('background-image', 'none').LKUIicon('change', (typeof gender == 'undefined') ? 'UNKNOWN' : gender);
    }
    $(this).animate({
      'width' : width + 'px'
    }, 'slow');
  });
};

/**
 * 添加通用菜单
 */
var addCommonMenus = function() {
  var i = 0;
  for ( var key in LK.home.commonMenus) {
    setTimeout(function(key, commonMenus) {
      var $menu = $('<div id="lichkin-menu-' + key + '" class="lichkin-menu-item lichkin-menu lichkin-div ' + commonMenus[key].type + '">' + $.LKGetI18N(key) + '</div>').appendTo(LK.home.$menusCommonContainer);
      var width = $menu.width();
      $menu.css({
        'width' : '0px'
      }).animate({
        'width' : width + 'px'
      }, 'slow').bind({
        click : commonMenus[key].click
      });
    }, (i++) * 200, key, LK.home.commonMenus);
  }
};

/**
 * 添加菜单列表
 * @param menusJson 菜单列表JSON
 * @param $container 菜单容器对象
 */
var addMenus = function(menusJson, $container) {
  for (var i = 0; i < menusJson.length; i++) {
    addMenu(menusJson[i], $container);
  }
};

/**
 * 添加菜单
 * @param menusJson 菜单JSON
 * @param $container 菜单容器对象
 */
var addMenu = function(menuJson, $container) {
  if (_WEB_DEBUG && typeof menuJson.params.url != 'undefined' && menuJson.params.url != '') {
    $('head').append('<script type="text/javascript" src="' + _CTX + '/res/js' + menuJson.params.url + '/index/i18n/' + _LANG + _COMPRESS_SUFFIX + '.js"></script>');
    $('head').append('<script type="text/javascript" src="' + _CTX + '/res/js' + menuJson.params.url + '/index/icons' + _COMPRESS_SUFFIX + '.js"></script>');
  }

  if (menuJson.params.icon == '') {
    menuJson.params.icon = (menuJson.children.length == 0) ? 'page' : 'folder';
  }

  var $menu = $('<div id="menu_' + menuJson.id + '" class="lichkin-menu-item"></div>').appendTo($container);
  $menu.data('LKData', menuJson);
  $menu.css({
    'height' : '32px',
    'padding' : '3px 0px'
  });
  LK.UI.icon({
    $appendTo : $menu,
    icon : menuJson.params.icon,
    size : 32,
    cls : 'lichkin-icon-menu-head'
  });
  LK.UI.text({
    $appendTo : $menu,
    text : menuJson.params.menuName,
    cls : 'lichkin-icon-menu-name',
    style : {
      'height' : '32px',
      'line-height' : '32px',
      'margin-left' : '6px',
      'padding' : '0px',
      'font-size' : '22px',
      'font-family' : '隶书'
    }
  });

  if (menuJson.children.length == 0) {
    if (typeof menuJson.params.url != 'undefined' && menuJson.params.url != '') {
      $menu.click(function() {
        if (_WEB_DEBUG) {
          window.open(_CTX + menuJson.params.url + '/index' + _MAPPING_PAGES);
          return;
        }
        addTask(menuJson.id, menuJson.params.menuName, menuJson.params.icon, menuJson.url);
        var $dlg = $('[data-id=dialog_' + menuJson.id + ']');
        if ($dlg.length == 0) {
          LK.UI.openDialog({
            id : menuJson.id,
            url : menuJson.params.url + '/index',
            title : menuJson.params.menuName,
            icon : menuJson.params.icon,
            mask : false,
            formContent : false,
            fitContent : true,
            onFocus : function() {
              activeTask(menuJson.id);
            },
            onAfterClose : function() {
              removeTask(menuJson.id);
            }
          });
        } else {
          $dlg.LKActiveDialog(true);
        }
      });
    }
  } else {
    LK.UI.icon({
      $appendTo : $menu,
      icon : 'menu-next',
      size : 32,
      cls : 'lichkin-icon-menu-tail'
    });
    var $container = $('<div id="lichkin-menus-container-getted-' + menuJson.id + '" class="lichkin-menus-container-getted"></div>').appendTo(LK.home.$menusGettedContainer);
    $menu.click(function() {
      taskGo(menuJson.id);
    });
    addMenus(menuJson.children, $container);
  }
};

var currentTaskId = false;

/**
 * 显示主菜单
 */
var showMainContainer = function() {
  LK.home.$tasksContainer.find('.lichkin-task-active').removeClass('lichkin-task-active');
  LK.home.$taskStarterContainer.css('background-color', 'rgba(255, 255, 255, 0.2)');
  if (LK.home.currentTasks.length == 0) {
    LK.home.$taskStarter.LKUIicon('change', 'starter').attr('title', $.LKGetI18N('starter-closed'));
  } else {
    LK.home.$taskStarter.LKUIicon('change', 'starter-back').attr('title', $.LKGetI18N('starter-back'));
  }
  LK.home.$menusContainer.show().css({
    'width' : '0px',
    'height' : '0px'
  }).animate({
    'width' : LK.home._menusContainer_width,
    'height' : LK.home._menusContainer_height
  }, 'fast', function() {
    LK.home.$menusCommonContainer.show();
    $('#lichkin-menu-exit').show();
  });
};

/**
 * 隐藏主菜单
 */
var hideMainContainer = function() {
  activeTask(currentTaskId);
  LK.home.$taskStarterContainer.css('background-color', 'transparent');
  LK.home.$taskStarter.LKUIicon('change', 'starter-closed').attr('title', $.LKGetI18N('starter'));

  LK.home.$menusCommonContainer.hide();
  $('#lichkin-menu-exit').hide();
  LK.home.$menusContainer.css({
    'width' : LK.home._menusContainer_width,
    'height' : LK.home._menusContainer_height
  }).animate({
    'width' : '0px',
    'height' : '0px'
  }, 'fast', function() {
    LK.home.$menusContainer.hide();
  });
};

/**
 * 添加任务
 * @param taskId 与打开的对话框联动的主键
 * @param taskName 任务名称
 * @param icon 任务图标
 * @param url 任务页面地址
 */
var addTask = function(taskId, taskName, icon, url) {
  var $task = $('#task_' + taskId);
  if ($task.length != 0) {
    return;
  }
  $task = $('<div id="task_' + taskId + '" class="lichkin-task"></div>').appendTo(LK.home.$tasksContainer);
  LK.UI.icon({
    $appendTo : $task,
    icon : icon,
    size : 32
  });
  LK.UI.text({
    $appendTo : $task,
    text : taskName,
    style : {
      'height' : '32px',
      'line-height' : '32px',
      'padding' : '0px'
    }
  });
  activeTask(taskId);
  $task.click(function() {
    $('[data-id=dialog_' + taskId + ']').LKActiveDialog(true);
  });
};

/**
 * 激活任务
 * @param taskId 与打开的对话框联动的主键
 */
var activeTask = function(taskId) {
  currentTaskId = taskId;
  LK.home.$tasksContainer.find('.lichkin-task-active').removeClass('lichkin-task-active');
  $('#task_' + taskId).addClass('lichkin-task-active');
};

/**
 * 删除任务
 * @param taskId 与打开的对话框联动的主键
 */
var removeTask = function(taskId) {
  $('#task_' + taskId).remove();
};

/**
 * 任务前进
 * @param taskId 新增任务ID
 */
var taskGo = function(taskId) {
  LK.home.currentTasks.push(taskId);

  var $currentTask;
  if (LK.home.currentTasks.length == 1) {
    LK.home.$taskStarter.LKUIicon('change', 'starter-back').attr('title', $.LKGetI18N('starter-back'));
    $currentTask = LK.home.$menusGettedContainerRoot;
  } else {
    $currentTask = $('#lichkin-menus-container-getted-' + LK.home.currentTasks[LK.home.currentTasks.length - 2]);
  }

  var $nextTask = $('#lichkin-menus-container-getted-' + taskId);

  $currentTask.css({
    'margin-left' : '0px'
  }).animate({
    'margin-left' : -$currentTask.width() + 'px'
  }, 'fast', function() {
    $currentTask.hide();
  });// 关闭当前任务
  $nextTask.show().css({
    'width' : '148px',
    'margin-left' : $currentTask.width() + 'px'
  }).animate({
    'width' : $currentTask.width() + 'px',
    'margin-left' : '0px'
  }, 'fast');// 显示后一任务
};

/**
 * 任务回退
 */
var taskGoBack = function() {
  var $previousTask;
  if (LK.home.currentTasks.length == 1) {
    LK.home.$taskStarter.LKUIicon('change', 'starter').attr('title', $.LKGetI18N('starter-closed'));
    $previousTask = LK.home.$menusGettedContainerRoot;
  } else {
    $previousTask = $('#lichkin-menus-container-getted-' + LK.home.currentTasks[LK.home.currentTasks.length - 2]);
  }

  var $currentTask = $('#lichkin-menus-container-getted-' + LK.home.currentTasks.pop());

  $currentTask.css({
    'margin-left' : '0px'
  }).animate({
    'width' : '148px',
    'margin-left' : $currentTask.width() + 'px'
  }, 'fast');// 关闭当前任务
  $previousTask.show().css({
    'margin-left' : -$currentTask.width() + 'px'
  }).animate({
    'margin-left' : '0px'
  }, 'fast', function() {
    $currentTask.hide();
  });// 显示后一任务
};

// 背景处理
LK.home.width = 0;
LK.home.height = 0;
$(function() {
  onDocumentResize();
  setInterval(function() {
    if (LK.home.width != $win.width() || LK.home.height != $win.height()) {
      onDocumentResize();
    }
  }, 1000);
});

/**
 * 页面大小改变事件
 */
var onDocumentResizeFuncs = [];
var onDocumentResize = function() {
  LK.home.width = $win.width();
  LK.home.height = $win.height();
  $body.css({
    'width' : LK.home.width + 'px',
    'height' : LK.home.height + 'px'
  });
  if (onDocumentResizeFuncs.length != 0) {
    for (var i = 0; i < onDocumentResizeFuncs.length; i++) {
      onDocumentResizeFuncs[i]();
    }
  }
};
