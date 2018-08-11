$('a').each(function() {
  $(this).click(function() {
    window.open(_CTX + '/demo/' + $(this).html() + _MAPPING_PAGES);
  });
});