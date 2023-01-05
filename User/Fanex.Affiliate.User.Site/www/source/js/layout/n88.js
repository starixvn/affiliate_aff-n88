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
                    _me.handleCloseMenu();
                } else {
                    _me.handleBindingClickBodyEvent();

                    $('body').toggleClass('menu-open');
                    $('.navbar-header').toggleClass('menu-open');
                }
            });
        },

        handleBindingClickBodyEvent: function () {
            const hasClass = $('body').hasClass("menu-open");

            if (hasClass) {
                $('body').unbind("click");
                isOpenMenuMobile = false;
            } else {
                $('body').bind('click', function () {
                    if (isOpenMenuMobile) {
                        _me.handleClickOutAfterOpenMenu();
                    } else {
                        isOpenMenuMobile = true;
                    }
                });
            }
        },

        handleClickOutAfterOpenMenu: function () {
            isTriggerClick = true;
            $("#btn-menu").trigger("click");
        },

        handleCloseMenu: function () {
            isTriggerClick = false;
            isOpenMenuMobile = false;
            $('body').unbind("click");
            $('body.menu-open').removeClass('menu-open');
            $('.navbar-header.menu-open').removeClass('menu-open');
        }
    }

    return _me;
})(jQuery);

LayoutN88.initialize();