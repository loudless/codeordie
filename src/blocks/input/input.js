$.widget('codeordie.input', {

    _config: {
        domain: 'api.codeordie.ru',
        ssl: false,
        type: 'POST',
        method: 'promo/save'
    },

    _create: function () {
        this._initEvents();
        this.$email = $(this.element)
    },

    _initEvents: function () {
        this._on({

        });

        $.subscribe('save', $.proxy(this._save, this));
    },

    _save: function (e, data) {
        console.log('Hello');
        var config = this._config;
        var url = config.ssl ? 'https://' + config.domain : 'http://' + config.domain + '/' + config.method;
        if (this._validate()) {
            $.ajax({
                type: config.type,
                url: url,
                cache: false,
                crossDomain: true,
                data: {email: this.$email.val()},
                success: this._success
            });
        }
    },

    _success: function (result  ) {
        console.log(result);
    },

    /**
     * @todo Добавить проверку на email
     * @private
     */
    _validate: function () {
        return true;
    }

});