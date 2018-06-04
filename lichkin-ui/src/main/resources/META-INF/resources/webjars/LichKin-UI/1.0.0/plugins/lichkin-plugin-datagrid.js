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

/**
 * 控件功能性方法，提供JQuery扩展。
 */
$.fn.extend({

  /**
   * 使用LKUI开头+控件名命名扩展
   * @param funcName 控件具体方法名
   * @param options 控件具体方法需要的参数。部分方法可扩展实现代码简写方式。
   */
  LKUIdatagrid : function(funcName, options) {
    var that = this;

    // 第一个参数为字符串时，即为调用该类型控件的方法。
    if (isString(funcName)) {
      switch (funcName) {
        case 'reload':
          LK.UI.reloadDatagrid($.extend({
            $obj : that
          }, options));
          return;
        case 'getSelected':
          return LK.UI.getDatagridSelected($.extend({
            $obj : that
          }));
        case 'getSelectedData':
          return LK.UI.getDatagridSelected($.extend({
            $obj : that
          })).data();
        default:
          // 没有该方法
          break;
      }
    }
    // 参数非法
    throw 'illegal arguments';
  }

});

/**
 * 数据表格控件内部实现相关
 */
LK.UI._datagrid = {

  /** 控件类型 */
  plugin : 'datagrid',

  /**
   * 添加数据
   * @param $table 数据容器对象
   * @param columns 列信息
   * @param datas 数据集
   */
  addDatas : function($table, columns, datas) {
    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($table);
      $tr.data(data);
      for (var j = 0; j < columns.length; j++) {
        var column = columns[j];
        var $td = $('<td class="lichkin-table-cell" style="width:' + column.width + 'px;"></td>').appendTo($tr);
        var text = data[column.name];
        if (column.formatter) {
          text = column.formatter(data);
        }
        $td.append(LKUI.text(text));
      }
    }
  },

  /**
   * 加载数据
   * @param $table 数据容器对象
   * @param options 参数
   */
  loadDatas : function($table, options) {
    var that = this;

    // 数据方式增加行
    if (options.data.length != 0) {
      that.addDatas($table, options.columns, options.data);
    } else {
      // 请求方式增加行
      if (options.url != '') {
        LK.ajax({
          url : options.url,
          data : options.param,
          success : function(responseDatas) {
            that.addDatas($table, options.columns, responseDatas);
          },
          error : function() {
            options.onLoadDatasError(arguments, options.url, options.param);
          }
        });
      }
    }
  },

  /**
   * 重新加载数据
   * @param $table 数据容器对象
   * @param options 参数
   */
  reloadDatas : function($table, options) {
    $table.children().remove();
    this.loadDatas($table, options);
  },

  /**
   * 获取选中项
   * @param $plugin 控件对象
   */
  getSelected : function($plugin) {
    return $plugin.find('.lichkin-table-row-selected');
  },

  /**
   * 添加工具栏
   * @param $plugin 控件对象
   * @param options 参数
   * @param $toolsBar 工具栏对象
   * @param tools 工具栏定义参数
   */
  addTools : function($plugin, options, $toolsBar, tools) {
    for (var i = 0; i < tools.length; i++) {
      var tool = tools[i];
      (function(tool) {
        var click;
        if (tool.singleCheck == true) {
          click = function() {
            var $selectRow = LK.UI.getDatagridSelected({
              id : options.id
            });
            if ($selectRow.length == 0) {
              LK.alert(LK.i18n.noSelect);
              return;
            } else if ($selectRow.length != 1) {
              LK.alert(LK.i18n.singleSelect);
              return;
            }
            tool.click($plugin, options, $selectRow.data(), $selectRow.data().id);
          };
        } else if (tool.singleCheck == false) {
          click = function() {
            var $selectRow = LK.UI.getDatagridSelected({
              id : options.id
            });
            if ($selectRow.length == 0) {
              LK.alert(LK.i18n.noSelect);
              return;
            }
            var datas = new Array();
            var ids = new Array();
            for (var i = 0; i < $selectRow.length; i++) {
              var data = $($selectRow[i]).data();
              datas.push(data);
              ids.push(data.id);
            }
            tool.click($plugin, options, datas, ids.join(LK.SPLITOR));
          };
        } else {
          click = function() {
            var $selectRow = LK.UI.getDatagridSelected({
              id : options.id
            });
            var datas = new Array();
            var ids = new Array();
            if ($selectRow.length != 0) {
              for (var i = 0; i < $selectRow.length; i++) {
                var data = $($selectRow[i]).data();
                datas.push(data);
                ids.push(data.id);
              }
            }
            tool.click($plugin, options, datas, ids.join(LK.SPLITOR));
          };
        }
        $toolsBar.append(LKUI.button(tool.text, tool.icon, click, tool.tip));
      })(tool);
    }
  }

};

/**
 * 数据表格控件
 */
LK.UI('plugins', 'datagrid', function(options) {
  // 设置id
  if (options.id == '') {
    options.id = randomInRange(10000, 99999);
  }

  // 创建控件对象
  var $plugin = $('<div id="' + options.id + '" data-id="datagrid_' + options.id + '" data-plugin="datagrid" class="lichkin-datagrid"></div>');

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
  var $table = $('<table class="lichkin-table"></table>').appendTo($dataBodyBar);
  // 点击事件
  $table.click(function(e) {
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
      options.onRowClick($tr.data());
    }
  });

  // 加载数据
  if (options.lazy != true) {
    LK.UI._datagrid.loadDatas($table, options);
  }

  // 分页栏
  if (options.pageable != null) {
    var $pagesBar = $('<div class="lichkin-datagrid-pagesBar"></div>').appendTo($plugin);
  }

  // 返回控件对象
  return $plugin.LKUIinit('datagrid', options);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
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
  // 是否带分页信息
  pageable : null,
  // 数据高度
  dataBodyBarHeight : 0,
  // 创建时不加载数据。需要通过reload方法触发数据的加载。
  lazy : false,
  // 支持多选
  multiSelect : false,

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
  }
});

/**
 * 重新加载数据表格
 */
LK.UI('plugins', 'reloadDatagrid', function(options) {
  var $plugin = LK.UI.getUIPlugin($.extend(true, {}, options, {
    UI : 'plugins'
  }));

  var pluginOptions = $plugin.options;
  if (options.url != '') {
    pluginOptions.url = options.url;
  }

  pluginOptions.param = options.param;

  pluginOptions.data = [];
  if (options.data.length != 0) {
    pluginOptions.data = options.data;
  }

  LK.UI._datagrid.reloadDatas($plugin.find('.lichkin-datagrid-dataBodyBar').children('.lichkin-table'), pluginOptions);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null,
  // 重新加载的地址
  url : '',
  // 重新加载的参数
  param : {},
  // 重新加载的数据
  data : []
});

/**
 * 获取选中项
 */
LK.UI('plugins', 'getDatagridSelected', function(options) {
  var $plugin = LK.UI.getUIPlugin($.extend(true, {}, options, {
    UI : 'plugins'
  }));

  return LK.UI._datagrid.getSelected($plugin);
}, {
  // 渲染过的控件对应的DOM元素ID属性值
  id : '',
  // 渲染过的控件对应的DOM元素data-id属性值
  dataId : '',
  // 渲染过的控件对应的JQuery对象
  $obj : null
});
