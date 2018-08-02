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
   */
  setValues : function($plugin, $container, values) {
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

    $plugin.LKSetValues(valueArr);
  },

  /**
   * 添加数据
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param datas 数据集
   */
  addDatas : function($plugin, $container, datas) {
    var columns = $plugin.data('LKOPTIONS').columns;
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
      var $td = $('<td class="lichkin-table-cell" style="width:' + column.width + 'px;"></td>').appendTo($tr);
      var text = data[column.name];
      if (column.formatter) {
        text = column.formatter(data);
      }
      text = '' + text;
      var $text = LK.UI.text({
        'original' : true,
        'text' : text
      }).css('width', parseInt(column.width) - 12);
      if (isString(column.textAlign)) {
        $text.css('text-align', column.textAlign);
      }
      $td.append($text);
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
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var $pluginContainer = $plugin.parent();
  var height = $pluginContainer.height();

  var dataWidth = options.cols * (LK.leftGap + LK.fieldKeyWidth + LK.colWidth) + 17 - (options.inForm ? (LK.leftGap + LK.fieldKeyWidth + 17 + 2) : 0);

  // 查询表单栏
  var $searchFormBar = $('<div class="lichkin-datagrid-searchFormBar"></div>');
  var $searchForm;
  if (options.searchForm.length != 0) {
    $searchFormBar.appendTo($plugin);
    $searchFormBar.css('width', dataWidth);
    $searchFormBar.css('padding-bottom', LK.topGap);
    $searchForm = LK.UI.form({
      $appendTo : $searchFormBar,
      plugins : options.searchForm
    });
  }

  // 标题栏
  var $titleBar = $('<div class="lichkin-datagrid-titleBar"></div>');
  if (options.title != null || options.icon != null) {
    if (options.searchForm.length != 0) {
      $titleBar.insertBefore($searchFormBar);
    } else {
      $titleBar.appendTo($plugin);
    }
    $titleBar.css('width', dataWidth);
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
        icon : 'reset',
        click : function() {
          $searchForm.LKFormBindData();
        }
      });
      options.titleTools.push({
        icon : 'search',
        click : function() {
          $plugin.LKLoad({
            param : $searchForm.LKFormGetData()
          });
        }
      });
    } else {
      options.titleTools.push({
        icon : 'search',
        click : function() {
          $plugin.LKLoad();
        }
      });
    }
    var $buttonsBar = $('<div class="lichkin-buttons"></div>').appendTo($titleBar);
    for (var i = 0; i < options.titleTools.length; i++) {
      var button = options.titleTools[i];
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
            click($button, $plugin);
          },
          tip : button.tip
        }));
      })(button);
    }
  }

  // 数据栏
  var $dataBar = $('<div class="lichkin-datagrid-dataBar"></div>').appendTo($plugin);
  $dataBar.css('width', dataWidth);
  $dataBar.css('height', height - 2 - ((options.title != null || options.icon != null) ? $titleBar.outerHeight() : 0) - (options.searchForm.length != 0 ? $searchFormBar.outerHeight() : 0));
  // 数据标题栏
  var $dataHeaderBar = $('<div class="lichkin-datagrid-dataHeaderBar"></div>').appendTo($dataBar);
  $dataHeaderBar.css('width', dataWidth);
  var $tableHeader = $('<table class="lichkin-table"></table>').appendTo($dataHeaderBar);
  var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($tableHeader);
  for (var i = 0; i < options.columns.length; i++) {
    var column = options.columns[i];
    var $td = $('<td class="lichkin-table-cell" style="width:' + column.width + 'px;"></td>').appendTo($tr);
    $td.append(LK.UI.text({
      'text' : column.text
    }).css('width', parseInt(column.width) - 12));
  }

  // 数据内容栏
  var $dataBodyBar = $('<div class="lichkin-datagrid-dataBodyBar"></div>').appendTo($dataBar);
  $dataBodyBar.css('width', dataWidth);
  $dataBodyBar.css('height', $dataBar.height() - $dataHeaderBar.outerHeight());
  $dataBodyBar.scroll(function(e) {
    $dataHeaderBar.css('margin-left', -$(this).scrollLeft());
  });
  // 数据容器
  var $container = $('<table class="lichkin-table"></table>').appendTo($dataBodyBar).LKAddPluginClass(plugin, 'dataContainer');

  // 加载数据
  LK.UI.load({
    $plugin : $plugin,
    isCreateEvent : true,
    options : options
  });

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, {
  // @see LK.UI.create
  id : '',
  $appendTo : null,
  $renderTo : null,
  name : '',
  validator : null,
  value : null,
  inForm : false,
  cols : 4,
  rows : 14,
  linkages : [],
  onLinkaged : function($plugin, linkage) {
  },
  onChange : function($plugin, pluginValues, pluginValue, currentValue) {
  },

  // @see LK.UI.load
  lazy : false,
  url : '',
  param : {},
  data : null,
  onBeforeAddDatas : function($plugin, responseDatas, url, param) {
    return responseDatas;
  },
  onAfterAddDatas : function($plugin, responseDatas, url, param) {
  },
  onLoadDatasError : function($plugin, ajaxErrorArguments, url, param) {
  },

  // 支持多选
  multiSelect : false,
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
  /**
   * 标题栏工具栏
   * @see LK.UI.button（click方法被重写，第一个参数保持按钮控件不变，增加第二个参数当前对话框控件。仅支持图标按钮。）
   * @tip 如果输入了title或icon，则框架内部会补充刷新按钮。如果有查询表单时，则框架内部会补充重置按钮和查询按钮。
   */
  titleTools : []
});

$('body').mousedown(function(e) {
  var $that = $(e.target);
  if ($that.is('.lichkin-datagrid .lichkin-datagrid-dataBodyBar .lichkin-table .lichkin-table-row .lichkin-table-cell') || $that.is('.lichkin-datagrid .lichkin-datagrid-dataBodyBar .lichkin-table .lichkin-table-row .lichkin-table-cell .lichkin-text')) {
    if (!$that.is('td')) {
      $that = $that.parent('td');
    }
    var $plugin = $that.parents('.lichkin-datagrid:first');
    var options = $plugin.data('LKOPTIONS');
    var $node = $that.parents('tr:first');
    var dataValue = $node.data(options.valueFieldName);
    if (typeof dataValue == 'undefined') {
      throw 'can not get value by key -> ' + options.valueFieldName;
    }
    if (options.multiSelect) {
      $node.toggleClass('selected');
      $plugin.LKInvokeSetValues(null);
    } else {
      $plugin.LKInvokeSetValues(($node.hasClass('selected') ? '' : dataValue));
    }
    $plugin.LKlinkage(dataValue, false);
    $plugin.LKValidate();
  }
});
