<template>
    <section class="banner-section-three">
        <div class="container">
            <div class="row g-0 align-items-end">
                <div class="col-xl-8 content-column">
                    <div class="inner-column">
                        <h1 class="title wow splt-txt" data-splitting>
                            <span class="font-weight-400 d-block">{{ $t('app.name') }}</span>
                            {{ $t('app.tagline') }}
                        </h1>
                        <p class="text wow fadeInLeft" data-wow-delay="00ms" data-wow-duration="1500ms">
                            {{ $t('app.description') }}
                        </p>
                        <div class="btn-wrp">
                            <Link class="btn-one-rounded wow fadeInLeft"
                                  data-wow-delay="200ms"
                                  data-wow-duration="1500ms"
                                  href="/auth">
                                {{ $t('buttons.get_started') }} <i class="fa-regular fa-angle-right"></i>
                            </Link>
                            <a href="https://www.youtube.com/watch?v=Lplq8RjQ0zU"
                               data-fancybox="gallery"
                               data-caption=""
                               class="video-btn wow fadeInLeft playbtnanim"
                               data-wow-delay="400ms"
                               data-wow-duration="1500ms">
                                <i class="fa-sharp fa-solid fa-play"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-image tm-gsap-img-parallax">
                <img src="/images/banner/banner-three-image31.png" alt="Banner Image">
            </div>
            <div class="arry">
                <img class="animation__arryLeftRight" src="/images/shape/banner-arry.png" alt="Arrow">
            </div>
        </div>
    </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { onMounted } from 'vue';


onMounted(() => {
    // Initialiser les animations GSAP si nécessaire
    if (window.gsap) {
        // GSAP animations
    }
});
</script>
