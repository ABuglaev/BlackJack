'use strict';
var footerModule = (function() {
  //Objects/variables inside module
  var
  //Constants
  //HTML tamplate
  HTML_TEMPLATE = '<footer>\
                    <div id="footerToggle">Click to hide / show footer </div>\
                    <div id="footerContent">\
                      <div class="left" >Developed by <br>Alexander Buglaev ( <a href="mailto: a_buglaev@gmx.com">  a_buglaev@gmx.com </a> )<br> <a href="http://it-academy.by">EC HTP</a>, Minsk, 2017</div>\
                      <div class="right">Mobile versions\
                      <br>\
                        <a href="#" id="t1"><img class="os_logo" src="images/android_icon.png" style="margin-top: 3px;"></a> <a href="#" id="t2"><img class="os_logo" src="images/ios_icon.png"></a>\
                      </div>\
                    </div>\
                   </footer>',
  //functions
  init, extendFooter, retracktFooter;
  
  extendFooter = function() {
    $('#footerContent').animate({height: '54px'}, 100);
    $('footer').animate({height: '68px'}, 100);
    $('.left').show();
    $('.right').show();
  };

  retracktFooter = function() {
    $('#footerContent').animate({height: '0px'}, 50);
    $('footer').animate({height: '14px'}, 50);
    $('.left').hide();
    $('.right').hide();
  };


  init = function() {

    if ( !document.getElementById('footer_style') ) { $('head').append(' <link rel="stylesheet" href="css/footer.css" id="footer_style"> ')};
    $( HTML_TEMPLATE ).appendTo($('body'));
    extendFooter();
    $('#footerToggle').on('click',  function() {
      if ( $('#footerContent').height()>52 ) {
        retracktFooter();
      } else {
        extendFooter();
      }
    });

  };

  return {init : init};
})();