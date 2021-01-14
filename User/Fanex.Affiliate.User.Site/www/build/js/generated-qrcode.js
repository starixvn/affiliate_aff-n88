var MarketingBase = (function ($) {
    isCancelConfirm = false;

    function getDownloadParam(trigger) {
        return {
            selectedLanguage: $(trigger).data("selected-language"),
            selectedDomainId: $(trigger).data("selected-domain-id"),
            selectedPage: $(trigger).data("selected-page"),
            selectedChannel: $(trigger).data("selected-channel"),
            selectedLinkType: $(trigger).data("selected-link-type")
        };
    }

    function getToggleBtnStatus(cheked) {
        return cheked ? "on" : "off";
    }



    var _me = {
        resiterQrcodeEvent: function () {
            new ClipboardJS('.btn-copy-link', {
                text: function (trigger) {
                    let parent = $(trigger).parents(".qr-item").first();
                    console.log(parent);
                    return parent.data("link");
                }
            });

            new ClipboardJS('.btn-copy-qr', {
                text: function (trigger) {
                    let imgTag = $(trigger).parents(".qr-action").prev().children("img.qrcode")[0];
                    return imgTag.outerHTML;
                }
            });

            $('.btn-save-img').click(function () {
                let downloadTag = document.createElement("a");
                let param = getDownloadParam($(this).parents(".qr-item")[0]);
                var query = $.param(param);
                let url = `${Site.resolveRelativeUrl("UserPanel/Marketing/DownloadQrCode")}?${query}`;
                downloadTag.href = url;
                downloadTag.click();
            });
        },

        initChannelSelectEvent: function () {
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
                    this.selectedIndex = window.previousChannelIndex === 0 ? 1 : window.previousChannelIndex;
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
        },

        addChannel: function (text) {
            Site.showLoader();
            let url = Site.resolveRelativeUrl("UserPanel/Marketing/AddChannel");
            let param = { channelName: text };
            let fetchData = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin',
                body: new URLSearchParams(param)
            })
                .then((response => {
                    Site.hideLoader();
                    data = response.json();
                    if (response.ok) {
                        return data;
                    }
                    else {
                        alert("Internal error. Please contact admin");
                    }
                }))
            return Promise.resolve(fetchData);
        },

        renderLinkChannelStatisticPage: function () {
            let url = Site.resolveRelativeUrl("UserPanel/Marketing/RenderUsingMarketLinkPage");
            return fetch(url, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
            })
        },

        renderQrCodePage: function (param) {
            let url = new URL(Site.resolveRelativeUrl("UserPanel/Marketing/RenderQrCodePage"), window.location.origin);
            let query = new URLSearchParams(param);
            url.search = query.toString();
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin',
            })
        },

        toggleMarketingLink: function (param) {
            let url = Site.resolveRelativeUrl("UserPanel/Marketing/ToggleMarketingLink");
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin',
                body: new URLSearchParams(param)
            })
        },

        registerToggleLinkEvent: function (callback) {
            $checkBox = $(".toggle-link");
            $checkBox.off("change");

            $checkBox.on("change", function () {
                console.log(isCancelConfirm);
                if (isCancelConfirm) {
                    isCancelConfirm = false;
                    return;
                }
                let checked = $(this).prop('checked');
                let confirmText = checked
                    ? "Are you sure about this action? By confirming this action, you will active this tracking link"
                    : "Are you sure about this action? By confirming this action, you will deactive this tracking link"

                if (confirm(confirmText)) {
                    let parent = $(this).parents(".qr-item").first();
                    let param = {
                        ChannelCode: parent.data("selected-channel"),
                        LanguageCode: parent.data("selected-language"),
                        AffRefLink: parent.data("link"),
                        IsOn: checked
                    }

                    _me.toggleMarketingLink(param)
                        .then(response => {
                            console.log(response.ok && response.json().IsOk);
                            if (response.ok) {
                                $(parent).find("button").prop('disabled', !checked);
                                $(parent).find(".qr-img").toggleClass("disabled");
                                callback && callback();
                            }
                            else {
                                alert("Update fail");
                                isCancelConfirm = true;
                                $(this).bootstrapToggle(getToggleBtnStatus(!checked));
                            }
                        })


                }
                else {
                    isCancelConfirm = true;
                    $(this).bootstrapToggle(getToggleBtnStatus(!checked));
                }

            })
        },

        initialize: function () {
            this.resiterQrcodeEvent();
        },
    };

    return _me;
})(jQuery);