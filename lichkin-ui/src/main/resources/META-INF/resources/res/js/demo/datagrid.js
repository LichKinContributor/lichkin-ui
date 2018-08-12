$('body').css('background-color', 'black');

var config = {
  $appendTo : true,
  cols : 2.5,
  rows : 7,
  url : '/P/SysRole',
  columns : [
      {
        text : 'roleName',
        name : 'roleName',
        width : LK.colWidth
      }, {
        text : 'description',
        name : 'description',
        width : LK.colWidth
      }
  ]
};

var title = {
  icon : 'tip',
  title : 'roleGridTitle',
};

var searchForm = {
  searchForm : [
    {
      plugin : 'textbox',
      options : {
        name : 'roleName'
      }
    }
  ]
};

var tools = {
  toolsAdd : {
    saveUrl : '/I/SysRole',
    dialog : {
      size : {
        cols : 2,
        rows : 11
      }
    },
    form : {
      plugins : [
          {
            plugin : 'textbox',
            options : {
              name : 'roleName',
              validator : true
            }
          }, {
            plugin : 'textbox',
            options : {
              name : 'description',
              validator : true
            }
          }, {
            plugin : 'tree',
            options : {
              key : 'menuName',
              name : 'menuIds',
              validator : true,
              url : '/T/SysMenu'
            }
          }

      ]
    }
  },
  toolsEdit : {
    saveUrl : '/U/SysRole',
    dialog : {
      size : {
        cols : 2,
        rows : 11
      }
    },
    form : {
      url : '/O/SysRole',
      plugins : [
          {
            plugin : 'textbox',
            options : {
              name : 'roleName',
              validator : true
            }
          }, {
            plugin : 'textbox',
            options : {
              name : 'description',
              validator : true
            }
          }, {
            plugin : 'tree',
            options : {
              key : 'menuName',
              name : 'menuIds',
              validator : true,
              url : '/T/SysMenu'
            }
          }

      ]
    }
  },
  toolsRemove : {
    saveUrl : '/U/SysRole/UsingStatus'
  },
};

var pageable = {
  pageable : false,
};

var showSearchButton = {
  showSearchButton : false
};

var showResetButton = {
  showResetButton : false
};

LK.UI.datagrid($.extend({}, config, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools, pageable));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools, pageable, showSearchButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools, showSearchButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools, pageable, showSearchButton, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools, showSearchButton, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, tools, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, tools, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, searchForm, tools, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools, pageable, showResetButton));

$('body').append('<br><br>');

LK.UI.datagrid($.extend({}, config, title, searchForm, tools, showResetButton));

$('body').append('<br><br>');
$('body').append('<br><br>');
$('body').append('<br><br>');
