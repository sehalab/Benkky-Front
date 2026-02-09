<template>
    <MainLayout hideHeader hideFooter hidePreloader>
        <div :class="['auth-page premium-auth', isDarkTheme ? 'dark-fintech' : 'light-fintech']">
            <div class="auth-background">
                <div class="bg-shape shape-1"></div>
                <div class="bg-shape shape-2"></div>
                <div class="bg-shape shape-3"></div>
                <div class="bg-shape shape-4"></div>
                <div class="grid-pattern"></div>
            </div>

            <div class="auth-container premium-container" :class="isDarkTheme ? 'dark-container' : 'light-container'">
                <div class="brand-panel" :class="isDarkTheme ? 'dark-panel' : 'light-panel'">
                    <div class="brand-content">
                        <div class="premium-logo">
                            <Link href="/">
                                <div class="logo-wrapper">
                                    <img src="/images/pic_sign_in.png" :alt="$t('app.name')" class="arry">
                                    <div class="logo-glow"></div>
                                    <div class="logo-pulse"></div>
                                </div>
                            </Link>
                        </div>

                        <div class="testimonial-card" :class="isDarkTheme ? 'dark-testimonial' : 'light-testimonial'">
                            <div class="testimonial-header">
                                <div class="rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                </div>
                                <i class="fa-solid fa-quote-right quote-icon"></i>
                            </div>
                            <div class="testimonial-content">
                                <p>"{{ $t('auth.testimonial.quote') }}"</p>
                            </div>
                            <div class="testimonial-author">
                                <img src="/images/pic_sign_in.png" alt="Client" class="author-avatar">
                                <div class="author-info">
                                    <h5>{{ $t('auth.testimonial.name') }}</h5>
                                    <span>{{ $t('auth.testimonial.position') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="forms-panel" :class="isDarkTheme ? 'dark-forms' : 'light-forms'">
                    <div class="panel-header">
                        <div class="theme-toggle">
                            <button class="theme-btn" @click="toggleTheme">
                                <i :class="isDarkTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                            </button>
                        </div>
                        <LanguageSwitcher />
                    </div>

                    <div class="forms-container">
                        <div class="forms-header">
                            <div class="header-glow"></div>
                            <h2 class="forms-title">
                                <span class="title-text">
                                    <span v-if="activeTab === 'login'">{{ $t('auth.login.welcome_back') }}</span>
                                    <span v-else>{{ $t('auth.register.join_us') }}</span>
                                </span>
                                <span class="title-badge">
                                    <i class="fa-solid fa-bolt"></i>
                                    {{ $t('premium') }}
                                </span>
                            </h2>
                            <p class="forms-subtitle">
                                <span v-if="activeTab === 'login'">{{ $t('auth.login.subtitle') }}</span>
                                <span v-else>{{ $t('auth.register.subtitle') }}</span>
                            </p>
                        </div>

                        <div class="premium-tabs" :class="isDarkTheme ? 'dark-tabs' : 'light-tabs'">
                            <div class="tabs-wrapper">
                                <button
                                    :class="{ active: activeTab === 'login' }"
                                    @click="activeTab = 'login'"
                                    class="premium-tab"
                                >
                                    <div class="tab-icon">
                                        <i class="fa-solid fa-right-to-bracket"></i>
                                    </div>
                                    <span class="tab-text">{{ $t('auth.login.title') }}</span>
                                    <div class="tab-glow"></div>
                                </button>
                                <button
                                    :class="{ active: activeTab === 'register' }"
                                    @click="activeTab = 'register'"
                                    class="premium-tab"
                                >
                                    <div class="tab-icon">
                                        <i class="fa-solid fa-user-plus"></i>
                                    </div>
                                    <span class="tab-text">{{ $t('auth.register.title') }}</span>
                                    <div class="tab-glow"></div>
                                </button>
                                <div class="tab-indicator" :style="indicatorStyle"></div>
                            </div>
                        </div>

                        <div v-if="flashMessage && flashMessage.success" class="premium-alert success" :class="isDarkTheme ? 'dark-alert' : 'light-alert'">
                            <div class="alert-icon">
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                            <div class="alert-content">
                                <span class="alert-title">{{ $t('auth.success') }}</span>
                                <span class="alert-message">{{ flashMessage.success }}</span>
                            </div>
                            <button class="alert-close" @click="clearFlashMessage('success')">
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </div>

                        <div v-if="validationErrors" class="premium-alert error" :class="isDarkTheme ? 'dark-alert' : 'light-alert'">
                            <div class="alert-icon">
                                <i class="fa-solid fa-circle-exclamation"></i>
                            </div>
                            <div class="alert-content">
                                <span class="alert-title">{{ $t('auth.error') }}</span>
                                <span class="alert-message">
                                    <template v-if="typeof validationErrors === 'string'">
                                        {{ validationErrors }}
                                    </template>
                                    <template v-else>
                                        <div v-for="(errors, field) in validationErrors" :key="field">
                                            <div v-for="error in errors" :key="error">{{ error }}</div>
                                        </div>
                                    </template>
                                </span>
                            </div>
                            <button class="alert-close" @click="clearValidationErrors">
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </div>

                        <form v-show="activeTab === 'login'" @submit.prevent="submitLogin" class="premium-form" :class="isDarkTheme ? 'dark-form' : 'light-form'">
                            <div class="form-group premium-group">
                                <label class="premium-label">
                                    <div class="label-icon">
                                        <i class="fa-solid fa-envelope"></i>
                                    </div>
                                    <span class="label-text">{{ $t('auth.form.email') }}</span>
                                </label>
                                <div class="input-wrapper">
                                    <input
                                        type="email"
                                        v-model="loginForm.email"
                                        :placeholder="$t('auth.form.email_placeholder')"
                                        required
                                        class="premium-input"
                                        :class="[
                                            isDarkTheme ? 'dark-input' : 'light-input',
                                            { 'input-error': loginErrors.email }
                                        ]"
                                    />
                                    <div class="input-border"></div>
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="loginErrors.email" class="input-error-message">
                                    {{ loginErrors.email[0] }}
                                </div>
                            </div>

                            <div class="form-group premium-group">
                                <label class="premium-label">
                                    <div class="label-icon">
                                        <i class="fa-solid fa-lock"></i>
                                    </div>
                                    <span class="label-text">{{ $t('auth.form.password') }}</span>
                                </label>
                                <div class="input-wrapper">
                                    <input
                                        :type="showLoginPassword ? 'text' : 'password'"
                                        v-model="loginForm.password"
                                        :placeholder="$t('auth.form.password_placeholder')"
                                        required
                                        class="premium-input"
                                        :class="[
                                            isDarkTheme ? 'dark-input' : 'light-input',
                                            { 'input-error': loginErrors.password }
                                        ]"
                                    />
                                    <button type="button" class="password-toggle premium-toggle" :class="isDarkTheme ? 'dark-toggle' : 'light-toggle'" @click="showLoginPassword = !showLoginPassword">
                                        <i :class="showLoginPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                    </button>
                                    <div class="input-border"></div>
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="loginErrors.password" class="input-error-message">
                                    {{ loginErrors.password[0] }}
                                </div>
                            </div>

                            <div class="form-options premium-options">
                                <label class="premium-checkbox" :class="isDarkTheme ? 'dark-checkbox' : 'light-checkbox'">
                                    <input type="checkbox" v-model="loginForm.remember">
                                    <span class="checkmark"></span>
                                    <span class="checkbox-text">{{ $t('auth.login.remember_me') }}</span>
                                </label>
                                <Link href="/forgot-password" class="forgot-link premium-link" :class="isDarkTheme ? 'dark-link' : 'light-link'">
                                    {{ $t('auth.login.forgot_password') }}
                                    <i class="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>

                            <button type="submit" class="premium-btn primary-btn" :class="isDarkTheme ? 'dark-btn' : 'light-btn'" :disabled="isLoading">
                                <div class="btn-content">
                                    <i class="fa-solid fa-arrow-right-to-bracket"></i>&nbsp;
                                    <span v-if="!isLoading">{{ $t('auth.login.button') }}</span>
                                    <span v-else>{{ $t('auth.loading') }}...</span>
                                </div>
                                <div class="btn-glow"></div>
                                <div class="btn-shine"></div>
                                <div class="btn-pulse"></div>
                            </button>
                        </form>

                        <form v-show="activeTab === 'register'" @submit.prevent="submitRegister" class="premium-form" :class="isDarkTheme ? 'dark-form' : 'light-form'">
                            <div class="form-group premium-group">
                                <label class="premium-label">
                                    <div class="label-icon">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                    <span class="label-text">{{ $t('auth.form.full_name') }}</span>
                                </label>
                                <div class="input-wrapper">
                                    <input
                                        type="text"
                                        v-model="registerForm.name"
                                        :placeholder="$t('auth.form.name_placeholder')"
                                        required
                                        class="premium-input"
                                        :class="[
                                            isDarkTheme ? 'dark-input' : 'light-input',
                                            { 'input-error': registerErrors.name }
                                        ]"
                                    />
                                    <div class="input-border"></div>
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="registerErrors.name" class="input-error-message">
                                    {{ registerErrors.name[0] }}
                                </div>
                            </div>

                            <div class="form-group premium-group">
                                <label class="premium-label">
                                    <div class="label-icon">
                                        <i class="fa-solid fa-envelope"></i>
                                    </div>
                                    <span class="label-text">{{ $t('auth.form.email') }}</span>
                                </label>
                                <div class="input-wrapper">
                                    <input
                                        type="email"
                                        v-model="registerForm.email"
                                        :placeholder="$t('auth.form.email_placeholder')"
                                        required
                                        class="premium-input"
                                        :class="[
                                            isDarkTheme ? 'dark-input' : 'light-input',
                                            { 'input-error': registerErrors.email }
                                        ]"
                                    />
                                    <div class="input-border"></div>
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="registerErrors.email" class="input-error-message">
                                    {{ registerErrors.email[0] }}
                                </div>
                            </div>

                            <div class="form-group premium-group">
                                <label class="premium-label">
                                    <div class="label-icon">
                                        <i class="fa-solid fa-phone"></i>
                                    </div>
                                    <span class="label-text">{{ $t('auth.form.phone') }}</span>
                                </label>
                                <div class="input-wrapper">
                                    <input
                                        type="tel"
                                        v-model="registerForm.phone"
                                        :placeholder="$t('auth.form.phone_placeholder')"
                                        required
                                        class="premium-input"
                                        :class="[
                                            isDarkTheme ? 'dark-input' : 'light-input',
                                            { 'input-error': registerErrors.phone }
                                        ]"
                                    />
                                    <div class="input-border"></div>
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="registerErrors.phone" class="input-error-message">
                                    {{ registerErrors.phone[0] }}
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group premium-group">
                                    <label class="premium-label">
                                        <div class="label-icon">
                                            <i class="fa-solid fa-key"></i>
                                        </div>
                                        <span class="label-text">{{ $t('auth.form.password') }}</span>
                                    </label>
                                    <div class="input-wrapper">
                                        <input
                                            :type="showRegisterPassword ? 'text' : 'password'"
                                            v-model="registerForm.password"
                                            :placeholder="$t('auth.form.password_placeholder')"
                                            required
                                            class="premium-input"
                                            :class="[
                                                isDarkTheme ? 'dark-input' : 'light-input',
                                                { 'input-error': registerErrors.password }
                                            ]"
                                        />
                                        <button type="button" class="password-toggle premium-toggle" :class="isDarkTheme ? 'dark-toggle' : 'light-toggle'" @click="showRegisterPassword = !showRegisterPassword">
                                            <i :class="showRegisterPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                        </button>
                                        <div class="input-border"></div>
                                        <div class="input-glow"></div>
                                    </div>
                                    <div v-if="registerErrors.password" class="input-error-message">
                                        {{ registerErrors.password[0] }}
                                    </div>
                                    <div class="password-strength">
                                        <div class="strength-bar">
                                            <div class="strength-fill" :style="passwordStrengthStyle"></div>
                                        </div>
                                        <div class="strength-text">
                                            <span>{{ passwordStrengthText }}</span>
                                            <span class="strength-percentage">{{ Math.round(passwordStrength.percentage) }}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group premium-group">
                                    <label class="premium-label">
                                        <div class="label-icon">
                                            <i class="fa-solid fa-key"></i>
                                        </div>
                                        <span class="label-text">{{ $t('auth.form.confirm_password') }}</span>
                                    </label>
                                    <div class="input-wrapper">
                                        <input
                                            :type="showConfirmPassword ? 'text' : 'password'"
                                            v-model="registerForm.password_confirmation"
                                            :placeholder="$t('auth.form.confirm_password_placeholder')"
                                            required
                                            class="premium-input"
                                            :class="[
                                                isDarkTheme ? 'dark-input' : 'light-input',
                                                { 'input-error': registerErrors.password_confirmation }
                                            ]"
                                        />
                                        <button type="button" class="password-toggle premium-toggle" :class="isDarkTheme ? 'dark-toggle' : 'light-toggle'" @click="showConfirmPassword = !showConfirmPassword">
                                            <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                        </button>
                                        <div class="input-border"></div>
                                        <div class="input-glow"></div>
                                    </div>
                                    <div v-if="registerErrors.password_confirmation" class="input-error-message">
                                        {{ registerErrors.password_confirmation[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group premium-group">
                                <label class="premium-checkbox full-width" :class="isDarkTheme ? 'dark-checkbox' : 'light-checkbox'">
                                    <input type="checkbox" v-model="registerForm.terms" required>
                                    <span class="checkmark"></span>
                                    <span class="checkbox-text" v-html="$t('auth.register.terms_agreement')"></span>
                                </label>
                                <div v-if="registerErrors.terms" class="input-error-message">
                                    {{ registerErrors.terms[0] }}
                                </div>
                            </div>

                            <button type="submit" class="premium-btn primary-btn register-btn" :class="isDarkTheme ? 'dark-btn' : 'light-btn'" :disabled="isLoading">
                                <div class="btn-content">
                                    <i class="fa-solid fa-rocket"></i>&nbsp;
                                    <span v-if="!isLoading">{{ $t('auth.register.button') }}</span>
                                    <span v-else>{{ $t('auth.loading') }}...</span>
                                </div>
                                <div class="btn-glow"></div>
                                <div class="btn-shine"></div>
                                <div class="btn-pulse"></div>
                            </button>

                            <p class="switch-prompt" :class="isDarkTheme ? 'dark-prompt' : 'light-prompt'">
                                {{ $t('auth.register.already_have_account') }}
                                <a href="#" @click="activeTab = 'login'; clearValidationErrors()" class="switch-link" :class="isDarkTheme ? 'dark-switch-link' : 'light-switch-link'">
                                    {{ $t('auth.register.switch_to_login') }}
                                    <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </p>
                        </form>

                        <div class="forms-footer" :class="isDarkTheme ? 'dark-footer' : 'light-footer'">
                            <div class="security-badge">
                                <i class="fa-solid fa-shield-alt"></i>
                                <div class="security-text">
                                    <span class="security-title">{{ $t('security.title') }}</span>
                                    <span class="security-desc">{{ $t('security.desc') }}</span>
                                </div>
                            </div>
                            <div class="back-home">
                                <Link href="/" class="back-link" :class="isDarkTheme ? 'dark-back-link' : 'light-back-link'">
                                    <i class="fa-solid fa-home"></i>
                                    {{ $t('auth.back_to_home') }}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import { Link } from '@inertiajs/vue3';
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { usePage } from '@inertiajs/vue3';

const page = usePage();
const authStore = useAuthStore();

const activeTab = ref('login');
const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);
const isDarkTheme = ref(true);
const validationErrors = ref(null);
const flashMessage = ref(page.props.flash || {});

const loginForm = reactive({
    email: '',
    password: '',
    remember: false,
});

const registerForm = reactive({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

watch(() => page.props.flash, (newFlash) => {
    flashMessage.value = newFlash || {};

    if (newFlash) {
        setTimeout(() => {
            flashMessage.value = {};
        }, 5000);
    }
}, { immediate: true });

const isLoading = computed(() => authStore.getIsLoading);
const loginErrors = computed(() => validationErrors.value || {});
const registerErrors = computed(() => validationErrors.value || {});

const indicatorStyle = computed(() => ({
    transform: activeTab.value === 'login' ? 'translateX(0)' : 'translateX(100%)'
}));

const passwordStrength = computed(() => {
    const password = registerForm.password;
    const strength = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(strength).filter(Boolean).length;
    return {
        score,
        percentage: (score / 5) * 100,
        strength
    };
});

const passwordStrengthStyle = computed(() => ({
    width: `${passwordStrength.value.percentage}%`,
    background: getStrengthColor(passwordStrength.value.percentage)
}));

const passwordStrengthText = computed(() => {
    const score = passwordStrength.value.score;
    if (score === 0) return 'Très faible';
    if (score <= 2) return 'Faible';
    if (score <= 3) return 'Moyen';
    if (score <= 4) return 'Fort';
    return 'Très fort';
});

function getStrengthColor(percentage) {
    if (percentage <= 20) return '#ff4757';
    if (percentage <= 40) return '#ffa502';
    if (percentage <= 60) return '#1A4137';
    if (percentage <= 80) return '#0F2727';
    return '#063232';
}

const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light');
};

const clearValidationErrors = () => {
    validationErrors.value = null;
    authStore.clearErrors();
};

const submitLogin = async () => {
    clearValidationErrors();

    try {
        await authStore.login({
            email: loginForm.email,
            password: loginForm.password,
            remember: loginForm.remember,
        });
    } catch (error) {
        console.log(error);
        if (error.errors) {
            validationErrors.value = error.errors;
        } else if (error.message) {
            validationErrors.value = error.message;
        }
    }
};

const submitRegister = async () => {
    clearValidationErrors();

    try {
        await authStore.register({
            name: registerForm.name,
            email: registerForm.email,
            phone: registerForm.phone,
            password: registerForm.password,
            password_confirmation: registerForm.password_confirmation,
            terms: registerForm.terms,
        });
    } catch (error) {
        if (error.errors) {
            validationErrors.value = error.errors;
        } else if (error.message) {
            validationErrors.value = error.message;
        }
    }
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkTheme.value = savedTheme === 'dark';
    }

    if (authStore.getIsAuthenticated) {
        window.location.href = '/dashboard';
    }
});
</script>

<style scoped>
/* Variables pour le thème sombre Fintech */
:root {
    --dark-color1: #063232;
    --dark-color2: #0F2727;
    --dark-color2-rgb: 15, 39, 39;
    --dark-color3: #061419;
    --dark-color4: #1A4137;
    --accent-color1: #2A8C82;
    --accent-color2: #4CAF93;
    --accent-color3: #6BC4A6;
    --light-color1: #E8F4F2;
    --light-color2: #C2E0D8;

    /* Variables pour le thème clair */
    --light-bg-color1: #578e83;
    --light-bg-color2: #cfd9d7;
    --light-bg-color3: #D4E9E5;
    --light-accent-color1: #1E6B63;
    --light-accent-color2: #2A8C82;
    --light-accent-color3: #38A896;
    --dark-text-color1: #063232;
    --dark-text-color2: #0F2727;
}

/* Styles généraux pour remplir toute la page */
.auth-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow: auto;
    z-index: 1;
}

