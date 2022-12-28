"use strict";

var LeftMenuPanel = (function ($) {
    var activeClassName = "active";

    var _me = {
        initialize: function initialize() {
            _me.initEvent();
            window.addEventListener("load", _me.handleActiveLeftMenu);
        },

        initEvent: function initEvent() {
            $('.mobile-left-panel').click(function () {
                $('body').addClass('overflow-left-panel');
                $('.left-panel').addClass('active');

                window.setTimeout(_me.handleBinding);
            });

            $('a.left-menu-item').bind('click', function (e) {
                window.removeEventListener("scroll", _me.handleActiveLeftMenuByScroll);
                e.preventDefault();

                var hrefTarget = $(this).attr("href");

                _me.handelAnimate(hrefTarget);
            });
        },

        handleBinding: function handleBinding() {
            $('body.overflow-left-panel').bind("click", function () {
                $(this).unbind("click");
                $(this).removeClass('overflow-left-panel');

                $('.left-panel').removeClass('active');
            });
        },

        handleActiveLeftMenu: function handleActiveLeftMenu() {
            var hash = window.location.hash;
            var actionUrl = hash.split('#')[1];

            if (!actionUrl) {
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            } else {
                var hrefTarget = "#" + actionUrl;
                var leftMenuItems = $("a.left-menu-item");

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = leftMenuItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        if (item.getAttribute("href") == hrefTarget) {
                            _me.handelAnimate(hrefTarget);

                            return;
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

                _me.handleActiveLeftMenuByScroll();
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            }
        },

        handleActiveLeftMenuByScroll: function handleActiveLeftMenuByScroll() {
            var sections = $("section.info-group");

            if (sections.length) {
                var activeMenuId = sections[0].getAttribute("id");

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = sections[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var section = _step2.value;

                        var sectionTop = section.offsetTop;

                        if (window.pageYOffset >= sectionTop - window.innerHeight * 1 / 5) {
                            activeMenuId = section.getAttribute("id");
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                            _iterator2["return"]();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _me.setActiveLeftMenu("#" + activeMenuId);
            }
        },

        handelAnimate: function handelAnimate(hrefTarget) {
            _me.setActiveLeftMenu(hrefTarget);

            $('html, body').stop().animate({
                scrollTop: $(hrefTarget).offset().top
            }, 600, function () {
                location.hash = hrefTarget;

                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            });
        },

        setActiveLeftMenu: function setActiveLeftMenu(hrefTarget) {
            $("a.left-menu-item.active").removeClass(activeClassName);
            $("a.left-menu-item[href=\"" + hrefTarget + "\"]").addClass(activeClassName);
        }
    };

    return _me;
})(jQuery);

LeftMenuPanel.initialize();

