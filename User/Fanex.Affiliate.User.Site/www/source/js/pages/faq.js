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

            $(".title-block .title span").click(function () {
                if ($(this).closest('.title').next().hasClass('open')) {
                    $(this).closest('.title').next().removeClass('open');
                } else {
                    $(this).closest('.title').next().addClass('open');
                }

                $(this).closest('.title-container').next().slideToggle(300);
            });
        }
    };

    return _me;
})(jQuery);

Faq.initialize();