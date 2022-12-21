"use strict";

var LayoutN88 = (function ($) {
    var _me = {
        initialize: function initialize() {
            _me.initEvent();
            _me.openMenu();
        },
        initEvent: function initEvent() {
            $(".desktop").on("click", ".select-language", function () {
                $(this).focus();
            });

            $(".mobile").on("click", ".select-language", function () {
                $(this).focus();
            });

            $(".language-list-wrapper-desktop").on("click", ".language-item", function () {
                var $selectedItem = $(this);
                _me.changeLanguage($selectedItem.data('option'));
            });

            $(".language-list-wrapper-mobile").on("click", ".language-item", function () {
                var $selectedItem = $(this);
                _me.changeLanguage($selectedItem.data('option'));
            });
        },

        openMenu: function openMenu() {
            $('#btn-menu').click(function () {
                $(this).parent().toggleClass('menu-open');
                $('body').toggleClass('menu-open');
            });
            $('.mobile-left-panel').click(function () {
                $('body').toggleClass('overflow-left-panel');
                $('.left-panel').toggleClass('active');
            });
        }

    };

    return _me;
})(jQuery);

LayoutN88.initialize();

