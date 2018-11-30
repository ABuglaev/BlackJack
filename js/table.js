'use strict';
var tableModule = (function() {
  //Objects/variables inside module
  var
  //Constants
  config = {
  },
  //HTML tamplate
  HTML_TEMPLATE = '<div id=\'table\'>\
                    <img src="images/bg.jpg" alt="" id="playground_fat">\
                    <img src="images/bg_slim.jpg" alt="" id="playground_slim">\
                    <div class="chip_wrap" id="chip1"  ><img class="chip" id="b1"   src="images/chips/1$.png"  ></img></div>\
                    <div class="chip_wrap" id="chip5"  ><img class="chip" id="b5"   src="images/chips/5$.png"  ></img></div>\
                    <div class="chip_wrap" id="chip25" ><img class="chip" id="b25"  src="images/chips/25$.png" ></img></div>\
                    <div class="chip_wrap" id="chip100"><img class="chip" id="b100" src="images/chips/100$.png"></img></div>\
                      <div class="button_wrap" id="surrender" ><img class="action_button" src="images/buttons/surrender.png" ></img></div>\
                <!--  <div class="button_wrap" id="split"     ><img class="action_button" src="images/split.png"             ></img></div> -->\
                <!--  <div class="button_wrap" id="insurance" ><img class="action_button" src="images/buttons/insurance.png" ></img></div> -->\
                      <div class="button_wrap" id="double"    ><img class="action_button" src="images/buttons/double.png"    ></img></div>\
                      <div class="button_wrap" id="hit"       ><img class="action_button" src="images/buttons/hit.png"       ></img></div>\
                      <div class="button_wrap" id="stand"     ><img class="action_button" src="images/buttons/stand.png"     ></img></div>\
                      <div class="button_wrap" id="deal"      ><img class="action_button" src="images/buttons/deal.png"      ></img></div>\
                    <div class="deck_wrap"><img src="images/deck.png" alt="" class="deck" /></div>\
                    <div id="score_div"></div>\
                    <div id="dscore_div"></div>\
                    <div id="bet_div"></div>\
                   </div>',
  //Variables inside module
  //functions
  init;

  init = function() {
    var cachImages = function(){  
      var img = [],
          imagesUrls = [
          'images/cards/back.png',

          'images/cards/H01.png',
          'images/cards/S01.png',
          'images/cards/D01.png',
          'images/cards/C01.png',

          'images/cards/H02.png',
          'images/cards/S02.png',
          'images/cards/D02.png',
          'images/cards/C02.png',

          'images/cards/H03.png',
          'images/cards/S03.png',
          'images/cards/D03.png',
          'images/cards/C03.png',

          'images/cards/H04.png',
          'images/cards/S04.png',
          'images/cards/D04.png',
          'images/cards/C04.png',

          'images/cards/H05.png',
          'images/cards/S05.png',
          'images/cards/D05.png',
          'images/cards/C05.png',

          'images/cards/H06.png',
          'images/cards/S06.png',
          'images/cards/D06.png',
          'images/cards/C06.png',

          'images/cards/H07.png',
          'images/cards/S07.png',
          'images/cards/D07.png',
          'images/cards/C07.png',

          'images/cards/H08.png',
          'images/cards/S08.png',
          'images/cards/D08.png',
          'images/cards/C08.png',

          'images/cards/H09.png',
          'images/cards/S09.png',
          'images/cards/D09.png',
          'images/cards/C09.png',

          'images/cards/H10.png',
          'images/cards/S10.png',
          'images/cards/D10.png',
          'images/cards/C10.png',

          'images/cards/H11.png',
          'images/cards/S11.png',
          'images/cards/D11.png',
          'images/cards/C11.png',

          'images/cards/H12.png',
          'images/cards/S12.png',
          'images/cards/D12.png',
          'images/cards/C12.png',

          'images/cards/H13.png',
          'images/cards/S13.png',
          'images/cards/D13.png',
          'images/cards/C13.png',
        ];

      for (var i=0;i<53;i++) {
        img[i] = new Image();
        img[i].src = imagesUrls[i];
      };
    };

    if ( !document.getElementById('table_style') ) { $('head').append(' <link rel="stylesheet" href="css/table.css" id="table_style"> ')};
    $('#content').html( HTML_TEMPLATE );

    if (location.hash !== 'play') {
      location.hash = 'play';
    };

    gameModule.newRound();
    setTimeout(cachImages, 5000);
  };

  return {init : init};
})();