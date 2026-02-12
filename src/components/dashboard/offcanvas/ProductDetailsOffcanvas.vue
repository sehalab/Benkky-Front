<template>
  <div class="offcanvas offcanvas-end shadow border-0 maxwidth-dynamic" tabindex="-1"
       id="view-product" data-bs-scroll="true" data-bs-backdrop="false"
       aria-labelledby="view-productlabel" style="--mw-dynamic:450px; --bs-offcanvas-width:450px">

    <div class="offcanvas-header border-bottom">
      <div>
        <button class="btn btn-theme"><i class="bi bi-pencil"></i> Edit</button>
        <button class="btn btn-link mx-1"><i class="bi bi-copy"></i> Duplicate</button>
        <button class="btn btn-link mx-1"><i class="bi bi-printer"></i> Print</button>
        <div class="d-inline-block">
          <div class="dropdown">
            <button class="btn btn-link btn-square dropdown-toggle no-caret"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Orders <span class="badge text-bg-theme-1">15</span></a></li>
              <li><a class="dropdown-item" href="#">Manufacture</a></li>
              <li><a class="dropdown-item theme-red" href="#">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div class="offcanvas-body">
      <!-- Product Header -->
      <div class="row gx-3 align-items-center flex-nowrap offcanvas-title mb-3 mb-lg-4"
           id="view-productlabel">
        <div class="col-auto">
          <figure class="avatar avatar-100 coverimg rounded">
            <img :src="product.image" :alt="product.name">
          </figure>
        </div>
        <div class="col">
          <h5 class="mb-0 text-truncated">{{ product.name }}</h5>
          <p class="text-secondary mb-2">ID: {{ product.id }}</p>
          <p>
            <span class="badge badge-light"
                  :class="product.status === 'Active' ? 'text-bg-success' : 'text-bg-danger'">
              {{ product.status }}
            </span>
            <span class="badge badge-light text-bg-primary">{{ product.orders }} Orders</span>
          </p>
        </div>
      </div>

      <!-- Product Info -->
      <h6 class="mb-3">Product Info</h6>

      <dl class="row mb-2">
        <dt class="col-sm-3 text-secondary fw-normal">Category</dt>
        <dd class="col-sm-9">{{ product.category }}</dd>
      </dl>
      <dl class="row mb-2">
        <dt class="col-sm-3 text-secondary fw-normal">ID/SKU</dt>
        <dd class="col-sm-9">{{ product.sku }} <i class="bi bi-copy"></i></dd>
      </dl>
      <dl class="row mb-2">
        <dt class="col-sm-3 text-secondary fw-normal">Orders</dt>
        <dd class="col-sm-9">{{ product.currentOrders }} / {{ product.stock }} In stock</dd>
      </dl>
      <dl class="row mb-2">
        <dt class="col-sm-3 text-secondary fw-normal">Price</dt>
        <dd class="col-sm-9">
          $ {{ product.price.toFixed(2) }}<br>
          <small class="text-secondary">
            Discount $ {{ product.discount.toFixed(2) }} with Coupon
            <i class="bi bi-tag"></i> {{ product.discountPercent }}%
          </small>
        </dd>
      </dl>
      <dl class="row mb-2">
        <dt class="col-sm-3 text-secondary fw-normal">Total Sales</dt>
        <dd class="col-sm-9">{{ product.totalSales }}</dd>
      </dl>
      <dl class="row mb-2">
        <dt class="col-sm-3 text-secondary fw-normal">Status</dt>
        <dd class="col-sm-9">
          <div class="form-check form-switch d-inline-block mx-2">
            <input class="form-check-input" type="checkbox" role="switch"
                   id="flexSwitchCheckChecked" :checked="product.status === 'Active'"
                   @change="toggleProductStatus">
            <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailsOffcanvas',
  data() {
    return {
      product: {
        id: 'RT15246246',
        name: 'Chromiums Bagizard',
        image: '/assets/img/ecommerce/image-12.jpg',
        status: 'Active',
        orders: 15,
        category: 'Fashion → Woman',
        sku: 'RT15246246',
        currentOrders: 5,
        stock: 11,
        price: 49.00,
        discount: 10.00,
        discountPercent: 15,
        totalSales: 125
      }
    }
  },
  methods: {
    toggleProductStatus(event) {
      this.product.status = event.target.checked ? 'Active' : 'Inactive'
      this.$emit('status-changed', this.product)
    }
  }
}
</script>
