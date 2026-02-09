<template>
  <div id="app">
    <h1>{{ $t('app.name') }}</h1>
    <p>{{ $t('app.slogan') }}</p>

    <!-- Test basique de changement de langue -->
    <div style="margin-top: 20px;">
      <button @click="changeLang('fr')">Français</button>
      <button @click="changeLang('en')">English</button>
    </div>

    <p>Langue actuelle: {{ currentLang }}</p>

    <!-- Router view une fois que ça fonctionne -->
    <!-- <router-view /> -->
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLang = locale

function changeLang(lang) {
  locale.value = lang
  localStorage.setItem('user-language', lang)
}
</script>

<style>
/* Styles de test */
body {
  font-family: Arial, sans-serif;
  padding: 40px;
  text-align: center;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
