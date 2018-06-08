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
   * 添加数据
   * @param $plugin 控件对象
   * @param datas 数据集
   */
  addDatas : function($plugin, datas) {
    this.addNodes(this.getDataContainer($plugin), $plugin.options.columns, datas);
  },

  /**
   * 添加数据
   * @param $table 数据容器对象
   * @param columns 列信息
   * @param datas 数据集
   */
  addNodes : function($table, columns, datas) {
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
        $toolsBar.append(LKUI.button(tool.text, tool.icon, click, tool.tip));
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
  var $plugin = LKUI._createUIPlugin(plugin, options);

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
      options.onRowClick($tr.data());
    }
  });

  // 分页栏
  if (options.pageable != null) {
    var $pagesBar = $('<div class="lichkin-datagrid-pagesBar"></div>').appendTo($plugin);
  }

  // 加载数据
  if (options.lazy != true) {
    LKUI._load(options, plugin, $container);
  }

  // 返回控件对象
  return $plugin;
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
