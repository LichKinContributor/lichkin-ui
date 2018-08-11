LK.UI.icon({
  $appendTo : $('body'),
  icon : 'loading',
  size : 128,
  style : {
    'cursor' : 'pointer'
  }
}).click(function() {
  LK.UI.changeIcon({
    $icon : $(this),
    icon : 'ok',
    type : false
  });
});

LK.UI.icon({
  $appendTo : $('body'),
  icon : 'loading',
  size : 128,
  style : {
    'cursor' : 'pointer'
  }
}).click(function() {
  LK.UI.changeIcon({
    $icon : $(this),
    icon : 'cancel',
    type : true
  });
});

LK.UI.icon({
  $appendTo : $('body'),
  icon : 'loading',
  size : 128,
  style : {
    'cursor' : 'pointer'
  }
}).click(function() {
  LK.UI.changeIcon({
    $icon : $(this)
  });
});