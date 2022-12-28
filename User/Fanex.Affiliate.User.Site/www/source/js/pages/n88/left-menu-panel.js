var LeftMenuPanel = (function ($) {
    const activeClassName = "active";

    var _me = {
        initialize: function () {
            _me.initEvent();
            window.addEventListener("load", _me.handleActiveLeftMenu);
        },

        initEvent: function () {
            $('.mobile-left-panel').click(function () {
                $('body').addClass('overflow-left-panel');
                $('.left-panel').addClass('active');

                window.setTimeout(_me.handleBinding);
            })

            $('a.left-menu-item').bind('click', function (e) {
                window.removeEventListener("scroll", _me.handleActiveLeftMenuByScroll);
                e.preventDefault();

                var hrefTarget = $(this).attr("href");

                _me.handelAnimate(hrefTarget);
            });
        },

        handleBinding: function () {
            $('body.overflow-left-panel').bind("click", function () {
                $(this).unbind("click");
                $(this).removeClass('overflow-left-panel');

                $('.left-panel').removeClass('active');
            });
        },

        handleActiveLeftMenu: function () {
            var hash = window.location.hash;
            var actionUrl = hash.split('#')[1];

            if (!actionUrl) {
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            } else {
                let hrefTarget = `#${actionUrl}`;
                const leftMenuItems = $("a.left-menu-item");

                for (let item of leftMenuItems) {
                    if (item.getAttribute("href") == hrefTarget) {
                        _me.handelAnimate(hrefTarget);

                        return;
                    }
                }

                _me.handleActiveLeftMenuByScroll();
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            }
        },

        handleActiveLeftMenuByScroll: function () {
            const sections = $("section.info-group");

            if (sections.length) {
                let activeMenuId = sections[0].getAttribute("id");

                for (let section of sections) {
                    const sectionTop = section.offsetTop;

                    if (window.pageYOffset >= sectionTop - (window.innerHeight * 1 / 5)) {
                        activeMenuId = section.getAttribute("id");
                    }
                }

                _me.setActiveLeftMenu(`#${activeMenuId}`);
            }
        },

        handelAnimate: function (hrefTarget) {
            _me.setActiveLeftMenu(hrefTarget);

            $('html, body').stop().animate({
                scrollTop: $(hrefTarget).offset().top
            }, 600, function () {
                location.hash = hrefTarget;

                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            });
        },

        setActiveLeftMenu: function (hrefTarget) {
            $("a.left-menu-item.active").removeClass(activeClassName);
            $(`a.left-menu-item[href="${hrefTarget}"]`).addClass(activeClassName);
        }
    };

    return _me;
})(jQuery);

LeftMenuPanel.initialize();