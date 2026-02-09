import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

// Layouts
import MainLayout from '@/components/layouts/MainLayout.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

// Pages publiques
const HomeView = () => import('@/views/HomeView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

// Auth pages
const AuthView = () => import('@/views/auth/AuthView.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')
const PasswordResetView = () => import('@/views/auth/PasswordResetView.vue')

// Dashboard pages
const DashboardView = () => import('@/views/dashboard/DashboardView.vue')
const WalletView = () => import('@/views/dashboard/WalletView.vue')
const CreditCardsView = () => import('@/views/dashboard/CreditCardsView.vue')
const ESimsView = () => import('@/views/dashboard/ESimsView.vue')
const MoneyTransferView = () => import('@/views/dashboard/MoneyTransferView.vue')
const CommunicationView = () => import('@/views/dashboard/CommunicationView.vue')
const TransactionsView = () => import('@/views/dashboard/TransactionsView.vue')
const SettingsView = () => import('@/views/dashboard/SettingsView.vue')

const routes = [
  // Route racine (page d'accueil)
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Accueil' }
  },

  // Routes d'authentification
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
          title: 'Connexion',
          guest: true,
          layoutProps: { hideHeader: true, hideFooter: true }
        }
      },
      {
        path: 'register',
        name: 'register',
        component: AuthView,
        props: { mode: 'register' },
        meta: {
          title: 'Inscription',
          guest: true,
          layoutProps: { hideHeader: true, hideFooter: true }
        }
      },
      {
        path: 'password/reset',
        name: 'password.request',
        component: AuthView,
        props: { mode: 'password.request' },
        meta: {
          title: 'Réinitialisation du mot de passe',
          guest: true,
          layoutProps: { hideHeader: true, hideFooter: true }
        }
      }
    ]
  },

  // Dashboard (zone protégée)
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminLayout,
    meta: {
      title: 'Tableau de bord',
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'dashboard.home',
        component: DashboardView,
        meta: { title: 'Tableau de bord' }
      },
      {
        path: 'wallet',
        name: 'dashboard.wallet',
        component: WalletView,
        meta: { title: 'Mon Portefeuille' }
      },
      {
        path: 'cards',
        name: 'dashboard.cards',
        component: CreditCardsView,
        meta: { title: 'Cartes de Crédit' }
      },
      {
        path: 'esims',
        name: 'dashboard.esims',
        component: ESimsView,
        meta: { title: 'eSIMs' }
      },
      {
        path: 'transfer',
        name: 'dashboard.transfer',
        component: MoneyTransferView,
        meta: { title: 'Envoyer de l\'argent' }
      },
      {
        path: 'communication',
        name: 'dashboard.communication',
        component: CommunicationView,
        meta: { title: 'Communications' }
      },
      {
        path: 'transactions',
        name: 'dashboard.transactions',
        component: TransactionsView,
        meta: { title: 'Historique' }
      },
      {
        path: 'settings',
        name: 'dashboard.settings',
        component: SettingsView,
        meta: { title: 'Paramètres' }
      }
    ]
  },

  // 404 - Doit être la dernière route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page non trouvée' }
  }
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

// Middleware de navigation
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const appStore = useAppStore()

  // Mettre à jour le titre de la page
  if (to.meta.title) {
    document.title = `${to.meta.title} - Benkky`
  }

  // Vérifier l'authentification
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
