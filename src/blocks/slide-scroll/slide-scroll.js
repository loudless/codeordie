$.widget('codeordie.slideScroll', {
    options: {
        animationDuration: 1000
    },

    _create: function () {
        // if (Modernizr.touch) return;

        this.$slidesContainer = this.element; 
        this.$window = $(window);
        this.$document = $(document);

        // this.width = this.$window.width();
        this.width = this.element.find('.slide').width();

        // this.lastTop = this._getLastTop(); // Когда мы прокручиваем сайт до самого низа нам нужно сместить блок this.$slidesContainer так чтобы подвал был прижат к низу экрана.
        this.currentSlide = 0;
        this.windowResizeTimer;

        this.$slides = this.element.find('.slide');

        this._initEvents();

        this.$slide = this.element.find('.slide');
        this.$slides__wrap = this.element.find('.slides__wrap');
        // this.$slides = this.element;

        this.lastPosition = this.element.offset().left;
    },

    _initEvents: function () {
        this._on({
            'mousewheel': this._handleScroll
        });

        this.$document.on('keyup', $.proxy(this._handleDocKeyUp, this));
        this.$window.on('resize.slideScroll', $.proxy(this._handleWindowResize, this));

        // $.subscribe('slidePagination.selectItem', $.proxy(function (e, index) {
        //     this.scrollToSlide(index + 1);
        // }, this));

        var self = this;

        $(window).on('resize', function () {
            var width = self.$window.width();

            self.width = width;

            // self.$slide.css({
            //     'width': width
            // });

            // self.$slides__wrap.css({
            //     'width': width
            // });

            // self.element.css({
            //     'width': width*7
            // });

            self.element.width(width*7);
            self.$slide.width(width);
            self.$slides__wrap.width(width);

            var top = (width * (self.currentSlide ));
            self.$slidesContainer.offset({left: -top});
        });

        // drag 
        var elem = document.querySelector('#slideWrap');
        var draggie = new Draggabilly( elem, {
          axis: 'x'
        });

        // console.log(this.element.offset().left, this.currentSlide);

        draggie.on( 'dragEnd', function( draggieInstance, event, pointer ) {
            var newPosition = self.element.offset().left;
            
            if (newPosition < self.lastPosition) {
                // console.log('left');
                self._handleScroll(null, -1);
            } else {
                // console.log('right');
                self._handleScroll(null, 1);
            }

            // console.log(self.lastPosition, newPosition);

            self.lastPosition = newPosition;

        });
    },

    _handleScroll: function (e, direction) {

        direction = direction ? direction : e.deltaY;
        
        // var direction = e.deltaY;
        var top;

        // скроллим вниз
        if (direction < 0) {
            this.currentSlide++;
        }
            // скроллим вверх
        else if (direction > 0) {
            this.currentSlide--;
        }



        // не прокручиваем slidesContainer ваше начала сайта
        if (this.currentSlide < 0) {
            this.currentSlide = 0;
            this._scroll(0);
            return;
        }
            // не прокручиваем slidesContainer ниже конца сайта
        else if (this.currentSlide >= this.$slides.length) {
            this.currentSlide = this.$slides.length;

            this._scroll(this.width * (this.currentSlide - 1 ));
            return;
        }

        if (this.currentSlide == this.$slides.length) {
            this.currentSlide = this.$slides.length;
            top = -this.lastTop;
        } else {
            // top = -this.slideHeight * this.currentSlide
        }

        // top = 1075 * this.currentSlide;
        var top = (this.width * (this.currentSlide ));

        $('body').prop('class', 'page _' + (this.currentSlide + 1) );

        this._scroll(top);

        $.publish('changeSlide', [this.currentSlide, this.$slides.length]);
    },

     _handleDocKeyUp: function (e) {
     	var top;

     	if (e.which == 38 || e.which == 37) {
     		e.preventDefault();
     		this.currentSlide--;
     	} else if (e.which == 39 || e.which == 40) {
     		e.preventDefault();
     		this.currentSlide++;
     	}

     	// не прокручиваем сайт ваше начала сайта
     	if (this.currentSlide < 0 ) {
     		this.currentSlide = 0;
     		return;
     	}
     	// не прокручиваем сайт ниже конца сайта
     	else if (this.currentSlide >= this.$slides.length) {
     		this.currentSlide = this.$slides.length;
     		return;
     	}

     	if (this.currentSlide == this.$slides.length) {
     		this.currentSlide = this.$slides.length;
     		top = -this.lastTop;
     	} else {
     		// top = -this.slideHeight*this.currentSlide
     	}

         var top = (this.width * (this.currentSlide ));

         $('body').prop('class', 'page _' + (this.currentSlide + 1) );

     	this._scroll(top);

     	$.publish('changeSlide', [this.currentSlide, this.$slides.length]);
     },

    // _handleWindowResize: function () {
    //     var self = this;

    //     clearTimeout(this.windowResizeTimer);
    //     this._off(this.element, 'mousewheel');

    //     this.windowResizeTimer = setTimeout(function () {
    //         // при резайсе страницы прокручиваем слайды к первому
    //         self._scroll(0, function () {
    //             self.slideHeight = self.$slides.first().outerHeight();
    //             self.lastTop = self._getLastTop();
    //             self.currentSlide = 0;
    //         });
    //         $.publish('slideScroll.scrollTo', 0);
    //     }, 500);
    // },

    /**
	* Смещает $slidesContainer на заданное количество пикселей
	*
	* @param {number} top - количество пикселей на которое нужно сместить контейнер со слайдами
	* @param {function} [animationCallback] - функция которая выполнится после завершения анимации
	*/
    _scroll: function (top, animationCallback) {
        var self = this;

        // на время анимации отключаем прослушивание события скролла
        this._off(this.element, 'mousewheel');

        setTimeout(function () {
            $('.slide._' + (self.currentSlide + 1)).addClass('_animate');
        }, this.options.animationDuration/2);

        this.$slidesContainer.animate({
            left: -top
        }, this.options.animationDuration, 'easeOutQuart', function () {
            self._off(self.element, 'mousewheel');
            // снова подписываемся на скролл
            self._on({
                'mousewheel': self._handleScroll
            });

            //обновляем положение 
            self.lastPosition = self.element.offset().left;

            if ($.isFunction(animationCallback)) {
                animationCallback.call(self);
            }

        });
    },

    /**
	* Вычисляет количество пикселей на которое надо сместить $slidesContainer, что бы футер оказался внизу экрана.
	*
	* @returns {number}
	*/
    _getLastTop: function () {
        return this.$slides.length * this.slideHeight + $('.page__footer').innerHeight() - this.$window.height();
    },

    /**
	* Смещает $slidesContainer так, что бы вверху экрана оказался слайд с индексом slideNum
	*
	* @param {number} slideNum - номер слайда (начиная с 0)
	*/
    scrollToSlide: function (slideNum) {
        // var top = -(this.slideHeight * (slideNum - 1));
        var top = -(this.width * (slideNum - 1));

        this.currentSlide = slideNum - 1;

        if (this.currentSlide == this.$slides.length) {
            this.currentSlide = this.$slides.length;
            top = -this.lastTop;
        } else {
            top = -this.slideHeight * this.currentSlide
        }

        this._scroll(top);
        $.publish('slideScroll.scrollTo', this.currentSlide);
    }
});