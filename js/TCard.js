'use strict';
var deck = [ 'H01', 'H01', 'H01', 'H01', 'H01', 'H01', 
             'S01', 'S01', 'S01', 'S01', 'S01', 'S01',
             'C01', 'C01', 'C01', 'C01', 'C01', 'C01',
             'D01', 'D01', 'D01', 'D01', 'D01', 'D01',

             'H02', 'H02', 'H02', 'H02', 'H02', 'H02',
             'S02', 'S02', 'S02', 'S02', 'S02', 'S02',
             'C02', 'C02', 'C02', 'C02', 'C02', 'C02',
             'D02', 'D02', 'D02', 'D02', 'D02', 'D02',

             'H03', 'H03', 'H03', 'H03', 'H03', 'H03',
             'S03', 'S03', 'S03', 'S03', 'S03', 'S03',
             'C03', 'C03', 'C03', 'C03', 'C03', 'C03',
             'D03', 'D03', 'D03', 'D03', 'D03', 'D03',

             'H04', 'H04', 'H04', 'H04', 'H04', 'H04',
             'S04', 'S04', 'S04', 'S04', 'S04', 'S04',
             'C04', 'C04', 'C04', 'C04', 'C04', 'C04',
             'D04', 'D04', 'D04', 'D04', 'D04', 'D04',

             'H05', 'H05', 'H05', 'H05', 'H05', 'H05',
             'S05', 'S05', 'S05', 'S05', 'S05', 'S05',
             'C05', 'C05', 'C05', 'C05', 'C05', 'C05',
             'D05', 'D05', 'D05', 'D05', 'D05', 'D05',

             'H06', 'H06', 'H06', 'H06', 'H06', 'H06',
             'S06', 'S06', 'S06', 'S06', 'S06', 'S06',
             'C06', 'C06', 'C06', 'C06', 'C06', 'C06',
             'D06', 'D06', 'D06', 'D06', 'D06', 'D06',

             'H07', 'H07', 'H07', 'H07', 'H07', 'H07',
             'S07', 'S07', 'S07', 'S07', 'S07', 'S07',
             'C07', 'C07', 'C07', 'C07', 'C07', 'C07',
             'D07', 'D07', 'D07', 'D07', 'D07', 'D07',

             'H08', 'H08', 'H08', 'H08', 'H08', 'H08',
             'S08', 'S08', 'S08', 'S08', 'S08', 'S08',
             'C08', 'C08', 'C08', 'C08', 'C08', 'C08',
             'D08', 'D08', 'D08', 'D08', 'D08', 'D08',

             'H09', 'H09', 'H09', 'H09', 'H09', 'H09',
             'S09', 'S09', 'S09', 'S09', 'S09', 'S09',
             'C09', 'C09', 'C09', 'C09', 'C09', 'C09',
             'D09', 'D09', 'D09', 'D09', 'D09', 'D09',

             'H10', 'H10', 'H10', 'H10', 'H10', 'H10',
             'S10', 'S10', 'S10', 'S10', 'S10', 'S10',
             'C10', 'C10', 'C10', 'C10', 'C10', 'C10',
             'D10', 'D10', 'D10', 'D10', 'D10', 'D10',

             'H11', 'H11', 'H11', 'H11', 'H11', 'H11',
             'S11', 'S11', 'S11', 'S11', 'S11', 'S11',
             'C11', 'C11', 'C11', 'C11', 'C11', 'C11',
             'D11', 'D11', 'D11', 'D11', 'D11', 'D11',

             'H12', 'H12', 'H12', 'H12', 'H12', 'H12',
             'S12', 'S12', 'S12', 'S12', 'S12', 'S12',
             'C12', 'C12', 'C12', 'C12', 'C12', 'C12',
             'D12', 'D12', 'D12', 'D12', 'D12', 'D12',

             'H13', 'H13', 'H13', 'H13', 'H13', 'H13',
             'S13', 'S13', 'S13', 'S13', 'S13', 'S13',
             'C13', 'C13', 'C13', 'C13', 'C13', 'C13',
             'D13', 'D13', 'D13', 'D13', 'D13', 'D13'
            ];

var Card = function() {
  var $card, val, cn, $img,
  self = this;
  $card = $( '<div class="card_wrap"></div>' );
  $img = $('<img src="images/cards/back.png" class="card" >');
  $card.append( $img );
  $('#table').append($card);

  this.move = function(x,y,t,d) {
    if (d !== 0) {
      $card.delay(d).animate({
        top: y + Math.random() + '%',
        left: x + Math.random() +'%'
      }, t);
    } else {
      $card.delay(d).animate({
        top: y + '%',
        left: x + '%'
    }, t);

    }
  };

  this.open = function(v,t,d) {
    $img.delay(d).effect('clip', {direction : 'horizontal', mode : 'hide'}, t/2, function() {
        $img.attr( 'src', 'images/cards/'+ v +'.png' );
        $img.effect('clip', {direction: 'horizontal', mode: 'show'}, t/2);
    } )
  };

  cn = Math.floor( Math.random() * deck.length );
  this.val = deck[cn];
  deck.splice(cn, 1);

};