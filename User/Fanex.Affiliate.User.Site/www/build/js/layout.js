var Layout = (function ($) {
    var DEFAULT_SPEED = 20;
    const siteName = window.SiteName;

    function initSlider() {
        var $mainBanner = $('#mainBanner');
        $mainBanner.carousel();
    }

    function initContactGirl() {
        var $contactGirlIcon = $('#contactGirlIcon');

        if (sessionStorage.getItem('contactGirlIconHidden') !== 'true') {
            $contactGirlIcon.removeClass('hidden');
        }

        $('#contactGirlClose').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $contactGirlIcon.addClass('hidden');
            sessionStorage.setItem('contactGirlIconHidden', 'true');
        });
    }

    var _me = {
        initialize: function () {
            initSlider();
            _me.registerAjaxHandlerError();
            _me.initEvent();
            _me.renderHotNews();
            initContactGirl();
        },
        initEvent: function () {
            $("#selectedLanguage").on("click", function (e) {
                if ($(this).hasClass('active')) {
                    $(this).blur();
                } else {
                    $(this).addClass("active");
                }
            });

            $("#selectedLanguage").on("blur", function (e) {
                $(this).removeClass("active");
            });

            $("#languageList").on("click", ".language-item", function () {
                var $selectedItem = $(this);
                const targetCountryCode = $selectedItem.data('target-country-code');

                document.cookie = `${siteName}_country=${targetCountryCode}; path=/`;
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

                    const containerWidth = $("#marqueeContainer").outerWidth();
                    const hotNewsWidth = $marquee.outerWidth();
                    const speedRate = hotNewsWidth / containerWidth;
                    const speed = speedRate < 1 ? DEFAULT_SPEED : (speedRate + 0.25) * DEFAULT_SPEED;

                    $marquee.css("animation-duration", speed + "s");
                }
            });
        }
    }

    return _me;
})(jQuery);

Layout.initialize();