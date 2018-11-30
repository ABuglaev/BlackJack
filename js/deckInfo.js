'use strict';
var deckInfo = (function() {
  //Objects/variables inside module
  var
  //Constants
  //HTML tamplate
  HTML_TEMPLATE = '<div id=\'deckInfo\'>\
                   </div>',
  //functions
  init;

  init = function() {
    alert('here');
                $('#hit').on('click',  function() {
      alert('hit clicked');
    });
  };

  return {init : init};
})();