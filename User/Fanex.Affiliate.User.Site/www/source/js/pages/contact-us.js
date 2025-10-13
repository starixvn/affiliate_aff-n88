var ContactUs = (function ($) {
    var _me = {
        initialize: function () {
            _me.initEvent();
        },

        initEvent: function () {
            $("#contactForm").on("submit", function (e) {
                e.preventDefault();
                return _me.submit();
            });

            $("#btnReset").on("click", function () {
                _me.reset();
            });
        },

        submit: function () {
            var $form = $("#contactForm");
            var validator = $form.validate();
            var isValidForm = validator.form();

            if (isValidForm) {
                Site.showLoader();
                WebSite.assignValueForWebSite();
                var postData = $form.serializeObject();

                $.ajax({
                    type: "POST",
                    url: Site.resolveRelativeUrl("ContactUs/Index"),
                    data: postData,
                    dataType: "json",
                    cache: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        _me.handleResponseResult(response);
                    },
                    error: function () {
                        _me.handleResponseResult({
                            IsOk: false,
                            Message: "An error occurred while sending your message. Please try again later."
                        });
                    },
                    complete: function () {
                        Site.hideLoader();
                    }
                });
            }
            else {
                validator.focusInvalid();
            }
        },

        handleResponseResult: function (response) {
            Site.displayResult(response.IsOk, response.Message);
            $(window).scrollTop(0);
        },

        reset: function () {
            var $form = $("#contactForm");

            $form[0].reset();

            $form.removeData("validator");
            $form.removeData("unobtrusiveValidation");
            $.validator.unobtrusive.parse($form);

            $("#mainContent").show();
        }
    };

    return _me;
})(jQuery);

$(document).ready(function () {
    ContactUs.initialize();
});
