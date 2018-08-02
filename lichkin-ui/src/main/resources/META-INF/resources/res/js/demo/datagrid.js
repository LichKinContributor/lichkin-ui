$.extend(LK.i18n, {
  'category' : '类目',
  'categoryCode' : '类目编码',
  'categoryName' : '类目名称'
});

LK.UI.datagrid({
  url : '/L/SysCategory',
  valueFieldName : 'categoryCode',
  $appendTo : $('#demo'),
  validator : true,
  multiSelect : true,
  title : 'category',
  icon : 'page',
  value : 'USING_STATUS#@#GENDER',
  columns : [
      {
        'name' : 'categoryCode',
        'text' : 'categoryCode',
        'width' : '200'
      }, {
        'name' : 'categoryName',
        'text' : 'categoryName',
        'width' : '200'
      }, {
        'name' : 'categoryName',
        'text' : 'categoryName',
        'width' : '200'
      }, {
        'name' : 'categoryName',
        'text' : 'categoryName',
        'width' : '200'
      }, {
        'name' : 'categoryName',
        'text' : 'categoryName',
        'width' : '200'
      }, {
        'name' : 'categoryName',
        'text' : 'categoryName',
        'width' : '200'
      }, {
        'name' : 'categoryName',
        'text' : 'categoryName',
        'width' : '200'
      }, {
        'name' : 'categoryName',
        'text' : 'categoryName',
        'width' : '200'
      }
  ]
});