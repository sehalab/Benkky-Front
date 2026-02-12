import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

import MainLayout from '@/layouts/guest/MainLayout.vue'
import AdminLayout from '@/layouts/admin/AdminLayout.vue'
import DashboardPage from '@/pages/dashboard/Dashboard.vue'

const HomeView = () => import('@/pages/Home.vue')
const NotFoundView = () => import('@/pages/NotFound.vue')

const AuthView = () => import('@/pages/auth/AuthPage.vue')

const DashboardView = () => import('@/pages/dashboard/Dashboard.vue')
const WalletView = () => import('@/pages/dashboard/Wallet.vue')
const CreditCardsView = () => import('@/pages/dashboard/CreditCards.vue')
const ESimsView = () => import('@/pages/dashboard/ESims.vue')
const MoneyTransferView = () => import('@/pages/dashboard/MoneyTransfer.vue')
const CommunicationView = () => import('@/pages/dashboard/Communication.vue')
const TransactionsView = () => import('@/pages/dashboard/Transactions.vue')
const SettingsView = () => import('@/pages/dashboard/Settings.vue')


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          title: 'Accueil',
          layoutProps: {
            hideHeader: false,
            hideFooter: false,
            hidePreloader: false,
            showLanguageSwitcher: true,
          },
        },
      },
    ],
  },
  {
    path: '/auth',
    component: MainLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: AuthView,
        props: { mode: 'login' },
        meta: {
          title: 'Connexion | Inscription',
          guest: true,
          layoutProps: {
            hideHeader: true, // IMPORTANT: true pour cacher
            hideFooter: true, // IMPORTANT: true pour cacher
            hidePreloader: true, // IMPORTANT: true pour cacher
            showLanguageSwitcher: false,
          },
        },
      },
      {
        path: 'register',
        name: 'register',
        component: AuthView,
        props: { mode: 'register' },
        meta: {
          title: 'Inscription',
          guest: true,
          layoutProps: {
            hideHeader: true, // IMPORTANT: true pour cacher
            hideFooter: true, // IMPORTANT: true pour cacher
            hidePreloader: true, // IMPORTANT: true pour cacher
            showLanguageSwitcher: false,
          },
        },
      },
      {
        path: 'password/reset',
        name: 'password.request',
        component: AuthView,
        props: { mode: 'password.request' },
        meta: {
          title: 'Réinitialisation du mot de passe',
          guest: true,
          layoutProps: {
            hideHeader: true,
            hideFooter: true,
            hidePreloader: true,
            showLanguageSwitcher: false,
          },
        },
      },
    ],
  },

  // Dashboard (zone protégée)
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminLayout,
    meta: {
      title: 'Tableau de bord',
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        name: 'dashboard.home',
        component: DashboardView,
        meta: { title: 'Tableau de bord' },
      },
      {
        path: 'wallet',
        name: 'dashboard.wallet',
        component: WalletView,
        meta: { title: 'Mon Portefeuille' },
      },
      {
        path: 'cards',
        name: 'dashboard.cards',
        component: CreditCardsView,
        meta: { title: 'Cartes de Crédit' },
      },
      {
        path: 'esims',
        name: 'dashboard.esims',
        component: ESimsView,
        meta: { title: 'eSIMs' },
      },
      {
        path: 'transfer',
        name: 'dashboard.transfer',
        component: MoneyTransferView,
        meta: { title: "Envoyer de l'argent" },
      },
      {
        path: 'communication',
        name: 'dashboard.communication',
        component: CommunicationView,
        meta: { title: 'Communications' },
      },
      {
        path: 'transactions',
        name: 'dashboard.transactions',
        component: TransactionsView,
        meta: { title: 'Historique' },
      },
      {
        path: 'settings',
        name: 'dashboard.settings',
        component: SettingsView,
        meta: { title: 'Paramètres' },
      },
    ],
  },

  // AJOUT: Dashboard eCommerce (zone protégée)
{
  path: '/ecommerce',
  name: 'ecommerce',
  component: DashboardPage, // Vous pouvez créer une page dédiée pour l'eCommerce si nécessaire
  meta: {
    title: 'Dashboard eCommerce',
    requiresAuth: false,
    layoutProps: {
      hideHeader: true, // On cache le header Benkky
      hideFooter: true, // On cache le footer Benkky
      hidePreloader: false,
    },
  },
  children: [
    // ... routes enfants
  ],
},

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page non trouvée' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const appStore = useAppStore()

  if (to.meta.title) {
    document.title = `${to.meta.title} - Benkky`
  }

  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }

    // Vérifications supplémentaires
    if (to.meta.requiresVerifiedEmail && !authStore.user?.email_verified_at) {
      return next({ name: 'verification.notice' })
    }

    if (to.meta.requiresKyc && authStore.user?.kyc_status !== 'verified') {
      return next({ name: 'kyc' })
    }
  }

  // Rediriger les utilisateurs authentifiés qui tentent d'accéder aux pages "guest"
  if (to.meta.guest && isAuthenticated) {
    return next({ name: 'dashboard.home' })
  }

  // Charger l'utilisateur si authentifié mais données manquantes
  if (isAuthenticated && !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch (error) {
      console.error('Failed to fetch user:', error)
      await authStore.logout()
      return next({ name: 'login' })
    }
  }

  // Afficher le loading
  appStore.showLoading()

  next()
})

router.afterEach(() => {
  const appStore = useAppStore()

  // Cacher le loading après un délai
  setTimeout(() => {
    appStore.hideLoading()
  }, 300)
})

router.onError((error) => {
  console.error('Router error:', error)
  const appStore = useAppStore()
  appStore.hideLoading()
})

export default router
