var LayoutN88 = (function ($) {
    let isOpenMenuMobile = false;
    let isTriggerClick = false;
    var _me = {
        initialize: function () {
            _me.initEvent();
        },
        initEvent: function () {
            $('#btn-menu').click(function (e) {
                if (isTriggerClick) {
                    isTriggerClick = false;
                    isOpenMenuMobile = false;
                    $('body').unbind("click");
                    $('body.menu-open').removeClass('menu-open');
                    $('.navbar-header.menu-open').removeClass('menu-open');
                } else {
                    $('body').toggleClass('menu-open');
                    $('.navbar-header').toggleClass('menu-open');

                    $('body').bind('click', function (e) {
                        if (isOpenMenuMobile) {
                            _me.handleCloseMenu();
                        } else {
                            isOpenMenuMobile = true;
                        }
                    });
                }
            });
        },

        handleCloseMenu: function (e) {
            isTriggerClick = true;
            $("#btn-menu").trigger("click");
        },
    }

    return _me;
})(jQuery);

LayoutN88.initialize();