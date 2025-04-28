var TelegramUpdateDialog = (function ($) {
    var _me = {
        initialize: function () {
            _me.initEvent();
            _me.showDialog();
        },

        initEvent: function () {
            $('#btnUpdateNow').on('click', function () {
                _me.redirectToMyAccount();
            });

            $('#btnRemindLater').on('click', function () {
                _me.hideDialog();
            });
        },

        showDialog: function () {
            const isShowDialog = sessionStorage.getItem('isShowNotiDialog');
            if (isShowDialog === '1') {
                $('#telegramUpdateModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
        },

        hideDialog: function () {
            sessionStorage.setItem('isShowNotiDialog', '0');
            $('#telegramUpdateModal').modal('hide');
        },

        redirectToMyAccount: function () {
            _me.hideDialog();
            sessionStorage.setItem('focusTelegram', '1');
            Site.redirect(Site.resolveRelativeUrl("UserPanel/Main/#MyAccount"));
        }
    };

    return _me;
})(jQuery);

TelegramUpdateDialog.initialize();