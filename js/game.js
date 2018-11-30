'use strict';
var gameModule = (function() {
  //Objects/variables inside module
  var
  //Variables inside module
  //functions
  newRound;

  newRound = function() {
    var bet=0, i = 0,
    
    clearAll = function(){ //clear table and remove cards HTML...
      var clearHTML = function(){
        $('.del').detach();
      };
      $('.card_wrap').addClass('del');
      $('.card_wrap').animate({
        top: -100 + 'px',
        left: -100 + 'px'
      }, 800, clearHTML);
    };

    var deal = function(){
      var score = 0, dscore = 0, cs = 0, pA = false, dA = false, profit = 0,  cards = [];
      var toDealer = function() {
        var k = 0;
        do {
          i++;
          k++;
          cards[i] = new Card;
          cards[i].move(88,9,0,0);
          cards[i].move(45 + k*3,10,400,400*k);
          cards[i].open( cards[i].val, 100, 700*k);
          cs = parseInt( cards[i].val.slice(1), 10 );
          if (cs > 10) {cs = 10};
          if (cs === 1) { dA = true};
          dscore = dscore + cs;

          if (dA && k === 1 && dscore === 11) { 
            dscore = 100;
            $('#dscore_div').text('BlackJack');
            break;
          };

          if (dA) {
            if (dscore + 10 < 17) {
              dscore = dscore;
            };
            if (dscore + 10 > 16 && dscore + 10 < 22) {
              dscore = dscore + 10;
              break;
            }
            if (dscore + 10 > 21) {
              dscore = dscore;
              dA = false;
            }

          };

        } while (dscore < 17);

        setTimeout( (function(){

          if (dscore === 100) {
            if (score === 100) {
              headerModule.changeScore( bet );
              $('#bet_div').text('Push. ' + bet + ' returned');
            } else {
              $('#bet_div').text('You have lost ' + bet + '.');
            }
            setTimeout(newRound, 1000);
            return;
          };

          if (dscore > 21) {
            if (score === 100) {bet = bet * 1.5}
            headerModule.changeScore( 2*bet );
            $('#dscore_div').text(dscore + ', bust');
            $('#bet_div').text('You have won ' + bet + ' !');
            setTimeout(newRound, 1000);
            return;
          };

          if (dscore > score && dscore <= 21) {
            $('#dscore_div').text(dscore);
            $('#bet_div').text('You have lost ' + bet + '.');
            setTimeout(newRound, 1000);
          };

          if (dscore < score) {
            if (score === 100) {bet = bet * 1.5}
            headerModule.changeScore( 2*bet );
            $('#dscore_div').text(dscore);
            $('#bet_div').text('You have won ' + bet + '!');
            setTimeout(newRound, 1000);
          };

          if (dscore === score) { 
            headerModule.changeScore( bet );
            $('#dscore_div').text(dscore);
            $('#bet_div').text('Push. ' + bet + ' returned');
            setTimeout(newRound, 1000);
          };

        }), (k*700));

      };

      clearAll();

      cards[0] = new Card();
        cards[0].move(88,9,0,0);
        cards[0].move(40,40,600,100);
        cards[0].open( cards[0].val, 100, 100+600);
        cs = parseInt( cards[0].val.slice(1), 10 );
        if (cs > 10) {cs = 10};
        if (cs === 1) { pA = true};
        score = score + cs;

      cards[1] = new Card();
        cards[1].move(88,9,0,0);
        cards[1].move(45,10,600,600);
        cards[1].open( cards[1].val, 100, 600+600);
        cs = parseInt( cards[1].val.slice(1), 10 );
        if (cs > 10) {cs = 10};
        if (cs === 1) { dA = true};
        dscore = dscore + cs;

      cards[2] = new Card();
        cards[2].move(88,9,0,0);
        cards[2].move(43,40,600,1100);
        cards[2].open( cards[2].val, 100, 1100+600);
        cs = parseInt( cards[2].val.slice(1), 10 );
        if (cs > 10) {cs = 10};
        if (cs === 1) { pA = true};
        score = score + cs;

    //if | insurance | split

      //show scores in the begining
      $('#score_div').text(score);
      if (pA) { $('#score_div').text(score + ' / ' + (score+10)); };
      $('#dscore_div').text(dscore);
      if (dA) { $('#dscore_div').text(dscore + ' / ' + (dscore+10)); };

      if (score === 11 && pA) {
        $('#score_div').text('BlackJack');
        score = 100;
        setTimeout( function(){
        if(window.navigator)  { window.navigator.vibrate(300,200,300) };
        }, 500);
        setTimeout(toDealer, 1500);
        return;
      };

      $('#double').addClass('active');
      $('#hit').addClass('active');
      $('#surrender').addClass('active');
      $('#stand').addClass('active');

      $('#surrender').on('click', function(){
          $('#table').off();
        $('#surrender').off();
        $('#hit').off();
        $('#double').off();
        $('#stand').off();
        $('.button_wrap').removeClass('active');

        headerModule.changeScore( 0.5*bet );
        $('#bet_div').text( 0.5*bet + ' returned');
        setTimeout(newRound, 1000);
      });
      //touch screen func surrender
      $('#table').on('swiperight', function(){
        $('#table').off();
        $('#surrender').off();
        $('#hit').off();
        $('#double').off();
        $('#stand').off();
        $('.button_wrap').removeClass('active');

        headerModule.changeScore( 0.5*bet );
        $('#bet_div').text( 0.5*bet + ' returned');
        setTimeout(newRound, 1000);   
      }); 
      //---------------------------
      $('#double').on('click', function(){
          $('#table').off();
        $('#surrender').off();
        $('#hit').off();
        $('#double').off();
        $('#stand').off();
        headerModule.changeScore( -1 * bet);
        bet = bet * 2;
        $('#bet_div').text('Your bet: ' + bet);
        cards[3] = new Card();
          cards[3].move(88,9,0,0);
          cards[3].move(47,40,600,10);
          cards[3].open( cards[3].val, 100, 10+600);
          cs = parseInt( cards[3].val.slice(1), 10 );
          if (cs > 10) {cs = 10};
          if (cs === 1) { pA = true };
          score = score + cs;

        $('#score_div').text(score);

        if (pA) {
          if (score + 10 > 21) {
            score = score;
            $('#score_div').text(score);
            pA = false;
          } else {
            $('#score_div').text(score+10);
            score = score + 10;
          }
        };

        $('.button_wrap').removeClass('active');

        if (score > 21) {
          $('#score_div').text(score + ', bust');
          $('#bet_div').text('You have lost ' + bet + '.');
          setTimeout(newRound, 1000);
          return;
        };

        toDealer();

      });
      //touch screen function double
      $('#table').on('swipeup', function(){
        $('#table').off();
        $('#surrender').off();
        $('#hit').off();
        $('#double').off();
        $('#stand').off();
        headerModule.changeScore( -1 * bet);
        bet = bet * 2;
        $('#bet_div').text('Your bet: ' + bet);
        cards[3] = new Card();
          cards[3].move(88,9,0,0);
          cards[3].move(47,40,600,10);
          cards[3].open( cards[3].val, 100, 10+600);
          cs = parseInt( cards[3].val.slice(1), 10 );
          if (cs > 10) {cs = 10};
          if (cs === 1) { pA = true };
          score = score + cs;

        $('#score_div').text(score);

        if (pA) {
          if (score + 10 > 21) {
            score = score;
            $('#score_div').text(score);
            pA = false;
          } else {
            $('#score_div').text(score+10);
            score = score + 10;
          }
        };

        $('.button_wrap').removeClass('active');

        if (score > 21) {
          $('#score_div').text(score + ', bust');
          $('#bet_div').text('You have lost ' + bet + '.');
          setTimeout(newRound, 1000);
          return;
        };

        toDealer();

      });    
      //----------------------------
      $('#stand').on('click', function(){
          $('#table').off();
        $('#surrender').off();
        $('#hit').off();
        $('#double').off();
        $('#stand').off();

        if (pA) {
          if (score + 10 > 21) {
            score = score;
            $('#score_div').text(score);
            pA = false;
          } else {
            $('#score_div').text(score+10);
            score = score + 10;
          }
        };

        $('.button_wrap').removeClass('active');
        toDealer();
      });
      //touch screen function stand
      $('#table').on('swipeleft', function(){
          $('#table').off();
        $('#surrender').off();
        $('#hit').off();
        $('#double').off();
        $('#stand').off();

        if (pA) {
          if (score + 10 > 21) {
            score = score;
            $('#score_div').text(score);
            pA = false;
          } else {
            $('#score_div').text(score+10);
            score = score + 10;
          }
        };

        $('.button_wrap').removeClass('active');
        toDealer();
      });
      //---------------------------
      $('#hit').on('click', function(){

        $('#surrender').off();
        $('#surrender').removeClass('active');
        $('#double').off();
        $('#double').removeClass('active');
        i++;
        cards[i] = new Card;
        cards[i].move(88,9,0,0);
        cards[i].move(44 + i*3,40,600,100);
        cards[i].open( cards[i].val, 100, 600+100);
        cs = parseInt( cards[i].val.slice(1), 10 );
        if (cs > 10) {cs = 10};
        if (cs === 1) { pA = true};
        score = score + cs;
        $('#score_div').text(score);
        if (pA) { $('#score_div').text(score + ' / ' + (score+10)); };

        if (pA) {
          if (score + 10 > 21) {
            score = score;
            $('#score_div').text(score);
            pA = false;
          } else {
            $('#score_div').text(score + ' / ' + (score+10));
          }
        };


        if (score > 21) {
          $('#hit').off();
          $('#stand').off();
            $('#table').off();
          $('.button_wrap').removeClass('active');
          $('#score_div').text(score + ', bust');
          $('#bet_div').text('You have lost ' + bet + '.');

          setTimeout(newRound, 1000);
        };

      });
    //touch screen function hit
      $('#table').on('doubletap', function(){
          
        $('#surrender').off();
        $('#surrender').removeClass('active');
        $('#double').off();
        $('#double').removeClass('active');
        i++;
        cards[i] = new Card;
        cards[i].move(88,9,0,0);
        cards[i].move(44 + i*3,40,600,100);
        cards[i].open( cards[i].val, 100, 600+100);
        cs = parseInt( cards[i].val.slice(1), 10 );
        if (cs > 10) {cs = 10};
        if (cs === 1) { pA = true};
        score = score + cs;
        $('#score_div').text(score);
        if (pA) { $('#score_div').text(score + ' / ' + (score+10)); };

        if (pA) {
          if (score + 10 > 21) {
            score = score;
            $('#score_div').text(score);
            pA = false;
          } else {
            $('#score_div').text(score + ' / ' + (score+10));
          }
        };


        if (score > 21) {
          $('#hit').off();
          $('#stand').off();
            $('#table').off();
          $('.button_wrap').removeClass('active');
          $('#score_div').text(score + ', bust');
          $('#bet_div').text('You have lost ' + bet + '.');

          setTimeout(newRound, 1000);
        };

      });
    //------------------------

    };


    $('#deal').addClass('active');
    
    $('.chip').on('click', function(){
      bet += parseInt( $(this).attr('id').slice(1) );
      $('#bet_div').text('Your bet: ' + bet);
    });

    $('#deal').on('click', function(){
      if (bet == 0) {
        $('#score_div').text('Place your bet!').effect('highlight');
        $('#bet_div').text('');
        return;
      };

      if (bet < 10) {
        $('#score_div').text('Min bet is 10!').effect('highlight');
        $('#bet_div').text('');
        bet = 0;
        return;
      };

      if (bet > 500) {
        $('#score_div').text('Max bet is 500!').effect('highlight');
        $('#bet_div').text('');
        bet = 0;
        return;
      };


      headerModule.changeScore( -1 * bet);
      $('.chip').off();
      $('#deal').off();
      $('#deal').removeClass('active');

      deal();

    });


  };

  return {newRound : newRound};
})();