/* Background sombre */
.dark-fintech {
    background: linear-gradient(135deg, var(--dark-color1) 0%, var(--dark-color3) 100%);
    color: var(--light-color1);
}

/* Background clair */
.light-fintech {
    background: linear-gradient(135deg, var(--light-bg-color1) 0%, var(--light-bg-color3) 100%);
    color: var(--dark-text-color1);
}

.auth-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.grid-pattern {
    position: absolute;
    width: 100%;
    height: 100%;
}

.dark-fintech .grid-pattern {
    background-image:
        linear-gradient(rgba(106, 196, 166, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(106, 196, 166, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, black, transparent 70%);
}

.light-fintech .grid-pattern {
    background-image:
        linear-gradient(rgba(42, 140, 130, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(42, 140, 130, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, white, transparent 70%);
}

.bg-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
}

.dark-fintech .bg-shape {
    opacity: 0.15;
}

.light-fintech .bg-shape {
    opacity: 0.1;
}

.shape-1 {
    width: 500px;
    height: 500px;
    top: -250px;
    right: -250px;
}

.dark-fintech .shape-1 {
    background: var(--accent-color1);
}

.light-fintech .shape-1 {
    background: var(--light-accent-color1);
}

.shape-2 {
    width: 400px;
    height: 400px;
    bottom: -200px;
    left: -200px;
}

.dark-fintech .shape-2 {
    background: var(--dark-color4);
}

.light-fintech .shape-2 {
    background: var(--light-bg-color3);
}

.shape-3 {
    width: 300px;
    height: 300px;
    top: 30%;
    left: 10%;
}

.dark-fintech .shape-3 {
    background: var(--accent-color3);
}

.light-fintech .shape-3 {
    background: var(--light-accent-color3);
}

.shape-4 {
    width: 200px;
    height: 200px;
    bottom: 20%;
    right: 15%;
}

.dark-fintech .shape-4 {
    background: var(--accent-color2);
}

.light-fintech .shape-4 {
    background: var(--light-accent-color2);
}

/* Main Container */
.premium-container {
    display: flex;
    max-width: 1400px;
    width: 100%;
    backdrop-filter: blur(20px);
    border-radius: 32px;
    overflow: hidden;
    border: 1px solid;
    z-index: 2;
    min-height: 800px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
}

.dark-container {
    background: rgba(6, 20, 25, 0.8);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border-color: rgba(106, 196, 166, 0.1);
}

.light-container {
    background: rgba(248, 253, 252, 0.9);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
    border-color: rgba(42, 140, 130, 0.1);
}

.dark-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(26, 65, 55, 0.3) 0%, transparent 50%);
    z-index: -1;
}

.light-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(232, 244, 242, 0.5) 0%, transparent 50%);
    z-index: -1;
}

