<!-- resources/js/components/HoverLanguageDialog.vue -->
<template>
    <div class="hover-language-dialog" @mouseenter="showDialog = true" @mouseleave="hideDialogWithDelay">
        <!-- Bouton drapeau -->
        <button class="language-trigger" :title="getCurrentLanguageName()">
            {{ getLanguageFlag(currentLocale) }}
            <i class="trigger-icon fa-solid fa-chevron-down"></i>
        </button>

        <!-- Boîte de dialogue flottante -->
        <div v-show="showDialog" class="language-dialog" @mouseenter="cancelHide" @mouseleave="hideDialogWithDelay">
            <div class="dialog-header">
                <span class="dialog-title">LANGUE</span>
            </div>
            <div class="dialog-options">
                <button
                    v-for="locale in availableLocales"
                    :key="locale"
                    @click="switchLanguage(locale)"
                    :class="{ 'active': currentLocale === locale }"
                    class="language-option"
                >
                    <span class="option-flag">{{ getLanguageFlag(locale) }}</span>
                    <span class="option-name">{{ getLanguageName(locale) }}</span>
                    <span v-if="currentLocale === locale" class="option-check">
                        <i class="fa-solid fa-check"></i>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';

const { locale } = useI18n();
const showDialog = ref(false);
let hideTimeout = null;

const currentLocale = computed(() => locale.value);
const availableLocales = ['fr', 'en'];

const getLanguageFlag = (locale) => {
    const flags = {
        'en': '🇬🇧',
        'fr': '🇫🇷'
    };
    return flags[locale] || '🌐';
};

const getLanguageName = (locale) => {
    const names = {
        'en': 'English',
        'fr': 'Français'
    };
    return names[locale] || locale.toUpperCase();
};

const getCurrentLanguageName = () => {
    return getLanguageName(currentLocale.value);
};

const switchLanguage = (newLocale) => {
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
    showDialog.value = false;
    window.location.reload();
};

const hideDialogWithDelay = () => {
    hideTimeout = setTimeout(() => {
        showDialog.value = false;
    }, 300); // Délai de 300ms pour éviter la fermeture brusque
};

const cancelHide = () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
};
</script>

<style scoped>
.hover-language-dialog {
    position: relative;
    display: inline-block;
}

.language-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    color: white;
    padding: 5px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 60px;
}

.language-trigger:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
}

.trigger-icon {
    font-size: 10px;
    transition: transform 0.3s ease;
}

.hover-language-dialog:hover .trigger-icon {
    transform: rotate(180deg);
}

/* Boîte de dialogue flottante */
.language-dialog {
    position: fixed !important; /* Utilisez fixed au lieu de absolute */
    top: 50px !important; /* Ajustez selon la hauteur de votre header */
    left: 50% !important;
    transform: translateX(-50%) !important;
    background: #1a4137;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z-index: 999999 !important;
    min-width: 180px;
    animation: slideDownFade 0.3s ease;
    overflow: hidden;
    border: 1px solid #40d62f3f;
}

@keyframes slideDownFade {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.dialog-header {
    padding: 12px 16px;
    background: #132332;
    border-bottom: 1px solid #f7d702;
    font-weight: 600;
    color: #334155;
    font-size: 14px;
}

.dialog-title {
    display: block;
    text-align: center;
    font-weight: 700;
    color: #f1f5f9;
}
.dialog-options {
    padding: 8px;
}

.language-option {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #334155;
    font-size: 14px;
    transition: all 0.2s ease;
    text-align: left;
    border-radius: 6px;
    position: relative;
}

.language-option:hover {
    background: #b9ac1646;
}

.language-option.active {
    background: #0a234bb9;
    color: white;
}

.language-option.active:hover {
    background: #eb9c2569;
}

.option-flag {
    font-size: 1.5em;
    min-width: 30px;
}

.option-name {
    flex: 1;
    font-weight: 500;
}

.option-check {
    color: inherit;
    font-size: 12px;
}
</style>
