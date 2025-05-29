const RevenueNoticeModal = (function ($) {
    const _me = {
        initialize: function () {
            _me.showDialog();
            _me.initEvent();
        },

        initEvent: function () {
            $('#closeModal').on('click', function () {
                _me.hideDialog();
            });

            $('.modal-redirect-revenue').on('click', function () {
                _me.hideDialog();
                Site.redirect(Site.resolveRelativeUrl('RevenueSharingStructure'));
            });
        },

        showDialog: function () {
            const isShowedModal = sessionStorage.getItem('isShowedRevenueNoticeModal');
            if (!isShowedModal) {
                $('#revenueNoticeModal').modal({ backdrop: 'static', keyboard: false });
            }
        },

        hideDialog: function () {
            sessionStorage.setItem('isShowedRevenueNoticeModal', 'true');
            $('#revenueNoticeModal').modal('hide');
        }
    };

    return _me;
})(jQuery);

RevenueNoticeModal.initialize();