/* Brand Panel */
.brand-panel {
    flex: 1.2;
    padding: 60px 50px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.dark-panel {
    background: linear-gradient(145deg, rgba(6, 50, 50, 0.9) 0%, rgba(6, 20, 25, 0.9) 100%);
}

.light-panel {
    background: linear-gradient(145deg, rgba(232, 244, 242, 0.9) 0%, rgba(212, 233, 229, 0.9) 100%);
}

/* Logo styles */
.premium-logo {
    margin-bottom: 40px;
    position: relative;
    z-index: 2;
}

.logo-wrapper {
    position: relative;
    display: inline-block;
}

.logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    filter: blur(20px);
    z-index: 1;
}

.dark-fintech .logo-glow {
    background: radial-gradient(circle, var(--accent-color1) 0%, transparent 70%);
    opacity: 0.3;
}

.light-fintech .logo-glow {
    background: radial-gradient(circle, var(--light-accent-color2) 0%, transparent 70%);
    opacity: 0.2;
}

.logo-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    animation: pulse 2s ease-out infinite;
    z-index: 0;
}

.dark-fintech .logo-pulse {
    border: 2px solid var(--accent-color3);
}

.light-fintech .logo-pulse {
    border: 2px solid var(--light-accent-color3);
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.8;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0;
    }
}

