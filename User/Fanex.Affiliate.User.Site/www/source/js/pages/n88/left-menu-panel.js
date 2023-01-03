var LeftMenuPanel = (function ($) {
    const activeClassName = "active";
    let isOpenLeftMenuMobile = false;

    var _me = {
        initialize: function () {
            _me.initEvent();
            window.addEventListener("load", _me.handleActiveLeftMenuByScroll);
        },

        initEvent: function () {
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
            })

            $('#left-panel-menu').on('scroll', function (e) {
                e.stopPropagation();
            })

            $('a.left-menu-item').bind('click', function (e) {
                window.removeEventListener("scroll", _me.handleActiveLeftMenuByScroll);
                e.preventDefault();

                var hrefTarget = $(this).attr("href");

                _me.handelAnimate(hrefTarget);
            });
        },

        handleCloseLeftMenu: function () {
            isOpenLeftMenuMobile = false;
            $('body').unbind("click");

            $('.left-panel.active').removeClass('active');
            $('body.overflow-left-panel').removeClass('overflow-left-panel');
        },

        handleActiveLeftMenuByScroll: function () {
            const sections = $("section.info-group");

            if (sections.length) {
                let theFirstMenuId = sections[0].getAttribute("id");
                let activeMenuId = theFirstMenuId;

                for (let section of sections) {
                    const sectionTop = section.offsetTop;

                    if (window.pageYOffset >= sectionTop - (window.innerHeight * 1 / 5)) {
                        activeMenuId = section.getAttribute("id");
                    }
                }

                _me.setActiveLeftMenu(`#${activeMenuId}`);
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            }
        },

        handelAnimate: function (hrefTarget) {
            _me.setActiveLeftMenu(hrefTarget);

            $('html, body').stop().animate({
                scrollTop: $(hrefTarget).offset().top
            }, 600, function () {
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            });
        },

        setActiveLeftMenu: function (hrefTarget, theFirstMenuId) {
            const leftMenuList = $(`a.left-menu-item[href*="#"]`);
            const activeLeftMenu = $(`a.left-menu-item[href="${hrefTarget}"]`);

            if (leftMenuList.length) {
                $("a.left-menu-item.active").removeClass(activeClassName);

                activeLeftMenu.addClass(activeClassName);

                const offsetTop = activeLeftMenu.offset().top - $(`a.left-menu-item[href="${leftMenuList[0].getAttribute("href")}"]`).offset().top;

                $('#left-panel-menu').stop().animate({
                    scrollTop: offsetTop
                }, 400);
            }
        }
    };

    return _me;
})(jQuery);

LeftMenuPanel.initialize();