"use strict";

var ContactUs = (function ($) {
    var _me = {
        initialize: function initialize() {
            _me.initEvent();
        },

        initEvent: function initEvent() {
            $("#contactForm").on("submit", function () {
                _me.submit($(this));
                return false;
            });

            $("#btnReset").on("click", function () {
                _me.reset();
            });

            $("#captchaContactUs").on("click", function () {
                _me.refreshCaptcha();
            });
        },

        reset: function reset() {
            var requiredInputList = $("input,textarea", $("#contactForm"));

            for (var i = 0; i < requiredInputList.length; i++) {
                var element = requiredInputList[i];
                var $element = $(element);
                $element.val("");
                var $container = $element.closest(".group");
                Site.toggleErrorMessage($container, true);
            }
        },

        submit: function submit($form) {
            var isValid = _me.checkRequiredInput() && _me.checkValidEmail();

            if (isValid) {
                var postData = $form.serializeObject();
                $.ajax({
                    type: "POST",
                    url: Site.resolveRelativeUrl("ContactUs/Index"),
                    data: postData,
                    dataType: "json",
                    cache: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function success(response) {
                        _me.handleResponseResult(response);
                    },
                    beforeSend: function beforeSend() {
                        Site.showLoader();
                    },
                    complete: function complete() {
                        Site.hideLoader();
                    }
                });
            }
        },

        handleResponseResult: function handleResponseResult(response) {
            _me.refreshCaptcha();
            $("#messageSuccess").toggle(response.IsOk);
            $("#messageError").toggle(!response.IsOk).html(response.Message || resourceLanguage.generalError);
            if (response.IsOk) {
                $("#mainContent").remove();
            }
        },

        checkRequiredInput: function checkRequiredInput() {
            var requiredInputList = $("input[type=text],textarea", $("#contactForm"));
            var isValid = true;

            for (var i = 0; i < requiredInputList.length; i++) {
                var element = requiredInputList[i];
                if (element.name !== "Affiliate") {
                    var $element = $(element);
                    var hasValue = !!$element.val();

                    var $container = $element.closest(".group");
                    Site.toggleErrorMessage($container, hasValue);

                    if (isValid && !hasValue) {
                        isValid = false;
                    }
                }
            }

            return isValid;
        },

        checkValidEmail: function checkValidEmail() {
            var $email = $("#Email");
            var isValid = Site.emailValidationPattern.test($email.val());

            var $container = $email.closest(".group");
            Site.toggleErrorMessage($container, isValid);

            return isValid;
        },

        refreshCaptcha: function refreshCaptcha() {
            var captchaUrl = Site.resolveRelativeUrl("Auth/CaptchaImage?type=1&_v=" + new Date().getTime());
            $("#captchaContactUs").attr("src", captchaUrl);
        }
    };

    return _me;
})(jQuery);

ContactUs.initialize();