/* Testimonial card - REDUIT */
.testimonial-card {
    background: rgba(15, 39, 39, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid;
    border-radius: 20px;
    padding: 25px;
    position: relative;
    overflow: hidden;
    margin-top: 40px;
}

.dark-testimonial {
    background: rgba(6, 20, 25, 0.7);
    border-color: rgba(106, 196, 166, 0.2);
}

.light-testimonial {
    background: rgba(232, 244, 242, 0.7);
    border-color: rgba(42, 140, 130, 0.2);
}

.testimonial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.rating i {
    color: #FFD700;
    font-size: 0.9rem;
    margin-right: 2px;
}

.quote-icon {
    font-size: 1.5rem;
    opacity: 0.5;
}

.dark-testimonial .quote-icon {
    color: var(--accent-color2);
}

.light-testimonial .quote-icon {
    color: var(--light-accent-color2);
}

.testimonial-content p {
    font-style: italic;
    line-height: 1.5;
    margin-bottom: 20px;
    font-size: 0.95rem;
    position: relative;
    padding-left: 15px;
}

.dark-testimonial .testimonial-content p {
    color: var(--light-color1);
}

.light-testimonial .testimonial-content p {
    color: var(--dark-text-color1);
}

.testimonial-content p::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -8px;
    font-size: 2rem;
    opacity: 0.3;
    font-family: serif;
}

