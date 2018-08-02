$.extend(LK.i18n, {
  'categoryCode' : '类目编码',
  'categoryName' : '类目名称'
});

LK.UI.datagrid({
  url : '/L/SysCategory',
  valueFieldName : 'categoryCode',
  $appendTo : $('#demo'),
  validator : true,
  multiSelect : true,
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