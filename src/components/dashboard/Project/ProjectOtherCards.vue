<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  BCard,
  BCardBody,
  BBadge,
  BTable,
  BFormCheckbox,
  BTabs,
  BTab,
  BCol,
  BRow
} from 'bootstrap-vue-next'
import { IconChevronRight } from '@tabler/icons-vue'
import {
  PhArrowUpRight,
  PhChartLineUp,
  PhCalendarCheck,
  PhChatCircleText,
  PhCurrencyCircleDollar,
  PhArrowsLeftRight,
  PhShieldCheck,
  PhQrCode,
  PhArrowRight,
  PhSwap
} from '@phosphor-icons/vue'

const { t } = useI18n()

// Données financières simulées
const transactions = reactive([
  {
    id: 1,
    name: "Sophie Koffi",
    role: t('dashboard.transactions.depot_mobile_money'),
    points: "+250 000 FCFA",
    bgColor: "bg-light-success",
    avatar: "/images/avatar/1.png",
    checked: true
  },
  {
    id: 2,
    name: "Marc Zadi",
    role: t('dashboard.transactions.transfert_vers_benin'),
    points: "-75 000 FCFA",
    bgColor: "bg-light-warning",
    avatar: "/images/avatar/2.png",
    checked: false
  },
  {
    id: 3,
    name: "Amina Diallo",
    role: t('dashboard.transactions.paiement_esim'),
    points: "-12 500 FCFA",
    bgColor: "bg-light-info",
    avatar: "/images/avatar/3.png",
    checked: true
  },
  {
    id: 4,
    name: "Jean Kouamé",
    role: t('dashboard.transactions.reception_virement'),
    points: "+500 000 FCFA",
    bgColor: "bg-light-primary",
    avatar: "/images/avatar/4.png",
    checked: false
  },
  {
    id: 5,
    name: "Fatou Sarr",
    role: t('dashboard.transactions.achat_crypto'),
    points: "-200 000 FCFA",
    bgColor: "bg-light-danger",
    avatar: "/images/avatar/5.png",
    checked: false
  }
])

const accounts = [
  {
    id: 1,
    name: t('dashboard.comptes.compte_principal'),
    points: "2 450 000 FCFA",
    bgColor: "bg-light-primary",
    avatar: "/images/avatar/1.png",
    status: t('dashboard.alertes.kyc_requis').replace(' Requis', '')
  },
  {
    id: 2,
    name: t('dashboard.comptes.compte_epargne'),
    points: "850 000 FCFA",
    bgColor: "bg-light-success",
    avatar: "/images/avatar/2.png",
    status: t('dashboard.alertes.kyc_requis').replace(' Requis', '')
  },
  {
    id: 3,
    name: t('dashboard.comptes.portefeuille_crypto'),
    points: "0.045 BTC",
    bgColor: "bg-light-warning",
    avatar: "/images/avatar/3.png",
    status: t('dashboard.alertes.kyc_requis').replace(' Requis', '')
  },
  {
    id: 4,
    name: t('dashboard.comptes.carte_virtuelle'),
    points: "450 000 FCFA",
    bgColor: "bg-light-info",
    avatar: "/images/avatar/4.png",
    status: t('dashboard.alertes.kyc_requis').replace(' Requis', '')
  }
]

const financialAlerts = [
  {
    id: 1,
    title: t('dashboard.alertes.kyc_requis'),
    time: t('dashboard.alertes.verifiez_identite'),
    bgColor: "bg-warning",
    avatar: "KYC",
    isInitials: true
  },
  {
    id: 2,
    title: t('dashboard.alertes.transfert_recu'),
    time: `250 000 FCFA - ${t('dashboard.alertes.il_y_a_5_min')}`,
    bgColor: "bg-success",
    avatar: "/images/avatar/2.png",
    isInitials: false
  },
  {
    id: 3,
    title: t('dashboard.alertes.paiement_esim'),
    time: t('dashboard.alertes.forfait_10go'),
    bgColor: "bg-info",
    avatar: "/images/avatar/3.png",
    isInitials: false
  },
  {
    id: 4,
    title: t('dashboard.alertes.limite_compte'),
    time: t('dashboard.alertes.plafond_mensuel'),
    bgColor: "bg-danger",
    avatar: "⚠️",
    isInitials: true
  }
]

