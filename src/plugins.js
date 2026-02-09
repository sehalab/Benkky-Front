// Initialiser tous les plugins du template
export function initTemplatePlugins() {
    // Initialiser jQuery si nécessaire
    if (typeof $ !== 'undefined') {
        // Code jQuery du template
        $(document).ready(function() {
            // Mobile Menu Toggle
            $('.mobile-nav-toggler').on('click', function() {
                $('.mobile-menu').toggleClass('open');
                $('body').toggleClass('mobile-menu-visible');
            });

            // Close Mobile Menu
            $('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function() {
                $('.mobile-menu').removeClass('open');
                $('body').removeClass('mobile-menu-visible');
            });

            // Search Popup
            $('.search-btn').on('click', function() {
                $('.search-popup').addClass('active');
            });

            $('.search-popup .close-search').on('click', function() {
                $('.search-popup').removeClass('active');
            });

            // Sticky Header
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 100) {
                    $('.sticky-header').addClass('sticky');
                } else {
                    $('.sticky-header').removeClass('sticky');
                }
            });

            // Counter Animation
            $('.count-text').each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });

            // Smooth Scroll
            $('a[href*="#"]:not([href="#"])').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                    && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 80
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    }

    // Initialiser WOW.js
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Initialiser Fancybox
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // Options
        });
    }

    // Initialiser Slick Slider
    if (typeof $ !== 'undefined' && $.fn.slick) {
        $('.brand-slider').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }
}

// Exécuter l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initTemplatePlugins);
