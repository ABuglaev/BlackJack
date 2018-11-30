'use strict';
var deck = {
    H01 : 6,
    S01 : 6,
    C01 : 6,
    D01 : 6,

    H02 : 6,
    S02 : 6,
    C02 : 6,
    D02 : 6,

    H03 : 6,
    S03 : 6,
    C03 : 6,
    D03 : 6,

    H04 : 6,
    S04 : 6,
    C04 : 6,
    D04 : 6,

    H05 : 6,
    S05 : 6,
    C05 : 6,
    D05 : 6,

    H06 : 6,
    S06 : 6,
    C06 : 6,
    D06 : 6,

    H07 : 6,
    S07 : 6,
    C07 : 6,
    D07 : 6,

    H08 : 6,
    S08 : 6,
    C08 : 6,
    D08 : 6,

    H09 : 6,
    S09 : 6,
    C09 : 6,
    D09 : 6,

    H10 : 6,
    S10 : 6,
    C10 : 6,
    D10 : 6,

    H11 : 6,
    S11 : 6,
    C11 : 6,
    D11 : 6,

    H12 : 6,
    S12 : 6,
    C12 : 6,
    D12 : 6,

    H13 : 6,
    S13 : 6,
    C13 : 6,
    D13 : 6
  }


var Card = function() {
    var self = this;
  this.move = function(x,y) {
    $.self.animate({
        top: y + '%;',
        left: x + '%;'
    }, 200);
  }
};


  