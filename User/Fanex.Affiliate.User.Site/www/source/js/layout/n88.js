var LayoutN88 = (function ($) {

    var _me = {
        initialize: function () {
            _me.initEvent();
        },
        initEvent: function () {
            $('#btn-menu').click(function () {
                $(this).parent().toggleClass('menu-open');
                $('body').toggleClass('menu-open');
            })
        }
    }

    return _me;
})(jQuery);

LayoutN88.initialize();