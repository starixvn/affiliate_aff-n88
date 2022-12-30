var LeftMenuPanel = (function ($) {
    const activeClassName = "active";

    var _me = {
        initialize: function () {
            _me.initEvent();
            window.addEventListener("load", _me.handleActiveLeftMenuByScroll);
        },

        initEvent: function () {
            $('.mobile-left-panel').click(function (e) {
                e.stopPropagation();

                $('body').addClass('overflow-left-panel');
                $('.left-panel').addClass('active');

            })

            $(document).on('click', '.overflow-left-panel', function (e) {
                $('body.overflow-left-panel').removeClass('overflow-left-panel');
                $('.left-panel').removeClass('active');
            });

            $('a.left-menu-item').bind('click', function (e) {
                window.removeEventListener("scroll", _me.handleActiveLeftMenuByScroll);
                e.preventDefault();

                var hrefTarget = $(this).attr("href");

                _me.handelAnimate(hrefTarget);
            });
        },

        handleCloseLeftMenu: function () {
            console.log("handleCloseLeftMenu");

            $('body.overflow-left-panel').removeClass('overflow-left-panel');
            $('.left-panel').removeClass('active');

            window.removeEventListener("click", _me.handleCloseLeftMenu);
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

        setActiveLeftMenu: function (hrefTarget) {
            const activeLeftMenu = $(`a.left-menu-item[href="${hrefTarget}"]`);

            $("a.left-menu-item.active").removeClass(activeClassName);

            activeLeftMenu.addClass(activeClassName);

            const offsetTop = activeLeftMenu.offset().top - $(`a.left-menu-item[href="#ResponsibilitiesOfTheAffiliate"]`).offset().top;

            $('#left-panel-menu').stop().animate({
                scrollTop: (offsetTop > $('#left-panel-menu').height() / 3) ? offsetTop : 0
            }, 400);
        }
    };

    return _me;
})(jQuery);

LeftMenuPanel.initialize();