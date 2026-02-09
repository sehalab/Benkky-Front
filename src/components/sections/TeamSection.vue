<template>
    <!-- <section class="team-section-three pb-120">
        <div class="team-three-text">
            <img class="wow slideInLeft"
                 data-wow-delay="1s"
                 data-wow-duration="1500ms"
                 src="/images/shape/team-three-text.png"
                 alt="Team Text">
        </div>
        <div class="container">
            <SectionTitle
                subtitle="team member"
                title="The Visionaries Driving Our Success"
                :show-button="true"
                button-text="Get started"
                button-link="/contact"
            />

            <div class="row g-4">
                <div class="col-sm-6 col-xl-3"
                     v-for="(member, index) in teamMembers"
                     :key="member.id"
                     :class="`wow bounceInUp`"
                     :data-wow-delay="`${index * 200}ms`"
                     data-wow-duration="1500ms">
                    <div class="team-block-three">
                        <div class="inner-box">
                            <div class="image-box">
                                <figure class="image">
                                    <img :src="`/images/team/team-three-image${index + 1}.jpg`" :alt="member.name">
                                </figure>
                                <div class="socials">
                                    <ul>
                                        <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i class="fa-sharp fa-solid fa-x"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-linkedin-in"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="content-box">
                                <h4 class="title">
                                    <Link :href="`/team/${member.id}`">{{ member.name }}</Link>
                                </h4>
                                <p class="sub-title">{{ member.position }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
</template>

<!-- <script setup>
import { Link } from '@inertiajs/vue3';
import SectionTitle from '../ui/SectionTitle.vue';
import { ref, onMounted } from 'vue';

const teamMembers = ref([
    {
        id: 1,
        name: 'Ronald Richards',
        position: 'CEO & Founder',
        image: 'team-three-image1.jpg'
    },
    {
        id: 2,
        name: 'Marvin McKinney',
        position: 'Senior Manager',
        image: 'team-three-image2.jpg'
    },
    {
        id: 3,
        name: 'Kathryn Murphy',
        position: 'Web Designer',
        image: 'team-three-image3.jpg'
    },
    {
        id: 4,
        name: 'Dianne Russell',
        position: 'Junior manager',
        image: 'team-three-image4.jpg'
    }
]);
</script> -->
