;

// 扩展图标
$.LKExtendICON({
  'go-first' : 'step-backward',
  'go-previous' : 'backward',
  'go-next' : 'forward',
  'go-last' : 'step-forward',

  'add' : 'plus',
  'remove' : 'trash-alt',
  'edit' : 'pencil-alt',
  'view' : 'eye',
  'search' : 'search',

  'release' : 'arrow-alt-circle-up',
  'lock' : 'lock',
  'unlock' : 'unlock',
  'set' : 'cog',
  'cut' : 'cut',
  'reset' : 'redo-alt',
});

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
    var options = $plugin.data('LKOPTIONS');
    if (typeof datas.content != 'undefined') {
      if (options.pageable == true) {
        $plugin.data('totalPages', datas.totalPages);
        var totalPages = datas.totalPages;
        totalPages = totalPages == 0 ? 1 : totalPages;
        $plugin.find('.lichkin-datagrid-pageBar .pageNumberShow').html($.LKGetI18N('page-suffix').replace('{totalPages}', totalPages));
        var total = datas.totalElements;
        var from = total == 0 ? 0 : datas.number * datas.size + 1;
        var to = total == 0 ? 0 : from - 1 + datas.numberOfElements;
        $plugin.find('.lichkin-datagrid-pageBar .statistics .lichkin-text').html($.LKGetI18N('datagrid-statistics').replace('{from}', from).replace('{to}', to).replace('{total}', total));
      }
      datas = datas.content;
    }
    this.addNodes($plugin, $container, datas, 0, options, options.columns, options.treeFieldName, options.i18nKey);
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   * @param level 级别
   * @param options 参数
   * @param columns 列信息
   * @param treeFieldName 树形表格字段名
   */
  addNodes : function($plugin, $container, datas, level, options, columns, treeFieldName, i18nKey) {
    for (var i = 0; i < datas.length; i++) {
      this.addNode($plugin, $container, datas[i], level + 1, options, columns, treeFieldName, i18nKey);
    }
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param data 行数据
   * @param level 级别
   * @param options 参数
   * @param columns 列信息
   * @param treeFieldName 树形表格字段名
   */
  addNode : function($plugin, $container, data, level, options, columns, treeFieldName, i18nKey) {
    var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($container).LKAddPluginClass('datagrid', 'node');
    if (options.valueFieldName == 'random') {
      data.random = Math.random() * 100000000000000000;
    }
    $tr.data(data);

    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      var $td = $('<td class="lichkin-table-cell"></td>').appendTo($tr).css('width', column.width);

      var text = treeFieldName == null ? data[column.name] : data.params[column.name];
      if (column.formatter) {
        text = column.formatter(data, $plugin, options, $container, level, columns, treeFieldName, i18nKey);
        if (!isString(text)) {
          if (isJSON(text)) {
            text = LK.UI[text.plugin]($.extend(text.options, {
              'width' : column.width - 12,
              'height' : 22,
              'style' : {
                'margin-left' : '3px',
                'margin-right' : '3px',
                'margin-top' : '3px',
                'margin-bottom' : '3px'
              }
            }));
            text.data('gridRowData', data);
          }
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
        'width' : column.width - 12,
        'height' : 'auto'
      });
      if (isString(column.textAlign)) {
        $text.css('text-align', column.textAlign);
      }
      $td.append($text);

      if (typeof column.cssClass != 'undefined') {
        $td.addClass(column.cssClass);
      }

      if (treeFieldName != null && treeFieldName == column.name) {
        $text.css({
          'width' : 'auto',
          'float' : 'left',
          fontSize : $text.outerHeight() * 0.75
        });

        // 缩进 TODO
        for (var i = 0; i < level; i++) {
          $text.before(LK.UI.icon({
            size : $text.outerHeight(),
            style : {
              'float' : 'left',
            }
          }));
        }

        // 节点图标
        $text.before(LK.UI.icon({
          icon : (typeof data.params.icon != 'undefined' && data.params.icon) ? data.params.icon : (data.children.length == 0 ? 'page' : 'folder'),
          size : $text.outerHeight(),
          style : {
            'float' : 'left'
          }
        }));

        // 清除浮动
        $text.after('<div style="clear:both;"></div>');
      }
    }

    // 添加子节点
    if (treeFieldName != null && data.children.length != 0) {
      this.addNodes($plugin, $container, data.children, level, options, columns, treeFieldName, i18nKey);
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
    return options.reloadParam($plugin, param);
  },

  /**
   * 增加添加按钮
   * @param $plugin 控件对象
   * @param options 控件参数
   * @param toolsAdd 添加按钮参数
   */
  addToolsAdd : function($plugin, options, toolsAdd) {
    if (typeof toolsAdd.icon == 'undefined') {
      toolsAdd.icon = 'add';
    }
    if (typeof toolsAdd.text == 'undefined') {
      toolsAdd.text = 'add';
    }
    var json = {
      singleCheck : null,
      icon : toolsAdd.icon,
      text : toolsAdd.text,
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof toolsAdd.beforeClick == 'function' && !toolsAdd.beforeClick($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey)) {
          return;
        }
        LK.UI.openDialog($.extend({}, toolsAdd.dialog, {
          title : toolsAdd.text,
          icon : toolsAdd.icon,
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
                click : function($dialogButton, $dialog) {
                  var $form = $dialog.find('form');
                  if ($form.LKValidate()) {
                    LK.ajax({
                      url : toolsAdd.saveUrl,
                      data : $.extend($form.LKFormGetData(), typeof toolsAdd.beforeSave == 'function' ? toolsAdd.beforeSave($button, $datagrid, $selecteds, selectedDatas, value, $dialogButton, $dialog, options.i18nKey) : {}),
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
                click : function($dialogButton, $dialog) {
                  $dialog.LKCloseDialog();
                }
              }
          ],
          onAfterCreate : function($dialog, $contentBar) {
            var formOptions = $.extend({}, toolsAdd.form, {
              $appendTo : $contentBar,
              $renderTo : null,
              values : {},
              url : '',
              param : {}
            })
            formOptions.i18nKey = options.i18nKey + 'columns.';
            LK.UI.form(formOptions);
          }
        }));
      }
    };
    if (typeof toolsAdd.titleTools != 'undefined' && toolsAdd.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  },

  /**
   * 增加修改状态按钮
   * @param $plugin 控件对象
   * @param options 控件参数
   * @param toolsUS 添加按钮参数
   */
  addToolsUS : function($plugin, options, toolsUS) {
    var json = {
      singleCheck : false,
      icon : toolsUS.icon,
      text : options.i18nKey + toolsUS.text,
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof toolsUS.beforeClick == 'function' && !toolsUS.beforeClick($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey)) {
          return;
        }

        if (Array.isArray(toolsUS.disallowUsingStatusArr)) {
          for (var x = 0; x < toolsUS.disallowUsingStatusArr.length; x++) {
            var usingStatus = toolsUS.disallowUsingStatusArr[x];
            for (var i = 0; i < selectedDatas.length; i++) {
              if (selectedDatas[i].usingStatusDictCode == usingStatus.usingStatus) {
                LK.alert(options.i18nKey + usingStatus.errorMsg);
                return;
              }
            }
          }
        }

        if (Array.isArray(toolsUS.allowUsingStatusArr)) {
          for (var x = 0; x < toolsUS.allowUsingStatusArr.length; x++) {
            var usingStatus = toolsUS.allowUsingStatusArr[x];
            for (var i = 0; i < selectedDatas.length; i++) {
              if (selectedDatas[i].usingStatusDictCode != usingStatus.usingStatus) {
                LK.alert(options.i18nKey + usingStatus.errorMsg);
                return;
              }
            }
          }
        }

        LK.web.confirm(options.i18nKey + 'confirm.' + toolsUS.text, function() {
          LK.ajax({
            url : toolsUS.saveUrl,
            data : {
              id : value,
              usingStatus : toolsUS.usingStatus
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
    if (typeof toolsUS.titleTools != 'undefined' && toolsUS.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  },

  /**
   * 数据表格内容总宽度
   * @param cols 列数
   * @param columnsLength 表格列数
   * @param withField true:带字段宽;false:不带字段宽.
   * @param contentGap 差量
   */
  contentWidth : function(cols, columnsLength, withField, contentGap) {
    return ((withField ? (LK.colWidth + LK.fieldKeyWidth + LK.leftGap) : LK.colWidth) * cols) - columnsLength - 17 - 2 + contentGap;
  }

};

/**
 * 数据表格控件
 */
LK.UI('plugins', 'datagrid', function(options) {
  // 控件类型
  var plugin = 'datagrid';

  // 国际化处理
  options.i18nKey = (options.i18nKey.indexOf('.') > 0 ? options.i18nKey : options.i18nKey + '.grid') + '.';

  // 边框处理
  var contentGap = 0;
  if (options.leftBorder) {
    contentGap++;
    $.extend(options.style, {
      'border-left-width' : '1px',
      'border-left-style' : 'solid'
    });
  }
  if (options.rightBorder) {
    contentGap++;
    $.extend(options.style, {
      'border-right-width' : '1px',
      'border-right-style' : 'solid'
    });
  }

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var width = $plugin.width() + ((options.inForm || (options.$appendTo != null && options.$appendTo.is('.lichkin-dialog-form-div'))) ? 2 : 0);
  var height = $plugin.height();

  // 查询表单栏
  var hasSearchFormBar = options.searchForm.length != 0;
  var $searchFormBar = $('<div></div>').LKAddPluginClass(plugin, 'searchFormBar');
  var $searchForm;
  var $searchFormToolsBar;
  if (hasSearchFormBar) {
    $searchFormBar.appendTo($plugin);
    $searchFormBar.css({
      'width' : width - 2,
      'padding-bottom' : LK.topGap + 'px'
    });
    $searchForm = LK.UI.form({
      i18nKey : options.i18nKey + 'columns.',
      $appendTo : $searchFormBar,
      plugins : options.searchForm
    }).css('margin-left', -2 - LK.leftGap + 'px');
    $searchFormToolsBar = $('<div lichkin-buttons></div>').appendTo($searchFormBar).css('text-align', 'center');
  }

  // 查看按钮
  if (options.toolsView != null) {
    if (typeof options.toolsView.icon == 'undefined') {
      options.toolsView.icon = 'view';
    }
    if (typeof options.toolsView.text == 'undefined') {
      options.toolsView.text = 'view';
    }
    var json = {
      singleCheck : true,
      icon : options.toolsView.icon,
      text : options.toolsView.text,
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof options.toolsView.beforeClick == 'function' && !options.toolsView.beforeClick($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey)) {
          return;
        }
        var viewJson = $.extend(true, {}, options.toolsView);
        if (typeof options.toolsView.beforeOpenDialog == 'function') {
          viewJson = options.toolsView.beforeOpenDialog(viewJson, $button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey);
        }
        LK.UI.openDialog($.extend({}, viewJson.dialog, {
          title : options.toolsView.text,
          icon : options.toolsView.icon,
          url : '',
          param : {},
          data : {},
          content : '',
          mask : true,
          onAfterCreate : function($dialog, $contentBar) {
            var formOptions = $.extend(true, {}, viewJson.form, {
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
            formOptions.i18nKey = options.i18nKey + 'columns.';
            formOptions.plugins = LK.UI.formUtils.newReadonlyPlugins(formOptions.plugins);
            if (typeof options.toolsView.handleFormOptions == 'function') {
              options.toolsView.handleFormOptions(viewJson, formOptions, $datagrid, $selecteds, selectedDatas, value, options.i18nKey);
            }
            LK.UI.form(formOptions);
          }
        }));
      }
    };
    if (typeof options.toolsView.titleTools != 'undefined' && options.toolsView.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  }

  // 提交按钮
  if (options.toolsSubmit != null) {
    if (typeof options.toolsSubmit.icon == 'undefined') {
      options.toolsSubmit.icon = 'upload';
    }
    if (typeof options.toolsSubmit.text == 'undefined') {
      options.toolsSubmit.text = 'submit';
    }
    var json = {
      singleCheck : false,
      icon : options.toolsSubmit.icon,
      text : options.toolsSubmit.text,
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof options.toolsSubmit.beforeClick == 'function' && !options.toolsSubmit.beforeClick($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey)) {
          return;
        }
        LK.web.confirm(options.i18nKey + 'confirm.' + options.toolsSubmit.text, function() {
          LK.ajax({
            url : options.toolsSubmit.saveUrl,
            data : {
              id : value
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
    if (typeof options.toolsSubmit.titleTools != 'undefined' && options.toolsSubmit.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  }

  // 删除按钮
  if (options.toolsRemove != null) {
    if (typeof options.toolsRemove.icon == 'undefined') {
      options.toolsRemove.icon = 'remove';
    }
    if (typeof options.toolsRemove.text == 'undefined') {
      options.toolsRemove.text = 'remove';
    }
    options.toolsRemove.usingStatus = 'DEPRECATED';
    if (options.toolsUS != null) {
      if (Array.isArray(options.toolsUS)) {
        options.toolsUS.unshift(options.toolsRemove);
      } else {
        options.toolsUS = [
            options.toolsRemove, options.toolsUS
        ];
      }
    } else {
      options.toolsUS = options.toolsRemove;
    }
  }

  // 修改状态按钮
  if (options.toolsUS != null) {
    if (Array.isArray(options.toolsUS)) {
      for (var i = 0; i < options.toolsUS.length; i++) {
        (function(toolsUS) {
          LK.UI._datagrid.addToolsUS($plugin, options, toolsUS);
        })(options.toolsUS[i]);
      }
    } else {
      (function(toolsUS) {
        LK.UI._datagrid.addToolsUS($plugin, options, toolsUS);
      })(options.toolsUS);
    }
  }

  // 删除数据按钮
  if (options.toolsRemoveData != null) {
    if (typeof options.toolsRemoveData.icon == 'undefined') {
      options.toolsRemoveData.icon = 'remove';
    }
    if (typeof options.toolsRemoveData.text == 'undefined') {
      options.toolsRemoveData.text = 'remove';
    }
    var json = {
      singleCheck : false,
      icon : options.toolsRemoveData.icon,
      text : options.toolsRemoveData.text,
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof options.toolsRemoveData.boforeRemove == 'function' && !options.toolsRemoveData.boforeRemove($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey)) {
          return;
        }
        var values = $datagrid.LKGetValues();
        var datas = $datagrid.LKGetDatas();
        $selecteds.each(function() {
          for (var i = values.length - 1; i >= 0; i--) {
            var v = values[i];
            if ($(this).data(options.valueFieldName) == v) {
              values.splice(i, 1);
              for (var j = datas.length - 1; j >= 0; j--) {
                if (datas[j][options.valueFieldName] == v) {
                  datas.splice(j, 1);
                  break;
                }
              }
              break;
            }
          }
          $(this).remove();
        });
        $datagrid.LKSetValues(values);
        $datagrid.data('LKDatas', datas);
        $datagrid.LKValidate();
        if (typeof options.toolsRemoveData.afterRemove == 'function') {
          options.toolsRemoveData.afterRemove($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey);
        }
      }
    };
    if (typeof options.toolsRemoveData.titleTools != 'undefined' && options.toolsRemoveData.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  }

  // 编辑按钮
  if (options.toolsEdit != null) {
    if (typeof options.toolsEdit.icon == 'undefined') {
      options.toolsEdit.icon = 'edit';
    }
    if (typeof options.toolsEdit.text == 'undefined') {
      options.toolsEdit.text = 'edit';
    }
    var json = {
      singleCheck : true,
      icon : options.toolsEdit.icon,
      text : options.toolsEdit.text,
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof options.toolsEdit.beforeClick == 'function' && !options.toolsEdit.beforeClick($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey)) {
          return;
        }
        var editJson = $.extend(true, {}, options.toolsEdit);
        if (typeof options.toolsEdit.beforeOpenDialog == 'function') {
          editJson = options.toolsEdit.beforeOpenDialog(editJson, $button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey);
        }
        LK.UI.openDialog($.extend({}, editJson.dialog, {
          title : options.toolsEdit.text,
          icon : options.toolsEdit.icon,
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
                click : function($dialogButton, $dialog) {
                  var $form = $dialog.find('form');
                  if ($form.LKValidate()) {
                    LK.ajax({
                      url : editJson.saveUrl,
                      data : $.extend($form.LKFormGetData(true), typeof editJson.beforeSave == 'function' ? editJson.beforeSave($button, $datagrid, $selecteds, selectedDatas, value, $dialogButton, $dialog) : {}),
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
                click : function($dialogButton, $dialog) {
                  $dialog.LKCloseDialog();
                }
              }
          ],
          onAfterCreate : function($dialog, $contentBar) {
            var formOptions = $.extend(true, {}, editJson.form, {
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
            formOptions.i18nKey = options.i18nKey + 'columns.';
            if (typeof options.toolsEdit.readonlyPlugins == 'function') {
              formOptions.plugins = LK.UI.formUtils.newReadonlyPlugins(formOptions.plugins, options.toolsEdit.readonlyPlugins(editJson, formOptions, $datagrid, $selecteds, selectedDatas, value, options.i18nKey));
            }
            if (typeof options.toolsEdit.handleFormOptions == 'function') {
              options.toolsEdit.handleFormOptions(editJson, formOptions, $datagrid, $selecteds, selectedDatas, value, options.i18nKey);
            }
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
    if (Array.isArray(options.toolsAdd)) {
      for (var i = 0; i < options.toolsAdd.length; i++) {
        (function(toolsAdd) {
          LK.UI._datagrid.addToolsAdd($plugin, options, toolsAdd);
        })(options.toolsAdd[i]);
      }
    } else {
      (function(toolsAdd) {
        LK.UI._datagrid.addToolsAdd($plugin, options, toolsAdd);
      })(options.toolsAdd);
    }
  }

  // 新增数据按钮
  if (options.toolsAddData != null) {
    if (typeof options.toolsAddData.icon == 'undefined') {
      options.toolsAddData.icon = 'add';
    }
    if (typeof options.toolsAddData.text == 'undefined') {
      options.toolsAddData.text = 'add';
    }
    var json = {
      singleCheck : null,
      icon : options.toolsAddData.icon,
      text : options.toolsAddData.text,
      click : function($button, $datagrid, $selecteds, selectedDatas, value) {
        if (typeof options.toolsAddData.beforeClick == 'function' && !options.toolsAddData.beforeClick($button, $datagrid, $selecteds, selectedDatas, value, options.i18nKey)) {
          return;
        }
        LK.UI.openDialog($.extend({}, options.toolsAddData.dialog, {
          title : options.toolsAddData.text,
          icon : options.toolsAddData.icon,
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
                click : function($dialogButton, $dialog) {
                  var $form = $dialog.find('form');
                  if ($form.LKValidate()) {
                    if (typeof options.toolsAddData.handleAddData == 'function') {
                      $datagrid.LKInvokeAddDatas(options.toolsAddData.handleAddData($button, $datagrid, $selecteds, selectedDatas, value, $dialogButton, $dialog, options.i18nKey, $form));
                    } else {
                      $datagrid.LKInvokeAddDatas([
                        $.extend($form.LKFormGetData(true), typeof options.toolsAddData.beforeAddData == 'function' ? options.toolsAddData.beforeAddData($button, $datagrid, $selecteds, selectedDatas, value, $dialogButton, $dialog, options.i18nKey, $form) : {})
                      ]);
                    }
                    if (typeof options.toolsAddData.afterAddData == 'function') {
                      options.toolsAddData.afterAddData($button, $datagrid, $selecteds, selectedDatas, value, $dialogButton, $dialog, options.i18nKey, $form);
                    }
                    $dialog.LKCloseDialog();
                  }
                }
              }, {
                text : 'cancel',
                icon : 'cancel',
                cls : 'danger',
                click : function($dialogButton, $dialog) {
                  $dialog.LKCloseDialog();
                }
              }
          ],
          onAfterCreate : function($dialog, $contentBar) {
            var formOptions = $.extend(true, {}, options.toolsAddData.form, {
              $appendTo : $contentBar,
              $renderTo : null,
              values : {},
              param : {
                id : value
              }
            });
            formOptions.i18nKey = options.i18nKey + 'columns.';
            LK.UI.form(formOptions);
          }
        }));
      }
    };
    if (typeof options.toolsAddData.titleTools != 'undefined' && options.toolsAddData.titleTools == true) {
      options.titleTools.unshift(json);
    } else {
      options.tools.unshift(json);
    }
  }

  // 标题栏
  var hasTitleBar = options.title != null || options.icon != null || options.titleTools.length != 0;
  var $titleBar = $('<div></div>').LKAddPluginClass(plugin, 'titleBar');
  var $titleToolsBar;
  if (hasTitleBar) {
    if (hasSearchFormBar) {
      $titleBar.insertBefore($searchFormBar);
    } else {
      $titleBar.appendTo($plugin);
    }
    $titleBar.css('width', width - 2);
    $titleToolsBar = $('<div class="lichkin-buttons"></div>').appendTo($titleBar);

    // 标题栏图标
    if (options.icon != null) {
      $titleBar.append(LK.UI.icon({
        'icon' : options.icon,
        'size' : 24
      }));
    }

    // 标题栏标题
    if (options.title != null) {
      $titleBar.append(LK.UI.text({
        'text' : options.i18nKey + options.title
      }));
    }

    // 标题工具栏
    if (options.titleTools.length != 0) {
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
          $titleToolsBar.append(LK.UI.button({
            i18nKey : options.i18nKey,
            icon : {
              icon : button.icon,
              size : 24
            },
            click : function($button) {
              var value = $plugin.LKGetValue();
              if (button.singleCheck == true || button.singleCheck == false) {
                if (value == '') {
                  LK.alert('noSelect');
                  return;
                }
              }
              if (button.singleCheck == true) {
                if (value.indexOf(LK.SPLITOR) > 0) {
                  LK.alert('singleSelect');
                  return;
                }
              }

              var $selecteds = $plugin.LKGetDataContainer().find('tr.selected');
              var selectedDatas = [];
              $selecteds.each(function() {
                selectedDatas.push($(this).data());
              });

              if (button.singleCheck == true) {
                selectedDatas = selectedDatas[0];
              }

              click($button, $plugin, $selecteds, selectedDatas, value, options.i18nKey);
            },
            tip : button.tip
          }));
        })(button);
      }
    }
  }

  // 工具栏
  var hasToolsBar = options.tools.length != 0;
  var $toolsBar = $('<div></div>').LKAddPluginClass(plugin, 'toolsBar');
  var $buttonsBarRight;
  if (hasToolsBar) {
    $toolsBar.appendTo($plugin);
    $toolsBar.css('width', width - 2);
    var $buttonsBar = $('<div class="lichkin-buttons"></div>').appendTo($toolsBar);
    $buttonsBarRight = $('<div class="lichkin-buttons lichkin-buttons-right"></div>').appendTo($toolsBar);
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
          i18nKey : options.i18nKey,
          click : function($button) {
            var value = $plugin.LKGetValue();
            if (button.singleCheck == true || button.singleCheck == false) {
              if (value == '') {
                LK.alert('noSelect');
                return;
              }
            }
            if (button.singleCheck == true) {
              if (value.indexOf(LK.SPLITOR) > 0) {
                LK.alert('singleSelect');
                return;
              }
            }

            var $selecteds = $plugin.LKGetDataContainer().find('tr.selected');
            var selectedDatas = [];
            $selecteds.each(function() {
              selectedDatas.push($(this).data());
            });

            if (button.singleCheck == true) {
              selectedDatas = selectedDatas[0];
            }

            click($button, $plugin, $selecteds, selectedDatas, value, options.i18nKey);
          }
        })));
      })(button);
    }
  }

  // 分页栏
  var hasPageBar = options.pageable == true;
  var $pageBar = $('<div></div>').LKAddPluginClass(plugin, 'pageBar');
  var $pageBarSearButton;
  if (hasPageBar) {
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
    $pageBarSearButton = LK.UI.button({
      icon : 'search',
      click : function() {
        if ($searchForm.LKValidate()) {
          $plugin.LKLoad({
            param : LK.UI._datagrid.getParam($plugin, options)
          });
        }
      },
      style : {
        'display' : 'none'
      }
    }).appendTo($jumpButtons);

    $pageBar.append('<div style="clear:both;"></div>');
  }

  // 有查询表单补充重置按钮
  // 补充查询按钮
  // 补充位置，工具栏>标题栏>查询表单>分页栏
  if (hasToolsBar) {
    if (hasSearchFormBar && options.showResetButton == true) {
      LK.UI.button({
        $appendTo : $buttonsBarRight,
        icon : 'reset',
        click : function($button) {
          $searchForm.LKFormBindData();
          $searchForm.LKValidate();
        }
      });
    }
    if (options.showSearchButton == true) {
      LK.UI.button({
        $appendTo : $buttonsBarRight,
        icon : 'search',
        click : function($button) {
          if ($searchForm.LKValidate()) {
            $plugin.LKLoad({
              param : LK.UI._datagrid.getParam($plugin, options)
            });
          }
        }
      });
    }
  } else {
    if (hasTitleBar) {
      if (hasSearchFormBar && options.showResetButton == true) {
        LK.UI.button({
          $appendTo : $titleToolsBar,
          icon : {
            icon : 'reset',
            size : 24
          },
          click : function($button) {
            $searchForm.LKFormBindData();
            $searchForm.LKValidate();
          }
        });
      }
      if (options.showSearchButton == true) {
        LK.UI.button({
          $appendTo : $titleToolsBar,
          icon : {
            icon : 'search',
            size : 24
          },
          click : function($button) {
            if ($searchForm.LKValidate()) {
              $plugin.LKLoad({
                param : LK.UI._datagrid.getParam($plugin, options)
              });
            }
          }
        });
      }
    } else {
      if (hasSearchFormBar) {
        if (options.showResetButton == true || options.showSearchButton == true) {
          $searchFormBar.css('padding-bottom', 2 * LK.topGap + 2 + 'px');
          $searchFormToolsBar.css('padding-top', 2 * LK.topGap + 2 + 'px');
        }
        if (options.showResetButton == true) {
          LK.UI.button({
            $appendTo : $searchFormToolsBar,
            icon : 'reset',
            text : 'reset',
            cls : 'warning',
            height : LK.rowHeight - 2 * LK.topGap,
            click : function($button) {
              $searchForm.LKFormBindData();
              $searchForm.LKValidate();
            }
          });
        }
        if (options.showSearchButton == true) {
          LK.UI.button({
            $appendTo : $searchFormToolsBar,
            icon : 'search',
            text : 'search',
            cls : 'success',
            height : LK.rowHeight - 2 * LK.topGap,
            style : {
              'margin-left' : '10px'
            },
            click : function($button) {
              if ($searchForm.LKValidate()) {
                $plugin.LKLoad({
                  param : LK.UI._datagrid.getParam($plugin, options)
                });
              }
            }
          });
        }
      } else {
        if (hasPageBar && options.showSearchButton == true) {
          $pageBarSearButton.show();
        }
      }
    }
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
  var columnTemp = [];
  var columnTotalWidth = 0;
  for (var i = 0; i < options.columns.length; i++) {
    var column = options.columns[i];
    var $td = $('<td class="lichkin-table-cell"></td>').appendTo($tr);
    var $tdText = LK.UI.text({
      'original' : true,
      'text' : $.LKGetI18NWithPrefix(options.i18nKey + 'columns.', column.text)
    });
    $td.append($tdText);
    if (typeof column.width == 'number') {
      columnTotalWidth += column.width;
      $tdText.css('width', column.width - 12);
    } else {
      columnTemp.push({
        idx : i,
        column : column,
        $tdText : $tdText
      });
    }
  }

  if (columnTemp.length == 1) {
    var tmp = columnTemp[0];
    var column = tmp.column;
    var w = LK.UI._datagrid.contentWidth(options.cols, options.columns.length, options.withField, contentGap) - columnTotalWidth;
    tmp.$tdText.css('width', w - 12);
    options.columns[tmp.idx].width = w;
  } else {
    for (var i = 0; i < columnTemp.length; i++) {
      var tmp = columnTemp[i];
      var column = tmp.column;
      var nArr = column.width.split('/');
      var w = parseInt((LK.UI._datagrid.contentWidth(options.cols, options.columns.length, options.withField, contentGap) - columnTotalWidth) * nArr[0] / nArr[1]);
      tmp.$tdText.css('width', w - 12);
      options.columns[tmp.idx].width = w;
    }
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

  if (options.readonly == true) {
    $('<div></div>').appendTo($plugin).css({
      'position' : 'absolute',
      'width' : $plugin.width(),
      'height' : $plugin.height(),
      'z-index' : 10000,
      'top' : '0px',
      'left' : '0px'
    });
  }

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
  rows : 20
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
  // 是否查询按钮
  showSearchButton : true,
  // 是否重置按钮
  showResetButton : true,
  /**
   * 标题栏工具栏
   * @see LK.UI.button（click方法被重写，第一个参数保持按钮控件不变，增加第二个参数当前对话框控件，增加第三个参数当前选中行，增加第四个参数当前选中数据集,增加第五个参数当前表格值。仅支持图标按钮。）
   * @extend 额外增加singleCheck定义。true:必须选择一行数据进行操作;false:至少选择一行数据进行操作;null:可不选数据进行操作;
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
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param saveUrl 表单提交地址
   * @param beforeSave 保存请求执行前操作，返回值为JSON数据。（第一个参数为当前表格控件）
   * @param form see LK.UI.form
   * @param dialog see LK.UI.dialog
   */
  toolsAdd : null,
  /**
   * 工具栏-编辑按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param beforeOpenDialog 打开表单窗口执行前操作，返回值为JSON数据。
   * @param saveUrl 表单提交地址
   * @param beforeSave 保存请求执行前操作，返回值为JSON数据。（第一个参数为当前表格控件）
   * @param form see LK.UI.form
   * @param dialog see LK.UI.dialog
   * @param readonlyPlugins 需要设置为只读状态的控件名数组
   * @param handleFormOptions 表单创建执行前操作。无返回值。
   */
  toolsEdit : null,
  /**
   * 工具栏-删除按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param disallowUsingStatusArr 不允许执行的数据状态数组
   * @param allowUsingStatusArr 允许执行的数据状态数组
   * @param saveUrl 表单提交地址
   */
  toolsRemove : null,
  /**
   * 工具栏-查看按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param beforeOpenDialog 打开表单窗口执行前操作，返回值为JSON数据。
   * @param form see LK.UI.form
   * @param dialog see LK.UI.dialog
   * @param handleFormOptions 表单创建执行前操作。无返回值。
   */
  toolsView : null,
  /**
   * 工具栏-提交按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param saveUrl 表单提交地址
   */
  toolsSubmit : null,
  /**
   * 工具栏-修改状态按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param disallowUsingStatusArr 不允许执行的数据状态数组
   * @param allowUsingStatusArr 允许执行的数据状态数组
   * @param saveUrl 表单提交地址
   * @param usingStatus 在用状态
   */
  toolsUS : null,
  /**
   * 工具栏-新增数据按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeClick 点击事件执行前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param handleAddData 新增数据前操作，返回待新增的数据。（注：该方法将使得beforeAddData方法被忽略）
   * @param beforeAddData 新增前数据前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param afterAddData 新增前数据后操作
   * @param form see LK.UI.form
   * @param dialog see LK.UI.dialog
   */
  toolsAddData : null,
  /**
   * 工具栏-删除数据按钮
   * @param titleTools true:在标题栏工具栏中使用;false:在工具栏中使用;
   * @param icon 按钮图标
   * @param text 按钮文字
   * @param beforeRemove 删除前数据前操作，返回值为true继续执行，返回值为false不继续执行。
   * @param afterRemove 删除前数据后操作
   */
  toolsRemoveData : null,
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
  },
  /**
   * 重新加载时参数
   * @param $plugin 当前控件对象
   * @param param 当前参数
   * @return 参数
   */
  reloadParam : function($plugin, param) {
    return param;
  },
  // 树形表格字段名
  treeFieldName : null,
  // 是否显示左边框
  leftBorder : false,
  // 是否显示右边框
  rightBorder : false,
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
