(function($) {
	var width = $(window).width();

	$('.slide').css({
		'width': width
	});

	$('.slides__wrap').css({
		'width': width
	});

	$('.slides').css({
		'width': width*7
	});

	var lastScrollTop = 0;

	var $slides = $('.slide');

    var currentSlide = 0;

    $('.page').addClass('_1');



    // $('#fullpage').fullpage({
    //     sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff']
    // });

    // $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
    //     {
    //     height: 7000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
    //     onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page

    //         var i = (percent*100)/14.28571428571429;

    //         i = parseInt(i+1);

    //         if (i > 7) {
    //         	i = 7;
    //         } else if (i < 1) {
    //         	i = 1;
    //         }

    //         $('body').prop('class', 'page _' + i );

    //     }
    // });

    // function setSctoll() {
    // 	$(window).scroll(function(event){


    // 	   var st = $(this).scrollTop();

    // 	   var scroll = Math.floor(st/1075);

    // 		$(window).off('scroll');
    // 	   if (st > lastScrollTop){
    // 	   		console.log(scroll, st, lastScrollTop);

    // 	       $('html, body').animate({
    // 	              scrollTop: 1075*(scroll+1),
    // 	          }, 1000, function () {
    // 	          	setSctoll();
    // 	          });
    // 	   } else {
    // 	      $('html, body').animate({
    // 	             scrollTop: 1075*(scroll),
    // 	         }, 1000, function () {
    // 	         	setSctoll();
    // 	         });
    // 	   }
    // 	   lastScrollTop = st;
    // 	});
    // };

    // setSctoll();
}(jQuery));




//гугл аналитика
if (window.location.hostname == 'codeordie.ru') {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-49967163-2', 'auto');
    ga('require', 'displayfeatures');
    ga('require', 'linkid', 'linkid.js');
    ga('send', 'pageview');
}