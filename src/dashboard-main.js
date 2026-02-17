import './assets/main.css'
import './assets/css/dashboard-fonts.css'
import './assets/css/dashboard-poppins-inter.css'
import { createApp, nextTick  } from 'vue'
import { createPinia } from 'pinia'
import i18n from './locales/index.js'
import App from './App.vue'
import router from './router/index.js'
import Breadcrumbs from "@/components/Breadcrumb/Breadcrumb.vue";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import 'animate.css';
import FlagIcon from "vue-flag-icon";
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'simplebar/dist/simplebar.min.css';
import 'bootstrap/dist/css/bootstrap.css';



// Vue ApexCharts
import VueApexCharts from "vue3-apexcharts";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as Wi from "oh-vue-icons/icons/wi";
addIcons(...Object.values(Wi));

const app = createApp(App)
const pinia = createPinia()
import '@/assets/scss/style.scss';
import '@/assets/scss/responsive.scss'
app.directive("prism", {
    mounted(el) {
        Prism.highlightElement(el);
    },
    updated(el) {
        Prism.highlightElement(el);
    },
});
app.component("Breadcrumbs", Breadcrumbs);
app.component("VIcon", OhVueIcon);
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(FlagIcon)

const applyTheme = () => {
    const currentTheme = localStorage.getItem('theme-mode') || 'light';
    if (!document.body.classList.contains(currentTheme)) {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(currentTheme);
    }
};

const storedTheme = localStorage.getItem('theme-mode');
if (!storedTheme) {
    localStorage.setItem('theme-mode', 'light');
}

applyTheme();

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const currentTheme = localStorage.getItem('theme-mode') || 'light';
            if (!document.body.classList.contains(currentTheme)) {
                setTimeout(() => {
                    document.body.classList.add(currentTheme);
                }, 0);
            }
        }
    });
});

observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
});

router.afterEach(() => {
    nextTick(() => {
        Prism.highlightAll();
        applyTheme();
    });
});

app.use(createBootstrap())
app.component("apexchart", VueApexCharts);
app.mount('#app')

nextTick(() => {
    applyTheme();
});

// Optionnel : Définir la langue sur l'élément HTML
document.documentElement.lang = i18n.global.locale

