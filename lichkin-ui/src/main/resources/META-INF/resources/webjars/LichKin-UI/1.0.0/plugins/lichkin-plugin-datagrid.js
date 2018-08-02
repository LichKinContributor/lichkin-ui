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
  var width = $pluginContainer.width();
  var height = $pluginContainer.height();
  if (!options.inForm) {
    $plugin.css({
      'width' : width,
      'height' : height
    });
    $(window).bind({
      'resize' : function() {
        $plugin.css({
          'width' : $pluginContainer.width(),
          'height' : $pluginContainer.height()
        });
      }
    });
  }

  // 标题栏
  var $titleBar = $('<div class="lichkin-datagrid-titleBar"></div>');
  if (options.title != null || options.icon != null) {
    $titleBar.appendTo($plugin);
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
  }

  // 数据栏
  var $dataBar = $('<div class="lichkin-datagrid-dataBar"></div>').appendTo($plugin);
  // 数据标题栏
  var $dataHeaderBar = $('<div class="lichkin-datagrid-dataHeaderBar"></div>').appendTo($dataBar);
  var $tableHeader = $('<table class="lichkin-table"></table>').appendTo($dataHeaderBar);
  var $tr = $('<tr class="lichkin-table-row"></tr>').appendTo($tableHeader);
  var dataWidth = 17;
  for (var i = 0; i < options.columns.length; i++) {
    var column = options.columns[i];
    dataWidth += parseInt(column.width) + 1;
    var $td = $('<td class="lichkin-table-cell" style="width:' + column.width + 'px;"></td>').appendTo($tr);
    $td.append(LK.UI.text({
      'text' : column.text
    }).css('width', parseInt(column.width) - 12));
  }

  if (options.title != null) {
    $titleBar.css('width', dataWidth);
  }
  $dataBar.css('width', dataWidth);
  $dataBar.css('height', height - 2 - ((options.title != null || options.icon != null) ? 38 : 0));
  $dataHeaderBar.css('width', dataWidth);
  // 数据内容栏
  var $dataBodyBar = $('<div class="lichkin-datagrid-dataBodyBar"></div>').appendTo($dataBar);
  $dataBodyBar.css('width', dataWidth);
  $dataBodyBar.css('height', $dataBar.height() + 1 - $dataHeaderBar.height() - 17);
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
  icon : null
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
