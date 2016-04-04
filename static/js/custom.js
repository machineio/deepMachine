
jQuery(document).ready(function() {

    "use strict";
    
/* =================================
===      WOW Js        ===
=================================== */
    new WOW().init();
    
 
/* =================================
===  Background Slider          ====
=================================== */

    $(".bg-slider").backstretch([
      "images/bg/1.jpg",
      "images/bg/2.jpg",
      "images/bg/3.jpg",
      "images/bg/4.jpg",
      "images/bg/5.jpg"
    ], {
                fade: 750,		//Speed of Fade
        duration: 4000 	//Time of image display
    });
    
    

/* =================================
===      Home Slider       ===
=================================== */
    $("#home-slider").owlCarousel({
        singleItem:true,
        autoPlay: true, //Set AutoPlay to 3 seconds
    });

    
/* =================================
===      Fidvids     ===
=================================== */
    $(".video-play").fitVids();

 /* =================================
===      Brand         ===
=================================== */

  $(".brand-logo").owlCarousel({

      autoPlay: true, //Set AutoPlay to 3 seconds

      items : 6,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

  });   

    
  /* =================================
===      Sticky Nav         ===
=================================== */

  var stickyNavTop = $('.side-menu').offset().top;

    var stickyNav = function(){
    var scrollTop = $(window).scrollTop();

    if (scrollTop > stickyNavTop) {
        $('.side-menu').addClass('sticky');
    } else {
        $('.side-menu').removeClass('sticky');
    }
    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });  

    
       
/* =================================
===      Price table Active Color  ===
=================================== */

$('.price-table').click(function() {
        $(".price-table.active").removeClass("active");
        $(this).addClass('active');
 });

$('.fix-price').click(function() {
        $(this).addClass('active');
});  

    
       
       
/* =================================
===      Scroll Navigation  ===
=================================== */

    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'linear', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: 0 // offste (in px) for fixed top navigation
    });  

    
           
/* =================================
===      Back To Top  ===
=================================== */

    $('#backTop').backTop({
        'position' : 100,
        'speed' : 500,
        'color' : 'red',
    });  

    
    
/* =================================
===         MAILCHIMP          ====
=================================== */
    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "http://webdesign7.us6.list-manage.com/subscribe/post?u=9445a2e155b82208d73433060&amp;id=16dc80e353" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
    });

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscription-success').html('<span class="icon_check_alt2"></span>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
        }
        else if (resp.result === 'error') {
            $('.subscription-error').html('<span class="icon_close_alt2"></span>' + resp.msg).fadeIn(1000);
        }
    }

    

    
/* =================================
===  CONTACT FORM               ====
=================================== */
    $("#contact").submit(function (e) {
        e.preventDefault();
        var name = $("#cf-name").val();
        var email = $("#cf-email").val();
        var subject = $("#cf-subject").val();
        var message = $("#cf-message").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

        function isValidEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };
        if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
            $.ajax({
                type: "POST",
                url: "sendmail.php",
                data: dataString,
                success: function () {
                    $('.success').fadeIn(1000);
                    $('.error').fadeOut(500);
                }
            });
        }
        else {
            $('.error').fadeIn(1000);
            $('.success').fadeOut(500);
        }
        return false;
    });

});









     





























