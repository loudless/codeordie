$.widget('codeordie.input', {

    _create: function () {

        this._initEvents();
    },

    _initEvents: function () {
        this._on({
            'keypress': this._publishEmail
        });

    },

    _publishEmail: function () {
        $.publish('email', [this.element.val()]);
    }
});