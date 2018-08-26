LK.UI.droplist({
  url : '/L/SysDictionary/Droplist',
  param : {
    categoryCode : 'GENDER'
  },
  $appendTo : $('#demo')
});
LK.UI.droplist({
  url : '/L/SysDictionary/Droplist',
  param : {
    categoryCode : 'GENDER'
  },
  $appendTo : $('#demo'),
  value : 'MALE'
});
LK.UI.droplist({
  url : '/L/SysDictionary/Droplist',
  param : {
    categoryCode : 'GENDER'
  },
  $appendTo : $('#demo'),
  value : 'MALE#@#FEMALE',
  multiSelect : true
});
LK.UI.droplist({
  url : '/L/SysDictionary/Droplist',
  param : {
    categoryCode : 'GENDER'
  },
  $appendTo : $('#demo'),
  readonly : true
});

LK.UI.droplist({
  url : '/L/SysDictionary/Droplist',
  param : {
    categoryCode : 'GENDER'
  },
  $appendTo : $('#demo2'),
  validator : true
});
LK.UI.droplist({
  url : '/L/SysDictionary/Droplist',
  param : {
    categoryCode : 'GENDER'
  },
  $appendTo : $('#demo2'),
  multiSelect : true,
  validator : 'required'
});

LK.UI.droplist({
  url : '/L/SysDictionary/Droplist',
  param : {
    categoryCode : 'GENDER'
  },
  $appendTo : $('#demo3'),
  value : 'MALE#@#FEMALE',
  multiSelect : true
}).LKLoad();
var $droplist = LK.UI.droplist({
  lazy : true,
  $appendTo : $('#demo3')
});
LK.UI.droplist({
  lazy : true,
  $appendTo : $('#demo3'),
  id : 'gender'
});