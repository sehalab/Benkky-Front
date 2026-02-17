<script setup>
import {
  BCard,
  BCardBody,
  BBadge,
  BButton,

} from 'bootstrap-vue-next'
</script>

<template>
  <b-card class="offer-card-box" no-body>
    <div class="circle-ribbon circle-left ribbon-danger b-4-white">
      50%
    </div>

    <b-card-body class="offer-card-body overflow-hidden">
      <div>
        <div class="d-flex justify-content-center gap-2 my-3">
          <b-badge class="text-primary f-s-10 bg-white-500">Clothing</b-badge>
          <b-badge class="text-primary f-s-10 bg-white-500">Toys</b-badge>
          <b-badge class="text-primary f-s-10 bg-white-500">
            Accessories
          </b-badge>
        </div>
        <h5 class="text-white mt-4">
          Super
          <span class="text-bg-primary p-1 f-s-26 f-w-700">Kids'</span>
          Weekend
          <br>
          <span class="text-danger highlight-word p-1">Sale</span>
        </h5>
      </div>
      <div>
        <b-button
            href="/apps/e-shop/product"
            target="_blank"
            class="btn-white f-w-500 w-100 my-2"
        >
          Shop Now
        </b-button>
        <router-link class="f-s-12 f-w-500 text-white text-d-underline" href="#" to="">
          Minimum purchase of $30 required. Online & in-store.
        </router-link>
      </div>
    </b-card-body>
  </b-card>
</template>

