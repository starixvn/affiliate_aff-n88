var PlayerList = (function ($) {
    var _pageSize = 20;
    var _pageIndex = 0;

    function initPager() {
        $("#pager").pager({
            totalItems: parseInt($("#TotalItem").val()),
            pageSize: _pageSize,
            pageIndex: _pageIndex,
            languageCode: Site.getCurrentLanguage(),
            onChange: function (pageIndex, pageSize) {
                _pageIndex = pageIndex;
                _pageSize = pageSize;
                let param = _me.getParam();
                _me.getPlayerList(param);
            }
        });
    }

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
            },
            onOpen: function () {
                if ($('#ignoreDateFilter').prop("checked")) {
                    this.hide();
                }
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
            $('#btnSubmit').on('click', function () {
                _pageIndex = 0;
                var params = _me.getParam();

                $('#pager').show();
                $('#player-list-table').show();
                _me.getPlayerList(params, initPager);
            });

            $('#ignoreDateFilter').on('click', function () {
                const isChecked = $(this).is(':checked');
                _me.toggleDate(isChecked);
            });
        },


        getPlayerList: function (params, onSuccess) {
            $.ajax({
                type: "POST",
                dataType: "html",
                cache: false,
                data: JSON.stringify(params),
                url: Site.resolveRelativeUrl("UserPanel/PlayerList"),
                contentType: "application/json; charset=UTF-8",

                success: function (response) {
                    $("#player-list-table").html(response);
                    onSuccess && onSuccess();
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        },

        getParam: function () {
            return {
                memberType: $('#PlayerType').val(),
                fromDate: $('#FromDate').val(),
                toDate: $('#ToDate').val(),
                isGetAll: $('#ignoreDateFilter').is(':checked'),
                pageSize: _pageSize,
                pageIndex: _pageIndex + 1
            };
        },

        toggleDate: function (isDisabled) {
            $(".date-wrapper > *").toggleClass("disabled", isDisabled);
        }
    };

    return _me;
})(jQuery)

PlayerList.initialize();