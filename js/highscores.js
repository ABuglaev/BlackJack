'use strict';
var highscoresModule = (function() {
  //Objects/variables inside module
  var
  //Variables inside module
  //functions
  init, showHighscores;

  showHighscores = function() {
    //из полученного по ajax объекта со всеми юзерами формируем html таблицу c топ 10
    var getTop10 = function(ResultH) {
      var allUsers = JSON.parse(ResultH.result),
          sortByScore = function(a,b) {
            return allUsers[b].c - +allUsers[a].c;
          },
          allUsersSorted;

      allUsersSorted = Object.keys(allUsers).sort(sortByScore);

      $('#content').html('<h1>Top-10 players:</h1><table id="HSTable"><tr> <td>№</td><td>Nickname</td><td>Score</td> </tr></table>');

      for (var i = 0; i < 10; i++) {
        $('#HSTable').append('<tr><td>'+ (i+1) +'</td><td>' + allUsersSorted[i] + '</td><td> ' + allUsers[allUsersSorted[i]].c + '</td></tr>');
      }
    };

    $.ajax(
      {
        url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
        data : { f : 'READ', n : 'ABuglaev_BJ_Users0' },
        success : getTop10, error : function(){alert('user\'s object not found ( | highscores module')}
      }
    );

  };

  init = function() {
    if ( !document.getElementById('highscores_style') ) { $('head').append(' <link rel="stylesheet" href="css/highscores.css" id="highscores_style"> ')};
    showHighscores();
  };

  return {init : init};
})();