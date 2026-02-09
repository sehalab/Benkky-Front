<template>
    <section class="about-section-three pt-120 pb-120">
        <div class="container">
            <div class="row g-5 g-xxl-0">
                <div class="col-xl-6 image-column">
                    <div class="inner-column">
                        <div class="shape">
                            <!-- <img class="animation__rotate" src="/images/about/about-three-info-dark.png" alt="Shape"> -->
                        </div>
                              <div class="card-section benkky-card-integration">
                                    <h2>Découvrez notre carte premium</h2>
                                    <p>Cliquez sur la carte pour voir l'arrière</p>

                                    <!-- La carte ne bougera plus ! -->
                                    <BenkkyPremiumCard />
                                </div>
                        <p class="text mt-30 wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                            Consumers today increasingly rely on digital channels to research products. We analyze brands and their offerings, engaging with them accordingly.
                        </p>
                        <div class="info mt-50 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <Link class="btn-one-rounded" href="/about">
                                more about <i class="fa-regular fa-arrow-up-right"></i>
                            </Link>
                            <div class="user">
                                <ul>
                                    <li><img src="/images/about/about-two-user1.png" alt="User"></li>
                                    <li><img src="/images/about/about-two-user2.png" alt="User"></li>
                                    <li><img src="/images/about/about-two-user3.png" alt="User"></li>
                                    <li><img src="/images/about/about-two-user4.png" alt="User"></li>
                                </ul>
                                <h6 class="title">10M+ Impact Across the World. <img src="/images/about/about-two-line.png" alt="Line"></h6>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-xl-6 content-column">
                    <div class="inner-column">
                        <!-- Au lieu de votre ancien code, utilisez : -->
                        <PremiumStats />
                    </div>
              </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import SectionTitle from '../ui/SectionTitle.vue';
import BenkkyPremiumCard from '@/components/BenkkyPremiumCard.vue';
import PremiumStats from '@/components/PremiumStats.vue';
import FintechShowcase from '@/components/FintechShowcase.vue';


const count1 = ref(null);
const count2 = ref(null);

const animateCount = (element, target, duration = 2000) => {
    if (!element) return;

    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

onMounted(() => {
    // Initialiser les compteurs
    setTimeout(() => {
        if (count1.value) animateCount(count1.value, 15);
        if (count2.value) animateCount(count2.value, 18);
    }, 500);
});
</script>
<style scoped>
.card-section {
    text-align:left;
    padding: 40px;
    background: linear-gradient(135deg, #06141905 0%, #0F2727 100%);
    border-radius: 20px;
    margin: 60px 0;
}

.card-section h2 {
    color: #e8f4f2;
    margin-bottom: 10px;
}

.card-section p {
    color: #c2e0d8;
    margin-bottom: 30px;
    opacity: 0.8;
}
</style>
