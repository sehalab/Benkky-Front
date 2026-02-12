<template>
  <div class="dropdown d-inline-block">
    <a class="dropdown-toggle btn btn-link btn-link-header style-none"
       id="userprofiledd" data-bs-toggle="dropdown" aria-expanded="false" role="button">
      <div class="row gx-0 d-inline-flex">
        <div class="col-auto align-self-center">
          <figure class="avatar avatar-28 rounded-circle coverimg vm">
            <img :src="user.avatar" alt="User" id="userphotoonboarding2">
          </figure>
        </div>
        <div class="col align-self-center d-none d-xl-block px-2 lh-14 text-start">
          <span class="mb-0 small">{{ user.name }}<br>
            <small class="opacity-75">{{ user.role }}</small>
          </span>
        </div>
      </div>
    </a>
    <div class="dropdown-menu dropdown-menu-end width-300 pt-0 px-0 sm-mi-45px" aria-labelledby="userprofiledd">
      <div class="rounded p-3 dropdown-dontclose">
        <div class="row gx-3 align-items-center">
          <div class="col-auto">
            <figure class="avatar avatar-60 rounded coverimg vm">
              <img :src="user.avatar" alt="User">
            </figure>
          </div>
          <div class="col">
            <h5 class="mb-1"><i class="bi bi-wallet2 me-2"></i> {{ formatCurrency(user.balance) }}</h5>
            <p class="small opacity-50">Available Balance</p>
          </div>
        </div>
      </div>
      <div class="px-2">
        <div><router-link class="dropdown-item" to="/profile"><i data-feather="user" class="avatar avatar-18 me-1"></i> My Profile</router-link></div>
        <div>
          <router-link class="dropdown-item" to="/dashboard">
            <div class="row g-0">
              <div class="col align-self-center"><i data-feather="layout" class="avatar avatar-18 me-1"></i> My Dashboard</div>
              <div class="col-auto avatar-group">
                <figure class="avatar avatar-20 coverimg rounded-circle" v-for="team in teamMembers" :key="team.id">
                  <img :src="team.avatar" :alt="team.name">
                </figure>
                <div class="avatar avatar-20 bg-theme-1 rounded-circle text-center vm">
                  <small class="fs-10 vm">9+</small>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div><router-link class="dropdown-item" to="/finance/earning"><i data-feather="dollar-sign" class="avatar avatar-18 me-1"></i> Earning</router-link></div>
        <div>
          <router-link class="dropdown-item" to="/subscription">
            <div class="row">
              <div class="col"><i data-feather="gift" class="avatar avatar-18 me-1"></i> Subscription</div>
              <div class="col-auto"><p class="small text-success">Upgrade</p></div>
              <div class="col-auto"><span class="arrow bi bi-chevron-right"></span></div>
            </div>
          </router-link>
        </div>
        <div class="dropdown open-left dropdown-dontclose">
          <a class="dropdown-item" data-bs-toggle="dropdown" aria-expanded="false" role="button">
            <div class="row">
              <div class="col"><i class="bi bi-translate avatar avatar-18 me-1"></i> Language</div>
              <div class="col-auto"><small class="vm">{{ currentLanguage }}</small> <i class="bi bi-translate"></i></div>
              <div class="col-auto"><span class="arrow bi bi-chevron-right"></span></div>
            </div>
          </a>
        </div>
        <div><router-link class="dropdown-item" to="/settings"><i data-feather="settings" class="avatar avatar-18 me-1"></i> Account Setting</router-link></div>
        <div><a class="dropdown-item theme-red" href="#" @click="logout"><i data-feather="power" class="avatar avatar-18 me-1"></i> Logout</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileDropdown',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentLanguage: 'EN',
      teamMembers: [
        { id: 1, name: 'User 1', avatar: '/assets/img/modern-ai-image/user-1.jpg' },
        { id: 2, name: 'User 2', avatar: '/assets/img/modern-ai-image/user-2.jpg' },
        { id: 3, name: 'User 4', avatar: '/assets/img/modern-ai-image/user-4.jpg' }
      ]
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    },
    logout() {
      // Logique de déconnexion
      this.$emit('logout')
    }
  }
}
</script>
