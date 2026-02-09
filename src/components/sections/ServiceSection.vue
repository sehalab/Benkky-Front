<template>
    <section class="service-section-two pt-120 pb-120">
        <div class="container">
            <SectionTitle
                subtitle="Services"
                title="Empower your business to succeed & grow."
                :show-button="true"
                button-text="more Services"
                button-link="/services"
            />

            <!-- <div class="outer-box">
                <div class="row g-0">
                    <div class="col-md-6 col-xl-4" v-for="(service, index) in services" :key="index"
                         :class="`wow fadeInUp`"
                         :data-wow-delay="`${index * 200}ms`"
                         data-wow-duration="1500ms">
                        <div class="service-block-two" :class="{ 'border-0': index === 2 }">
                            <div class="inner-box">
                                <div class="icon" v-html="service.icon"></div>
                                <div class="content-box">
                                    <h4 class="title">{{ service.title }}</h4>
                                    <p class="text">{{ service.description }}</p>
                                    <Link class="btn-two-rounded" :href="service.link">
                                        learn more
                                    </Link>
                                </div>
                                <div class="block-bg">
                                    <img src="/images/shape/service-block-shape.png" alt="Background">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import SectionTitle from '../ui/SectionTitle.vue';
import { ref } from 'vue';

const services = ref([
    {
        title: 'Business Planning',
        description: 'Lorem is Ipsum is simply is design iomyi is text Lorem Ipsum is simply is our busi designer Lorem is Ipsum is',
        icon: `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>`,
        link: '/service-details'
    },
    {
        title: 'Marketing & Branding',
        description: 'Lorem is Ipsum is simply is design iomyi is text Lorem Ipsum is simply is our busi designer Lorem is Ipsum is',
        icon: `<svg width="94" height="96" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>`,
        link: '/service-details'
    },
    {
        title: 'Sales Consulting',
        description: 'Lorem is Ipsum is simply is design iomyi is text Lorem Ipsum is simply is our busi designer Lorem is Ipsum is',
        icon: `<svg width="80" height="96" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>`,
        link: '/service-details'
    }
]);
</script>
