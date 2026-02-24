<script setup>
import { IconHelp } from '@tabler/icons-vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<template>
  <footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9 col-12">
          <p class="footer-text f-w-600 mb-0">{{ t('footer.copyright', { year: 2026 }) }}</p>
        </div>
        <div class="col-md-3">
          <div class="footer-text text-end">
            <a class="f-w-500 text-primary" href="mailto:support@benkky.com"> {{ $t('navigation.need_help') }} <IconHelp size="20" stroke="1.5" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
