'use strict';

var Home = (function ($) {
    var _me = {
        initialize: function initialize() {
            _me.initSlider();
        },

        initSlider: function initSlider() {
            var $provider = $('#provider');
            $provider.carousel();
        }
    };

    return _me;
})(jQuery);

Home.initialize();

