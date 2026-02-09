<template>
    <div class="search-popup" :class="{ active: isOpen }">
        <span class="search-back-drop" @click="closeSearch"></span>
        <button class="close-search" @click="closeSearch">
            <span class="fa fa-times"></span>
        </button>
        <div class="search-inner">
            <form @submit.prevent="handleSearch">
                <div class="form-group">
                    <input
                        type="search"
                        v-model="searchQuery"
                        placeholder="Search..."
                        required
                        ref="searchInput"
                    >
                    <button type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['close']);

const searchQuery = ref('');
const searchInput = ref(null);

// Focus sur l'input quand le popup s'ouvre
watch(() => props.isOpen, (newVal) => {
    if (newVal && searchInput.value) {
        setTimeout(() => {
            searchInput.value.focus();
        }, 100);
    }
});

const closeSearch = () => {
    searchQuery.value = '';
    emit('close');
};

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.visit('/search', {
            method: 'get',
            data: { q: searchQuery.value }
        });
        closeSearch();
    }
};
</script>
