<template>
    <section class="testimonial-section-three">
        <div class="sec-wrp">
            <div class="sec-shape">
                <img class="animation__rotate" src="/images/shape/dual-circle420.png" alt="Shape">
            </div>
            <div class="container">
                <div class="outer-box">
                    <div class="row g-5">
                        <div class="col-xl-7 order-2 order-xl-1">
                            <div class="sec-title mb-30">
                                <h6 class="sub-title wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Testimonial</h6>
                                <div class="flex-content">
                                    <h2 class="title text-white wow splt-txt" data-splitting>
                                        What our customers say <span class="font-weight-300">about us</span>
                                    </h2>
                                    <div class="btn-wrp">
                                        <button class="testimonial-prev-three" @click="swiperInstance?.slidePrev()">
                                            <i class="fa-regular fa-angle-left"></i>
                                        </button>
                                        <button class="testimonial-next-three" @click="swiperInstance?.slideNext()">
                                            <i class="fa-regular fa-angle-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <swiper
                                ref="testimonialSwiper"
                                :modules="modules"
                                :slides-per-view="1"
                                :space-between="30"
                                :loop="true"
                                :autoplay="{
                                    delay: 5000,
                                    disableOnInteraction: false
                                }"
                                :pagination="{
                                    clickable: true,
                                    el: '.swiper-pagination'
                                }"
                                @swiper="onSwiper"
                                class="testimonial-slider-three"
                            >
                                <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
                                    <div class="testimonial-block-three">
                                        <p class="text">{{ testimonial.text }}</p>
                                        <div class="info">
                                            <h4 class="title">{{ testimonial.name }}<span>{{ testimonial.position }}</span></h4>
                                            <img src="/images/icon/testimonial-three-icon.png" alt="Icon">
                                        </div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>

                        <div class="col-xl-5 order-1 order-xl-2 image-column">
                            <div class="inner-column">
                                <figure class="image">
                                    <img src="/images/testimonial/testimonial-three-image.png" alt="Testimonial Image">
                                    <div class="icon">
                                        <svg width="33" height="25" viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>
                                    </div>
                                    <h3 class="title">"Awesome Work"</h3>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Autoplay, Pagination];
const testimonialSwiper = ref(null);
const swiperInstance = ref(null);

const testimonials = ref([
    {
        text: 'Ascend the mountain not to plant your flag, but to embrace the challenge, savour the journey, and marvel at the view. Climb to experience the world, not for the world to notice you. This is why they stand out journey, and marvel at the view experience the world, not to notice',
        name: 'Robert J. Hare/',
        position: 'Business Owner'
    },
    {
        text: 'Ascend the mountain not to plant your flag, but to embrace the challenge, savour the journey, and marvel at the view. Climb to experience the world, not for the world to notice you. This is why they stand out journey, and marvel at the view experience the world, not to notice',
        name: 'Kathryn Murphy/',
        position: 'Web Designer'
    },
    {
        text: 'Ascend the mountain not to plant your flag, but to embrace the challenge, savour the journey, and marvel at the view. Climb to experience the world, not for the world to notice you. This is why they stand out journey, and marvel at the view experience the world, not to notice',
        name: 'Dianne Russell/',
        position: 'Junior manager'
    }
]);

const onSwiper = (swiper) => {
    swiperInstance.value = swiper;
};
</script>
