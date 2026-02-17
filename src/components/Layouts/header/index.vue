<script setup>
import HeaderApp from "@/components/Layouts/header/HeaderApp.vue";
import HeaderCart from "@/components/Layouts/header/HeaderCart.vue";
import DarkMode from "@/components/Layouts/header/DarkMode.vue";
import HeaderNotification from "@/components/Layouts/header/HeaderNotification.vue";
import {PhSquaresFour, PhMagnifyingGlass} from "@phosphor-icons/vue";
import HeaderLanguage from "@/components/Layouts/header/HeaderLanguage.vue";

const emit = defineEmits(['toggle-nav']);

const handleToggleClick = () => {
  emit('toggle-nav');
};
</script>

<template>
  <div>
    <header class="header-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 col-sm-4 d-flex align-items-center header-left p-0">
          <span class="header-toggle" @click="handleToggleClick">
                <PhSquaresFour :size="24" />
          </span>

            <div class="header-searchbar w-100">
              <form action="#" class="mx-sm-3 app-form app-icon-form ">
                <div class="position-relative">
                  <input aria-label="Search" class="form-control" placeholder="Search..."
                         type="search">
                  <PhMagnifyingGlass :size="19" />
                </div>
              </form>
            </div>
          </div>

          <div class="col-6 col-sm-8 d-flex align-items-center justify-content-end header-right p-0">
            <ul class="d-flex align-items-center">
              <li class="header-language">
                <HeaderLanguage />
              </li>
              <li class="header-apps">
                <HeaderApp />
              </li>
              <li class="header-cart">
                <HeaderCart />
              </li>
              <li class="header-dark" >
                <DarkMode />
              </li>
              <li class="header-notification">
                <HeaderNotification />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>