var StatementHistory = (function ($) {
    function toggleCollapseButton(btn) {
        $(btn).children("span").toggleClass("glyphicon-chevron-right");
        $(btn).children("span").toggleClass("glyphicon-chevron-down");
    }

    function toggleChildrenElem(children) {
        $(children).toggleClass("display-none");
    }

    function expandChannels(channels) {
        channels.forEach(function (id) {
            let parent = $("#channel-table").find(`data-id='${id}'`);
            let btn = parent.find(".btn.btn-transparent");
            let children = parentRow.siblings(`tr[data-parent='${id}']`);
            if (!isExpandRow(parent)) {
                toggleCollapseButton(btn);
                toggleChildrenElem(children);
            }
        })
    }

    var _me = {
        initialize: function () {
            StatementHistory.initEvent();
            if (!window.currentExpandedChannel || !Array.isArray(window.currentExpandedChannel)) {
                window.currentExpandedChannel = [];
            }

            expandChannels(window.currentExpandedChannel);
        },

        initEvent: function () {
            $("#channel-table").on("click", ".btn.btn-transparent", function () {
                let parentRow = $(this).parents("tr");
                let id = parentRow.data("id");
                let children = parentRow.siblings(`tr[data-parent='${id}']`);
                toggleCollapseButton(this);
                toggleChildrenElem(children);
                if (isExpandRow(parentRow)) {
                    currentExpandedChannel.push(id);
                }
                else {
                    let index = currentExpandedChannel.indexOf(id);
                    currentExpandedChannel.splice(index, 1);
                }
            });
        },
    };

    return _me;
})(jQuery);

StatementHistory.initialize();