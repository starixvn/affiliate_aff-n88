var Layout = (function ($) {
    var DEFAULT_SPEED = 20;

    function initSlider() {
        //var $mainBanner = $('#mainBanner');
        //$mainBanner.carousel();
    }

    var _me = {
        initialize: function () {
            initSlider();
            _me.registerAjaxHandlerError();
            _me.initEvent();
            _me.renderHotNews();
        },
        initEvent: function () {
            $("#selectedLanguage").on("mousedown", function (e) {
                e.preventDefault();
            });

            $("#selectedLanguage").on("click", function (e) {
                $(this).is(':focus') ? $(this).blur() : $(this).focus();
            });

            $("#languageList").on("click", ".language-item", function () {
                var $selectedItem = $(this);
                Site.changeLanguage($selectedItem.data('option'));
            });

            $('li.parent').on('mouseover', function () {
                var $menuItem = $(this),
                    $submenuWrapper = $('> .submenu-container', $menuItem);

                // grab the menu item's position relative to its positioned parent
                var menuItemPos = $menuItem.position();
                var withMenu = $menuItem.outerWidth();
                var heightMenu = $menuItem.outerHeight();
                var subWidth = $submenuWrapper.outerWidth();
                // place the submenu in the correct position relevant to the menu item
                $submenuWrapper.css({
                    top: menuItemPos.top + heightMenu,
                    left: menuItemPos.left + withMenu - subWidth
                });
            });

            $(window).scroll(function () {
                if ($(this).scrollTop() > 200) {
                    $('#moveToTop').fadeIn(200);
                } else {
                    $('#moveToTop').fadeOut(200);
                }
            });
        },

        registerAjaxHandlerError: function () {
            $(document).ajaxError(function (event, jqXHR) {
                var status = jqXHR.status;

                switch (status) {
                    case 401:
                    case 403:
                        window.location.href = Site.resolveRelativeUrl("");
                        break;
                    case 404:
                        window.location.href = Site.resolveRelativeUrl("Notify/PageNotFound");
                        break;
                    case 500:
                        alert($("<div/>").html(window.Lang.ServerError).text());
                        break;
                    default:
                        break;
                }
            });
        },
        renderHotNews: function () {
            $.ajax({
                type: "GET",
                url: Site.resolveRelativeUrl("News/LatestHotNews"),
                dataType: "html",
                cache: false,
                success: function (response) {
                    var $marquee = $("#marquee");
                    $marquee.html(response);

                    $marquee.css("animation-duration", DEFAULT_SPEED + "s");
                }
            });
        }
    }

    return _me;
})(jQuery);

Layout.initialize();