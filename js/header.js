'use strict';
var headerModule = (function() {
  //Objects/variables inside module
  var
  //Constants
  //HTML tamplate
  HTML_TEMPLATE = '<nav class="navbar navbar-inverse" id="header">\
  <div class="container-fluid">\
    <!-- Brand and toggle get grouped for better mobile display -->\
    <div class="navbar-header">\
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\
        <span class="icon-bar"></span>\
        <span class="icon-bar"></span>\
        <span class="icon-bar"></span>\
      </button>\
      <a class="navbar-brand vcenter" href="#play"> <img src="images/logo.png" alt="logo" class="logo"> </a>\
    </div>\
    \
    <!-- Collect the nav links, forms, and other content for toggling -->\
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\
      <ul class="nav navbar-nav navbar-right">\
        <li><a href="#play">Play</a></li>\
        <li><a href="#rules">Rules</a></li>\
        <li><a href="#highscores">Highscores</a></li>\
        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" id="userInfo">Log in / Sign in <span class="caret"></span></a>\
        <ul id="login-dp" class="dropdown-menu">\
          <li>\
             <div class="row">\
                <div class="col-md-12">\
                   <form class="form" role="form" accept-charset="UTF-8" id="login-nav">\
                      <div class="form-group" id="nick_wrap">\
                         <input placeholder=" Nickname" id="nick_value" required>\
                      </div>\
                      <div class="form-group" id="password_wrap">\
                         <input id="password_value" type="password" placeholder=" Password" required>\
                      </div>\
                      \
                      <div class="form-group" id="submit_wrap">\
                         <button class="btn btn-default btn-block" id="submit_button" >Sign in</button>\
                      </div>\
                      <div class="checkbox">\
                         <label>\
                         <input type="checkbox" id="keepLogged"> keep me logged-in\
                         </label>\
                      </div>\
                   </form>\
                </div>\
             </div>\
          </li>\
        </ul>\
        </li>\
      </ul>\
    </div><!-- /.navbar-collapse -->\
  </div><!-- /.container-fluid -->\
</nav>',
  //functions
  init, logIn, changeScore;

    logIn = function(name,password) {
      var changeButton = function(name, score) {
        $('#userInfo').html(name + '<br>' + score)
                      .css('padding', '5px 15px');
        $('.dropdown').removeClass('open');
      };

      var saveUser = function(ResultH) {
        var allUsers = {}, thisUser = {};

        allUsers = JSON.parse(ResultH.result);

        if (name in allUsers) {
          //Такой юзер есть, пароль верный
          if (allUsers[name]['p'] === password) {
            Object.defineProperty(thisUser, name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: allUsers[name]
            });  
            localStorage.user = JSON.stringify( thisUser );
            if ($('#keepLogged').is(':checked')) {
              localStorage.currentUserName = name;
              localStorage.currentUserPassword = password;
            } else {
              delete localStorage.currentUserName;
              delete localStorage.currentUserPassword;
            };
              changeButton(name, allUsers[name]['c']);

          //Такой юзер есть, пароль неверный
          } else {
            alert('user exists, wrong password');
            return false;
          };

        } else { 
        //Такого юзера нет, заводим
          alert('Welcome, ' + name + '!  GL HF!!!');
          Object.defineProperty(thisUser, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { p : password, c : 1000}
          }); 
          localStorage.user = JSON.stringify( thisUser );
          if ($('#keepLogged').is(':checked')) {
            localStorage.currentUserName = name;
            localStorage.currentUserPassword = password;
          };
          allUsers[name] = { p : password, c : 1000};
          changeButton(name, allUsers[name]['c']);
            var updateBase = function() {
              $.ajax(
                  {
                    url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
                    data : { f : 'UPDATE', n : 'ABuglaev_BJ_Users0', p: '123123123', v: JSON.stringify( allUsers ) },
                    error : function(){alert(' Что-то пошло не так...')}
                  }
                );     
              };

          $.ajax(
            {
              url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
              data : { f : 'LOCKGET', n : 'ABuglaev_BJ_Users0', p: '123123123' },
              success : updateBase, error : function(){alert(' not locked')}
            }
          );
        }
    };

    $.ajax(
      {
        url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
        data : { f : 'READ', n : 'ABuglaev_BJ_Users0' },
        success : saveUser, error : function(){alert('user\'s object not found (')}
      }
    );

  };

  changeScore = function(value) {
    var saveUserScore = function(ResultH) {
      var allUsers = {}, thisUser = {}, thisUserName, thisUserScore;

      var updateBase = function(){
        $.ajax(
          {
            url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
            data : { f : 'UPDATE', n : 'ABuglaev_BJ_Users0', p: '123123123', v: JSON.stringify( allUsers ) },
            error : function(){alert(' Что-то пошло не так...')}
          }
        );
        $('#userInfo').html(thisUserName + '<br>' + thisUserScore).effect('highlight');
      };

      thisUser = JSON.parse( localStorage.user );
      thisUserName = Object.keys(thisUser)[0];
      thisUserScore = thisUser[thisUserName]['c'];
      thisUserScore = thisUserScore + value;
      thisUser[thisUserName]['c'] = thisUserScore;
      localStorage.user = JSON.stringify(thisUser);

      allUsers = JSON.parse(ResultH.result);
      allUsers[thisUserName] = thisUser[thisUserName];

      $.ajax(
        {
          url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
          data : { f : 'LOCKGET', n : 'ABuglaev_BJ_Users0', p: '123123123' },
          success : updateBase, error : function(){alert(' not locked')}
        }
      );

    };

    $.ajax(
      {
        url : "http://fe.it-academy.by/AjaxStringStorage2.php", type : 'POST', cache : false,
        data : { f : 'READ', n : 'ABuglaev_BJ_Users0' },
        success : saveUserScore, error : function(){alert('user\'s object not found ( can not change score...')}
      }
    );
  };

  init = function() {
    if ( !document.getElementById('header_style') ) { $('head').append(' <link rel="stylesheet" href="css/header.css" id="header_style"> ')};
    $( HTML_TEMPLATE ).appendTo($('body'));
    if ( localStorage.currentUserName ) {
      $("#keepLogged").attr("checked","checked");
      logIn( localStorage.currentUserName, localStorage.currentUserPassword);
    };

    $('#submit_button').on('click',  function(event) {
      event.preventDefault();
      logIn( $('#nick_value').val(), $('#password_value').val() );
    });

  };

  return {init : init, changeScore : changeScore};
})();