var AccountOverview = (function ($) {
    const DEFAULT_ACTION = "Summary";
    const PARENT_PAGE_HASHTAG = "#AccountOverView";
    const DEFAULT_RELATIVE_PATH = "/UserPanel/Main/"

    let _currentActionPage = DEFAULT_ACTION;

    function genarateRelativePath(action) {
        return `${DEFAULT_RELATIVE_PATH}/${PARENT_PAGE_HASHTAG}#${action}`;
    }

    function saveBrowserHistory(action) {
        if (action !== _currentActionPage) {
            var relativePath = genarateRelativePath(action);
            window.history.pushState("Action", null, relativePath);
            _currentActionPage = action;
        }
    }

    var _me = {
        initialize: function () {
            _me.initEvent();
            let action = _me.getActionTab();
            console.log(action);
            _me.renderView(action);
        },

        initEvent: function () {
            $('#account-overview-menu').on('click', '.account-overview-menu-item', function () {
                let action = $(this).data('name');
                saveBrowserHistory(action)
                _me.renderView(action);
            });
        },

        activeMenu: function (actionName) {
            var activeClassName = "active";
            $(".account-overview-menu-item").removeClass(activeClassName);
            $("#menu" + actionName).addClass(activeClassName);
        },

        renderView: function (actionName) {
            _me.activeMenu(actionName);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);

            $.ajax({
                type: "GET",
                dataType: "html",
                cache: false,
                url: Site.resolveRelativeUrl("UserPanel/" + actionName),
                success: function (response) {
                    $("#account-overview-content").html(response);
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        },

        getActionTab: function () {
            let hashtag = location.hash;
            let splitTag = hashtag.split("#");
            console.log(splitTag);
            return splitTag.length < 3 ? DEFAULT_ACTION : splitTag[2];
        }
    };

    return _me;
})(jQuery);

AccountOverview.initialize();