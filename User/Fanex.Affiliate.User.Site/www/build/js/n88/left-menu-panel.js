"use strict";

var LeftMenuPanel = (function ($) {
    var activeClassName = "active";
    var isOpenLeftMenuMobile = false;

    var _me = {
        initialize: function initialize() {
            _me.initEvent();
            window.addEventListener("load", _me.handleActiveLeftMenuByScroll);
        },

        initEvent: function initEvent() {
            $('.mobile-left-panel').click(function (e) {
                $('body').addClass('overflow-left-panel');
                $('.left-panel').addClass('active');

                $('body').bind('click', function (e) {
                    if (isOpenLeftMenuMobile) {
                        _me.handleCloseLeftMenu();
                    } else {
                        isOpenLeftMenuMobile = true;
                    }
                });
            });

            $('#left-panel-menu').on('scroll', function (e) {
                console.log("left-panel-menu scroll");
                e.stopPropagation();
            });

            $('a.left-menu-item').bind('click', function (e) {
                window.removeEventListener("scroll", _me.handleActiveLeftMenuByScroll);
                e.preventDefault();

                var hrefTarget = $(this).attr("href");

                _me.handelAnimate(hrefTarget);
            });
        },

        handleCloseLeftMenu: function handleCloseLeftMenu() {
            isOpenLeftMenuMobile = false;
            $('body').unbind("click");

            $('.left-panel.active').removeClass('active');
            $('body.overflow-left-panel').removeClass('overflow-left-panel');
        },

        handleActiveLeftMenuByScroll: function handleActiveLeftMenuByScroll() {
            var sections = $("section.info-group");

            if (sections.length) {
                var theFirstMenuId = sections[0].getAttribute("id");
                var activeMenuId = theFirstMenuId;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = sections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var section = _step.value;

                        var sectionTop = section.offsetTop;

                        if (window.pageYOffset >= sectionTop - window.innerHeight * 1 / 5) {
                            activeMenuId = section.getAttribute("id");
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _me.setActiveLeftMenu("#" + activeMenuId);
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            }
        },

        handelAnimate: function handelAnimate(hrefTarget) {
            _me.setActiveLeftMenu(hrefTarget);

            $('html, body').stop().animate({
                scrollTop: $(hrefTarget).offset().top
            }, 600, function () {
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            });
        },

        setActiveLeftMenu: function setActiveLeftMenu(hrefTarget, theFirstMenuId) {
            var leftMenuList = $("a.left-menu-item[href*=\"#\"]");
            var activeLeftMenu = $("a.left-menu-item[href=\"" + hrefTarget + "\"]");

            if (leftMenuList.length) {
                $("a.left-menu-item.active").removeClass(activeClassName);

                activeLeftMenu.addClass(activeClassName);

                var offsetTop = activeLeftMenu.offset().top - $("a.left-menu-item[href=\"" + leftMenuList[0].getAttribute("href") + "\"]").offset().top;

                $('#left-panel-menu').stop().animate({
                    scrollTop: offsetTop
                }, 400);
            }
        }
    };

    return _me;
})(jQuery);

LeftMenuPanel.initialize();

