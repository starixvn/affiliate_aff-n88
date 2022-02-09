"use strict";

var Site = (function ($) {
    var _rootUrl = null;
    var _language = null;

    var _me = {
        initialize: function initialize() {
            _rootUrl = $("#RootUrl").val();
            _language = $("#Language").val();
        },
        resolveRelativeUrl: function resolveRelativeUrl(url) {
            return _rootUrl + url;
        },
        getCurrentLanguage: function getCurrentLanguage() {
            return _language;
        },
        escapeHtml: function escapeHtml(inputString) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(inputString));
            return div.innerHTML;
        },
        showLoader: function showLoader() {
            $("#blocker").show();
        },
        hideLoader: function hideLoader() {
            $("#blocker").hide();
        },
        redirect: function redirect(url) {
            window.location.href = url;
        },
        reload: function reload() {
            window.location.reload(true);
        },
        displayResult: function displayResult(isSuccess, message, selector) {
            selector = selector || "#messageResult";
            var $result = $(selector);
            $result.toggleClass("alert-success", isSuccess);
            $result.toggleClass("alert-danger", !isSuccess);
            $result.html(message);
            $result.show();
        },
        hideResult: function hideResult(selector) {
            selector = selector || "#messageResult";
            var $result = $(selector);
            $result.hide();
        },
        getCookie: function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = ca[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var c = _step.value;

                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return "";
        },

        isN88: $("#SiteName").val() === 'n88',

        emailValidationPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

        toggleErrorMessage: function toggleErrorMessage($container, isValid) {
            $container.toggleClass("has-error", !isValid);
            $container.find(".help-block").toggleClass("hide", isValid);
        },

        getImageByMode: function getImageByMode(newMode) {
            var language = _me.getCurrentLanguage();
            var mode = newMode || _me.getCookie("mode");
            var src = _me.resolveRelativeUrl("www/build/styles/Images/revenue-share-structure/N88/" + mode + "/revenue_share_hierarchy." + language + ".png");
            $("#revenue_share_hierarchy").attr("src", src);

            var iconSrc = _me.resolveRelativeUrl("www/build/styles/Images/contact-us/N88/" + mode);
            $("#email_icon").attr("src", iconSrc + "/email.png");
            $("#telegram_icon").attr("src", iconSrc + "/telegram.png");
            $("#whatsapp_icon").attr("src", iconSrc + "/whatsapp.png");
        }
    };

    return _me;
})(jQuery);

Site.initialize();

