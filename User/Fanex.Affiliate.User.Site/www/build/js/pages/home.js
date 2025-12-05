"use strict";

var Home = (function ($) {
    var _me = {
        initialize: function initialize() {
            _me.initSlider();
            _me.initFAQ();
        },

        initSlider: function initSlider() {
            var $provider = $("#provider");
            $provider.carousel({ interval: 3000 });

            $(window).on("load resize", function () {
                if (window.innerWidth <= 768) {

                    $("#slide-mobile").carousel({ interval: 3000 });
                    $("#our-product").carousel({ interval: 3000 });
                } else {

                    $("#slide-mobile").carousel('pause');
                    $("#slide-mobile").removeData('bs.carousel');
                    $("#slide-mobile").off('.carousel');

                    $("#our-product").carousel('pause');
                    $("#our-product").removeData('bs.carousel');
                    $("#our-product").off('.carousel');
                }
            });
        },

        initFAQ: function initFAQ() {
            $("div.content-group:not(:first) .content-block").css("display", "none");
            $("div.content-group:first .button-toggle").addClass("open");
            $("div.content-group:not(:first) .button-toggle").removeClass("open");

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

Home.initialize();

