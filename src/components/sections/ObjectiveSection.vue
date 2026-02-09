<template>
    <section class="objective-section pt-120 pb-80">
        <div class="container">
            <SectionTitle
                subtitle="Notre ADN"
                title="Redéfinir la finance pour l'Afrique digitale"
                :show-button="true"
                button-text="Rejoignez-nous"
                button-link="/auth/register"
            />

            <div class="row g-4">
                <div class="col-xl-6 wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div class="objective-block">
                        <h4 class="title mb-40">La révolution financière commence ici</h4>
                        <div class="outer-box">
                            <div class="item" v-for="item in objectiveItems" :key="item.id">
                                <div class="icon">
                                    <img :src="`/images/icon/objective-icon${item.id}-dark.png`" :alt="item.title">
                                </div>
                                <h5>{{ item.title }}</h5>
                            </div>
                        </div>
                        <div class="info">
                            <div class="icon">
                                <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.5 0C6.768 0 0.5 6.268 0.5 14C0.5 21.732 6.768 28 14.5 28C22.232 28 28.5 21.732 28.5 14C28.5 6.268 22.232 0 14.5 0Z" fill="#2A8C82"/>
                                        <path d="M20.5 10H8.5C7.94772 10 7.5 10.4477 7.5 11V17C7.5 17.5523 7.94772 18 8.5 18H20.5C21.0523 18 21.5 17.5523 21.5 17V11C21.5 10.4477 21.0523 10 20.5 10Z" fill="white"/>
                                            <path d="M12.5 13C12.7761 13 13.5 12.7761 13.5 12.5C13.5 12.2239 13.2761 12 13.5 12C13.2239 12 12.5 12.2239 12.5 12.5C12.5 12.7761 12.2239 13 12.5 13Z" fill="#2A8C82"/>
                                                <path d="M16.5 13C16.7761 13 17.5 12.7761 17.5 12.5C17.5 12.2239 17.2761 12 17.5 12C17.2239 12 16.5 12.2239 16.5 12.5C16.5 12.7761 16.2239 13 16.5 13Z" fill="#2A8C82"/>
                                            <path d="M14.5 15C15.3284 15 16.5 14.5523 16.5 14C16.5 13.4477 15.3284 13 14.5 13C13.6716 13 12.5 13.4477 12.5 14C12.5 14.5523 13.6716 15 14.5 15Z" fill="#2A8C82"/>
                                        <path d="M14.5 16C13.6716 16 12.5 16.4477 12.5 17C12.5 17.5523 13.6716 18 14.5 18C15.3284 18 16.5 17.5523 16.5 17C16.5 16.4477 15.3284 16 14.5 16Z" fill="#2A8C82"/>
                                    <path d="M10.5 9H18.5C19.0523 9 19.5 9.44772 19.5 10V11H9.5V10C9.5 9.44772 9.94772 9 10.5 9Z" fill="#2A8C82"/>
                                </svg>
                            </div>
                           <p class="text">Questions sur vos finances ? <Link href="/contact">Discutons-en</Link></p>
                        </div>
                        <div class="triangle">
                            <img src="/images/shape/objective-triangle.png" alt="Triangle">
                        </div>
                    </div>
                </div>

                <div class="col-xl-6 content-column wow fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div class="inner-column">
                        <Tabs :tabs="tabs" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import SectionTitle from '../ui/SectionTitle.vue';
import Tabs from '../ui/Tabs.vue';
import { ref } from 'vue';

const objectiveItems = ref([
    { id: 1, title: 'Carte en 2min' },
    { id: 2, title: 'Recharge instant' },
    { id: 3, title: 'Sécurité max' }
]);

const tabs = ref([
    {
        id: 'about',
        label: 'Nous',
        content: `
            <div class="content">
                <figure class="image">
                    <img src="/images/about/about-three-image2.jpg" alt="Image">
                    <a class="btn-play playbtnanim" href=""
                        data-fancybox="gallery" data-caption="">
                        <i class="icon fa-solid fa-play"></i>
                    </a>
                </figure>
                <ul>
                    <li>Technology Growth</li>
                    <li>Customer Oriented Program</li>
                    <li>Dedicated Team member</li>
                    <li>Customer Oriented Program</li>
                </ul>
            </div>
            <div class="progress mt-30">
                <div class="progress-single">
                    <h5 class="progress-title">Project Score <span>75%</span></h5>
                    <div class="bar">
                        <div class="bar-inner count-bar" data-percent="80%"></div>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'mission',
        label: 'Mission',
        content: `
            <div class="content">
                <figure class="image">
                    <img src="/images/about/about-three-image2.jpg" alt="Image">
                    <a class="btn-play playbtnanim" href=""
                        data-fancybox="gallery" data-caption="">
                        <i class="icon fa-solid fa-play"></i>
                    </a>
                </figure>
                <ul>
                    <li>Technology Growth</li>
                    <li>Customer Oriented Program</li>
                    <li>Dedicated Team member</li>
                    <li>Customer Oriented Program</li>
                </ul>
            </div>
            <div class="progress mt-30">
                <div class="progress-single">
                    <h5 class="progress-title">Project Score <span>75%</span></h5>
                    <div class="bar">
                        <div class="bar-inner count-bar" data-percent="80%"></div>
                    </div>
                </div>
            </div>
        `

    },
    {
        id: 'vision',
        label: 'Vision',
        content: `
            <div class="content">
                <figure class="image">
                    <img src="/images/about/about-three-image2.jpg" alt="Image">
                    <a class="btn-play playbtnanim" href=""
                        data-fancybox="gallery" data-caption="">
                        <i class="icon fa-solid fa-play"></i>
                    </a>
                </figure>
                <ul>
                    <li>Technology Growth</li>
                    <li>Customer Oriented Program</li>
                    <li>Dedicated Team member</li>
                    <li>Customer Oriented Program</li>
                </ul>
            </div>
            <div class="progress mt-30">
                <div class="progress-single">
                    <h5 class="progress-title">Project Score <span>75%</span></h5>
                    <div class="bar">
                        <div class="bar-inner count-bar" data-percent="80%"></div>
                    </div>
                </div>
            </div>
        `

    }
]);
</script>
