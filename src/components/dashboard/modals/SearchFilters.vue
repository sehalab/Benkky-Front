<template>
  <div class="dropdown-menu dropdown-menu-end dropdown-dontclose width-300" aria-labelledby="searchfilter">
    <ul class="nav adminuiux-nav" id="searchtab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="searchall-tab" data-bs-toggle="tab"
                data-bs-target="#searchall" type="button" role="tab" aria-controls="searchall"
                aria-selected="true" @click="setActiveTab('all')">
          All
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="searchorders-tab" data-bs-toggle="tab"
                data-bs-target="#searchorders" type="button" role="tab" aria-controls="searchorders"
                aria-selected="false" @click="setActiveTab('orders')">
          Orders
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="searchcontacts-tab" data-bs-toggle="tab"
                data-bs-target="#searchcontacts" type="button" role="tab" aria-controls="searchcontacts"
                aria-selected="false" @click="setActiveTab('contacts')">
          Contacts
        </button>
      </li>
    </ul>

    <div class="tab-content py-3" id="searchtabContent">
      <!-- All Tab -->
      <div class="tab-pane fade" :class="{ 'active show': activeTab === 'all' }"
           id="searchall" role="tabpanel" aria-labelledby="searchall-tab">
        <FilterOptions :filters="allFilters" />
      </div>

      <!-- Orders Tab -->
      <div class="tab-pane fade" :class="{ 'active show': activeTab === 'orders' }"
           id="searchorders" role="tabpanel" aria-labelledby="searchorders-tab">
        <FilterOptions :filters="orderFilters" />
      </div>

      <!-- Contacts Tab -->
      <div class="tab-pane fade" :class="{ 'active show': activeTab === 'contacts' }"
           id="searchcontacts" role="tabpanel" aria-labelledby="searchcontacts-tab">
        <FilterOptions :filters="contactFilters" />
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="">
      <div class="row">
        <div class="col">
          <button class="btn btn-link" @click="resetFilters">Reset</button>
        </div>
        <div class="col-auto">
          <button class="btn btn-theme" @click="applyFilters">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterOptions from './FilterOptions.vue'

export default {
  name: 'SearchFilters',
  components: {
    FilterOptions
  },
  data() {
    return {
      activeTab: 'all',
      allFilters: [
        { id: 'searchswitch1', label: 'Search apps', checked: false },
        { id: 'searchswitch2', label: 'Include Pages', checked: true },
        { id: 'searchswitch3', label: 'Internet resource', checked: true },
        { id: 'searchswitch4', label: 'News and Blogs', checked: false }
      ],
      orderFilters: [
        { id: 'searchswitch5', label: 'Show order ID', checked: false },
        { id: 'searchswitch6', label: 'International Order', checked: true },
        { id: 'searchswitch7', label: 'Taxable Product', checked: true },
        { id: 'searchswitch8', label: 'Published Product', checked: false }
      ],
      contactFilters: [
        { id: 'searchswitch9', label: 'Have email ID', checked: false },
        { id: 'searchswitch10', label: 'Have phone number', checked: true },
        { id: 'searchswitch11', label: 'Photo available', checked: true },
        { id: 'searchswitch12', label: 'Referral', checked: false }
      ]
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
    resetFilters() {
      // Réinitialiser tous les filtres
      const allFilters = [...this.allFilters, ...this.orderFilters, ...this.contactFilters]
      allFilters.forEach(filter => {
        filter.checked = false
      })
      this.$emit('filters-reset')
    },
    applyFilters() {
      const filters = {
        all: this.allFilters,
        orders: this.orderFilters,
        contacts: this.contactFilters
      }
      this.$emit('filters-applied', filters[this.activeTab])
    }
  }
}
</script>
