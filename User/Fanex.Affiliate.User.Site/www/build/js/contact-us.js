var WebSite = (function ($) {
    function setFocusForLastInput() {
        $("#websiteInfo .urlInput").last().focus();
    }

    var _me = {
        getMoreWebsiteUrlData: function () {
            var moreUrlList = [];
            $("#websiteInfo .urlInput").each(function (index, data) {
                if (data.value) {
                    moreUrlList.push(Site.escapeHtml(data.value.trim()));
                }
            });

            return moreUrlList.join(";");
        },

        reoderInputUrl: function (webSiteLabel) {
            var index = 2;
            $(".moreWebsiteLabel").each(function (i, item) {
                var $item = $(item);
                var labelText = webSiteLabel + ' ' + index;
                $item.text(labelText);

                index++;
            });
        },

        deleteWebsiteUrl: function ($currentItem) {
            var $container = $currentItem.closest(".websiteInput");
            $container.remove();
        },

        buildUrlInput: function (webSiteLabel, deleteLabel, errorMessage) {
            var currentItemCount = $("#websiteInfo .urlInput").length + 2;
            var name = "MoreUrlInput" + currentItemCount;
            var inputItem = '<div class="form-group websiteInput">' +
                    '<label class="col-sm-3 control-label require moreWebsiteLabel">' + webSiteLabel + ' ' + currentItemCount + '</label>' +
                    '<div class="col-sm-4">' +
                        '<input class="form-control urlInput" type="text" name="' + name + '" data-val="true" data-val-required="' + errorMessage + '" value="" />' +
                    '</div>' +
                    '<div class="col-sm-1">' +
                        '<button type="button" class="btn btn-submit btnDeleteUrl" title="' + deleteLabel + '"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>' +
                    '</div>' +
                    '<div class="col-sm-offset-3 col-sm-9"><span class="field-validation-valid help-block hide" data-valmsg-for="' + name + '" data-valmsg-replace="true"></span></div>' +
                '</div>';

            $("#websiteInfo").append(inputItem);
            _me.reoderInputUrl(webSiteLabel);
        },

        handleAddingUrl: function (lang) {
            var hasWebSite = _me.hasWebSite();
            var isValid = _me.validateWebSiteGroup();

            if (hasWebSite && isValid) {
                _me.addMoreUrl(lang);
            }
        },

        addMoreUrl: function (lang) {
            var currentItemCount = $("#websiteInfo .urlInput").length + 2;
            var errorMessage = lang.requiredMoreWebSiteUrl.replace("{i}", currentItemCount);
            _me.buildUrlInput(lang.webSiteUrl, lang.deleteLabel, errorMessage);
            setFocusForLastInput();

            _me.refreshFormValidation();
        },

        refreshFormValidation: function () {
            var $form = $("#accountForm");
            $form.removeData("validator").removeData("unobtrusiveValidation");
            $.validator.unobtrusive.parse($form);
        },

        validateWebSiteGroup: function () {
            var validator = _me.getValidator();
            var isValidSiteUrl = validator.element("#SiteUrl");
            var isValidNoSiteDesc = validator.element("#NoSiteDesc");
            var isValidMainInfo = isValidSiteUrl && isValidNoSiteDesc;

            var isValidMoreUrl = true;
            var moreInputUrl = $(".urlInput");
            for (var i = 0; i < moreInputUrl.length; i++) {
                var item = moreInputUrl[i];
                isValidMoreUrl = isValidMoreUrl && validator.element(item);
            }

            return isValidMainInfo && isValidMoreUrl;
        },

        changeWebsiteOption: function (hasWebSite, isClickSubmit) {
            isClickSubmit && _me.validateWebSiteGroup();
            var $mainUrlInput = $("#SiteUrl");
            $mainUrlInput.prop("disabled", !hasWebSite);
            $(".websiteInput").toggle(hasWebSite);
            $("#btnAddUrl").prop("disabled", !hasWebSite);

            var $noSiteDesc = $("#NoSiteDesc");
            $noSiteDesc.prop("disabled", hasWebSite);
        },

        assignValueForWebSite: function () {
            var $siteUrl = $("#SiteUrl");
            var $moreSiteUrl = $("#MoreSiteUrls");
            var $noSiteDesc = $("#NoSiteDesc");

            if (_me.hasWebSite()) {
                var moreWebSiteUrl = _me.getMoreWebsiteUrlData();
                $moreSiteUrl.val(moreWebSiteUrl);

                $noSiteDesc.val("");
            }
            else {
                $siteUrl.val("");
                $moreSiteUrl.val("");
            }
        },

        getValidator: function () {
            return $("#accountForm").validate();
        },

        hasWebSite: function () {
            return $("input[name=HasWebSite][type=radio]:checked").val() === "True";
        }
    }

    return _me;
})(jQuery);
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