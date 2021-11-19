var Layout = (function ($) {
    var DEFAULT_SPEED = 20;

    function initSlider() {
        var $mainBanner = $('#mainBanner');
        $mainBanner.carousel();
    }

    function createNewUrlByLanguage(url, language) {
        var hasQueryString = url.indexOf('?') !== -1;
        var updatedQueryParam = 'lang=' + language;
        var key = 'lang';

        if (hasQueryString) {
            var regex = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
            return regex.test(url) ?
                url.replace(regex, '$1' + key + '=' + language + '$2') :
                url + '&' + updatedQueryParam;
        }
        else {
            return url + '?' + updatedQueryParam;
        }
    }

    var _me = {
        initialize: function () {
            initSlider();
            Site.isN88 && _me.renderMode();
            _me.registerAjaxHandlerError();
            _me.initEvent();
            _me.renderHotNews();
        },
        initEvent: function () {
            $("#selectedLanguage").on("click", function () {
                $(this).focus();
            });

            $(".desktop").on("click", ".switch-desktop", function () {
                _me.handleSwitchMode();
            });

            $(".mobile").on("click", ".switch-mobile", function () {
                _me.handleSwitchMode();
            });

            $("#languageList").on("click", ".language-item", function () {
                var $selectedItem = $(this);
                _me.changeLanguage($selectedItem.data('option'));
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

            $(window).resize(function () {
                var mode = Site.getCookie("mode");

                _me.setCheckedForInput(mode);
            });
        },
        renderMode: function () {
            var mode = Site.getCookie("mode");

            _me.setCheckedForInput(mode);

            var n88Link = $('#n88-link');
            n88Link.attr('href', Site.resolveRelativeUrl(`www/build/styles/css/n88-${mode || 'lightmode'}.css?v=${window.JsVersion}`));

            if (!mode) {
                document.cookie = "mode=lightmode; path=/";
            }
        },
        handleSwitchMode: function () {
            var mode = Site.getCookie("mode");

            var newMode = mode === 'lightmode' ? 'darkmode' : 'lightmode';
            _me.setCheckedForInput(newMode);
            Site.getImageByMode(newMode);

            var n88Link = $('#n88-link');
            n88Link.attr('href', Site.resolveRelativeUrl(`www/build/styles/css/n88-${newMode}.css?v=${window.JsVersion}`));

            document.cookie = "mode=" + newMode + "; path=/";
        },

        setCheckedForInput: function (mode) {
            var isDarkMode = mode === "darkmode";

            var inputDesktop = $('#switch-desktop');
            var inputMobile = $('#switch-mobile');

            if (isDarkMode) {
                inputDesktop.addClass('dark-mode');
                inputMobile.addClass('dark-mode');
            } else {
                inputDesktop.removeClass('dark-mode');
                inputMobile.removeClass('dark-mode');
            }
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
        },

        changeLanguage: function (selectedLanguage) {
            var hash = window.location.hash;
            var href = window.location.href;
            var actualUrl = !!hash ? href.substring(0, href.indexOf(hash)) : href;
            var newActualUrl = createNewUrlByLanguage(actualUrl, selectedLanguage);

            var url = newActualUrl + hash;

            Site.redirect(url);
        }
    }

    return _me;
})(jQuery);

Layout.initialize();