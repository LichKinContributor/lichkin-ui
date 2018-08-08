;
/**
 * 数据表格控件内部实现相关
 */
LK.UI._datagrid = {

  /**
   * 设置值
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param values 值数组
   * @param isCreateEvent 是否为创建是调用
   */
  setValues : function($plugin, $container, values, isCreateEvent) {
    var valueFieldName = $plugin.data('LKOPTIONS').valueFieldName;

    var valueArr = [];

    if (values === null) {
      $container.find('tr.selected').each(function() {
        valueArr.push($(this).data()[valueFieldName]);
      });
    } else {
      var $nodes = $container.find('tr');
      $nodes.removeClass('selected');
      if (!Array.isArray(values)) {
        values = [
          values
        ];
      }

      $nodes.each(function() {
        var $that = $(this);
        var data = $that.data();
        for (var i = 0; i < values.length; i++) {
          if (data[valueFieldName] == values[i]) {
            $that.addClass('selected');
            valueArr.push(data[valueFieldName]);
            break;
          }
        }
      });
    }

    $plugin.LKSetValues(valueArr, isCreateEvent);
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   */
  addDatas : function($plugin, $container, datas) {
    var columns = $plugin.data('LKOPTIONS').columns;
    if (typeof datas.content != 'undefined') {
      $plugin.data('totalPages', datas.totalPages);
      var totalPages = datas.totalPages;
      totalPages = totalPages == 0 ? 1 : totalPages;
      $plugin.find('.lichkin-datagrid-pageBar .pageNumberShow').html($.LKGetI18N('page-suffix').replace('{totalPages}', totalPages));
      var total = datas.totalElements;
      var from = total == 0 ? 0 : datas.number * datas.size + 1;
      var to = total == 0 ? 0 : from - 1 + datas.numberOfElements;
      $plugin.find('.lichkin-datagrid-pageBar .statistics .lichkin-text').html($.LKGetI18N('datagrid-statistics').replace('{from}', from).replace('{to}', to).replace('{total}', total));
      datas = datas.content;
    }
    for (var i = 0; i < datas.length; i++) {
      this.addData($plugin, $container, datas, columns, datas[i]);
    }
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   * @param columns 列信息
   * @param data 行数据
   */
  addData : function($plugin, $container, datas, columns, data) {
    var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($container).LKAddPluginClass('droplist', 'node');
    $tr.data(data);

    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      var $td = $('<td class="lichkin-table-cell"></td>').appendTo($tr).css('width', parseInt(column.width));
      var text = data[column.name];
      if (column.formatter) {
        text = column.formatter(data);
        if (!isString(text)) {
          $td.append(text);
          continue;
        }
      }
      if (typeof text == 'undefined' || text == null) {
        text = '';
      }
      text = '' + text;
      var $text = LK.UI.text({
        'original' : true,
        'text' : text
      }).css({
        'width' : parseInt(column.width) - 12,
        'height' : 'auto'
      });
      if (isString(column.textAlign)) {
        $text.css('text-align', column.textAlign);
      }
      $td.append($text);
    }
  },

  /**
   * 获取请求参数
   * @param $plugin 控件对象
   * @param options 控件参数
   */
  getParam : function($plugin, options) {
    var param = {};
    if (options.pageable == true) {
      param = $.extend({}, param, {
        pageNumber : parseInt($plugin.find('.lichkin-datagrid-pageBar .pageNumber').LKGetValue()) - 1,
        pageSize : parseInt($plugin.find('.lichkin-datagrid-pageBar .pageList').LKGetValue())
      });
    }
    if (options.searchForm.length != 0) {
      param = $.extend({}, param, $plugin.find('.lichkin-datagrid-searchFormBar .lichkin-form').LKFormGetData());
    }
    return param;
  }

};

/**
 * 数据表格控件
 */
LK.UI('plugins', 'datagrid', function(options) {
  // 控件类型
  var plugin = 'datagrid';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var width = $plugin.width() + (options.inForm ? 2 : 0);
  var height = $plugin.height();

  // 查询表单栏
  var $searchFormBar = $('<div></div>').LKAddPluginClass(plugin, 'searchFormBar');
  var $searchForm;
  if (options.searchForm.length != 0) {
    $searchFormBar.appendTo($plugin);
    $searchFormBar.css({
      'width' : width - 2,
      'padding-bottom' : LK.topGap + 'px'
    });
    $searchForm = LK.UI.form({
      $appendTo : $searchFormBar,
      plugins : options.searchForm
    }).css('margin-left', -2 - LK.leftGap + 'px');
  }

  // 删除按钮
  if (options.toolsRemove != null) {
    var json = {
      singleCheck : false,
      icon : 'remove',
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        LK.web.confirm($.LKGetI18N('confirmRemove'), function() {
          LK.ajax({
            url : options.toolsRemove.saveUrl,
            data : {
              id : value,
              usingStatus : 'DEPRECATED'
            },
            showSuccess : true,
            success : function() {
              $plugin.LKLoad({
                param : LK.UI._datagrid.getParam($plugin, options)
              });
            }
          });
        });
      }
    };
    if (typeof options.toolsRemove.titleTools != 'undefined' && options.toolsRemove.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  }

  // 编辑按钮
  if (options.toolsEdit != null) {
    var json = {
      singleCheck : true,
      icon : 'edit',
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        LK.UI.openDialog($.extend({}, options.toolsEdit.dialog, {
          title : 'edit',
          icon : 'edit',
          url : '',
          param : {},
          data : {},
          content : '',
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
                      url : options.toolsEdit.saveUrl,
                      data : $form.LKFormGetData(),
                      showSuccess : true,
                      success : function() {
                        $plugin.LKLoad({
                          param : LK.UI._datagrid.getParam($plugin, options)
                        });
                        $dialog.LKCloseDialog();
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
            var formOptions = $.extend({}, options.toolsEdit.form, {
              $appendTo : $contentBar,
              $renderTo : null,
              values : {},
              param : {
                id : value
              }
            });
            formOptions.plugins.push({
              plugin : 'hidden',
              options : {
                name : 'id',
                value : value
              }
            });
            LK.UI.form(formOptions);
          }
        }));
      }
    };
    if (typeof options.toolsEdit.titleTools != 'undefined' && options.toolsEdit.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  }

  // 新增按钮
  if (options.toolsAdd != null) {
    var json = {
      singleCheck : null,
      icon : 'add',
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof options.toolsAdd.beforeClick == 'function' && !options.toolsAdd.beforeClick($plugin)) {
          return;
        }
        LK.UI.openDialog($.extend({}, options.toolsAdd.dialog, {
          title : 'add',
          icon : 'add',
          url : '',
          param : {},
          data : {},
          content : '',
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
                      url : options.toolsAdd.saveUrl,
                      data : $.extend($form.LKFormGetData(), typeof options.toolsAdd.beforeSave == 'function' ? options.toolsAdd.beforeSave($plugin) : {}),
                      showSuccess : true,
                      success : function() {
                        $plugin.LKLoad({
                          param : LK.UI._datagrid.getParam($plugin, options)
                        });
                        $dialog.LKCloseDialog();
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
            LK.UI.form($.extend({}, options.toolsAdd.form, {
              $appendTo : $contentBar,
              $renderTo : null,
              values : {},
              url : '',
              param : {}
            }));
          }
        }));
      }
    };
    if (typeof options.toolsAdd.titleTools != 'undefined' && options.toolsAdd.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  }

  // 标题栏
  var $titleBar = $('<div></div>').LKAddPluginClass(plugin, 'titleBar');
  if (options.title != null || options.icon != null) {
    if (options.searchForm.length != 0) {
      $titleBar.insertBefore($searchFormBar);
    } else {
      $titleBar.appendTo($plugin);
    }
    $titleBar.css('width', width - 2);
    if (options.icon != null) {
      $titleBar.append(LK.UI.icon({
        'icon' : options.icon,
        'size' : 24
      }));
    }
    if (options.title != null) {
      $titleBar.append(LK.UI.text({
        'text' : options.title
      }));
    }
    if (options.searchForm.length != 0) {
      options.titleTools.push({
        singleCheck : null,
        icon : 'reset',
        click : function() {
          $searchForm.LKFormBindData();
        }
      });
      options.titleTools.push({
        singleCheck : null,
        icon : 'search',
        click : function() {
          $plugin.LKLoad({
            param : LK.UI._datagrid.getParam($plugin, options)
          });
        }
      });
    } else {
      if (options.showSearchButton == true) {
        options.titleTools.push({
          singleCheck : null,
          icon : 'search',
          click : function() {
            $plugin.LKLoad({
              param : LK.UI._datagrid.getParam($plugin, options)
            });
          }
        });
      }
    }
    var $buttonsBar = $('<div class="lichkin-buttons"></div>').appendTo($titleBar);
    for (var i = 0; i < options.titleTools.length; i++) {
      var button = options.titleTools[i];
      if (typeof button.singleCheck == 'undefined') {
        button.singleCheck = true;
      }
      (function(button) {
        var click = button.click;
        if (typeof click != 'function') {
          click = function() {
          };
        }
        $buttonsBar.append(LK.UI.button({
          _icon : {
            icon : button.icon,
            size : 24
          },
          click : function($button) {
            var value = $plugin.LKGetValue();
            if (button.singleCheck == true || button.singleCheck == false) {
              if (value == '') {
                LK.alert($.LKGetI18N('noSelect'));
                return;
              }
            }
            if (button.singleCheck == true) {
              if (value.indexOf(LK.SPLITOR) > 0) {
                LK.alert($.LKGetI18N('singleSelect'));
                return;
              }
            }

            var $selecteds = $plugin.LKGetDataContainer().find('tr.selected');
            var selectedDatas = [];
            $selecteds.each(function() {
              selectedDatas.push($(this).data());
            });
            click($button, $plugin, $selecteds, selectedDatas, value);
          },
          tip : button.tip
        }));
      })(button);
    }
  }

  // 工具栏
  var $toolsBar = $('<div></div>').LKAddPluginClass(plugin, 'toolsBar');
  if (options.tools.length != 0) {
    $toolsBar.appendTo($plugin);
    $toolsBar.css('width', width - 2);
    var $buttonsBar = $('<div class="lichkin-buttons"></div>').appendTo($toolsBar);
    for (var i = 0; i < options.tools.length; i++) {
      var button = options.tools[i];
      if (typeof button.singleCheck == 'undefined') {
        button.singleCheck = true;
      }
      (function(button) {
        var click = button.click;
        if (typeof click != 'function') {
          click = function() {
          };
        }
        $buttonsBar.append(LK.UI.button($.extend(button, {
          click : function($button) {
            var value = $plugin.LKGetValue();
            if (button.singleCheck == true || button.singleCheck == false) {
              if (value == '') {
                LK.alert($.LKGetI18N('noSelect'));
                return;
              }
            }
            if (button.singleCheck == true) {
              if (value.indexOf(LK.SPLITOR) > 0) {
                LK.alert($.LKGetI18N('singleSelect'));
                return;
              }
            }

            var $selecteds = $plugin.LKGetDataContainer().find('tr.selected');
            var selectedDatas = [];
            $selecteds.each(function() {
              selectedDatas.push($(this).data());
            });
            click($button, $plugin, $selecteds, selectedDatas, value);
          }
        })));
      })(button);
    }
  }

  // 分页栏
  var $pageBar = $('<div></div>').LKAddPluginClass(plugin, 'pageBar');
  if (options.pageable == true) {
    $pageBar.appendTo($plugin);
    $pageBar.css('width', width - 2);

    // 页面大小选择项
    var pageListData = new Array();
    for (var i = 0; i < options.pageList.length; i++) {
      pageListData.push({
        'text' : options.pageList[i],
        'value' : options.pageList[i]
      });
    }
    var $pageList = LK.UI.droplist({
      $appendTo : $pageBar,
      data : pageListData,
      value : options.pageSize,
      onChange : function($pageList, pluginValues, pluginValue, currentValue) {
        $pageBar.find('.pageNumber').LKInvokeSetValues(1, false);
      },
      cancelable : false,
      cls : 'pageList',
      width : 58,
      height : 20
    });

    // 统计栏
    var $statistics = $('<div class="statistics"></div>').appendTo($pageBar);
    $statistics.append(LK.UI.text({
      'original' : true,
      'text' : $.LKGetI18N('datagrid-statistics').replace('{from}', 0).replace('{to}', 0).replace('{total}', 0)
    }));

    // 跳页按钮栏
    var $jumpButtons = $('<div class="buttons"></div>').appendTo($pageBar);
    LK.UI.button({
      icon : 'go-first',
      click : function() {
        var $pageNumber = $pageBar.find('.pageNumber');
        var pageNumber = parseInt($pageNumber.LKGetValue());
        if (pageNumber != 1) {
          $pageNumber.LKInvokeSetValues(1, false);
        }
      }
    }).appendTo($jumpButtons);
    LK.UI.button({
      icon : 'go-previous',
      click : function() {
        var $pageNumber = $pageBar.find('.pageNumber');
        var pageNumber = parseInt($pageNumber.LKGetValue());
        if (pageNumber != 1) {
          $pageNumber.LKInvokeSetValues(pageNumber - 1, false);
        }
      }
    }).appendTo($jumpButtons);
    LK.UI.text({
      'original' : true,
      text : $.LKGetI18N('page-prefix').replace('{totalPages}', 1)
    }).appendTo($jumpButtons);
    LK.UI.numberspinner({
      $appendTo : $jumpButtons,
      cls : 'pageNumber',
      width : 58,
      height : 20,
      value : 1,
      onChange : function($numberspinner, numberspinnerValues, numberspinnerValue, currentValue) {
        var maxValue = $plugin.data('totalPages');
        if (numberspinnerValue > maxValue) {
          $numberspinner.LKGetValueObj().val(maxValue);
        }
        if (numberspinnerValue < 1) {
          $numberspinner.LKGetValueObj().val(1);
        }
        $plugin.LKLoad({
          param : LK.UI._datagrid.getParam($plugin, options)
        });
      }
    });
    LK.UI.text({
      'original' : true,
      text : $.LKGetI18N('page-suffix').replace('{totalPages}', 1)
    }).appendTo($jumpButtons).addClass('pageNumberShow');
    LK.UI.button({
      icon : 'go-next',
      click : function() {
        var $pageNumber = $pageBar.find('.pageNumber');
        var pageNumber = parseInt($pageNumber.LKGetValue());
        if (pageNumber < parseInt($plugin.data('totalPages'))) {
          $pageNumber.LKInvokeSetValues(pageNumber + 1, false);
        }
      }
    }).appendTo($jumpButtons);
    LK.UI.button({
      icon : 'go-last',
      click : function() {
        var $pageNumber = $pageBar.find('.pageNumber');
        var pageNumber = parseInt($pageNumber.LKGetValue());
        if (pageNumber < parseInt($plugin.data('totalPages'))) {
          $pageNumber.LKInvokeSetValues(parseInt($plugin.data('totalPages')), false);
        }
      }
    }).appendTo($jumpButtons);

    $pageBar.append('<div style="clear:both;"></div>');
  }

  // 数据栏
  var $dataBar = $('<div></div>').LKAddPluginClass(plugin, 'dataBar');
  if (options.pageable == true) {
    $dataBar.insertBefore($pageBar);
  } else {
    $dataBar.appendTo($plugin);
  }
  $dataBar.css('width', width - 2);
  $dataBar.css('height', height - 2 - $titleBar.outerHeight() - $searchFormBar.outerHeight() - $toolsBar.outerHeight() - $pageBar.outerHeight());
  // 数据标题栏
  var $dataHeaderBar = $('<div class="lichkin-datagrid-dataHeaderBar"></div>').appendTo($dataBar);
  $dataHeaderBar.css('width', width - 2);
  var $tableHeader = $('<table class="lichkin-table"></table>').appendTo($dataHeaderBar);
  var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($tableHeader);
  for (var i = 0; i < options.columns.length; i++) {
    var column = options.columns[i];
    var $td = $('<td class="lichkin-table-cell"></td>').appendTo($tr).css('width', parseInt(column.width));
    $td.append(LK.UI.text({
      'text' : column.text
    }).css('width', parseInt(column.width) - 12));
  }

  // 数据内容栏
  var $dataBodyBar = $('<div class="lichkin-datagrid-dataBodyBar"></div>').appendTo($dataBar);
  $dataBodyBar.css('width', width - 2);
  $dataBodyBar.css('height', $dataBar.height() - $dataHeaderBar.outerHeight());
  $dataBodyBar.scroll(function(e) {
    $dataHeaderBar.css('margin-left', -$(this).scrollLeft() + 'px');
  });
  // 数据容器
  var $container = $('<table class="lichkin-table"></table>').appendTo($dataBodyBar).LKAddPluginClass(plugin, 'dataContainer');

  // 加载数据
  options.param = $.extend({}, options.param, LK.UI._datagrid.getParam($plugin, options));
  LK.UI.load({
    $plugin : $plugin,
    isCreateEvent : true,
    options : options
  });

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特殊定义
{
  cols : 4,
  rows : 14
},
// @see LK.UI.load
LK.UI.loadOptions,
// 控件特有参数
{
  // 支持多选
  multiSelect : false,
  // 是否可以取消选中（仅在单选情况下起作用）
  cancelable : true,
  // 值字段名
  valueFieldName : 'id',
  /**
   * 列定义
   * @param name 列名称。映射数据的KEY。
   * @param text 列名称。显示值。
   * @param width 列宽度。
   * @param formatter 格式化方法
   * @param formatter[rowData] 行数据
   * @param textAlign 文本对齐方式
   */
  columns : [],
  // 标题
  title : null,
  // 图标
  icon : null,
  /**
   * 查询表单
   * @see LK.UI.form中的plugins参数
   */
  searchForm : [],
  // 显示查询按钮（无searchForm时起作用）
  showSearchButton : true,
  /**
   * 标题栏工具栏
   * @see LK.UI.button（click方法被重写，第一个参数保持按钮控件不变，增加第二个参数当前对话框控件，增加第三个参数当前选中行，增加第四个参数当前选中数据集,增加第五个参数当前表格值。仅支持图标按钮。）
   * @extend 额外增加singleCheck定义。true:必须选择一行数据进行操作;false:至少选择一行数据进行操作;null:可不选数据进行操作;
   * @tip 如果输入了title或icon，则框架内部会补充刷新按钮。如果有查询表单时，则框架内部会补充重置按钮和查询按钮。
   */
  titleTools : [],
  /**
   * 工具栏
   * @see LK.UI.button（click方法被重写，第一个参数保持按钮控件不变，增加第二个参数当前对话框控件，增加第三个参数当前选中行，增加第四个参数当前选中数据集,增加第五个参数当前表格值。）
   * @extend 额外增加singleCheck定义。true:必须选择一行数据进行操作;false:至少选择一行数据进行操作;null:可不选数据进行操作;
   */
  tools : [],
  /**
   * 工具栏-新增按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param form see LK.UI.form，其中$appendTo/$renderTo/values/url/param参数无效。
   * @param dialog see LK.UI.dialog，其中title/icon/url/param/data/content/mask/buttons/onAfterCreate/onBeforeLoading/onAfterLoading无效。
   * @param saveUrl 表单提交地址
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。（第一个参数为当前表格控件）
   * @param beforeSave 保存请求执行前操作，返回值为JSON数据。（第一个参数为当前表格控件）
   */
  toolsAdd : null,
  /**
   * 工具栏-编辑按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param form see LK.UI.form，其中$appendTo/$renderTo/values/param参数无效。
   * @param dialog see LK.UI.dialog，其中title/icon/url/param/data/content/mask/buttons/onAfterCreate/onBeforeLoading/onAfterLoading无效。
   * @param saveUrl 表单提交地址
   */
  toolsEdit : null,
  /**
   * 工具栏-删除按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param saveUrl 表单提交地址
   */
  toolsRemove : null,
  // 是否带分页信息
  pageable : true,
  // 分页大小
  pageSize : 25,
  // 页面大小选择项数据
  pageList : [
      25, 50, 100, 200
  ],
  /**
   * 行点击事件
   * @param $plugin 当前控件对象
   * @param $row 行对象
   * @param rowData 行数据
   */
  onRowClick : function($plugin, $row, rowData) {
  }
}));

