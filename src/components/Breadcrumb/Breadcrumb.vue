<script setup>
const props = defineProps({
  breadcrumb: {
    type: Object,
    required: true,
    default: () => ({
      title: "",
      items: [],
    }),
  },
})
</script>

<template>
  <div class="row m-1">
    <div class="col-12">
      <!-- Page Title -->
      <h4 class="main-title">{{ props.breadcrumb.title }}</h4>

      <!-- Breadcrumbs -->
      <ul class="app-line-breadcrumbs mb-3">
        <li
            v-for="(item, index) in props.breadcrumb.items"
            :key="index"
        >
          <!-- If not active, render as link -->
          <template v-if="!item.active">
            <a
                class="f-s-14 f-w-500 text-decoration-none"
                :href="item.href || '#'"
            >
              <span>
                <!-- Render Phosphor Icon if passed -->
                <component
                    v-if="item.icon"
                    :is="item.icon"
                    size="16"
                    weight="duotone"
                />
                {{ item.label }}
              </span>
            </a>
          </template>

          <!-- If active, render as plain text -->
          <template v-else>
            <span class="f-s-14 f-w-500 text-primary">
              {{ item.label }}
            </span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
