;
/**
 * 初始化控件，提供简写代码。
 * @param columns 列信息
 * @param url 数据请求地址
 * @param param 请求参数
 */
LKUI.datagrid = function(columns, url, param) {
  return LK.UI.datagrid({
    columns : columns,
    url : url,
    param : param
  });
};

LKUI.realCode = function(currentCode) {
  if (currentCode == null || currentCode == 'ROOT') {
    return 'ROOT';
  }
  var strs = new Array("A", "B", "C", "D", "E", "F", "G", "H");

  for (var i = strs.length - 1; i >= 0; i--) {
    var x = parseInt(currentCode.substring((i * (7 + 1)) + 1, (i + 1) * (7 + 1)));
    if (x != 0) {
      return currentCode.substring(0, ((i + 1) * (7 + 1)));
    }
  }
  return null;
}

/**
 * 数据表格控件内部实现相关
 */
LK.UI._datagrid = {

  /** 控件类型 */
  plugin : 'datagrid',

  /**
   * 获取数据容器对象
   * @param $plugin 控件对象
   */
  getDataContainer : function($plugin) {
    return $plugin.find('.lichkin-data-container');
  },

  /**
   * 获取选中项
   * @param $plugin 控件对象
   */
  getSelected : function($plugin) {
    return this.getDataContainer($plugin).find('tr.lichkin-table-row-selected');
  },

  /**
   * 获取当前页的所有行数据
   * @param $plugin 控件对象
   */
  getRows : function($plugin) {
    return this.getDataContainer($plugin).find('tr');
  },

  /**
   * 设置选中项
   * @param $plugin 控件对象
   */
  setSelected : function($plugin, value) {

  },

  /**
   * 通过传递id值选择数据
   * @param $plugin 控件对象
   * @param idValues id值
   */
  selectRecord : function($plugin, idValues) {
    var idAry = idValues.split(LK.SPLITOR);
    var allRows = this.getRows($plugin);
    for (var i = 0; i < idAry.length; i++) {
      for (var j = 0; j < allRows.length; j++) {
        var rowData = $(allRows[j]).data();
        if (rowData.id == idAry[i]) {
          $(allRows[j]).addClass('lichkin-table-row-selected');
          break;
        }
      }
    }
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param datas 数据集
   */
  addDatas : function($plugin, datas) {
    var options = $plugin.data('LKOPTIONS');
    this.addNodes(this.getDataContainer($plugin), options.columns, options.pageable ? datas.content : datas,

    options.treeGrid, options.treeColumn, 0, options.checkbox, options.onlyCheckChildren);
  },

  /**
   * 删除选中的数据
   * @param $plugin 控件对象
   * @param datas 数据集
   */
  removeDatas : function($plugin) {
    var selectedRows = this.getSelected($plugin);
    for (var i = 0; i < selectedRows.length; i++) {
      $(selectedRows[i]).remove();
    }
  },

  /**
   * 清空数据
   * @param $plugin 控件对象
   */
  clearDatas : function($plugin) {
    $plugin.find('.lichkin-' + this.plugin + '-value').val('');
  },

  /**
   * 清空数据
   * @param $plugin 控件对象
   */
  destoryDatas : function($plugin) {
    this.getDataContainer($plugin).html('');
    this.clearDatas($plugin);
  },

  /**
   * 添加数据
   * @param $table 数据容器对象
   * @param columns 列信息
   * @param datas 数据集
   * @param treeGrid 是否是treeGrid
   * @param treeColumn 显示tree的列
   * @param level 节点级别
   */
  addNodes : function($table, columns, datas, treeGrid, treeColumn, level, checkbox, onlyCheckChildren) {
    for (var i = 0; i < datas.length; i++) {
      this.addNode($table, columns, datas[i], treeGrid, treeColumn, level, checkbox, onlyCheckChildren);
    }
  },

  /**
   * 添加数据
   * @param $table 数据容器对象
   * @param columns 列信息
   * @param data 列数据
   * @param treeGrid 是否是treeGrid
   * @param treeColumn 显示tree的列
   * @param level 节点级别
   */
  addNode : function($table, columns, data, treeGrid, treeColumn, level, checkbox, onlyCheckChildren) {
    var that = this;

    var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($table);
    $tr.data(data);

    if (treeGrid == true) {
      $tr.addClass('lichkin-tree-grid-row');
      $tr.attr('row-code', LKUI.realCode(data.code));
    }

    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      var $td = $('<td class="lichkin-table-cell" style="width:' + column.width + 'px;"></td>').appendTo($tr);
      var textWidth = column.width;

      // treeGrid特殊处理逻辑
      if (treeGrid == true) {
        $td.addClass('lichkin-tree-grid-cell');

        if (column.name == treeColumn) {
          $td.css('text-align', 'left');

          for (var i = 0; i < level; i++) {
            $td.append('<span class="lichkin-tree-grid-space"></span>');
          }
          // 减去space和checkBox所占的宽度
          textWidth = textWidth - (level * 20) - 20;

          // 显示checkbox
          if (checkbox) {
            // checkbox
            var $checkbox = LKUI.icon().addClass('lichkin-tree-node-checkbox').data('id', data.id).appendTo($td);
            // 默认不选中
            $checkbox.LKUIicon('change', 'checkbox-unchecked');

            $checkbox.click(function() {
              that.checkboxSelectChange($checkbox, $tr, onlyCheckChildren);
            });
          }

        }
      }

      var text = data[column.name];
      if (column.formatter) {
        text = column.formatter(data);
      }
      if (typeof text == 'string') {
        $td.append(LKUI.text(text).css('width', textWidth));
      } else {
        $td.append(text);
      }
    }

    // 添加子节点
    if (data.children != undefined && data.children.length != 0) {
      that.addNodes($table, columns, data.children, true, treeColumn, level + 1, checkbox, onlyCheckChildren);
    }
  },

  checkboxSelectChange : function($checkbox, $tr, onlyCheckChildren) {
    // 当前选中行的编码
    var selectedRowCode = $checkbox.parents('tr').attr('row-code');
    // 所有的下级节点(包含自己)
    var childrenTr = $checkbox.parents('tr').parent().children('tr[row-code^=' + selectedRowCode + ']');

    // checkbox联动
    var checkParents;
    var checkboxStatus;
    if (this.isChecked($checkbox) == true) {
      checkParents = false;
      checkboxStatus = 'checkbox-unchecked';
      // 联动选中行
      $tr.removeClass('lichkin-table-row-selected');
    } else {
      checkParents = true;
      checkboxStatus = 'checkbox-checked';
      // 联动选中行
      $tr.addClass('lichkin-table-row-selected');
    }
    childrenTr.each(function() {
      $(this).find('.lichkin-tree-node-checkbox').LKUIicon('change', checkboxStatus);

      if (checkParents == false) {
        $(this).removeClass('lichkin-table-row-selected');
      } else {
        $(this).addClass('lichkin-table-row-selected');
      }

    });
    // 只选中子节点
    if (onlyCheckChildren == false) {
      this.checkParents($checkbox, checkParents, selectedRowCode);
    }
  },

  checkParents : function(currentCheckbox, check, selectedRowCode) {
    var that = this;
    var parentRowCode = selectedRowCode.substr(0, selectedRowCode.length - 8);
    if (parentRowCode.length == 0) {
      return;
    }

    var $parentTr = currentCheckbox.parents('tr').parent().find('tr[row-code=' + parentRowCode + ']');

    // 所有下级（包含自己）
    var childrenTr = currentCheckbox.parents('tr').parent().find('tr[row-code^=' + parentRowCode + ']');

    var allChange = true;

    if (check == true) {
      // 判断下级节点是否全部选中
      childrenTr.each(function() {
        if ($(this).attr('row-code') != parentRowCode && that.isChecked($(this).find('.lichkin-tree-node-checkbox')) != true) {
          allChange = false;
          return false;
        }
      });

      if (allChange == true) {
        $parentTr.find('.lichkin-tree-node-checkbox').LKUIicon('change', 'checkbox-checked');
      } else {
        $parentTr.find('.lichkin-tree-node-checkbox').LKUIicon('change', 'checkbox-tristate');
      }
    } else {
      // 判断下级节点是否都没有选中
      childrenTr.each(function() {
        if ($(this).attr('row-code') != parentRowCode && that.isChecked($(this).find('.lichkin-tree-node-checkbox')) != false) {
          allChange = false;
          return false;
        }
      });

      if (allChange == true) {
        $parentTr.find('.lichkin-tree-node-checkbox').LKUIicon('change', 'checkbox-unchecked');
      } else {
        $parentTr.find('.lichkin-tree-node-checkbox').LKUIicon('change', 'checkbox-tristate');
      }
    }

    that.checkParents(currentCheckbox, check, parentRowCode);
  },

  /**
   * 判断是否为选中状态
   * @param $checkbox checkbox控件
   * @return 选中返回true，不选中返回false，中间状态返回null.
   */
  isChecked : function($checkbox) {
    if ($checkbox.LKUIicon('has', 'checkbox-checked')) {
      return true;
    }
    if ($checkbox.LKUIicon('has', 'checkbox-unchecked')) {
      return false;
    }
    if ($checkbox.LKUIicon('has', 'checkbox-tristate')) {
      return null;
    }
  },

  /**
   * 添加工具栏
   * @param $plugin 控件对象
   * @param options 参数
   * @param $toolsBar 工具栏对象
   * @param tools 工具栏定义参数
   */
  addTools : function($plugin, options, $toolsBar, tools) {
    var that = this;

    for (var i = 0; i < tools.length; i++) {
      var tool = tools[i];
      (function(tool) {
        var click;
        if (tool.singleCheck == true) {
          click = function() {
            var $selected = that.getSelected($plugin);
            if ($selected.length == 0) {
              LK.alert(LK.i18n.noSelect);
              return;
            } else if ($selected.length != 1) {
              LK.alert(LK.i18n.singleSelect);
              return;
            }
            tool.click($plugin, options, $selected.data(), $selected.data().id);
          };
        } else if (tool.singleCheck == false) {
          click = function() {
            var $selected = that.getSelected($plugin);
            if ($selected.length == 0) {
              LK.alert(LK.i18n.noSelect);
              return;
            }
            var datas = new Array();
            var ids = new Array();
            for (var i = 0; i < $selected.length; i++) {
              var data = $($selected[i]).data();
              datas.push(data);
              ids.push(data.id);
            }
            tool.click($plugin, options, datas, ids.join(LK.SPLITOR));
          };
        } else {
          click = function() {
            var $selected = that.getSelected($plugin);
            var datas = new Array();
            var ids = new Array();
            if ($selected.length != 0) {
              for (var i = 0; i < $selected.length; i++) {
                var data = $($selected[i]).data();
                datas.push(data);
                ids.push(data.id);
              }
            }
            tool.click($plugin, options, datas, ids.join(LK.SPLITOR));
          };
        }

        $toolsBar.append(LK.UI.button({
          _icon : {
            size : 16,
            icon : tool.icon
          },
          text : tool.tip,
          click : click,
          tip : tool.tip
        }));
      })(tool);
    }
  }

};

