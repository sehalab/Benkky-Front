<template>
  <div v-if="results.length > 0">
    <!-- Results Header -->
    <div class="row gx-3 align-items-center mb-3">
      <div class="col">
        <h6 class="text-white">Results in Products ({{ results.length }})</h6>
      </div>
      <div class="col-auto">
        <router-link to="/products" class="btn btn-sm btn-link text-white">View All</router-link>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="row gx-3">
      <div class="col-12 col-md-6 col-lg-4" v-for="product in results" :key="product.id">
        <div class="card adminuiux-card mb-3 mb-lg-4">
          <router-link :to="product.link" class="rounded coverimg height-150 mb-2 m-1">
            <img :src="product.image" :alt="product.name">
          </router-link>
          <div class="card-body pt-1">
            <router-link :to="product.link" class="style-none">
              <h6 class="text-theme-1 text-truncated mb-2">{{ product.name }}</h6>
            </router-link>

            <!-- Rating and Price -->
            <div class="row gx-3 align-items-center mb-3">
              <div class="col">
                <p class="text-warning mb-0">
                  <i v-for="n in 5" :key="n"
                     :class="getStarClass(n, product.rating)"
                     class="bi"></i>
                </p>
                <p class="small text-secondary">{{ product.rating }} ({{ product.reviews }} reviews)</p>
              </div>
              <div class="col-auto">
                <h6 class="mb-0">${{ product.price.toFixed(2) }}</h6>
                <p v-if="product.discount > 0" class="small text-secondary">{{ product.discount }}% OFF</p>
                <p v-else class="small text-secondary">Bank Offer</p>
              </div>
            </div>

            <!-- Stock and Wishlist -->
            <div class="row gx-3 align-items-center">
              <div class="col">
                <p class="mb-0">{{ product.stock }} Item in stock</p>
                <p class="small text-secondary">In {{ product.wishlist }} wishlist</p>
              </div>
              <div class="col-auto">
                <router-link :to="product.link" class="btn btn-square btn-link">
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    results: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getStarClass(n, rating) {
      if (n <= Math.floor(rating)) {
        return 'bi-star-fill'
      } else if (n === Math.ceil(rating) && rating % 1 !== 0) {
        return 'bi-star-half'
      } else {
        return 'bi-star'
      }
    }
  }
}
</script>
