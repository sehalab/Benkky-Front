<template>
    <div class="sec-title mb-50">
        <h6 class="sub-title wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
            {{ subtitle }}
        </h6>
        <div class="flex-content">
            <h2 class="title wow splt-txt" :data-splitting="split ? 'true' : null">
                {{ title }}
            </h2>
            <Link v-if="showButton"
                  class="btn-one-rounded wow fadeInUp"
                  data-wow-delay="200ms"
                  data-wow-duration="1500ms"
                  :href="buttonLink">
                {{ buttonText }} <i class="fa-regular fa-angle-right"></i>
            </Link>
        </div>
    </div>
</template>

<script setup>

defineProps({
    subtitle: String,
    title: String,
    split: {
        type: Boolean,
        default: false
    },
    showButton: {
        type: Boolean,
        default: false
    },
    buttonText: {
        type: String,
        default: 'Learn More'
    },
    buttonLink: {
        type: String,
        default: '#'
    }
});
</script>
