<script setup>
import { ref, onMounted, watch } from 'vue'
import { BButton, BOffcanvas, BBadge } from 'bootstrap-vue-next'
import { PhGear } from '@phosphor-icons/vue'

// Theme key
const themeName = 'Ki-Admin-React-Theme'

// Local storage helpers
const getLocalStorageItem = (key, defaultValue) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(`${themeName}-${key}`)
    return value || defaultValue
  }
  return defaultValue
}

const setLocalStorageItem = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`${themeName}-${key}`, value)
  }
}


const componentToHex = (c) => {
  const num = Number(c);
  const hex = num.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

const rgbToHex = (r, g, b) => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};


// Reactive states
const sidebarOption = ref('vertical-sidebar')
const layoutOption = ref('ltr')
const colorOption = ref('default')
const textOption = ref('medium-text')
const show = ref(false)

// DOM refs
const navRefs = ref([])
const mainNavRef = ref(null)
const appWrapperRef = ref(null)

// Toggle handlers
const handleShow = () => (show.value = true)
const handleClose = () => (show.value = false)

// Apply all UI customizer options
const applyCustomizerOptions = () => {
  navRefs.value.forEach((nav) => {
    // Ensure it's a real DOM element
    if (nav instanceof HTMLElement) {
      nav.classList.remove('dark-sidebar', 'horizontal-sidebar', 'vertical-sidebar')
      nav.classList.add(sidebarOption.value)
    }
  })

  if (
      (sidebarOption.value === 'vertical-sidebar' ||
          sidebarOption.value === 'dark-sidebar') &&
      mainNavRef.value instanceof HTMLElement
  ) {
    mainNavRef.value.style.marginLeft = '0px'
    mainNavRef.value.style.marginRight = '0px'
  }

  document.body.setAttribute('text', textOption.value)
  document.body.className = layoutOption.value
  document.documentElement.setAttribute('dir', layoutOption.value)

  if (layoutOption.value === 'box-layout') {
    document.documentElement.removeAttribute('dir')
  }

  if (appWrapperRef.value instanceof HTMLElement) {
    const colors = ['default', 'gold', 'warm', 'happy', 'nature', 'hot']
    colors.forEach((color) => appWrapperRef.value.classList.remove(color))
    appWrapperRef.value.classList.add(colorOption.value)
  }
}


// Initialize options on mount
onMounted(() => {
  mainNavRef.value = document.querySelector('.main-nav')
  appWrapperRef.value = document.querySelector('.app-wrapper')
  navRefs.value = Array.from(document.querySelectorAll('nav'))

  // Load saved values
  sidebarOption.value = getLocalStorageItem('sidebar-option', 'vertical-sidebar')
  layoutOption.value = getLocalStorageItem('layout-option', 'ltr')
  colorOption.value = getLocalStorageItem('color-option', 'default')
  textOption.value = getLocalStorageItem('text-option', 'medium-text')

  applyCustomizerOptions()
})

// Watch changes
watch([sidebarOption, layoutOption, colorOption, textOption], () => {
  applyCustomizerOptions()
})

// Option handlers
const handleSidebarOptionChange = (option) => {
  sidebarOption.value = option
  setLocalStorageItem('sidebar-option', option)
}

const handleLayoutOptionChange = (option) => {
  layoutOption.value = option
  setLocalStorageItem('layout-option', option)
}

const handleColorOptionChange = (option) => {
  colorOption.value = option

  const tempElement = document.createElement('div')
  tempElement.className = option
  tempElement.style.display = 'none'
  document.body.appendChild(tempElement)

  const primaryColor = getComputedStyle(tempElement).getPropertyValue('--primary').trim()
  const secondaryColor = getComputedStyle(tempElement).getPropertyValue('--secondary').trim()

  if (primaryColor) {
    const [r, g, b] = primaryColor.split(',')
    if (r && g && b) {
      setLocalStorageItem('color-primary', rgbToHex(parseInt(r), parseInt(g), parseInt(b)))
    }
  }

  if (secondaryColor) {
    const [r, g, b] = secondaryColor.split(',')
    if (r && g && b) {
      setLocalStorageItem('color-secondary', rgbToHex(parseInt(r), parseInt(g), parseInt(b)))
    }
  }

  document.body.removeChild(tempElement)
  setLocalStorageItem('color-option', option)
}

const handleTextOptionChange = (option) => {
  textOption.value = option
  setLocalStorageItem('text-option', option)
}

const resetCustomizer = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear()
    window.location.reload()
  }
}
</script>

