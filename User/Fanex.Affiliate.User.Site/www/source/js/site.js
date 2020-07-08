var Site = (function ($) {
    var _rootUrl = null;
    var _language = null;

    var _me = {
        initialize: function () {
            _rootUrl = $("#RootUrl").val();
            _language = $("#Language").val();
        },
        resolveRelativeUrl: function (url) {
            return _rootUrl + url;
        },
        getCurrentLanguage: function () {
            return _language;
        },
        escapeHtml: function (inputString) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(inputString));
            return div.innerHTML;
        },
        showLoader: function () {
            $("#blocker").show();
        },
        hideLoader: function () {
            $("#blocker").hide();
        },
        redirect: function (url) {
            window.location.href = url;
        },
        reload: function () {
            window.location.reload(true);
        },
        displayResult: function (isSuccess, message, selector) {
            selector = selector || "#messageResult";
            var $result = $(selector);
            $result.toggleClass("alert-success", isSuccess);
            $result.toggleClass("alert-danger", !isSuccess);
            $result.html(message);
            $result.show();
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },

        isN88: $("#SiteName").val() === 'n88',

        emailValidationPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

        toggleErrorMessage: function ($container, isValid) {
            $container.toggleClass("has-error", !isValid);
            $container.find(".help-block").toggleClass("hide", isValid);
        },

        getImageByMode: function (newMode) {
            var language = _me.getCurrentLanguage();
            var mode = newMode || _me.getCookie("mode");
            var src = _me.resolveRelativeUrl("www/build/styles/Images/revenue-share-structure/N88/" + mode + "/revenue_share_hierarchy." + language + ".png");
            $("#revenue_share_hierarchy").attr("src", src);
        }
    };

    return _me;
})(jQuery);

Site.initialize();