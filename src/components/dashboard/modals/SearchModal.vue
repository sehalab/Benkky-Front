<template>
  <div class="modal fade" tabindex="-1" id="searchmodalfull" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content bg-none border-0">
        <div class="modal-body z-index-1">
          <!-- Search Input -->
          <div class="input-group input-group-md w-100 rounded search-wrap mb-3 mb-lg-4">
            <span class="input-group-text border-0 bg-none">
              <i data-feather="search"></i>
            </span>
            <input class="form-control form-control-lg pe-0 border-0 bg-none"
                   type="search"
                   placeholder="Type something here..."
                   id="searchglobal"
                   v-model="searchQuery"
                   @input="searchProducts">
            <div class="dropdown input-group-text border-0 px-2">
              <button class="dropdown-toggle btn btn-link btn-square no-caret"
                      type="button"
                      id="searchfilter"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                <i data-feather="sliders"></i>
              </button>
              <SearchFilters />
            </div>
          </div>

          <!-- Search Results -->
          <SearchResults :results="searchResults" />

          <!-- Cancel Button -->
          <div class="text-center">
            <button type="button" class="btn btn-link text-white" data-bs-dismiss="modal">Cancel Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilters from './SearchFilters.vue'
import SearchResults from './SearchResults.vue'

export default {
  name: 'SearchModal',
  components: {
    SearchFilters,
    SearchResults
  },
  data() {
    return {
      searchQuery: '',
      searchResults: []
    }
  },
  methods: {
    searchProducts() {
      // Simulation de recherche
      if (this.searchQuery.length > 2) {
        this.searchResults = [
          {
            id: 1,
            name: 'Bracelet Woman Platinum',
            price: 65.00,
            discount: 10,
            rating: 4.8,
            reviews: 15,
            stock: 6,
            wishlist: 36,
            image: '/assets/img/ecommerce/image-5.jpg',
            link: '/product/1'
          },
          {
            id: 2,
            name: 'Sofa single coco color',
            price: 152.00,
            discount: 0,
            rating: 4.5,
            reviews: 10,
            stock: 3,
            wishlist: 2,
            image: '/assets/img/ecommerce/image-6.jpg',
            link: '/product/2'
          },
          {
            id: 3,
            name: 'Shine Nails Hiclon',
            price: 8.00,
            discount: 10,
            rating: 4.3,
            reviews: 12,
            stock: 25,
            wishlist: 21,
            image: '/assets/img/ecommerce/image-7.jpg',
            link: '/product/3'
          }
        ]
      } else {
        this.searchResults = []
      }
    }
  }
}
</script>
