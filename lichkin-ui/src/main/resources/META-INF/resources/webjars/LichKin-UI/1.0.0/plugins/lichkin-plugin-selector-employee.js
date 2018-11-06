;

// 扩展图标
$.LKExtendICON({
  'plus' : 'chevron-up',
  'minus' : 'chevron-down',
  'employeeMgmt' : 'user-friends'
});

/**
 * 员工选择器控件
 */
LK.UI('plugins', 'selector_employee', function(options) {
  options.url = '/SysEmployee/L';
  options.textFieldName = 'userName';
  options.dialog.title = 'selector-employee-title';
  options.dialog.icon = 'employeeMgmt';
  options.dialog.content = '<form><table class="lichkin-table"><tr><td rowspan="3" class="tree-dept"></td><td class="datagrid-source"></td></tr><tr><td class="controllers"></td></tr><tr><td class="datagrid-target"></td></tr></table></form>';
  var w = 900, h = 500, wt = 250;
  options.dialog.size = {
    width : w + LK.leftGap * 2 - 1,
    height : h + LK.topGap * 2 + 1
  };
  options.dialog.onAfterCreate = function($dialog, $contentBar, $selector) {
    $contentBar.css({
      'padding-left' : LK.leftGap + 'px',
      'padding-top' : LK.topGap + 'px'
    });

    var $controllers = $contentBar.find('.controllers');
    $controllers.css('padding', '2px 0px');

    var $tree = LK.UI.tree({
      $appendTo : $contentBar.find('.tree-dept'),
      name : 'tree',
      title : 'department',
      withField : false,
      width : wt,
      height : h + 1,
      checkbox : false,
      multiSelect : false,
      cancelable : false,
      i18nText : false,
      style : {
        'border-top' : 'none'
      },
      url : '/SysDept/S',
      linkages : [
        'source'
      ]
    });

    var columns = [
        {
          text : 'userName',
          width : 120,
          name : 'userName'
        }, {
          text : 'gender',
          width : 70,
          name : 'gender'
        }, {
          text : 'jobNumber',
          width : 100,
          name : 'jobNumber'
        }, {
          text : 'department',
          width : null,
          name : 'fullName',
          textAlign: 'left'
        }
    ];

    var $source = LK.UI.datagrid({
      i18nKey : 'selector-employee-dlg',
      $appendTo : $contentBar.find('.datagrid-source'),
      name : 'source',
      title : 'source',
      withField : false,
      multiSelect : options.multiSelect,
      width : w - wt,
      height : (h - LK.rowHeight) / 2,
      pageable : false,
      url : options.url,
      columns : columns,
      searchForm : [
        {
          plugin : 'textbox',
          options : {
            name : 'userName',
            cls : 'fuzzy-left fuzzy-right'
          }
        }
      ],
      onLinkaged : function($plugin, linkage) {
        switch (linkage.linkageName) {
          case 'tree':
            if (linkage.linkageValue == '') {
              $plugin.LKClearDatas();
            } else {
              $plugin.LKLoad({
                param : {
                  deptIds : linkage.linkageValue
                }
              }, linkage);
            }
            break;
        }
      },
      linkager : [
        {
          pluginName : 'tree',
          paramName : 'deptIds'
        }
      ],
      onAfterAddDatas : function($plugin, responseDatas, url, param) {
        if (responseDatas.length != 0) {
          var $sourceTrs = $plugin.LKGetDataContainer().find('tr');
          $plugin.LKGetSiblingPlugin('target').LKGetDataContainer().find('tr').each(function() {
            var $targetTr = $(this);
            $sourceTrs.each(function() {
              var $sourceTr = $(this);
              if ($targetTr.data('id') == $sourceTr.data('id')) {
                $sourceTr.hide();
                return;
              }
            });
          });
        }
      }
    });

    var $target = LK.UI.datagrid({
      i18nKey : 'selector-employee-dlg',
      $appendTo : $contentBar.find('.datagrid-target'),
      name : 'target',
      title : 'target',
      withField : false,
      multiSelect : true,
      width : w - wt,
      height : (h - LK.rowHeight) / 2,
      pageable : false,
      data : $selector.LKGetValueDatas(),
      columns : columns,
      showSearchButton : false
    });

    LK.UI.button({
      $appendTo : $controllers,
      height : LK.rowHeight - 4,
      icon : 'minus',
      click : function() {
        var value = $source.LKGetValue();
        if (value == '') {
          LK.alert('noSelect');
          return;
        }
        if (options.multiSelect == false) {
          if ($target.LKGetDataContainer().find('tr').length != 0) {
            LK.alert('singleSelect');
            return;
          }
        }

        var $selecteds = $source.LKGetDataContainer().find('tr.selected');
        var selectedDatas = [];
        $selecteds.each(function() {
          selectedDatas.push($(this).data());
          $(this).removeClass('selected');
          $(this).hide();
        });
        $source.LKSetValues([], false);

        LK.UI._datagrid.addDatas($target, $target.LKGetDataContainer(), selectedDatas);
      },
      cls : 'success',
      style : {
        'width' : 60
      }
    });

    LK.UI.button({
      $appendTo : $controllers,
      height : LK.rowHeight - 4,
      icon : 'plus',
      click : function() {
        var value = $target.LKGetValue();
        if (value == '') {
          LK.alert('noSelect');
          return;
        }

        var $selecteds = $target.LKGetDataContainer().find('tr.selected');
        var selectedDatas = [];
        $selecteds.each(function() {
          selectedDatas.push($(this).data());
          $(this).remove();
        });
        $target.LKSetValues([], false);

        $source.LKGetDataContainer().find('tr').each(function() {
          var id = $(this).data().id;
          for (var i = 0; i < selectedDatas.length; i++) {
            if (selectedDatas[i].id == id) {
              $(this).show();
              break;
            }
          }
        });
      },
      cls : 'danger',
      style : {
        'width' : 60,
        'margin-left' : '30px'
      }
    });
  };

  options.onOkButtonClick = function($button, $dialog, $contentBar, $plugin, value) {
    var $trs = $contentBar.find('.datagrid-target').find('.lichkin-datagrid:first').LKGetDataContainer().find('tr');
    if ($trs.length == 0) {
      return null;
    }
    var values = [];
    $trs.each(function() {
      values.push($(this).data().id);
    });
    return values.join(LK.SPLITOR);
  };

  options.onResetButtonClick = function($button, $dialog, $contentBar, $plugin, value) {
    var $target = $contentBar.find('[name=target]').parents('.lichkin-plugin:first');
    $target.LKLoad({
      data : $plugin.LKGetValueDatas()
    });
    var $source = $contentBar.find('[name=source]').parents('.lichkin-plugin:first');
    var $sourceTrs = $source.LKGetDataContainer().find('tr');
    var $targetTrs = $target.LKGetDataContainer().find('tr');
    $sourceTrs.each(function() {
      var $sourceTr = $(this);
      $sourceTr.show();
      $targetTrs.each(function() {
        var $targetTr = $(this);
        if ($targetTr.data('id') == $sourceTr.data('id')) {
          $sourceTr.hide();
          return;
        }
      });
    });
  };

  return LK.UI.selector(options);
}, $.extend({},
// @see LK.UI.selector
LK.UI.selectorOptions,
// 控件特有参数
{}));
