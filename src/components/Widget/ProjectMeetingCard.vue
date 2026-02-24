<script setup>
import {BCard, BCardBody, BButton, BImg} from 'bootstrap-vue-next'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <b-card class="overflow-hidden" no-body>
    <b-card-body class="p-0">
      <div class="meeting-call-box bg-gradient-mode">
        <b-img
            alt="img"
            class="img-fluid position-relative z-1"
            src="/images/shape/hero.png"
        />
        <b-img
            alt="img"
            class="img-fluid bg-vector-img"
            src="/images/dashboard/project/bg-round.png"
        />
        <b-img
            alt="img"
            class="img-fluid bg-vector-img1"
            src="/images/dashboard/project/bg-round2.png"
        />

        <div class="meeting-details-box d-flex align-items-center">
          <div class="h-40 w-40 d-flex-center b-r-50 overflow-hidden bg-dark flex-shrink-0">
            <b-img
                alt="image"
                class="img-fluid"
                src="/images/avatar/2.png"
            />
          </div>
          <div class="flex-grow-1 ps-2 text-start">
            <div class="fw-medium txt-ellipsis-1">{{ t('datas.my_data') }}</div>
            <div class="text-muted f-s-12 txt-ellipsis-1">
              {{ t('datas.my_data_description') }}
            </div>
          </div>
          <b-button variant="success" size="sm">
            Voir
          </b-button>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

