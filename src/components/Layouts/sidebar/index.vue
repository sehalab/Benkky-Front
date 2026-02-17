<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onUnmounted, provide, watch } from "vue";
import AppLogo from "@/components/Layouts/sidebar/AppLogo.vue";
import HorizontalNav from "@/components/Layouts/sidebar/HorizontalNav.vue";
import MenuItem from "@/components/Layouts/sidebar/MenuItem.vue";
import SimpleBar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import { MenuList } from "@/data/sidebar/sidebar.js";

const props = defineProps({
  sidebarOpen: Boolean
});

const emit = defineEmits(["update:sidebarOpen", "toggle-sidebar"]);

const menuList = ref(MenuList);
const sidebarOption = ref("vertical-sidebar");
const navScrollTransform = ref({});
const windowWidth = ref(window.innerWidth);
const isMediumScreen = ref(false);
const isMobileScreen = ref(false);

const getSidebarOption = () => {
  if (typeof window === "undefined") return "vertical-sidebar";
  return localStorage.getItem("Ki-Admin-React-Theme-sidebar-option") || "vertical-sidebar";
};

const updateSidebarOption = () => {
  sidebarOption.value = getSidebarOption();
};

const handleStorageChange = (e) => {
  if (e.key === "Ki-Admin-React-Theme-sidebar-option") {
    updateSidebarOption();
  }
};

const updateNavTransform = (transform) => {
  navScrollTransform.value = transform;
};

const checkScreenSizes = () => {
  isMediumScreen.value = windowWidth.value >= 767 && windowWidth.value <= 1199;
  isMobileScreen.value = windowWidth.value < 767;
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  const wasMediumScreen = isMediumScreen.value;
  const wasMobileScreen = isMobileScreen.value;

  checkScreenSizes();

  if (isMediumScreen.value && !wasMediumScreen && !props.sidebarOpen) {
    emit("update:sidebarOpen", true);
  }
  // Auto-close sidebar when leaving medium screen range or entering mobile
  else if ((!isMediumScreen.value && wasMediumScreen && props.sidebarOpen) ||
      (isMobileScreen.value && !wasMobileScreen && props.sidebarOpen)) {
    emit("update:sidebarOpen", false);
  }
};

provide('updateNavTransform', updateNavTransform);

onMounted(() => {
  updateSidebarOption();
  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("sidebar-option-changed", updateSidebarOption);
  window.addEventListener("resize", handleResize);

  checkScreenSizes();

  if (isMediumScreen.value && !props.sidebarOpen) {
    emit("update:sidebarOpen", true);
  }
});

onUnmounted(() => {
  window.removeEventListener("storage", handleStorageChange);
  window.removeEventListener("sidebar-option-changed", updateSidebarOption);
  window.removeEventListener("resize", handleResize);
});

const sidebarClass = computed(() => {
  updateSidebarOption();
  const baseClass = sidebarOption.value;

  let additionalClass = '';

  if (isMobileScreen.value && props.sidebarOpen) {
    additionalClass = 'semi-nav';
  }
  else if (isMediumScreen.value && props.sidebarOpen) {
    additionalClass = 'semi-nav';
  }
  else if (props.sidebarOpen) {
    additionalClass = 'semi-nav';
  }

  return additionalClass ? `${baseClass} ${additionalClass}` : baseClass;
});

const toggleSidebar = () => {
  updateSidebarOption();
  emit("toggle-sidebar");
};

watch(windowWidth, (newWidth) => {
  const newIsMediumScreen = newWidth >= 767 && newWidth <= 1199;
  const newIsMobileScreen = newWidth < 767;

  if (newIsMediumScreen && !props.sidebarOpen) {
    emit("update:sidebarOpen", true);
  } else if ((!newIsMediumScreen && props.sidebarOpen) ||
      (newIsMobileScreen && props.sidebarOpen)) {
    emit("update:sidebarOpen", false);
  }

  isMediumScreen.value = newIsMediumScreen;
  isMobileScreen.value = newIsMobileScreen;
});

</script>

<template>
  <nav :class="sidebarClass">
    <AppLogo
        :sidebarOpen="props.sidebarOpen"
        :isMediumScreen="isMediumScreen"
        :isMobileScreen="isMobileScreen"
        @toggle-sidebar="toggleSidebar"
    />

    <SimpleBar class="app-nav simplebar-scrollable-y">
      <ul class="main-nav p-0 mt-2" :style="navScrollTransform">
        <MenuItem
            v-for="(opt, index) in menuList"
            :key="index"
            :title="opt.title"
            :type="opt.type"
            :path="opt.path"
            :name="opt.name"
            :iconClass="opt.iconClass"
            :badgeCount="opt.badgeCount"
            :links="opt.children"
            :collapseId="opt.collapseId"
        />
      </ul>
    </SimpleBar>
    <HorizontalNav/>
  </nav>
</template>