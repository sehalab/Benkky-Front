<template>
  <footer class="adminuiux-footer has-adminuiux-sidebar mt-auto">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md col-lg py-2">
          <span class="small">
            Copyright @2024, Creatively designed by
            <a href="https://adminuiux.com" target="_blank">eCommuiux - Adminuiux</a> on Earth ❤️
          </span>
        </div>
        <div class="col-12 col-md-auto col-lg-auto align-self-center">
          <ul class="nav small">
            <li class="nav-item">
              <router-link class="nav-link" to="/help-center">Help</router-link>
            </li>
            <li class="nav-item">|</li>
            <li class="nav-item">
              <router-link class="nav-link" to="/terms-of-use">Terms of Use</router-link>
            </li>
            <li class="nav-item">|</li>
            <li class="nav-item">
              <router-link class="nav-link" to="/privacy-policy">Privacy Policy</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'DashboardFooter'
}
</script>
