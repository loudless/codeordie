$.widget('codeordie.button', {

    _create: function () {
        this._initEvents();
    },

    _initEvents: function () {
        this._on({
            'click': this._save
        });

    },

    _save: function () {
        $.publish('save', []);
       }

});
