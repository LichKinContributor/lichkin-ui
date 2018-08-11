LK.UI.datagrid({
  title : 'roleGridTitle',
  $appendTo : true,
  cols : 2.5,
  rows : 15,
  url : '/P/SysRole',
  multiSelect : true,
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
  ],
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
  searchForm : [
    {
      plugin : 'textbox',
      options : {
        name : 'roleName'
      }
    }
  ]
});