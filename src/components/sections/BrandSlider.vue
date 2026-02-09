<template>
    <div class="brand-section-two pb-120">
        <div class="container">
            <div class="outer-box">
                <swiper
                    :modules="modules"
                    :slides-per-view="5"
                    :space-between="30"
                    :loop="true"
                    :autoplay="{
                        delay: 3000,
                        disableOnInteraction: false
                    }"
                    :breakpoints="{
                        320: { slidesPerView: 2 },
                        576: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1200: { slidesPerView: 5 }
                    }"
                    class="brand-slider"
                >
                    <swiper-slide v-for="(brand, index) in brands" :key="index">
                        <div class="brand-block">
                            <a href="#">
                                <img :src="`/images/brand/brand-two-image${(index % 5) + 1}.png`" :alt="`Brand ${index + 1}`">
                            </a>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ref, onMounted } from 'vue';

const modules = [Autoplay];

const brands = ref(Array.from({ length: 10 }, (_, i) => i + 1));
</script>
