'use strict';

var LayoutN88 = (function ($) {
    var _me = {
        initialize: function initialize() {
            _me.initEvent();
            _me.openMenu();
            window.addEventListener("scroll", _me.handleScroll);
        },
        initEvent: function initEvent() {},

        openMenu: function openMenu() {
            $('#btn-menu').click(function () {
                $(this).parent().toggleClass('menu-open');
                $('body').toggleClass('menu-open');
            });
            $('.mobile-left-panel').click(function () {
                $('body').toggleClass('overflow-left-panel');
                $('.left-panel').toggleClass('active');
            });
        },

        handleScroll: function handleScroll() {
            console.log("scrolled!");

            var sections = $("section.info-group");
            var leftMenuItems = $("a.left-menu-item");

            if (sections.length && leftMenuItems.length) {
                var currentId = "";

                sections.forEach(function (section) {
                    var sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 60) {
                        currentId = section.getAttribute("id");
                    }
                });

                leftMenuItems.forEach(function (li) {
                    li.classList.remove("active");
                    if (li.classList.contains(current)) {
                        li.classList.add("active");
                    }
                });

                var activeClassName = "active";
                $("a.left-menu-item.active").removeClass(activeClassName);
                $('a.left-menu-item[href="#' + currentId + ']"').addClass(activeClassName);
            }
        }
    };

    return _me;
})(jQuery);

LayoutN88.initialize();

