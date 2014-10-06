$.widget('codeordie.button', {

    _config: {
//        domain: 'api.codeordie.ru',
        domain: '127.0.0.1:3012',
        ssl: false,
        type: 'POST',
        method: 'promo/save'
    },

    _email: false,

    _create: function () {
        this._initEvents();
    },

    _initEvents: function () {
        this._on({
            'click': this._save
        });
        $.subscribe('email', $.proxy(this._handleInputChange, this));
    },

    _save: function () {
        console.log('TEST');
        var config = this._config;
        var url = config.ssl ? 'https://' + config.domain : 'http://' + config.domain + '/' + config.method;
        if (this._validate(this._email)) {
            $.ajax({
                type: config.type,
                url: url,
                cache: false,
                crossDomain: true,
                data: {email: this._email},
                success: this._success
            });
        }
    },

    _success: function (result  ) {
        console.log(result);
    },

    /**
     *
     * @param e
     * @param email
     * @private
     */
    _handleInputChange: function (e, email) {
        if (this._validate()) {
            this._email = email;
        } else {
            this._email = false;
        }
    },

    /**
     * @todo Добавить проверку на email
     * @private
     */
    _validate: function () {
        return true;
    }

});
