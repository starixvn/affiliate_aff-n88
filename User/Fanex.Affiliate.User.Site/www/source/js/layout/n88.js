var LayoutN88 = (function ($) {
    var _me = {
        initialize: function () {
            _me.initEvent();
            _me.openMenu();
            window.addEventListener("scroll", _me.handleScroll);
        },
        initEvent: function () {

        },

        openMenu: function () {
            $('#btn-menu').click(function () {
                $(this).parent().toggleClass('menu-open');
                $('body').toggleClass('menu-open');
            })
            $('.mobile-left-panel').click(function () {
                $('body').toggleClass('overflow-left-panel');
                $('.left-panel').toggleClass('active');
            })
        },

        handleScroll: function () {
            console.log("scrolled!");

            const sections = $("section.info-group");
            const leftMenuItems = $("a.left-menu-item");

            if (sections.length && leftMenuItems.length) {
                let currentId = "";

                sections.forEach((section) => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 60) {
                        currentId = section.getAttribute("id");
                    }
                });

                leftMenuItems.forEach((li) => {
                    li.classList.remove("active");
                    if (li.classList.contains(current)) {
                        li.classList.add("active");
                    }
                });

                var activeClassName = "active";
                $("a.left-menu-item.active").removeClass(activeClassName);
                $(`a.left-menu-item[href="#${currentId}]"`).addClass(activeClassName);
            }
        }
    }

    return _me;
})(jQuery);

LayoutN88.initialize();