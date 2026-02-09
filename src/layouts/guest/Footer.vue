<template>
    <footer class="main-footer footer-style-three pt-100">
        <div class="container">
            <!-- CTA Section -->
            <div class="footer-cta">
                <div class="sec-title">
                    <h2 class="title wow splt-txt" data-splitting>Looking For Professional business consultant ?</h2>
                    <p class="text wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                        At vero eos et accusamus et iusto odio dignissimos ducimus quiy blanditiise praesentium voluptatum deleniti atque corrupti dolorese
                    </p>
                </div>
                <div class="btn-wrp wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <Link href="/contact" class="cta-btn">
                        {{ $t('buttons.get_started_free') }} <i class="fa-regular fa-arrow-up-right"></i>
                    </Link>
                    <p class="text">No credit card required</p>
                </div>
                <div class="bg-shape">
                    <img src="/images/shape/cta-line.png" alt="Shape">
                </div>
                <div class="arry">
                    <img class="animation__arryLeftRight" src="/images/shape/cta-arry.png" alt="Arrow">
                </div>
            </div>

            <!-- Widgets Section -->
            <div class="widgets-section">
                <div class="row g-5 g-xl-0">
                    <div class="col-lg-4 footer-column">
                        <div class="footer-widget about-widget">
                            <div class="logo">
                                <Link href="/">
                                    <img src="/images/logo_benkky.png" alt="Logo">
                                </Link>
                            </div>
                            <div class="widget-content">
                                <p class="text">At vero eos et accusamus iusto odio dignissimos ducimus blanditiise</p>
                                <div class="input-feild">
                                    <input type="text" placeholder="Email Address">
                                    <button @click="subscribeNewsletter">
                                        <i class="fa-regular fa-arrow-up-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="row g-4 g-xl-0">
                            <!-- Resource Links -->
                            <div class="col-sm-6 col-xl-3 footer-column">
                                <div class="footer-widget links-widget">
                                    <h4 class="widget-title">Resource</h4>
                                    <div class="widget-content">
                                        <ul class="user-links">
                                            <li><Link href="/products">{{ $t('navigation.products') }}</Link></li>
                                            <li><Link href="/services">{{ $t('navigation.services') }}</Link></li>
                                            <li><Link href="/about">{{ $t('navigation.about_us') }}</Link></li>
                                            <li><Link href="/benefits">Benefits</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Quick Links -->
                            <div class="col-sm-6 col-xl-3 footer-column">
                                <div class="footer-widget links-widget">
                                    <h4 class="widget-title">Quick Link</h4>
                                    <div class="widget-content">
                                        <ul class="user-links">
                                            <li><Link href="/features">Features</Link></li>
                                            <li><Link href="/pricing">Pricing Plan</Link></li>
                                            <li><Link href="/programs">Best Program</Link></li>
                                            <li><Link href="/press">Press Kit</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Company Links -->
                            <div class="col-sm-6 col-xl-3 footer-column">
                                <div class="footer-widget links-widget">
                                    <h4 class="widget-title">Company</h4>
                                    <div class="widget-content">
                                        <ul class="user-links">
                                            <li><Link href="/about">{{ $t('navigation.about') }}</Link></li>
                                            <li><Link href="/team">{{ $t('navigation.team') }}</Link></li>
                                            <!-- <li><Link href="/reviews">Reviews</Link></li>
                                            <li><Link href="/news">Latest News</Link></li> -->
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Contact Info -->
                            <div class="col-sm-6 col-xl-3 footer-column">
                                <div class="footer-widget links-widget contact-widget">
                                    <h4 class="widget-title">Contact</h4>
                                    <div class="widget-content">
                                        <ul class="user-links">
                                            <li>
                                                <i class="fa-light fa-location-dot"></i>
                                                <span style="color: antiquewhite;">55 Main Street, 2nd block Melbourne, Australia</span>
                                            </li>
                                            <li>
                                                <i class="fa-light fa-envelope"></i>
                                                <a href="mailto:info@benkky.com">info@benkky.com</a>
                                            </li>
                                            <li>
                                                <i class="fa-light fa-phone-flip"></i>
                                                <a href="tel:+0001234455">+(243) 978 828 882</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p class="copyright-text">
                    {{ t('footer.copyright', { year: 2026 }) }}
                    <!-- Copyright ©{{ currentYear }}, <Link href="/">Consultez</Link> All Rights Reserved -->
                </p>
                <ul class="footer-nav">
                    <li><Link href="/faq">Faqs</Link></li>
                    <li><Link href="/settings">{{ t('navigation.setting') }}</Link></li>
                    <li><Link href="/privacy">{{ t('navigation.privacy') }}</Link></li>
                    <li><Link href="/contact">{{ t('navigation.contact') }}</Link></li>
                </ul>
                <button class="goTop-btn" @click="scrollToTop">
                    <i class="fa-solid fa-angles-up"></i>
                    <i class="fa-solid fa-angles-up"></i>
                </button>
            </div>
        </div>

        <!-- Background Shapes -->
        <div class="sec-shape">
            <img class="animation__rotateY" src="/images/shape/hero_one.png" alt="Shape">
        </div>
        <div class="box-shape">
            <div class="box1 wow slideInUp" data-wow-delay="200ms" data-wow-duration="1500ms"></div>
            <div class="box2 wow slideInLeft" data-wow-delay="200ms" data-wow-duration="1500ms"></div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const currentYear = ref(new Date().getFullYear());

const subscribeNewsletter = () => {
    const emailInput = document.querySelector('.input-feild input');
    const email = emailInput.value;

    if (email) {
        // Ici, vous pouvez ajouter la logique d'abonnement à la newsletter
        console.log('Subscribing email:', email);
        emailInput.value = '';
        alert('Thank you for subscribing!');
    }
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>
