var Home = (function ($) {
    var _me = {
        initialize: function () {
            _me.initSlider();
        },

        initSlider: function() {
            var $provider = $('#provider');
            $provider.carousel();
        }
    };

return _me;
}) (jQuery);

Home.initialize();