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

    /**
     * @param e
     * @param data
     * @private
     */
    _save: function (e, data) {
        this.$email.removeClass('success error');
        var config = this._config;
        var url = config.ssl ? 'https://' + config.domain : 'http://' + config.domain + '/' + config.method;
        if (this._validate()) {
            $.ajax({
                type: config.type,
                url: url,
                cache: false,
                crossDomain: true,
                data: {email: this.$email.val(), ip: ip, referrer: document.referrer},
                success: $.proxy(this._success, this)
            });
        } else {
            this._error();
        }
    },

    /**
     * @param result
     * @private
     */
    _success: function (result) {
        this.$email.addClass('success');
        console.log(result);
    },

    /**
     * @private
     */
    _validate: function () {
        var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return filter.test(this.$email.val());
    },

    /**
     * @private
     */
    _error: function () {
        this.$email.addClass('error');
    }

});