$('body').mousedown(function(e) {
  var $that = $(e.target);
  if ($that.is('.lichkin-datagrid .lichkin-datagrid-dataBodyBar .lichkin-table .lichkin-table-row .lichkin-table-cell') || $that.is('.lichkin-datagrid .lichkin-datagrid-dataBodyBar .lichkin-table .lichkin-table-row .lichkin-table-cell .lichkin-text')) {
    if (!$that.is('td')) {
      $that = $that.parents('td:first');
    }
    var $plugin = $that.parents('.lichkin-datagrid:first');
    var options = $plugin.data('LKOPTIONS');
    var $node = $that.parents('tr:first');
    var data = $node.data();
    var dataValue = data[options.valueFieldName];
    if (typeof dataValue == 'undefined') {
      throw 'can not get value by key -> ' + options.valueFieldName;
    }
    if (options.multiSelect) {
      $node.toggleClass('selected');
      $plugin.LKInvokeSetValues(null);
    } else {
      if (options.cancelable == true) {
        $plugin.LKInvokeSetValues(($node.hasClass('selected') ? '' : dataValue));
      } else {
        if (dataValue != $plugin.LKGetValue()) {
          $plugin.LKInvokeSetValues(dataValue);
        }
      }
    }
    $plugin.LKlinkage(dataValue, false);
    $plugin.LKValidate();
    options.onRowClick($plugin, $node, data);
  }
});
