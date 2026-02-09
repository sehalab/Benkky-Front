<template>
    <section class="consult-section pt-120 pb-120" :style="backgroundStyle">
        <div class="sec-shape">
            <img class="animation__rotate" src="/images/shape/consult-shape.png" alt="Shape">
        </div>
        <div class="container">
            <div class="sec-title center">
                <h6 class="sub-title wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Consulting</h6>
                <h2 class="title text-white wow splt-txt" data-splitting>The Future of Corporate and Business Solutions</h2>
                <div class="btn-wrp mt-30">
                    <Link class="btn-two-rounded wow fadeInUp"
                          data-wow-delay="200ms"
                          data-wow-duration="1500ms"
                          href="/about">
                        Discover More <i class="fa-regular fa-arrow-up-right"></i>
                    </Link>
                    <Link class="btn-one-rounded wow fadeInUp"
                          data-wow-delay="400ms"
                          data-wow-duration="1500ms"
                          href="/contact">
                        Get A Quote <i class="fa-regular fa-arrow-up-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { ref, onMounted } from 'vue';

const backgroundStyle = computed(() => ({
    backgroundImage: `url('/images/bg/consult-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}));
</script>
