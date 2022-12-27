'use strict';

var LayoutN88 = (function ($) {

    var _me = {
        initialize: function initialize() {
            _me.initEvent();
        },
        initEvent: function initEvent() {
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

