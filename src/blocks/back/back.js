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

				console.log((mouseXPercent-50)/20);

				self.element.css({
					'background-position': 
						(50 + (mouseXPercent-50)/20) + '% 50%,' +
						(50 + (mouseXPercent-50)/20) + '% 50%,' +
						(50 - (mouseXPercent-50)/20) + '% 50%,' +
						(50 - (mouseXPercent-50)/40) + '% 50%,' +
						(50 - (mouseXPercent-50)/40) + '% 50%,' +
						 '50% 50%, ' + 
						(50 - (mouseXPercent-50)/20) + '% 50%'
				});

			}
		);
	}
});