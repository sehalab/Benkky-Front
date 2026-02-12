<template>
  <div class="pageloader" v-if="isLoading">
    <div class="container h-100">
      <div class="row justify-content-center align-items-center text-center h-100 pb-ios">
        <div class="col-12 mb-auto pt-4"></div>
        <div class="col-auto">
          <img src="/assets/img/logo.svg" alt="Logo" class="height-80 mb-3">
          <p class="h2 mb-0 text-theme-accent-1">AdminUIUX</p>
          <p class="display-3 text-theme-1 fw-bold mb-4">eCommUIUX</p>
          <div class="loader12 mb-2 mx-auto"></div>
        </div>
        <div class="col-12 mt-auto pb-4">
          <p class="small text-secondary">Please wait we are preparing awesome things...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLoader',
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.pageloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader12 {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
