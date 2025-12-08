"use strict";

var Home = (function ($) {
    var _me = {
        initialize: function initialize() {
            _me.initSlider();
            _me.initFAQ();
        },

        initSlider: function initSlider() {
            var $provider = $("#provider");
            $provider.slick({
                autoplay: true,
                arrows: false,
                dots: false,
                slidesToShow: 5,
                centerMode: true,
                centerPadding: '1px',
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3
                    }
                }]
            });

            $(window).on("load resize", function () {
                var $partner = $("#partner-section");
                var $product = $("#our-product");
                if (window.innerWidth < 768) {
                    $partner.slick({
                        autoplay: true,
                        slidesToShow: 3,
                        variableWidth: true,
                        arrows: false,
                        infinite: true,
                        responsive: [{
                            breakpoint: 9999,
                            settings: "unslick"
                        }, {
                            breakpoint: 767,
                            settings: {
                                centerPadding: '30px',
                                arrows: false,
                                centerMode: true,
                                slidesToShow: 3
                            }
                        }]

                    });

                    $product.slick({
                        autoplay: true,
                        slidesToShow: 3,
                        variableWidth: true,
                        arrows: false,
                        infinite: true,
                        responsive: [{
                            breakpoint: 9999,
                            settings: "unslick"
                        }, {
                            breakpoint: 767,
                            settings: {
                                centerPadding: '10px',
                                arrows: false,
                                centerMode: true,
                                slidesToShow: 3
                            }
                        }]

                    });
                } else {
                    $partner.slick("unslick");
                    $product.slick("unslick");
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

