$.widget('codeordie.progress', {
	_create: function () {

		this.$bar = this.element.find('.progress__bar');

		this._initEvents();
	},
	_initEvents: function () {
		this._on({

		});

		$.subscribe('changeSlide', $.proxy(this._handleSlideChange, this));
	},

	_handleSlideChange: function (e, slide, total) {
		if (slide) {
			$('.slide__down').hide();
			this.element.fadeIn();
		} else {
			this.element.fadeOut('', function () {
				$('.slide__down').fadeIn();
			});
		}


		this.$bar.width(((slide+1)/total)*100 + '%');
	}
});