const activeTab = ref(0)

const tableFields = [
  { key: 'candidate', label: t('dashboard.transactions_recentes') },
  { key: 'points', label: t('dashboard.alertes.plafond_mensuel').split(' ')[0] },
  { key: 'actions', label: t('dashboard.suivre') }
]

const handleTransactionToggle = (id) => {
  const transaction = transactions.find((t) => t.id === id)
  if (transaction) transaction.checked = !transaction.checked
}
</script>

<template>
  <b-col lg="4" xxl="2" class="order-1-lg">
    <b-row>
      <b-col sm="6" lg="12">
        <b-card class="project-profit-card" no-body>
          <b-card-body>
            <div class="profit-arrow">
              <span class="bg-white text-success h-45 w-45 d-flex-center">
                <PhArrowUpRight :size="18" weight="bold" />
              </span>
            </div>
            <span class="bg-success h-45 w-45 d-flex-center b-r-50">
              <PhCurrencyCircleDollar :size="24" weight="bold" />
            </span>
            <div class="mt-3">
              <h4 class="text-dark">4.2M FCFA</h4>
              <p class="f-w-500 mb-0 txt-ellipsis-1">{{ t('dashboard.volume_transactions') }}</p>
            </div>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Active Accounts Card -->
      <b-col sm="6" lg="12">
        <b-card class="bg-primary profit-card-2" no-body>
          <b-card-body>
            <PhArrowsLeftRight class="icon-bg" weight="duotone" />
            <span class="bg-white h-50 w-50 d-flex-center b-r-50">
              <PhArrowsLeftRight class="text-primary" :size="24" weight="duotone" />
            </span>
            <div class="mt-3">
              <h4 class="text-white">238</h4>
              <p class="f-w-500 mb-0 txt-ellipsis-1">{{ t('dashboard.transferts_aujourdhui') }}</p>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-col>

  <b-col md="7" lg="4">
    <div class="header-box">
      <h5>{{ t('dashboard.transactions_recentes') }}</h5>
    </div>

    <b-card no-body>
      <b-card-body class="px-2 pt-2 pb-1 equal-card">
        <div class="table-responsive app-scroll">
          <b-table
              :items="transactions"
              :fields="tableFields"
              class="table-bottom-border align-middle mb-0"
              thead-class="d-none"
          >
            <template #cell(candidate)="data">
              <div class="d-flex align-items-center">
                <div :class="`h-40 w-40 d-flex-center b-r-12 overflow-hidden ${data.item.bgColor}`">
                  <img :src="data.item.avatar" alt="transaction" class="img-fluid" />
                </div>
                <div class="flex-grow-1 ps-2">
                  <div class="fw-medium txt-ellipsis-1">{{ data.item.name }}</div>
                  <div class="text-muted f-s-12 txt-ellipsis-1">{{ data.item.role }}</div>
                </div>
              </div>
            </template>

            <template #cell(points)="data">
              <b-badge variant="" class="f-s-12 f-w-700" :class="data.item.points.includes('+') ? 'bg-light-success text-success' : 'bg-light-danger text-danger'">
                {{ data.item.points }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-form-checkbox
                  switch
                  :id="`tableCheck-${data.item.id}`"
                  class="form-check-primary"
                  :checked="data.item.checked"
                  @change="() => handleTransactionToggle(data.item.id)"
              >
                <span class="f-w-500">
                  {{ data.item.checked ? t('dashboard.suivre') : t('dashboard.ignorer') }}
                </span>
              </b-form-checkbox>
            </template>
          </b-table>

          <div class="pb-0 text-nowrap ps-3 pt-2">
            <router-link to="/transactions" class="text-primary">
              {{ t('dashboard.voir_toutes') }}
            </router-link>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </b-col>

  <b-col sm="6" lg="4" xxl="3">
    <div class="header-box d-flex justify-content-between align-items-center">
      <h5>{{ t('dashboard.mes_comptes') }}</h5>
      <b-badge bg="success" class="cursor-pointer">+ {{ t('dashboard.nouveau') }}</b-badge>
    </div>
    <b-card no-body>
      <b-card-body>
        <b-tabs v-model="activeTab" class="app-tabs-primary border-0 flex-nowrap overflow-auto">
          <b-tab :title="t('dashboard.comptes.tous')" />
          <b-tab :title="t('dashboard.comptes.fcfa')" />
          <b-tab :title="t('dashboard.comptes.crypto')" />
          <b-tab :title="t('dashboard.comptes.cartes')" />
        </b-tabs>

        <ul class="box-list client-list">
          <li
              v-for="account in accounts"
              :key="account.id"
              class="d-flex align-items-center justify-content-between"
          >
            <div
                :class="`h-45 w-45 d-flex-center b-r-12 overflow-hidden ${account.bgColor} flex-shrink-0`"
            >
              <img :src="account.avatar" alt="account" class="img-fluid" />
            </div>
            <div class="ms-2 flex-grow-1">
              <p class="mb-0 f-w-500 f-s-16 txt-ellipsis-1">{{ account.name }}</p>
              <p class="mb-0 f-s-12 txt-ellipsis-1">{{ account.points }}</p>
            </div>
            <span class="h-30 w-30 d-flex-center b-r-50">
              <IconChevronRight class="text-primary" :size="20" />
            </span>
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </b-col>

  <b-col sm="6" lg="4" xxl="3">
    <ul class="box-list">
      <li class="d-flex justify-content-between align-items-center mt-3">
        <h5 class="mb-0 txt-ellipsis-1 flex-grow-1">{{ t('dashboard.alertes_financieres') }}</h5>
        <b-badge bg="warning">4 {{ t('dashboard.nouvelles') }}</b-badge>
      </li>
      <li
          v-for="alert in financialAlerts"
          :key="alert.id"
          class="d-flex align-items-center justify-content-between"
      >
        <div
            :class="`h-40 w-40 d-flex-center b-r-12 overflow-hidden ${alert.bgColor} text-white flex-shrink-0`"
        >
          <template v-if="alert.isInitials">
            {{ alert.avatar }}
          </template>
          <img v-else :src="alert.avatar" alt="alert" class="img-fluid" />
        </div>
        <div class="ms-2 flex-grow-1">
          <p class="mb-0 f-w-500 f-s-18 txt-ellipsis-1">{{ alert.title }}</p>
          <p class="mb-0 f-s-12 txt-ellipsis-1">{{ alert.time }}</p>
        </div>
        <router-link
            to="/support"
            target="_blank"
            class="text-light-warning h-45 w-45 d-flex-center b-r-50"
        >
          <PhShieldCheck v-if="alert.title === t('dashboard.alertes.kyc_requis')" :size="20" />
          <PhQrCode v-else-if="alert.title === t('dashboard.alertes.paiement_esim')" :size="20" />
          <PhChatCircleText v-else :size="20" />
        </router-link>
      </li>
    </ul>
  </b-col>
</template>

<style scoped>
/* Ajustements pour le thème financier */
.bg-light-success {
  background-color: rgba(16, 185, 129, 0.1);
}
.bg-light-warning {
  background-color: rgba(245, 158, 11, 0.1);
}
.bg-light-info {
  background-color: rgba(59, 130, 246, 0.1);
}
.bg-light-danger {
  background-color: rgba(239, 68, 68, 0.1);
}
.bg-light-primary {
  background-color: rgba(106, 196, 166, 0.1);
}
.text-success {
  color: #10b981 !important;
}
.text-danger {
  color: #ef4444 !important;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
