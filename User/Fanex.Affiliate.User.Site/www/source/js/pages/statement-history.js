var StatementHistory = (function ($) {
    let _pageSize = 20;
    let _pageIndex = 0;
    let urlMapping = [
        { transType: 201, url: "UserPanel/Main/#DailyEarning" },
        { transType: 204, url: "UserPanel/Main/#SubAffEarning"}
    ];

    function initPager() {
        $("#statementPager").pager({
            totalItems: parseInt($("#TotalItem").val()),
            pageSize: _pageSize,
            pageIndex: _pageIndex,
            languageCode: Site.getCurrentLanguage(),
            onChange: function (pageIndex, pageSize) {
                _pageIndex = pageIndex;
                _pageSize = pageSize;

                var params = _me.getStatementHistoryParam();
                _me.renderStatementHistory(params);
            }
        });
    }

    function toggleCollapseButton(btn) {
        $(btn).children("span").toggleClass("glyphicon-chevron-right");
        $(btn).children("span").toggleClass("glyphicon-chevron-down");
    }

    function toggleChildrenElem(children) {
        $(children).toggleClass("display-none");
    }

    var _me = {
        initialize: function () {
            initPager();
            StatementHistory.initEvent();
        },

        initEvent: function () {
            $("#statementDataList").on("click", ".amountItem", function () {
                let transtype = Number($(this).data("transtype"));
                let url = urlMapping.find(elem => elem.transType === transtype).url;
                let params = {
                    monthDate: $(this).data("date")
                };

                Site.redirect(Site.resolveRelativeUrl(`${url}?${$.param(params)}`));
            });

            $("#statementDataList").on("click", ".btn.btn-transparent", function () {
                let id = $(this).parents("tr").data("id");
                let children = $(this).parents("tr").siblings(`tr[data-parent='${id}']`);
                toggleCollapseButton(this);
                toggleChildrenElem(children);
            });
        },

        getStatementHistoryParam: function () {
            return {
                pageSize: _pageSize,
                pageIndex: _pageIndex + 1
            };
        },

        renderStatementHistory: function (params) {
            $.ajax({
                type: "POST",
                dataType: "html",
                cache: false,
                data: JSON.stringify(params),
                contentType: "application/json; charset=UTF-8",
                url: Site.resolveRelativeUrl("UserPanel/StatementHistory"),
                success: function (response) {
                    $("#statementDataList").html(response);
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        }
    };

    return _me;
})(jQuery);

StatementHistory.initialize();