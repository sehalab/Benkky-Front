<template>
    <component :is="componentType"
               :href="href"
               :type="type"
               :class="buttonClasses"
               @click="handleClick">
        <slot></slot>
        <i v-if="icon" :class="icon"></i>
    </component>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    href: String,
    type: {
        type: String,
        default: 'button'
    },
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    icon: String,
    rounded: {
        type: Boolean,
        default: true
    },
    fullWidth: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['click']);

const componentType = computed(() => props.href ? Link : 'button');

const buttonClasses = computed(() => ({
    'btn': true,
    'btn-one-rounded': props.variant === 'primary' && props.rounded,
    'btn-two-rounded': props.variant === 'secondary' && props.rounded,
    'btn-outline': props.variant === 'outline',
    'btn-lg': props.size === 'lg',
    'btn-sm': props.size === 'sm',
    'w-100': props.fullWidth
}));

const handleClick = (event) => {
    emit('click', event);
};
</script>
