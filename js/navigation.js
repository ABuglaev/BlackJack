'use strict';
var navigationModule = (function() {
  //Objects/variables inside module
  var
  //functions
  init, locationHashChanged;

  locationHashChanged = function() {  
    switch (location.hash) {  
      case '#play': { 
        tableModule.init();
        break;
      }
      case '#rules': {
        rulesModule.init();
        break;
      }
      case '#highscores': {
        highscoresModule.init();
        break;
      }
    }
  }
  init = function() {
    window.onhashchange = locationHashChanged;
  };

  return {init : init};
})();