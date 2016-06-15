// Nav Sticky
$(window).scroll(function(){
	if($(window).scrollTop() > 500 && !$('.mobile-toggle').is(":visible")){
		$('.top-bar').addClass('nav-sticky');
	}else{
		$('.top-bar').removeClass('nav-sticky');
	}
});


$(window).resize(function(){
	if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
		$('.main-container').first().css('margin-top', $('nav').outerHeight());
	}
});

$(window).resize(function () {
    $('.subnav-fullwidth').each(function () {
        $(this).css('width', $('.container').width());
		var offset = $(this).closest('.has-dropdown').offset();
		offset = offset.left;
		var containerOffset = $(window).width() - $('.container').outerWidth();
		containerOffset = containerOffset /2;
		offset = offset - containerOffset - 15;
		$(this).css('left', -offset);
    });
});
// Scroll Reveal
if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
   window.scrollReveal = new scrollReveal();
}else{
	$('body').addClass('pointer');
}

$(window).scroll(function(){
	if($('.map-holder').hasClass('on')){
		$('.map-holder').removeClass('on');
	}
});

// Contact form code

$('form.email-form').submit(function (e) {
	// return false so form submits through jQuery rather than reloading page.
	if(e.preventDefault) e.preventDefault();
	else e.returnValue = false;

	var thisForm 		= $(this).closest('.email-form'),
		error 			= 0,
		originalError 	= thisForm.attr('original-error'),
		loadingSpinner;

	if (typeof originalError !== typeof undefined && originalError !== false) {
		thisForm.find('.form-error').text(originalError);
	}

	$(thisForm).find('.validate-required').each(function(){
		if($(this).val() === ''){
			$(this).addClass('field-error');
			error = 1;
		}else{
			$(this).removeClass('field-error');
		}
	});

	$(thisForm).find('.validate-email').each(function(){
		if(!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))){
			$(this).addClass('field-error');
			error = 1;
		}else{
			$(this).removeClass('field-error');
		}
	});]

    if (error === 1){
        $(this).closest('.email-form').find('.form-error').fadeIn(200);
    }else {
		// Hide the error if one was shown
		$(this).closest('.email-form').find('.form-error').fadeOut(200);
		// Create a new loading spinner while hiding the submit button.
		loadingSpinner = $('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
		$(thisForm).find('input[type="submit"]').hide();
        jQuery.ajax({
            type: "POST",
            url: "mail/mail.php",
            data: thisForm.serialize(),
            success: function (response) {
            	// Swiftmailer always sends back a number representing numner of emails sent.
				// If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
				$(thisForm).find('.form-loading').remove();
				$(thisForm).find('input[type="submit"]').show();
				if($.isNumeric(response)){
					if(parseInt(response) > 0){
						thisForm.find('.form-success').fadeIn(1000);
						thisForm.find('.form-error').fadeOut(1000);
						setTimeout(function(){ thisForm.find('.form-success').fadeOut(500); }, 5000);
					}
				}
				// If error text was returned, put the text in the .form-error div and show it.
				else{
					// Keep the current error text in a data attribute on the form
					thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
					// Show the error with the returned error text.
					thisForm.find('.form-error').text(response).fadeIn(1000);
					thisForm.find('.form-success').fadeOut(1000);
				}
            },
            error: function (errorObject, errorText, errorHTTP) {
            	// Keep the current error text in a data attribute on the form
				thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
				// Show the error with the returned error text.
				thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
				thisForm.find('.form-success').fadeOut(1000);
            	$(thisForm).find('.form-loading').remove();
				$(thisForm).find('input[type="submit"]').show();
            }
        });
    }
	return false;
});

$(window).resize(function(){
	fun.utils.alignVertical();
	fun.utils.alignBottom();
});

// Isotope Projects

$('.projects-container').isotope({
  itemSelector: '.project',
  layoutMode: 'fitRows'
});

$('.filters li').click(function() {
  var current = $(this);
  
  current.siblings('li').removeClass('active');
  current.addClass('active');
  
  var filterValue = current.attr('data-filter');
  var container = current.closest('.projects-wrapper').find('.projects-container');
  container.isotope({ filter: filterValue });
});

// Isotope contained feature boxes

$('.contained-features-wrapper').isotope({
  itemSelector: '.no-pad',
  layoutMode: 'masonry',
  masonry: {
	  gutter: 0
	}
});

// Instagram Feed

if($('.instafeed').length){
	jQuery.fn.spectragram.accessData = {
		accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
		clientID: 'fedaafacf224447e8aef74872d3820a1'
	};

	$('.instafeed').each(function () {
		$(this).children('ul').spectragram('getUserFeed', {
			query: $(this).attr('data-user-name')
		});

	});
	
}

if($('#tweets').length){
	$('#tweets').flexslider({ directionNav: false, controlNav: false });
}

// Remove Loader

$('.loader').css('opacity', 0);
setTimeout(function(){$('.loader').hide();}, 600);

// Mailchimp/Campaign Monitor Mail List Form Scripts
$('form.mail-list-signup').on('submit', function(){
	
	var iFrame = $(this).closest('section, header').find('iframe.mail-list-form'),
	thisForm 		= $(this).closest('.mail-list-signup'),
	userEmail 		= $(this).find('.signup-email-field').val(),
	userFullName 	= $(this).find('.signup-name-field').val(),
	userFirstName 	= $(this).find('.signup-first-name-field').val(),
	userLastName 	= $(this).find('.signup-last-name-field').val(),
	error			= 0;
	
	$(thisForm).find('.validate-required').each(function(){
		if($(this).val() === ''){
			$(this).addClass('field-error');
			error = 1;
		}
		else{
			$(this).removeClass('field-error');
		}
	});
	
	$(thisForm).find('.validate-email').each(function(){
		if(!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))){
			$(this).addClass('field-error');
			error = 1;
		}
		else{
			$(this).removeClass('field-error');
		}
	});
	
	if(error === 0){
		iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
		iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
		iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
		iFrame.contents().find('#mce-FNAME, #fieldName').val(userFullName);		
		iFrame.contents().find('form').attr('target', '_blank').submit();
	}
	return false;
});