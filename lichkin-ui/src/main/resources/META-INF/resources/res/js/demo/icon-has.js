LK.UI.icon({
  $appendTo : $('body'),
  icon : 'loading',
  size : 128,
  style : {
    'cursor' : 'pointer'
  }
}).click(function() {
  alert(LK.UI.hasIcon({
    $icon : $(this),
    icon : 'loading'
  }));
});

LK.UI.icon({
  $appendTo : $('body'),
  icon : 'loading',
  size : 128,
  style : {
    'cursor' : 'pointer'
  }
}).click(function() {
  alert(LK.UI.hasIcon({
    $icon : $(this),
    icon : 'ok'
  }));
});