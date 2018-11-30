'use strict';
var rulesModule = (function() {
  //Objects/variables inside module
  var
  //Variables inside module
  //functions
  init, getRules = null;
  getRules = function() {
    var saveRules;
    saveRules = function (ResultH) {
      localStorage.rules = ResultH.result;
    };

    $.ajax(
      {
        url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
        data : { f : 'READ', n : 'ABuglaev_BJ_Rules' },
        success : saveRules, error : function(){alert(' not found (')}
      }
    );
   
  }

  init = function() {
    if ( !document.getElementById('rules_style') ) { $('head').append(' <link rel="stylesheet" href="css/rules.css" id="rules_style"> ')};
    $('#content').html(localStorage.rules).css('text-align','left');
  };

  return {init : init, getRules : getRules};
})();