/**
 * 数据表格控件
 */
LK.UI('plugins', 'datagrid', function(options) {
  // 控件类型
  var plugin = 'datagrid';

  // 创建控件对象
  var $plugin = LKUI._createUIPlugin(plugin, $.extend({}, options, {
    $renderTo : options.$renderTo
  }));

  if (options.searchForm.length != 0) {
    var $frm = $('<div id="frm"></div>').appendTo($plugin);
    var $form = LK.UI.form({
      formClass : 'lichkin-datagrid-searchForm',
      plugins : options.searchForm
    });

    options.titleTools.push({
      tip : LK.i18n.search,
      icon : 'search',
      click : function($plugin, options, selectedArr, selectedIds) {
        $plugin.LKUI('reload', {
          param : $form.getJSON()
        });
      }
    }, {
      tip : LK.i18n.reset,
      icon : 'reset',
      click : function($plugin, options, selectedArr, selectedIds) {
        $form.clearData();
      }
    });
  }

  // 标题栏
  if (options.title != '' || options.titleTools.length != 0) {
    var $titleBar = $('<div class="lichkin-datagrid-titleBar"></div>').appendTo($plugin);
    if (options.title != '') {
      $titleBar.append(LKUI.text(options.title));
    }
    if (options.titleTools.length != 0) {
      LK.UI._datagrid.addTools($plugin, options, $('<div class="lichkin-datagrid-titleBar-toolsBar"></div>').appendTo($titleBar), options.titleTools);
    }
  }

  if (options.showRemoveBtn) {
    options.tools.unshift({
      singleCheck : false,
      tip : LK.i18n.remove,
      icon : 'remove',
      click : function($plugin, options, selectedArr, selectedIds) {
        LK.ajax({
          url : options.removeUrl,
          data : {
            id : selectedIds,
            usingStatus : 'DEPRECATED'
          },
          showSuccess : true,
          success : function() {
            $plugin.LKUI('reload');
          }
        });
      }
    });
  }

  if (options.showEditBtn) {
    options.tools.unshift({
      singleCheck : true,
      tip : LK.i18n.edit,
      icon : 'edit',
      click : function($plugin, options, selectedArr, selectedIds) {
        var $editFormDlg = LK.UI.openDialog({
          content : '<div id="frm"></div>',
          title : LK.i18n.edit,
          icon : 'edit',
          size : options.editFormSize,
          // 页面加载后
          onAfterLoading : function() {
            options.editForm.push({
              plugin : 'hidden',
              options : {
                name : 'id'
              }
            });
            var $editForm = LK.UI.form({
              plugins : options.editForm,
              onAfterCreate : function() {
                // 绑定form表单数据
                LK.ajax({
                  url : options.editUrl,
                  data : {
                    id : selectedIds
                  },
                  success : function(data) {
                    $editForm.bindData(data);
                  }
                });
              }
            });
          },
          buttons : [
              {
                text : LK.i18n.save,
                icon : 'save',
                click : function() {
                  var $form = $editFormDlg.find('form');
                  if ($form.validate()) {
                    LK.ajax({
                      url : options.editFormUrl,
                      data : $form.getJSON(),
                      showSuccess : true,
                      success : function() {
                        $plugin.LKUI('reload');
                        $editFormDlg.LKUI('close');
                      }
                    });
                  }
                }
              }, {
                text : LK.i18n.cancel,
                icon : 'cancel',
                click : function() {
                  $editFormDlg.LKUI('close');
                }
              }
          ]
        });
      }
    });
  }

  if (options.showAddBtn) {
    options.tools.unshift({
      tip : LK.i18n.add,
      icon : 'add',
      click : function($plugin, options, selectedArr, selectedIds) {
        var $addFormDlg = LK.UI.openDialog({
          content : '<div id="frm"></div>',
          title : LK.i18n.add,
          icon : 'add',
          size : options.addFormSize,
          // 页面加载后
          onAfterLoading : function() {
            LK.UI.form({
              plugins : options.addForm
            });
          },
          buttons : [
              {
                text : LK.i18n.save,
                icon : 'save',
                click : function() {
                  var $form = $addFormDlg.find('form');
                  if ($form.validate()) {
                    LK.ajax({
                      url : options.addFormUrl,
                      data : $form.getJSON(),
                      showSuccess : true,
                      success : function() {
                        $plugin.LKUI('reload');
                        $addFormDlg.LKUI('close');
                      }
                    });
                  }
                }
              }, {
                text : LK.i18n.cancel,
                icon : 'cancel',
                click : function() {
                  $addFormDlg.LKUI('close');
                }
              }
          ]
        });
      }
    });
  }

  // 工具栏
  if (options.tools.length != 0) {
    LK.UI._datagrid.addTools($plugin, options, $('<div class="lichkin-datagrid-toolsBar"></div>').appendTo($plugin), options.tools);
  }

  // 数据栏
  var $dataBar = $('<div class="lichkin-datagrid-dataBar"></div>').appendTo($plugin);
  // 数据标题栏
  var $dataHeaderBar = $('<div class="lichkin-datagrid-dataHeaderBar"></div>').appendTo($dataBar);
  var $tableHeader = $('<table class="lichkin-table"></table>').appendTo($dataHeaderBar);
  var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($tableHeader);
  for (var i = 0; i < options.columns.length; i++) {
    var column = options.columns[i];
    var $td = $('<td class="lichkin-table-cell" style="width:' + column.width + 'px;"></td>').appendTo($tr);
    $td.append(LKUI.text(column.text));
  }
  // 数据内容栏
  var $dataBodyBar = $('<div class="lichkin-datagrid-dataBodyBar"></div>').appendTo($dataBar);
  if (options.dataBodyBarHeight != 0) {
    $dataBodyBar.height(options.dataBodyBarHeight + 'px');
  }
  var $container = $('<table class="lichkin-data-container lichkin-table"></table>').appendTo($dataBodyBar);
  // 点击事件
  $container.click(function(e) {
    var that = this;

    if (e.target != that) {
      var $tr, $target = $(e.target);
      if (e.target.tagName != 'TR') {
        $tr = $target.parents('tr').first();
      }
      if (options.multiSelect) {
        $tr.toggleClass('lichkin-table-row-selected');
      } else {
        $(that).children().removeClass('lichkin-table-row-selected');
        $tr.addClass('lichkin-table-row-selected');
      }
      // 选中行时联动checkbox
      if (options.checkbox) {
        LK.UI._datagrid.checkboxSelectChange($tr.find('.lichkin-tree-node-checkbox'), $tr, options.onlyCheckChildren)
      }
      options.onRowClick($tr.data());
    }
  });

  // 分页栏
  if (options.pageable != false) {
    var $pagesBar = $('<div class="lichkin-datagrid-pagesBar"></div>').appendTo($plugin);
  }

  // 加载数据
  if (options.lazy != true) {
    LKUI._load(options, plugin, $plugin);
  }

  // 返回控件对象
  return $plugin;
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 控件渲染到对象
  $renderTo : $('#grid'),
  // 控件填充到对象
  $appendTo : null,
  /**
   * 列定义
   * @param name 列名称。映射数据的KEY。
   * @param text 列名称。显示值。
   * @param width 列宽度。
   * @param formatter 格式化方法
   * @param formatter[rowData] 行数据
   */
  columns : [],
  // 加载的地址
  url : '',
  // 数据请求地址
  param : {},
  // 数据
  data : [],
  // 标题
  title : '',
  /**
   * 标题栏内嵌工具栏。
   * @param singleCheck true:单选验证;false:多选验证;null:不验证.
   * @see LKUI.button
   */
  titleTools : [],
  /**
   * 工具栏。
   * @param singleCheck true:单选验证;false:多选验证;null:不验证.
   * @see LKUI.button
   */
  tools : [],
  /**
   * 查询表单
   * @see LK.UI.form
   */
  searchForm : [],

  // 是否显示增加按钮
  showAddBtn : true,
  /**
   * 增加表单
   * @see LK.UI.form
   */
  addForm : [],
  /**
   * 增加表单对话框大小
   * @see LK.UI.openDialog
   */
  addFormSize : null,
  // 增加表单提交URL
  addFormUrl : '/add',

  // 是否显示编辑按钮
  showEditBtn : true,
  /**
   * 编辑表单
   * @see LK.UI.form
   */
  editForm : [],
  /**
   * 编辑表单对话框大小
   * @see LK.UI.openDialog
   */
  editFormSize : null,
  // 编辑表单提交URL
  editFormUrl : '/edit',
  editUrl : '/getOneById',

  // 是否显示删除按钮
  showRemoveBtn : true,
  // 删除表单提交URL
  removeUrl : 'remove',

  // 是否带分页信息
  pageable : true,
  // 数据高度
  dataBodyBarHeight : 0,
  // 创建时不加载数据。需要通过reload方法触发数据的加载。
  lazy : false,
  // 支持多选
  multiSelect : false,
  // 是否是TreeGrid
  treeGrid : false,
  // 显示树形的列
  treeColumn : '',
  // 是否显示checkbox
  checkbox : false,
  // 联动选择时只选中子节点
  onlyCheckChildren : false,

  // 事件

  /**
   * 行点击事件
   * @param rowData 行数据
   */
  onRowClick : function(rowData) {
  },
  /**
   * 加载数据失败
   * @param ajaxErrorArguments AJAX请求失败参数列表
   * @param url 请求地址
   * @param param 请求参数
   */
  onLoadDatasError : function(ajaxErrorArguments, url, param) {
  },
  /**
   * 加载数据成功之后
   * @param responseDatas 响应数据
   * @param url 请求地址
   * @param param 请求参数
   */
  onAfterAddDatas : function(responseDatas, url, param) {
  }
});
