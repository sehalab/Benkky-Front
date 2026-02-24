<script setup>
import { BCard, BCardBody, BCol } from 'bootstrap-vue-next'

import {
  walletOverviewCards
} from '@/data/dashboard/project/TopCardsData.js'

import ProjectMeetingCard from "@/components/Widget/ProjectMeetingCard.vue"
import ProjectDetailsCard from "@/components/Widget/ProjectDetailsCard.vue"

// Fonctions pour les actions des boutons
const handleAction = (action, cardTitle) => {
  console.log(`Action: ${action} - Carte: ${cardTitle}`);
  // Ici vous pouvez ajouter la logique pour chaque action
  // Par exemple: ouvrir un modal, naviguer, etc.
}
</script>

<template>
  <!-- Les cartes Wallet avec boutons cliquables légèrement plus grands -->
  <b-col md="7" xxl="5">
    <b-card
        v-for="card in walletOverviewCards"
        :key="card.id"
        :class="`overview-details-box b-s-1-${card.borderColor}`"
        no-body
    >
      <b-card-body class="p-3">
        <div class="row g-0 align-items-center">
          <!-- Partie gauche - Icône -->
          <b-col cols="3" class="pe-2">
            <span
                :class="`bg-${card.bgColor} d-flex-center rounded-circle`"
                style="width: 60px; height: 60px;"
            >
              <i :class="card.icon" class="fa-xl text-white"></i>
            </span>
          </b-col>

          <!-- Partie milieu - Titre et boutons -->
          <b-col cols="5" class="px-1">
            <p class="text-dark f-w-600 txt-ellipsis-1 mb-2" style="font-size: 0.9rem;">
              {{ card.title }}
            </p>

            <!-- Boutons cliquables légèrement plus grands -->
            <div class="d-flex gap-1 flex-wrap">
              <!-- Premier bouton -->
              <button
                v-if="card.action1"
                @click="handleAction(card.action1, card.title)"
                :class="`btn-action btn-${card.borderColor}`"
              >
                <i :class="card.action1Icon" class="me-1"></i>
                {{ card.action1 }}
              </button>

              <!-- Deuxième bouton (si existe) -->
              <button
                v-if="card.action2"
                @click="handleAction(card.action2, card.title)"
                :class="`btn-action btn-${card.borderColor}-outline`"
              >
                <i :class="card.action2Icon" class="me-1"></i>
                {{ card.action2 }}
              </button>
            </div>
          </b-col>

          <!-- Partie droite - Montant -->
          <b-col cols="4" class="text-end ps-1">
            <p class="text-dark f-w-500 txt-ellipsis-1 mb-1" style="font-size: 0.75rem;">
              Montant
            </p>
            <span :class="`text-${card.textColor} f-w-700`" style="font-size: 1rem;">
              {{ card.amount }} {{ card.currency }}
            </span>
          </b-col>
        </div>
      </b-card-body>
    </b-card>
  </b-col>

  <b-col md="5" xxl="3">
    <ProjectMeetingCard />
  </b-col>

  <b-col md="7" lg="4">
    <ProjectDetailsCard/>
  </b-col>
</template>

<style scoped>
/* Styles pour garder la taille exacte des cartes */
.overview-details-box {
  margin-bottom: 1rem;
}

.b-card-body {
  padding: 0.75rem !important;
}

.d-flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.txt-ellipsis-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Bordures colorées */
.b-s-1-primary {
  border-left: 4px solid #0d543b;
}

.b-s-1-success {
  border-left: 4px solid #28a745;
}

.b-s-1-warning {
  border-left: 4px solid #ffc107;
}

/* Couleurs de fond */
.bg-primary {
  background: #0d543b !important;
}

.bg-success {
  background: #28a745 !important;
}

.bg-warning {
  background: #ffc107 !important;
}

/* Couleurs de texte */
.text-primary {
  color: #0d543b !important;
}

.text-success {
  color: #28a745 !important;
}

.text-warning {
  color: #ffc107 !important;
}

.f-w-500 {
  font-weight: 500;
}

.f-w-600 {
  font-weight: 600;
}

.f-w-700 {
  font-weight: 700;
}

/* Styles des boutons cliquables - LÉGÈREMENT PLUS GRANDS (+2px) */
.btn-action {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;  /* Augmenté de 0.2rem/0.5rem à 0.3rem/0.7rem */
  font-size: 0.8rem;        /* Augmenté de 0.7rem à 0.8rem */
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  white-space: nowrap;
  line-height: 1.3;         /* Légèrement augmenté */
}

/* Bouton plein pour action1 */
.btn-primary {
  background: #0d543b;
  color: white;
  border-color: #0d543b;
}

.btn-primary:hover {
  background: #0a402d;
}

.btn-success {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

.btn-success:hover {
  background: #1e7e34;
}

.btn-warning {
  background: #ffc107;
  color: white;
  border-color: #ffc107;
}

.btn-warning:hover {
  background: #d39e00;
}

/* Bouton outline pour action2 */
.btn-primary-outline {
  background: transparent;
  color: #0d543b;
  border-color: #0d543b;
}

.btn-primary-outline:hover {
  background: #0d543b;
  color: white;
}

.btn-success-outline {
  background: transparent;
  color: #28a745;
  border-color: #28a745;
}

.btn-success-outline:hover {
  background: #28a745;
  color: white;
}

.btn-warning-outline {
  background: transparent;
  color: #ffc107;
  border-color: #ffc107;
}

.btn-warning-outline:hover {
  background: #ffc107;
  color: white;
}

/* Icônes dans les boutons - LÉGÈREMENT PLUS GRANDES */
.btn-action i {
  font-size: 0.75rem;       /* Augmenté de 0.65rem à 0.75rem */
}

/* Ajustements pour les différentes cartes */
.btn-primary-outline {
  composes: btn-action;
}

.btn-success {
  composes: btn-action;
}

.btn-success-outline {
  composes: btn-action;
}

.btn-warning {
  composes: btn-action;
}

.btn-warning-outline {
  composes: btn-action;
}

/* Pour que les boutons restent sur une ligne */
.flex-wrap {
  flex-wrap: wrap;
}

.gap-1 {
  gap: 0.25rem;
}

/* Ajustements responsifs - garder la même hauteur */
@media (max-width: 1200px) {
  .btn-action {
    font-size: 0.75rem;      /* Augmenté de 0.65rem à 0.75rem */
    padding: 0.25rem 0.6rem; /* Augmenté de 0.15rem/0.4rem à 0.25rem/0.6rem */
  }

  .btn-action i {
    font-size: 0.7rem;       /* Augmenté de 0.6rem à 0.7rem */
  }

  .b-card-body {
    padding: 0.7rem !important;
  }

  span[style*="font-size: 1rem"] {
    font-size: 0.95rem !important;
  }
}

@media (max-width: 768px) {
  .btn-action {
    font-size: 0.7rem;       /* Augmenté de 0.6rem à 0.7rem */
    padding: 0.2rem 0.5rem;  /* Augmenté de 0.1rem/0.3rem à 0.2rem/0.5rem */
  }

  .btn-action i {
    font-size: 0.65rem;      /* Augmenté de 0.55rem à 0.65rem */
  }

  .d-flex.gap-1 {
    gap: 0.2rem;
  }

  div[style*="width: 60px"] {
    width: 55px !important;
    height: 55px !important;
  }

  .fa-xl {
    font-size: 1.6rem;
  }
}
</style>
