<template>
  <div class="dropdown d-none d-sm-inline-block">
    <button class="btn btn-link btn-square btn-icon btn-link-header dropdown-toggle no-caret"
            type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i data-feather="grid"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-end width-300 pt-0 px-0 overflow-hidden">
      <div class="py-3 mb-2 dropdown-dontclose text-center">
        <h5 class="mb-0">Applications</h5>
        <p class="text-secondary small">Make your app innovative</p>
      </div>
      <div class="px-2">
        <div class="row g-2 text-center mb-2">
          <div class="col-4" v-for="app in applications" :key="app.id">
            <router-link class="dropdown-item square-item position-relative" :to="app.link">
              <div class="avatar avatar-40 rounded mb-2">
                <i :class="app.icon"></i>
              </div>
              <p class="mb-0">{{ app.name }}</p>
              <p class="fs-12 opacity-50 mb-2">{{ app.description }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="text-center">
        <router-link class="btn btn-link text-center" to="/applications">
          View all <i class="bi bi-arrow-right fs-14"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationsDropdown',
  data() {
    return {
      applications: [
        { id: 1, name: 'Finance', description: 'Accounting', icon: 'bi bi-bank fs-4 mx-0', link: '/finance' },
        { id: 2, name: 'Network', description: 'Stabilize', icon: 'bi bi-globe fs-4 mx-0', link: '/network' },
        { id: 3, name: 'Inventory', description: 'Assuring', icon: 'bi bi-box fs-4 mx-0', link: '/inventory' },
        { id: 4, name: 'Project', description: 'Management', icon: 'bi bi-folder fs-4 mx-0', link: '/projects' },
        { id: 5, name: 'Social', description: 'Tracking', icon: 'bi bi-people fs-4 mx-0', link: '/social' },
        { id: 6, name: 'eComm', description: 'Make-easy', icon: 'bi bi-journal-bookmark fs-4 mx-0', link: '/ecommerce' }
      ]
    }
  }
}
</script>
