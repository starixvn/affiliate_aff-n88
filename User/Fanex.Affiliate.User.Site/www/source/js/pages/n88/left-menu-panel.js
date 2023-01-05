var LeftMenuPanel = (function ($) {
    const activeClassName = "active";
    let isOpenLeftMenuMobile = false;
    let lastScreenTop = 0;

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
                let currentScreenTop = lastScreenTop;

                for (let section of sections) {
                    const sectionTop = section.offsetTop;

                    if (window.pageYOffset >= sectionTop - (window.innerHeight * 1 / 5)) {
                        activeMenuId = section.getAttribute("id");
                        currentScreenTop = sectionTop;
                    }
                }

                _me.setActiveLeftMenu(`#${activeMenuId}`, currentScreenTop);
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            }
        },

        handelAnimate: function (hrefTarget) {
            _me.setActiveLeftMenu(hrefTarget, lastScreenTop);

            $('html, body').stop().animate({
                scrollTop: $(hrefTarget).offset().top
            }, 600, function () {
                window.addEventListener("scroll", _me.handleActiveLeftMenuByScroll);
            });
        },

        setActiveLeftMenu: function (hrefTarget, currentScreenTop) {
            const leftMenuList = $(`a.left-menu-item[href*="#"]`);
            const activeLeftMenu = $(`a.left-menu-item[href="${hrefTarget}"]`);
            const leftMenuNumbers = leftMenuList.length;

            if (leftMenuNumbers) {
                $("a.left-menu-item.active").removeClass(activeClassName);
                activeLeftMenu.addClass(activeClassName);

                const activeIndex = leftMenuList.index(activeLeftMenu);
                const maxScrollTop = ($('#left-panel-nav').outerHeight() + 24) - $('#left-panel-menu').outerHeight();
                const currentTop = $('#left-panel-menu').scrollTop();
                const newTop = (activeIndex / leftMenuNumbers) * maxScrollTop;

                if (!((currentScreenTop >= lastScreenTop && newTop <= currentTop) || (currentScreenTop <= lastScreenTop && newTop >= currentTop))) {
                    $('#left-panel-menu').stop().animate({
                        scrollTop: (activeIndex / leftMenuNumbers) * maxScrollTop
                    }, 400);
                }

                lastScreenTop = currentScreenTop;
            }
        }
    };

    return _me;
})(jQuery);

LeftMenuPanel.initialize();