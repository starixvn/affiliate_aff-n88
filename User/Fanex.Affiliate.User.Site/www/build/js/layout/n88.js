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

        handleCloseMenu: function handleCloseMenu(e) {
            isTriggerClick = true;
            $("#btn-menu").trigger("click");
        }
    };

    return _me;
})(jQuery);

LayoutN88.initialize();

