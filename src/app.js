import "./bootstrap";
import "../css/app.css";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";

import i18nPlugin, { setLocale } from "./i18n";

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "bootstrap";

createInertiaApp({
    title: (title) => {
        const appName = "Benkky";
        return title ? `${title} - ${appName}` : appName;
    },

    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.vue");
        const importPage = pages[`./pages/${name}.vue`];

        if (!importPage) {
            return import("./pages/NotFound.vue");
        }

        return importPage();
    },

    setup({ el, App, props, plugin }) {
        const app = createApp({
            render: () => h(App, props),
        });

        const pinia = createPinia();
        app.use(pinia);
        app.use(plugin);

        app.use(i18nPlugin);

        // Initialiser le store auth
        const authStore = useAuthStore();
        authStore.init();

        app.mount(el);

        return app;
    },

    progress: {
        color: "#3b82f6",
        showSpinner: true,
    },
});