.dark-testimonial .testimonial-content p::before {
    color: var(--accent-color2);
}

.light-testimonial .testimonial-content p::before {
    color: var(--light-accent-color2);
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
}

.author-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid;
    padding: 2px;
}

.dark-testimonial .author-avatar {
    border-color: var(--accent-color2);
}

.light-testimonial .author-avatar {
    border-color: var(--light-accent-color2);
}

.author-info h5 {
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 0.9rem;
}

.dark-testimonial .author-info h5 {
    color: var(--light-color1);
}

.light-testimonial .author-info h5 {
    color: var(--dark-text-color1);
}

.author-info span {
    font-size: 0.8rem;
    opacity: 0.9;
}

.dark-testimonial .author-info span {
    color: var(--light-color2);
}

.light-testimonial .author-info span {
    color: var(--dark-text-color2);
}

/* Forms Panel */
.forms-panel {
    flex: 1;
    padding: 60px 50px;
    position: relative;
    overflow-y: auto;
}

.dark-forms {
    background: rgba(6, 20, 25, 0.9);
}

.light-forms {
    background: rgba(248, 253, 252, 0.9);
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
}

.theme-toggle {
    display: flex;
    gap: 10px;
}

.theme-btn {
    width: 45px;
    height: 45px;
    border: 1px solid;
    border-radius: 12px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dark-fintech .theme-btn {
    background: rgba(15, 39, 39, 0.6);
    border-color: rgba(106, 196, 166, 0.2);
    color: var(--accent-color3);
}

.light-fintech .theme-btn {
    background: rgba(232, 244, 242, 0.6);
    border-color: rgba(42, 140, 130, 0.2);
    color: var(--light-accent-color2);
}

.theme-btn:hover {
    transform: rotate(15deg);
}

.dark-fintech .theme-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
}

