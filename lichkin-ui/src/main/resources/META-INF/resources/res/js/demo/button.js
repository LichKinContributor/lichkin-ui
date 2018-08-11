LK.UI.button({
  $appendTo : $('body'),
  text : {
    text : 'tip'
  },
  click : function($button) {
    console.log(arguments);// do something
  }
});

LK.UI.button({
  $appendTo : $('body'),
  icon : {
    icon : 'tip'
  },
  click : function() {
    console.log(arguments);// do something
  }
});

LK.UI.button({
  $appendTo : $('body'),
  icon : {
    icon : 'tip'
  },
  text : {
    text : 'tip'
  },
  click : function() {
    console.log(arguments);// do something
  }
});

// 简写
LK.UI.button({
  $appendTo : $('body'),
  text : 'tip',
  click : function($button) {
    console.log(arguments);// do something
  }
});

LK.UI.button({
  $appendTo : $('body'),
  icon : 'tip',
  click : function() {
    console.log(arguments);// do something
  }
});

LK.UI.button({
  $appendTo : $('body'),
  icon : 'tip',
  text : 'tip',
  click : function() {
    console.log(arguments);// do something
  }
});