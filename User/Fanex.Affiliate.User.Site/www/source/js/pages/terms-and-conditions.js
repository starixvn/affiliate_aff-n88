var TermsAndConditions = (function ($) {
    var _me = {
        initialize: function () {
            _me.initEvent();
        },
        initEvent: function () {
            $("div.content-group:not(:first) .content-block").css("display", "none");
            $("div.content-group:first .button-toggle").addClass("open");

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

TermsAndConditions.initialize();