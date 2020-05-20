/*
Item Name : StickyBars - Fixed Bars Animated on Scroll
Author URI : http://codecanyon.net/user/Pixelworkshop
Version : 1.0
*/



$.support.transition = (function() {
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
    return support;
})();



;(function($) {
    


    $.stickyBar = function(element, options) {


        /* Use any of the following effects for the options
           sbar_show_effect and sbar_hide_effect
           A different effect can be used for showing / hiding
           the sticky bar.
           If you don't specify any or if you misspell the
           effect name, the default fallback will be the fade effect.
           ----------------------------------------------------------
           fade
           slideLeft
           slideRight
           slideDown (only for top bar)
           slideUp (only for footer bar)
           slideLeftFade
           slideRightFade
           slideDownFade (only for top bar)
           slideUpFade (only for footer bar)
           scaleUp
           scaleDown
           slideLeftScale
           slideRightScale
           slideDownScale (only for top bar)
           slideUpScale (only for footer bar)
           ----------------------------------------------------------
        */
        var settings = $.extend([
        	{
		        sbar_id: '#sbar1',
		        sbar_show_effect: 'fade', // Effect to show the sticky bar
		        sbar_hide_effect: 'fade', // Effect to hide the sticky bar
		        sbar_position_show: 0, // 0 to display the bar on page load
		        sbar_position_hide: 800, // Position on the Y axis to hide the bar
		        sbar_anchor_show: '', // Anchor ID to show the bar (has priority on the sbar_position_show option)
		        sbar_anchor_hide: '', // Anchor ID to hide the bar (has priority on the sbar_position_hide option)
		        sbar_anchor_show_offset: 0, // Adjustment of the show position (along with an anchor)
		        sbar_anchor_hide_offset: 0, // Adjustment of the hide position (along with an anchor)
		        sbar_close_button: true // Optional close button
	        },
	        {
		        sbar_id: '#sbar2',
		        sbar_show_effect: 'slideLeft',
		        sbar_hide_effect: 'slideLeft',
		        sbar_position_show: 500,
		        sbar_position_hide: 1400,
		        sbar_anchor_show: '',
		        sbar_anchor_hide: '',
		        sbar_anchor_show_offset: 0,
		        sbar_anchor_hide_offset: 0, 
		        sbar_close_button: true
	        }
	    ]
        , options);

        var plugin = this;
        
        plugin.options = {};

        var element = element,
        	$element = $(element),
        	scrollPosition = $(window).scrollTop();


        plugin.init = function() {

            settings = $.extend(true, settings, options);
			stickyBarInit();

        }


        var stickyBarInit = function() {

        	var stickyBarLength = settings.length;

        	$sbar = $();

			for (var i = 0; i < stickyBarLength; i++) {
				$sbar = $sbar.add($element.find(settings[i].sbar_id));
			}
			
			stickyBarSetup();
			stickyBarStart();
			stickyBarScroll();

            $(window).on('orientationchange', function(){
            	scrollPosition = $(window).scrollTop();
            	stickyBarSetup();
				stickyBarPosition();
            });
            $(window).on('resize', function(){
            	scrollPosition = $(window).scrollTop();
				stickyBarPosition();
				stickyBarScroll();
            });

        }


        var stickyBarSetup = function() {

			$sbar.each(function(id) {

	            settings[id].sbar_show_effect = 'fadeIn ' + settings[id].sbar_show_effect + 'In',
	            settings[id].sbar_hide_effect = 'fadeOut ' + settings[id].sbar_hide_effect + 'Out';

	            if ($(settings[id].sbar_anchor_show).length > 0) {
	                settings[id].sbar_anchor_show = $(settings[id].sbar_anchor_show).offset().top + settings[id].sbar_anchor_show_offset - 10;
	            } else {
	                settings[id].sbar_anchor_show = settings[id].sbar_position_show - 1;
	            }
	            if ($(settings[id].sbar_anchor_hide).length > 0) {
	                settings[id].sbar_position_hide = $(settings[id].sbar_anchor_hide).offset().top + settings[id].sbar_anchor_hide_offset - 10;
	            } else {
	                settings[id].sbar_position_hide = settings[id].sbar_position_hide - 1;
	            }
				if (settings[id].sbar_close_button === true) {
					$(this).append('<div class="sbar-close"><i class="icon-close"></i></div>').children('.sbar-inner').addClass('sbar-inner-button');
				}

			});

			$('.sbar-close').click(function() {
				$(this).parents('.sbar-container').fadeOut(300, function() {
					$(this).remove();
				});
			});
			

        }


		var stickyBarStart = function() {

			$sbar.each(function(id) {

	            if (scrollPosition > settings[id].sbar_anchor_show && scrollPosition <= settings[id].sbar_position_hide) {
	                $(settings[id].sbar_id).addClass(settings[id].sbar_show_effect);
	            } else {
	               $(settings[id].sbar_id).addClass('sbar-hide');
	            }

			});

		}


		var stickyBarPosition = function() {

			$sbar.each(function(id) {

	            if ($.support.transition === true) {
		            if (scrollPosition > settings[id].sbar_anchor_show && scrollPosition <= settings[id].sbar_position_hide) {
		                $(settings[id].sbar_id).removeClass('sbar-hide ' + settings[id].sbar_hide_effect).addClass(settings[id].sbar_show_effect);
		            } else {
		                $(settings[id].sbar_id).removeClass(settings[id].sbar_show_effect).addClass(settings[id].sbar_hide_effect);
		            }
	        	} else {
		            if (scrollPosition > settings[id].sbar_anchor_show && scrollPosition <= settings[id].sbar_position_hide) {
		                $(settings[id].sbar_id).fadeIn(300, function() {
		                	$(this).removeClass('sbar-hide');
		                });
		            } else {
		                $(settings[id].sbar_id).fadeOut(300, function() {
		                	$(this).addClass('sbar-hide');
		                });
		            }
	        	}

			});

		}


		var stickyBarScroll = function() {

			var sbarScroll = false;
			$(window).on('scroll', function(){
				sbarScroll = true;
			});
			setInterval(function() {
				if (sbarScroll) {
	            	scrollPosition = $(window).scrollTop();
		            if ($('.sbar').css('position') == 'fixed'){
		            	stickyBarPosition();
					}
				    sbarScroll = false;
				}
			}, 250);

		}

       
        plugin.init();


    }



    $.fn.stickyBar = function(options) {


        return this.each(function() {

            if (undefined == $(this).data('stickyBar')) {

                var plugin = new $.stickyBar(this, options);
                $(this).data('stickyBar', plugin);

            }

        });


    }



})(jQuery);

