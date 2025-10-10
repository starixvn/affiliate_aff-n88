var Faq = (function ($) {
    var _me = {
        initialize: function () {
            _me.initEvent();
        },
        initEvent: function () {
            $('.button-toggle').click(function () {
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open');
                } else {
                    $(this).addClass('open');
                }
               
                $(this).closest('.title-container').next().slideToggle(300);
            });
        }
    };

    return _me;
})(jQuery);

Faq.initialize();