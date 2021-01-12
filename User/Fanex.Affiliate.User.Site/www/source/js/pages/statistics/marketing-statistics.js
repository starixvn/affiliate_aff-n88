var ReferrerStatistics = (function ($) {
    function formatDateUnit(value) {
        return value < 10 ? '0' + value : value;
    }

    function initDatePicker(id, triggerId) {
        UserPanel.datepicker.push(new Pikaday({
            field: document.getElementById(id),
            trigger: document.getElementById(triggerId),
            yearRange: [2020, new Date().getFullYear()],
            toString: function (date, format) {
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return formatDateUnit(month) + "/" + formatDateUnit(day) + "/" + year;
            }
        }));
    }

    var _me = {

        initialize: function () {
            initDatePicker('FromDate', 'fromPicker');
            initDatePicker('ToDate', 'toPicker');
            _me.initEvent();
        },

        initEvent: function () {
            $('#btnStatisticsSubmit').on('click', function () {
                $('#statisticsDetailTable').html('');

                var params = {
                    fromDate: $('#FromDate').val(),
                    toDate: $('#ToDate').val(),
                    language: $('#Language').val(),
                    includeInActiveLink: $("#includeInActive").val()
                };
                _me.getMainView(params);
            });

            $('#statisticsTable').on('click', '.statisticsItem', function () {
                _selectedDomain = $(this).data('domain');
                _pageIndex = 0;
                var params = _me.getDetailParam();

                $('#statisticsDetailPager').show();
                _me.getDetailView(params, initPager);
            });
        },

        getMainView: function (params) {
            $.ajax({
                type: "POST",
                dataType: "html",
                cache: false,
                data: JSON.stringify(params),
                url: Site.resolveRelativeUrl("UserPanel/marketingLinkStatistics"),
                contentType: "application/json; charset=UTF-8",
                success: function (response) {
                    $("#statisticsTable").html(response);
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        },
    };

    return _me;
})(jQuery)

ReferrerStatistics.initialize();