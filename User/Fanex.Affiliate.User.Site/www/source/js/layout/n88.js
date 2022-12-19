var LayoutN88 = (function ($) {
    var _me = {
        initialize: function () {
            _me.initEvent();
        },
        initEvent: function () {
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
        }
    }

    return _me;
})(jQuery);

LayoutN88.initialize();