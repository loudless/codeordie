$.widget('codeordie.back', {
	_create: function () {

		this._initEvents();
	},
	_initEvents: function () {
		this._on({

		});

		var self = this;

		$('.slide._1').on('mousemove',
			function(e) {
				/* Work out mouse position */
				var offset = $(this).offset();
				var xPos = e.pageX - offset.left;
				var yPos = e.pageY - offset.top;

				/* Get percentage positions */
				var mouseXPercent = Math.round(xPos / $(this).width() * 100);
				var mouseYPercent = Math.round(yPos / $(this).height() * 100);

				console.log(mouseXPercent/20);

				self.element.css({
					'background-position': 
						(50 + mouseXPercent/20) + '% 50%,' +
						(50 + mouseXPercent/20) + '% 50%,' +
						(50 - mouseXPercent/20) + '% 50%,' +
						(50 - mouseXPercent/40) + '% 50%,' +
						(50 - mouseXPercent/40) + '% 50%,' +
						 '50% 50%, ' + 
						(50 - mouseXPercent/20) + '% 50%'
				})

				/* Position Each Layer */
				// $(this).children('img').each(
				// 	function() {
				// 		var diffX = $('#Parallax').width() - $(this).width();
				// 		var diffY = $('#Parallax').height() - $(this).height();

				// 		var myX = diffX * (mouseXPercent / 100); //) / 100) / 2;


				// 		var myY = diffY * (mouseYPercent / 100);


				// 		var cssObj = {
				// 				'left': myX + 'px',
				// 				'top': myY + 'px'
				// 			}
				// 			//$(this).css(cssObj);
				// 		$(this).animate({
				// 			left: myX,
				// 			top: myY
				// 		}, {
				// 			duration: 50,
				// 			queue: false,
				// 			easing: 'linear'
				// 		});

				// 	}
				// );

			}
		);
	}
});