var AffiliateLink = (function ($) {

    function initChannelSelectEvent() {
        if ($("#Channel").children().length > 1) {
            document.getElementById("Channel").selectedIndex = 1;
        }

        $("#Channel").focusin(function () {
            window.previousChannelIndex = this.selectedIndex;
            this.selectedIndex = -1;
        })

        $("#Channel").focusout(function () {
            console.log(window.previousChannelIndex);
            if (this.selectedIndex === -1) {
                this.selectedIndex = window.previousChannelIndex;
            }
        })

        $("#Channel").change(function () {
            if ($(this).val() === 'add-new') {
                let text = prompt();
                if (text) {
                    let addPromise = MarketingBase.addChannel(text);
                    addPromise.then(result => {
                        if (result) {
                            if (result.IsOk) {
                                alert("Add channel succeded")
                                $(this).append(new Option(result.Data.ChannelName, result.Data.ChannelCode, false, true));
                            }
                            else {
                                alert(result.Message);
                            }
                        }
                    })
                }
            }
            $(this).blur();
        })
    }

    function handleFalseResponse(response) {
        let data;
        switch (response.status) {
            case 403:
                data = response.json();
                alert(data.ErrMsg);
                location.reload();
                break;
            default:
                alert('Internal error');
                break;
        }
    }


    var _me = {
        initialize: function () {
            _me.initEvent();
            _me.renderLinkChannelStatisticPage();
        },

        initEvent: function () {
            $("#AffLinkType").change(function () {
                let selectedVal = $(this).val();
                let selectedItem = window.searchOption.RefLinks.find(r => r.AffLinkType == selectedVal);

                let domains = selectedItem.Domains.map(item => new Option(item.DomainName, item.DomainId));
                let pages = selectedItem.SitePages.map(item => new Option(item.PageName, item.PageCode));

                $("#Page").empty().append(pages);
                $("#Domain").empty().append(domains);
            })

            $("#btnGenQRCode").click(function () {
                Site.showLoader();
                Promise.all([_me.renderLinkChannelStatisticPage(), _me.renderQrCodePage()])
                    .then(() => {
                        Site.hideLoader();
                        MarketingBase.registerToggleLinkEvent(_me.renderLinkChannelStatisticPage);
                        MarketingBase.resiterQrcodeEvent();
                    })
            });

            initChannelSelectEvent();
        },

        renderLinkChannelStatisticPage: function () {
             return MarketingBase.renderLinkChannelStatisticPage()
                .then((response) => {
                    if (response.ok)
                        return response.text()
                    else {
                        handleFalseResponse(response);
                    }
                })
                .then(html => {
                    $("#link-statistic").empty().html(html);
                })
        },

        renderQrCodePage: function () {
            let param = {
                selectedLanguage: $('#Language').val(),
                selectedPage: $('#Page').val(),
                selectedChannel: $('#Channel').val(),
                selectedDomainId: $('#Domain').val(),
                selectedLinkType: $('#AffLinkType').val()
            }
            return MarketingBase.renderQrCodePage(param)
                .then((response) => {
                    if (response.ok)
                        return response.text()
                    else {
                        handleFalseResponse(response);
                    }
                })
                .then(html => {
                    $("#qr-code").empty().html(html);
                });
        },
    };

    return _me;
})(jQuery);

AffiliateLink.initialize();