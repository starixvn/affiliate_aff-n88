'use strict';

var LayoutN88 = (function ($) {
    var isOpenMenuMobile = false;
    var isTriggerClick = false;
    var _me = {
        initialize: function initialize() {
            _me.initEvent();
        },
        initEvent: function initEvent() {
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

        handleBindingClickBodyEvent: function handleBindingClickBodyEvent() {
            var hasClass = $('body').hasClass("menu-open");

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

        handleClickOutAfterOpenMenu: function handleClickOutAfterOpenMenu() {
            isTriggerClick = true;
            $("#btn-menu").trigger("click");
        },

        handleCloseMenu: function handleCloseMenu() {
            isTriggerClick = false;
            isOpenMenuMobile = false;
            $('body').unbind("click");
            $('body.menu-open').removeClass('menu-open');
            $('.navbar-header.menu-open').removeClass('menu-open');
        }
    };

    return _me;
})(jQuery);

LayoutN88.initialize();

