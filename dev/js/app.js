"use strict";

$(document).ready( function() {

	// FIXED NAVBAR
	$(window).scroll( function () {

		var scroll = $(window).scrollTop();

		if (scroll > 0) {
			
			$('nav').addClass('scrolled');
		
		} else if(scroll <= 0){
			
			$('nav').removeClass('scrolled');
		}

	});


	// RESPONSIVE NAVBAR
	$('[data-toggle="push"]').each(function() {
            
           	$('#myNavbar').addClass('navbar-push');
            
            $('body').addClass('body-push');

            $(this).on('click', function() {

            	$('nav').toggleClass('navbar-fixed-top');
                
                $('body').toggleClass('pushed-right');

                $('#myNavbar').toggleClass('in');
            });
        });


	// CAROUSEL
	$('.carousel').carousel( {
  		
  		interval: 5000
	});


});