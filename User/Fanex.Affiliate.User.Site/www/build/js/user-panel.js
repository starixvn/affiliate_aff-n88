var SUPPORT_MIN_WITDH = 716;
var SUB_MENU_HEIGHT = 41;
var DETAILS_SECTION_MENU_HEIGHT = 33;

//function handleSetTop() {
//    let isOverviewTable = $("#overview-table").length;

//    if (isOverviewTable) {
//        let headerHeight = $('#overview-table-header').height();
//        $('#overview-table-total > th').css({ top: `${SUB_MENU_HEIGHT + headerHeight + 7}px` });
//    }
//}

//function handleScroll() {
//    let isSummaryPanel = $("#summary").length;

//    if (isSummaryPanel) {
//        if (window.innerWidth < SUPPORT_MIN_WITDH) {
//            $("#details-section-menu").removeClass("details-section-sticky");
//        } else {
//            let stickyPoint = $("#details-section").offset().top;

//            if (window.pageYOffset >= stickyPoint) {
//                $("#details-section-menu").addClass("details-section-sticky");
//            }
//            if (window.pageYOffset < stickyPoint - DETAILS_SECTION_MENU_HEIGHT) {
//                $("#details-section-menu").removeClass("details-section-sticky");
//            }
//        }
//    }
//}

//function handleResize() {
//    handleScroll();
//    handleSetTop()
//}

var UserPanel = (function ($) {
    var DEFAULT_ACTION = 'AccountOverview';
    var allowedActionList = ["AccountOverview", "StatementHistory", "MyAccount", "PaymentRequest",
        "ReferrersStatistics", "LandingPageStatistics", "SubAffEarning",
        "DailyEarning", "MessageHistory", "RevenueReport", "MarketingLinkStatistics",
        "PlayerTransferBalance", "PlayerTransferBalanceHistory"];

    var _ajaxRequest = null;

    var _me = {
        datepicker: [],
        initialize: function () {
            _me.renderView();
            UserPanel.initEvent();
        },

        initEvent: function () {
            $(window).on('hashchange', function (event) {
                event.stopPropagation();
                _me.renderView();
            });
        },

        activeMenu: function (actionName) {
            var activeClassName = "active";
            $("#mainMenu .menu-item").removeClass(activeClassName);
            $("#menu" + actionName).addClass(activeClassName);
        },

        renderView: function () {
            _me.clearEventListener();
            $("#mainPanel").html("");
            var actionUrl = _me.getActionUrl(false);
            var actionName = actionUrl.split('?')[0];
            _me.activeMenu(actionName);

            var url = Site.resolveRelativeUrl("UserPanel/" + actionUrl);

            if (_ajaxRequest !== null) {
                _ajaxRequest.abort();
            }

            _ajaxRequest = $.ajax({
                type: "GET",
                dataType: "html",
                cache: false,
                url: url,
                success: function (response) {
                    $("#mainPanel").html(response);
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        },

        clearEventListener: function(){
            $("#mainPanel *").off();
            if (_me.datepicker) {
                for (var i = 0; i < _me.datepicker.length; i++) {
                    if (_me.datepicker[i]) {
                        _me.datepicker[i].destroy();
                    }
                }
                _me.datepicker = [];
            }

            //window.removeEventListener("scroll", handleScroll);
            //window.removeEventListener("resize", handleResize);
        },

        getActionUrl: function (onlyAction) {
            var hash = window.location.hash;
            var actionUrl = hash.split('#')[1];
            if (!actionUrl) {
                return DEFAULT_ACTION;
            }

            var urlPartList = actionUrl.split('?');
            var actionName = urlPartList[0];

            if (allowedActionList.indexOf(actionName) === -1) {
                actionName = DEFAULT_ACTION;
            }

            var queryString = (!onlyAction && urlPartList[1]) ? '?' + urlPartList[1] : '';

            return actionName + queryString;
        },
    };

    return _me;
})(jQuery);

UserPanel.initialize();


var UserPanelN88 = (function ($) {
    var _me = {
        initialize: function () {
            _me.initEvent();
        },

        initEvent: function () {
            $('.show-name-menu').click(function () {
                $('.dropdown-content-menu').toggleClass('active');
                $('.dropdown-content-menu li a').removeClass('active');
                $('.parent ul').removeClass('active');
            });
            $('.dropdown-content-menu li a').click(function () {
                var str = $(this).text();
                var hasStr = $(this).parents().hasClass('parent');
                $('.dropdown-content-menu li a').removeClass('active');
                $(this).addClass('active');
                if (!hasStr) {
                    $('.show-name-menu').html(str);
                }
            });

            $('.sub-menu-content li a').click(function () {

                var str = $(this).text();
                $('.show-name-menu').html(str);
            })

            $('.content-dropdown-icon').click(function () {
                $('.parent ul').removeClass('active');
                $(this).parent().parent().find('ul').toggleClass('active');
            })
        }
    };

    return _me;
})(jQuery);

UserPanelN88.initialize();