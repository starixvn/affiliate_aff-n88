"use strict";

var LayoutN8x = (function ($) {
    var _me = {
        initialize: function initialize() {
            _me.initEvent();
        },
        initEvent: function initEvent() {
            $("#selectedLanguage").on("click", function () {
                $(this).focus();
            });

            $("#languageList").on("click", ".language-item", function () {
                var $selectedItem = $(this);
                Site.changeLanguage($selectedItem.data('option'));
            });
        }
    };

    return _me;
})(jQuery);

LayoutN8x.initialize();

