var Product = (function ($) {
    function initSlider() {
        var $productBanner = $('#productBanner');
        $productBanner.carousel();
    }

    var _me = {
        initialize: function () {
            initSlider();
        }
    }

    return _me;
})(jQuery);

Product.initialize();