.light-fintech .theme-btn:hover {
    background: rgba(198, 226, 221, 0.8);
    border-color: var(--light-accent-color2);
}

.forms-container {
    max-width: 550px;
    margin: 0 auto;
}

.forms-header {
    margin-bottom: 50px;
    position: relative;
}

.header-glow {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    height: 100px;
    filter: blur(20px);
    z-index: 0;
}

.dark-fintech .header-glow {
    background: radial-gradient(ellipse at center, rgba(42, 140, 130, 0.2) 0%, transparent 70%);
}

.light-fintech .header-glow {
    background: radial-gradient(ellipse at center, rgba(42, 140, 130, 0.1) 0%, transparent 70%);
}

.forms-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
}

.title-text {
    font-size: 2.4rem;
    font-weight: 700;
    background-clip: text;
}

.dark-fintech .title-text {
    background: linear-gradient(135deg, var(--accent-color1) 0%, var(--accent-color3) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.light-fintech .title-text {
    background: linear-gradient(135deg, var(--accent-color1) 0%, var(--accent-color3) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.title-badge {
    border: 1px solid;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
}

.dark-fintech .title-badge {
    background: rgba(26, 65, 55, 0.6);
    border-color: rgba(106, 196, 166, 0.3);
    color: var(--accent-color3);
}

.light-fintech .title-badge {
    background: rgba(232, 244, 242, 0.6);
    border-color: rgba(42, 140, 130, 0.3);
    color: var(--light-accent-color2);
}

.forms-subtitle {
    font-size: 1.1rem;
    position: relative;
    z-index: 1;
}

.dark-fintech .forms-subtitle {
    color: var(--light-color2);
}

.light-fintech .forms-subtitle {
    color: var(--dark-text-color2);
}

/* Premium Tabs */
.premium-tabs {
    margin-bottom: 50px;
    position: relative;
}

.tabs-wrapper {
    display: flex;
    border-radius: 20px;
    padding: 8px;
    position: relative;
    border: 1px solid;
}

.dark-tabs .tabs-wrapper {
    background: rgba(15, 39, 39, 0.6);
    border-color: rgba(106, 196, 166, 0.1);
}

.light-tabs .tabs-wrapper {
    background: rgba(232, 244, 242, 0.6);
    border-color: rgba(42, 140, 130, 0.1);
}

.premium-tab {
    flex: 1;
    padding: 22px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 16px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    z-index: 2;
    font-weight: 600;
    font-size: 1.1rem;
}

.dark-fintech .premium-tab {
    color: var(--light-color2);
}

.light-fintech .premium-tab {
    color: var(--dark-text-color2);
}

.premium-tab.active {
    color: white;
}

.tab-icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
}

.premium-tab:hover .tab-icon {
    transform: scale(1.1);
}

.tab-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.dark-fintech .tab-glow {
    background: linear-gradient(135deg, rgba(106, 196, 166, 0.1) 0%, transparent 100%);
}

.light-fintech .tab-glow {
    background: linear-gradient(135deg, rgba(42, 140, 130, 0.1) 0%, transparent 100%);
}

.premium-tab.active .tab-glow {
    opacity: 1;
}

.tab-indicator {
    position: absolute;
    top: 8px;
    left: 8px;
    width: calc(50% - 8px);
    height: calc(100% - 16px);
    border-radius: 16px;
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 1;
    box-shadow: 0 10px 30px rgba(42, 140, 130, 0.3);
}

.dark-fintech .tab-indicator {
    background: linear-gradient(135deg, var(--dark-color4) 0%, var(--accent-color2) 100%);
}

.light-fintech .tab-indicator {
    background: linear-gradient(135deg, var(--light-bg-color3) 0%, var(--light-accent-color2) 100%);
}

/* Labels pour les 7 points corrigés */
.premium-label {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
}

.label-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}

.dark-fintech .label-icon {
    background: rgba(26, 65, 55, 0.5);
    color: var(--accent-color3);
}

.light-fintech .label-icon {
    background: rgba(232, 244, 242, 0.5);
    color: var(--light-accent-color2);
}

.label-text {
    font-weight: 600;
    font-size: 1rem;
}

.dark-fintech .label-text {
    color: var(--light-color1);
}

.light-fintech .label-text {
    color: var(--dark-text-color1);
}

/* Input fields */
.dark-input {
    width: 100%;
    padding: 20px 25px;
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.1);
    border-radius: 14px;
    font-size: 1rem;
    color: var(--light-color1);
    transition: all 0.3s ease;
}

.light-input {
    width: 100%;
    padding: 20px 25px;
    background: rgba(232, 244, 242, 0.6);
    border: 2px solid rgba(42, 140, 130, 0.1);
    border-radius: 14px;
    font-size: 1rem;
    color: var(--dark-text-color1);
    transition: all 0.3s ease;
}

.dark-input:focus,
.light-input:focus {
    border-color: var(--accent-color2);
    box-shadow: 0 0 0 4px rgba(42, 140, 130, 0.1);
    outline: none;
}

.dark-input:focus {
    background: rgba(6, 20, 25, 0.8);
}

.light-input:focus {
    background: rgba(248, 253, 252, 0.9);
}

.dark-input::placeholder {
    color: rgba(194, 224, 216, 0.5);
}

.light-input::placeholder {
    color: rgba(6, 50, 50, 0.4);
}

.input-border {
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.dark-fintech .input-border {
    background: linear-gradient(135deg, var(--accent-color1) 0%, var(--accent-color3) 100%);
}

.light-fintech .input-border {
    background: linear-gradient(135deg, var(--light-accent-color1) 0%, var(--light-accent-color3) 100%);
}

.dark-input:focus + .input-border,
.light-input:focus + .input-border {
    transform: scaleX(1);
}

/* Checkbox */
.premium-checkbox {
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    user-select: none;
}

.dark-checkbox {
    color: var(--light-color2);
    font-size: 0.95rem;
}

.light-checkbox {
    color: var(--dark-text-color2);
    font-size: 0.95rem;
}

.premium-checkbox.full-width {
    width: 100%;
}

.premium-checkbox input {
    display: none;
}

.checkmark {
    width: 24px;
    height: 24px;
    border: 2px solid;
    border-radius: 6px;
    position: relative;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.dark-checkbox .checkmark {
    background: rgba(15, 39, 39, 0.6);
    border-color: rgba(106, 196, 166, 0.3);
}

.light-checkbox .checkmark {
    background: rgba(232, 244, 242, 0.6);
    border-color: rgba(42, 140, 130, 0.3);
}

.premium-checkbox input:checked + .checkmark {
    background: var(--accent-color2);
    border-color: var(--accent-color2);
}

.checkmark::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 8px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.premium-checkbox input:checked + .checkmark::after {
    opacity: 1;
}

.checkbox-text {
    flex: 1;
}

/* Boutons - CORRIGE */
.light-btn {
    width: 100%;
    padding: 20px;
    border: none;
    border-radius: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    margin-bottom: 25px;
}

.dark-btn {
    width: 100%;
    padding: 20px;
    border: none;
    border-radius: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    margin-bottom: 25px;
}

.dark-btn {
    background: linear-gradient(135deg, var(--dark-color4) 0%, var(--accent-color2) 100%);
    color: white;
}

.light-btn {
    background: linear-gradient(135deg, rgba(42, 140, 130, 0.651) 0%, transparent 100%);
    color: rgb(255, 255, 255);
}

.dark-btn:hover,
.light-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(42, 140, 130, 0.3);
}

/* Form options */
.premium-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

/* Links */
.dark-link,
.light-link {
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.dark-link {
    color: var(--accent-color3);
    font-size: 0.95rem;
}

.light-link {
    color: var(--light-accent-color2);
    font-size: 0.95rem;
}

.dark-link:hover,
.light-link:hover {
    gap: 12px;
}

.dark-link:hover {
    color: var(--accent-color1);
}

.light-link:hover {
    color: var(--light-accent-color1);
}

/* Form row */
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
}

/* Password strength */
.password-strength {
    margin-top: 10px;
}

.strength-bar {
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 8px;
    border: 1px solid;
}

.dark-fintech .strength-bar {
    background: rgba(15, 39, 39, 0.6);
    border-color: rgba(106, 196, 166, 0.1);
}

.light-fintech .strength-bar {
    background: rgba(232, 244, 242, 0.6);
    border-color: rgba(42, 140, 130, 0.1);
}

.strength-fill {
    height: 100%;
    transition: width 0.5s ease, background 0.5s ease;
    border-radius: 3px;
}

.strength-text {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
}

.dark-fintech .strength-text {
    color: var(--light-color2);
}

.light-fintech .strength-text {
    color: var(--dark-text-color2);
}

.strength-percentage {
    font-weight: 600;
}

.dark-fintech .strength-percentage {
    color: var(--accent-color3);
}

.light-fintech .strength-percentage {
    color: var(--light-accent-color2);
}

/* Switch prompt */
.switch-prompt {
    text-align: center;
    margin-top: 25px;
    font-size: 1rem;
}

.dark-prompt {
    color: var(--light-color2);
}

.light-prompt {
    color: var(--dark-text-color2);
}

.switch-link {
    color: var(--accent-color3);
    font-weight: 600;
    text-decoration: none;
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.dark-switch-link {
    color: var(--accent-color3);
}

.light-switch-link {
    color: var(--light-accent-color2);
}

.switch-link:hover {
    gap: 12px;
}

.dark-switch-link:hover {
    color: var(--accent-color1);
}

.light-switch-link:hover {
    color: var(--light-accent-color1);
}

/* Forms footer */
.forms-footer {
    margin-top: 50px;
    padding-top: 35px;
    border-top: 1px solid;
}

.dark-footer {
    border-top-color: rgba(106, 196, 166, 0.1);
}

.light-footer {
    border-top-color: rgba(42, 140, 130, 0.1);
}

.security-badge {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid;
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 25px;
}

.dark-fintech .security-badge {
    background: rgba(15, 39, 39, 0.6);
    border-color: rgba(106, 196, 166, 0.2);
}

.light-fintech .security-badge {
    background: rgba(232, 244, 242, 0.6);
    border-color: rgba(42, 140, 130, 0.2);
}

.security-badge i {
    font-size: 1.8rem;
    flex-shrink: 0;
}

.dark-fintech .security-badge i {
    color: var(--accent-color2);
}

.light-fintech .security-badge i {
    color: var(--light-accent-color2);
}

.security-text {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.security-title {
    font-weight: 600;
    font-size: 0.95rem;
}

.dark-fintech .security-title {
    color: var(--light-color1);
}

.light-fintech .security-title {
    color: var(--dark-text-color1);
}

.security-desc {
    font-size: 0.85rem;
    opacity: 0.9;
}

.dark-fintech .security-desc {
    color: var(--light-color2);
}

.light-fintech .security-desc {
    color: var(--dark-text-color2);
}

.back-home {
    text-align: center;
}

.back-link {
    color: var(--accent-color3);
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.dark-back-link {
    background: rgba(26, 65, 55, 0.5);
    border: 1px solid rgba(106, 196, 166, 0.2);
    color: var(--accent-color3);
}

.light-back-link {
    background: rgba(232, 244, 242, 0.6);
    border: 1px solid rgba(42, 140, 130, 0.2);
    color: var(--light-accent-color2);
}

.back-link:hover {
    gap: 15px;
}

.dark-back-link:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
}

.light-back-link:hover {
    background: rgba(212, 233, 229, 0.8);
    border-color: var(--light-accent-color2);
}

/* Responsive */
@media (max-width: 992px) {
    .premium-container {
        flex-direction: column;
        max-width: 600px;
        min-height: auto;
    }

    .brand-panel {
        padding: 40px 30px;
    }

    .forms-panel {
        padding: 50px 40px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .auth-page {
        padding: 10px;
    }

    .premium-container {
        border-radius: 24px;
        max-height: 95vh;
    }

    .brand-panel,
    .forms-panel {
        padding: 30px;
    }

    .forms-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .title-badge {
        align-self: flex-start;
    }
}

@media (max-width: 576px) {
    .brand-panel,
    .forms-panel {
        padding: 20px;
    }

    .forms-title .title-text {
        font-size: 2rem;
    }
}
</style>
