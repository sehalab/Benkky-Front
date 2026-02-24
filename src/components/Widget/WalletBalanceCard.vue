<script setup>
import { BCard, BCardBody, BBadge, BButton } from 'bootstrap-vue-next'
import { ref } from 'vue'

// Données simulées pour le portefeuille
const walletData = ref({
  balance: 25430.75,
  currency: 'EUR',
  lastWithdrawal: 1250.00,
  lastRecharge: 5000.00,
  withdrawalDate: '15 Fév 2026',
  rechargeDate: '17 Fév 2026',
  trend: '+12.5%'
})

// Fonctions pour les actions
const handleWithdrawal = () => {
  console.log('Retrait effectué')
  // Logique de retrait
}

const handleRecharge = () => {
  console.log('Rechargement effectué')
  // Logique de rechargement
}
</script>

<template>
  <b-card class="wallet-balance-card b-s-3-primary" no-body>
    <b-card-body>
      <div class="row align-items-center">
        <!-- Solde en haut -->
        <div class="col-md-4">
          <div class="d-flex align-items-center gap-3">
            <span class="bg-primary h-60 w-60 d-flex-center flex-column rounded-3">
              <i class="fas fa-wallet fa-lg"></i>
            </span>
            <div>
              <p class="text-dark f-w-600 mb-1">Solde Disponible</p>
              <h3 class="mb-0 text-primary f-w-700">
                {{ walletData.balance.toLocaleString('fr-FR') }} {{ walletData.currency }}
              </h3>
              <small class="text-success">
                <i class="fas fa-arrow-up me-1"></i>
                {{ walletData.trend }} vs mois dernier
              </small>
            </div>
          </div>
        </div>

        <!-- Retrait au milieu -->
        <div class="col-md-4 mt-3 mt-md-0">
          <div class="d-flex align-items-center gap-3">
            <span class="bg-warning h-60 w-60 d-flex-center flex-column rounded-3">
              <i class="fas fa-arrow-down fa-lg text-white"></i>
            </span>
            <div class="flex-grow-1">
              <p class="text-dark f-w-600 mb-1">Dernier Retrait</p>
              <h5 class="mb-1 text-warning f-w-600">
                {{ walletData.lastWithdrawal.toLocaleString('fr-FR') }} {{ walletData.currency }}
              </h5>
              <small class="text-muted">
                <i class="far fa-calendar me-1"></i>
                {{ walletData.withdrawalDate }}
              </small>
            </div>
          </div>
        </div>

        <!-- Rechargement en troisième position -->
        <div class="col-md-4 mt-3 mt-md-0">
          <div class="d-flex align-items-center gap-3">
            <span class="bg-success h-60 w-60 d-flex-center flex-column rounded-3">
              <i class="fas fa-arrow-up fa-lg text-white"></i>
            </span>
            <div class="flex-grow-1">
              <p class="text-dark f-w-600 mb-1">Dernier Rechargement</p>
              <h5 class="mb-1 text-success f-w-600">
                {{ walletData.lastRecharge.toLocaleString('fr-FR') }} {{ walletData.currency }}
              </h5>
              <small class="text-muted">
                <i class="far fa-calendar me-1"></i>
                {{ walletData.rechargeDate }}
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- Boutons d'action en bas -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="d-flex gap-3 justify-content-end">
            <b-button variant="outline-warning" size="sm" @click="handleWithdrawal">
              <i class="fas fa-arrow-down me-2"></i>
              Effectuer un retrait
            </b-button>
            <b-button variant="outline-success" size="sm" @click="handleRecharge">
              <i class="fas fa-arrow-up me-2"></i>
              Recharger le compte
            </b-button>
          </div>
        </div>
      </div>

      <!-- Indicateurs de performance (optionnel) -->
      <div class="row mt-3">
        <div class="col-12">
          <div class="d-flex gap-4">
            <b-badge bg="light-primary" class="px-3 py-2">
              <i class="fas fa-chart-line me-2 text-primary"></i>
              Transactions ce mois: 23
            </b-badge>
            <b-badge bg="light-warning" class="px-3 py-2">
              <i class="fas fa-clock me-2 text-warning"></i>
              Retrait en cours: 1
            </b-badge>
            <b-badge bg="light-success" class="px-3 py-2">
              <i class="fas fa-check-circle me-2 text-success"></i>
              Rechargement réussi: 5
            </b-badge>
          </div>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<style scoped>
.wallet-balance-card {
  transition: all 0.3s ease;
}

.wallet-balance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

/* Styles pour les icônes Font Awesome (si vous les utilisez) */
.fas, .far {
  font-size: 1.2rem;
}
</style>
