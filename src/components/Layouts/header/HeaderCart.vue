<script setup>
import { ref, computed } from 'vue'
import { BButton, BOffcanvas } from 'bootstrap-vue-next'
import {
  PhShoppingCartSimple,
  PhTrash,
  PhStar,
  PhShoppingBagOpen,
} from '@phosphor-icons/vue'
import { IconEye } from '@tabler/icons-vue'


const showCart = ref(false)

const cartItems = ref([
  {
    id: 1,
    name: "Backpacks",
    rating: 3,
    size: "M",
    color: "Pink",
    price: 600.5,
    quantity: 1,
    image: "/images/header/cart/01.png"
  },
  {
    id: 2,
    name: "Women's Watch",
    rating: 4,
    size: "S",
    color: "Rose Gold",
    price: 519.1,
    quantity: 2,
    image: "/images/header/cart/05.png"
  },
  {
    id: 3,
    name: "Sandals",
    rating: 5,
    size: "8",
    color: "White",
    price: 390.0,
    quantity: 2,
    image: "/images/header/cart/04.png"
  },
  {
    id: 4,
    name: "Jackets",
    rating: 3,
    size: "XL",
    color: "Blue",
    price: 300.0,
    quantity: 2,
    image: "/images/header/cart/03.png"
  },
  {
    id: 5,
    name: "Shoes",
    rating: 3,
    size: "9",
    color: "White",
    price: 450.0,
    quantity: 1,
    image: "/images/header/cart/02.png"
  }
])


const total = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
)

function removeItem(id) {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

function toggleCart() {
  showCart.value = !showCart.value
}
</script>

<template>
  <div>

    <b-button
        variant="light-secondary"
        class="position-relative rounded-circle p-2"
        @click="toggleCart"
    >
      <PhShoppingCartSimple size="22" />
      <span class="position-absolute translate-middle badge rounded-pill bg-danger badge-notification">
        {{ cartItems.length }}
      </span>
    </b-button>

    <b-offcanvas
        v-model="showCart"
        placement="end"
        class="cart-offcanvas"
        body-class="app-scroll p-0"
    >
      <template #header>
        <h5 class="offcanvas-title">Cart</h5>
        <b-button
            aria-label="Close"
            class="btn-close"
            type="button"
            variant="link"
            @click="toggleCart"
        ></b-button>
      </template>


      <div v-if="cartItems.length" class="head-container">
        <div
            v-for="item in cartItems"
            :key="item.id"
            class="head-box d-flex align-items-center p-3 border-bottom"
        >
          <span class="b-1-light bg-light-primary h-45 w-45 d-flex-center b-r-6">
            <img :src="item.image" alt="cart item" class="img-fluid p-1" />
          </span>
          <div class="flex-grow-1 ms-2">
            <router-link
                to="product-details"
                target="_blank"
                class="mb-0 f-w-600 f-s-16 text-dark"
            >
              {{ item.name }}
              ({{ item.rating }}<PhStar size="12" class="text-warning" />)
            </router-link>
            <div class="text-dark">
              <span class="text-secondary f-w-400">size</span>: {{ item.size }}
              <span class="text-secondary f-w-400 ms-2">color</span>: {{ item.color }}
            </div>
          </div>
          <div class="text-end">
            <PhTrash
                size="18"
                class="text-danger cursor-pointer"
                @click="removeItem(item.id)"
            />
            <p class="text-muted f-w-500 mb-0">
              ${{ item.price.toFixed(2) }} x {{ item.quantity }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty Cart Message -->
      <div v-else class="text-center py-4 px-3">
        <PhShoppingBagOpen size="50" class="text-primary" />
        <h6 class="mb-2">Your Cart is Empty</h6>
        <p class="text-secondary mb-2">Add some items :)</p>
        <b-button
            variant="light-primary"
            size="sm"
            href="/apps/e-shop/product-details"
        >
          Shop Now
        </b-button>
      </div>

      <template #footer>
        <div class="p-3">
          <h6 class="text-muted f-w-600">
            Total <span class="float-end text-primary">${{ total }}</span>
          </h6>
          <div class="d-flex gap-2 mt-3">
            <b-button variant="primary" to="/apps/e-shop/cart" target="_blank">
              <IconEye size="20" stroke-width="1.5" /> View Cart
            </b-button>
            <b-button variant="success" href="/apps/e-shop/checkout" target="_blank">
              Checkout <i class="ti ti-shopping-cart"></i>
            </b-button>
          </div>
        </div>
      </template>
    </b-offcanvas>
  </div>
</template>
