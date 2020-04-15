var MarketingBase = (function ($) {
    function getDownloadParam(button) {
        return {
            selectedLanguage: $(button).data("selected-language"),
            selectedDomainId: $(button).data("selected-domain-id"),
            selectedPage: $(button).data("selected-page"),
            targetId: $("#TargetId").val()
        };
    }
    var _me = {
        resiterQrcodeEvent: function() {
            new ClipboardJS('.btn-copy-link');

            new ClipboardJS('.btn-copy-qr', {
                text: function (trigger) {
                    let imgTag = $(trigger).nextAll("img")[0];
                    return imgTag.outerHTML;
                }
            });

            $('.btn-save-img').click(function () {
                let downloadTag = document.createElement("a");
                let param = getDownloadParam(this);
                var query = $.param(param);
                let url = `${Site.resolveRelativeUrl("UserPanel/Marketing/DownloadQrCode")}?${query}`;
                console.log(url);
                downloadTag.href = url;
                downloadTag.click();
            });
        },
        generateTextLink: function () {
            var params = _me.getLinkGenerationParam();
            _me.getTextLink(params);
        },

        getLinkGenerationParam: function () {

            return {
                selectedLanguage: $("#Language").val(),
                selectedDomainId: $("#Domain").val(),
                selectedPage: $("#MemberSitePage").val(),
                targetId: $("#TargetId").val()
            };
        },

        getTextLink: function (params) {
            var that = this;
            $.ajax({
                type: "GET",
                dataType: "html",
                cache: false,
                data: params,
                url: Site.resolveRelativeUrl("UserPanel/Marketing/GenerateLink"),
                success: function (response) {
                    $("#textLinkList").html(response);
                    that.resiterQrcodeEvent();
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        },

        initialize: function () {
            this.resiterQrcodeEvent();
        },
    };

    return _me;
})(jQuery);

$(document).ready(function () {
    MarketingBase.initialize();
})