<template>
  <button class="customizer-btn" @click="handleShow">
    <PhGear size="24" />
  </button>

  <b-offcanvas
      v-model:show="show"
      :placement="layoutOption === 'rtl' ? 'start' : 'end'"
      class="app-customizer"
      no-body
      @hidden="handleClose"
  >
    <!-- Header -->
    <template #header>
      <h5 class="text-white">Admin Customizer</h5>
      <p class="text-white opacity-75 w-100">It's time to style according to your choice!</p>
      <b-button aria-label="Close" class="btn-close" variant="link" type="button" @click="handleClose" />
    </template>

    <!-- Body -->
    <div class="flex-grow-1 overflow-auto p-1">
      <div class="app-divider-v secondary py-3">
        <h6 class="mt-2">Sidebar option</h6>
      </div>
        <ul class="sidebar-option d-flex gap-1">
            <li
                v-for="option in ['vertical-sidebar', 'horizontal-sidebar', 'dark-sidebar']"
                :key="option"
                :class="{ selected: sidebarOption === option }"
                @click="handleSidebarOptionChange(option)"
            >
                <ul>
                    <!-- Vertical Sidebar -->
                    <template v-if="option === 'vertical-sidebar'">
                        <li class="header"></li>
                        <li class="sidebar"></li>
                        <li class="body">
                            <b-badge bg="secondary" class="b-r-6">Vertical</b-badge>
                        </li>
                    </template>

                    <!-- Horizontal Sidebar -->
                    <template v-else-if="option === 'horizontal-sidebar'">
                        <li class="header h-20">
                            <b-badge bg="secondary" class="b-r-6">Horizontal</b-badge>
                        </li>
                        <li class="body w-100"></li>
                    </template>

                    <!-- Dark Sidebar -->
                    <template v-else-if="option === 'dark-sidebar'">
                        <li class="header"></li>
                        <li class="sidebar bg-dark-600"></li>
                        <li class="body">
                            <b-badge bg="secondary" class="b-r-6">Dark</b-badge>
                        </li>
                    </template>
                </ul>
            </li>
        </ul>


        <div class="app-divider-v secondary py-3">
        <h6 class="mt-2">Layout option</h6>
      </div>
        <ul class="layout-option d-flex gap-1">
            <li
                v-for="option in ['ltr', 'rtl', 'box-layout']"
                :key="option"
                :class="{ selected: layoutOption === option }"
                @click="handleLayoutOptionChange(option)"
            >
                <ul>
                    <!-- LTR Layout -->
                    <template v-if="option === 'ltr'">
                        <li class="header"></li>
                        <li class="sidebar"></li>
                        <li class="body">
                            <b-badge bg="secondary" class="b-r-6">LTR</b-badge>
                        </li>
                    </template>

                    <!-- RTL Layout -->
                    <template v-else-if="option === 'rtl'">
                        <li class="header"></li>
                        <li class="body">
                            <b-badge bg="secondary" class="b-r-6">RTL</b-badge>
                        </li>
                        <li class="sidebar"></li>
                    </template>

                    <!-- Box Layout -->
                    <template v-else-if="option === 'box-layout'">
                        <li class="header"></li>
                        <li class="sidebar"></li>
                        <li class="body">
                            <b-badge bg="secondary" class="b-r-6">Box</b-badge>
                        </li>
                    </template>
                </ul>
            </li>
        </ul>


        <div class="app-divider-v secondary py-3">
        <h6 class="mt-2">Color Hint</h6>
      </div>
      <ul class="color-hint p-0 d-flex gap-1">
        <li
            v-for="color in ['default', 'gold', 'warm', 'happy', 'nature', 'hot']"
            :key="color"
            :class="['color', color, { selected: colorOption === color }]"
            @click="handleColorOptionChange(color)"
        >
          <div></div>
        </li>
      </ul>

      <div class="app-divider-v secondary py-3">
        <h6 class="mt-2">Text size</h6>
      </div>
      <ul class="text-size d-flex gap-1">
        <li
            v-for="size in ['small-text', 'medium-text', 'large-text']"
            :key="size"
            :class="{ selected: textOption === size }"
            @click="handleTextOptionChange(size)"
        >
          {{ size.split('-')[0] }}
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="offcanvas-footer p-2 border-top">
      <div class="d-flex gap-2">
        <b-button variant="danger" class="w-100" @click="resetCustomizer">Reset</b-button>
        <a
            class="btn btn-success w-100"
            href="https://themeforest.net/user/la-themes/portfolio"
            target="_blank"
        >Buy Now</a>
      </div>
      <div class="d-flex gap-2 mt-2">
        <a class="btn btn-primary w-100" href="mailto:teqlathemes@gmail.com">Support</a>
        <a
            class="btn btn-dark w-100"
            href="https://phpstack-1384472-5121645.cloudwaysapps.com/document/vue/ki-admin/index.html"
        >Document</a>
      </div>
    </div>
  </b-offcanvas>
</template>
