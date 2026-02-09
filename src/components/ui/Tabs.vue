<template>
    <div class="tabs-component">
        <ul class="nav nav-tabs" id="myTab2" role="tablist">
            <li class="nav-item" v-for="(tab, index) in tabs" :key="tab.id" role="presentation">
                <button class="nav-link"
                        :class="{ active: activeTab === tab.id }"
                        @click="setActiveTab(tab.id)"
                        type="button">
                    {{ tab.label }}
                </button>
            </li>
        </ul>

        <div class="tab-content mt-30">
            <div v-for="tab in tabs"
                 :key="`content-${tab.id}`"
                 class="tab-pane fade"
                 :class="{ 'show active': activeTab === tab.id }"
                 :id="tab.id">
                <div v-html="tab.content"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    },
    defaultTab: {
        type: String,
        default: null
    }
});

const activeTab = ref(props.defaultTab || props.tabs[0]?.id);

const setActiveTab = (tabId) => {
    activeTab.value = tabId;
};
</script>
