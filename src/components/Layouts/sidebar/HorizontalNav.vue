<script setup>
import {ref, computed, onMounted, onBeforeUnmount, inject, watch} from "vue";
import {PhCaretDoubleLeft, PhCaretDoubleRight} from "@phosphor-icons/vue";

const scrollPosition = ref(0);
const size = 150;

const getLayout = () => {
  if (typeof window === "undefined") return "ltr";
  return localStorage.getItem("Ki-Admin-React-Theme-layout-option") || "ltr";
};

const getSidebarOption = () => {
  if (typeof window === "undefined") return "vertical-sidebar";
  return localStorage.getItem("Ki-Admin-React-Theme-sidebar-option") || "vertical-sidebar";
};

const layout = ref(getLayout());
const sidebarOption = ref(getSidebarOption());

const handleStorageChange = (event) => {
  if (event.key === "Ki-Admin-React-Theme-layout-option") {
    layout.value = event.newValue || "ltr";
  }
  if (event.key === "Ki-Admin-React-Theme-sidebar-option") {
    sidebarOption.value = event.newValue || "vertical-sidebar";
  }
};

const updateNavTransform = inject('updateNavTransform', null);

onMounted(() => {
  window.addEventListener("storage", handleStorageChange);

  const syncInterval = setInterval(() => {
    const currentLayout = getLayout();
    if (currentLayout !== layout.value) layout.value = currentLayout;

    const currentSidebar = getSidebarOption();
    if (currentSidebar !== sidebarOption.value) sidebarOption.value = currentSidebar;
  }, 200);

  onBeforeUnmount(() => {
    clearInterval(syncInterval);
    window.removeEventListener("storage", handleStorageChange);
  });
});

const isRTL = computed(() => layout.value === "rtl");

const navTransform = computed(() => {
  if (isRTL.value) {
    return {
      marginRight: `${scrollPosition.value}px`,
      marginLeft: '0'
    };
  } else {
    return {
      marginLeft: `-${scrollPosition.value}px`,
      marginRight: '0'
    };
  }
});

watch(navTransform, (newTransform) => {
  if (updateNavTransform) {
    updateNavTransform(newTransform);
  }
});

const scrollNav = (direction) => {
  const maxOffset = 1000;

  let newOffset;

  if (isRTL.value) {
    if (direction === "right") {
      newOffset = Math.max(scrollPosition.value - size, -maxOffset);
    } else {
      newOffset = Math.min(scrollPosition.value + size, 0);
    }
  } else {
    if (direction === "left") {
      newOffset = Math.max(scrollPosition.value - size, 0);
    } else {
      newOffset = Math.min(scrollPosition.value + size, maxOffset);
    }
  }

  scrollPosition.value = newOffset;
};
</script>

<template>
  <div v-if="sidebarOption === 'horizontal-sidebar'" class="menu-navs">
    <span
        class="menu-previous"
        @click="scrollNav(isRTL ? 'right' : 'left')"
        :style="{
        transform: isRTL ? 'rotate(180deg)' : 'none',
        float: isRTL ? 'right' : 'left'
      }"
    >
      <PhCaretDoubleLeft :size="32"/>
    </span>

    <span
        class="menu-next"
        @click="scrollNav(isRTL ? 'left' : 'right')"
        :style="{
        transform: isRTL ? 'rotate(180deg)' : 'none',
        float: isRTL ? 'left' : 'right'
      }"
    >
      <PhCaretDoubleRight :size="24"/>
    </span>
  </div>
</template>