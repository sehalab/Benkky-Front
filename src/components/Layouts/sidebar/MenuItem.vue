<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SvgIcon from "@/components/Layouts/sidebar/SvgIcon.vue";

const props = defineProps({
  title: String,
  iconClass: String,
  type: String,
  path: String,
  badgeCount: [String, Number],
  links: Array,
  name: String,
  collapseId: String
});

const route = useRoute();

const isExternal = computed(() => {
  return props.path?.startsWith("http") || props.path?.startsWith("mailto:");
});

const isExternalLink = (url) => {
  return url?.startsWith("http") || url?.startsWith("mailto:");
};

const isOpen = ref(false);

const subOpen = ref([]);
if (props.links && props.links.length) {
  subOpen.value = props.links.map(() => false);
}

const toggleCollapse = () => {
  isOpen.value = !isOpen.value;
};

const toggleSubCollapse = (index) => {
  subOpen.value[index] = !subOpen.value[index];
};

const isActive = (linkPath) => linkPath === route.path;

const isMainActive = computed(() => {
  if (props.links && props.links.length) {
    return props.links.some(link => {
      if (link.path && route.path === link.path) return true;

      if (link.children) {
        return link.children.some(child => route.path === child.path);
      }

      return false;
    });
  }

  return props.path && route.path === props.path;
});

const badgeClasses = computed(() => {
  if (props.collapseId === "advance-ui") return "rounded-pill bg-warning";
  if (props.badgeCount === "new") return "bg-danger";
  return "text-primary-dark bg-primary";
});

const expandIfActive = () => {
  if (props.links && props.links.length) {
    props.links.forEach((link, index) => {
      if (link.path && route.path === link.path) {
        isOpen.value = true;
      }
      if (link.children) {
        link.children.forEach((child) => {
          if (route.path === child.path) {
            isOpen.value = true;
            subOpen.value[index] = true;
          }
        });
      }
    });
  }

  if (!isExternal.value && props.path && route.path === props.path) {
    isOpen.value = true;
  }
};

onMounted(() => {
  expandIfActive();
});

watch(
    () => route.path,
    () => {
      expandIfActive();
    }
);
</script>

<template>
  <template v-if="type === 'dropdown'">
    <li v-if="title" class="menu-title">
      <span>{{ title }}</span>
    </li>

    <li :class="{ active: isMainActive }">
      <a
          href="#"
          @click.prevent="toggleCollapse"
          :aria-expanded="isOpen.toString()"
          :aria-controls="collapseId"
          role="button"
      >
        <SvgIcon :iconId="iconClass" />
        {{ name }}

        <span
            v-if="badgeCount"
            :class="badgeClasses"
            class="badge badge-notification ms-2"
        >
          {{ badgeCount }}
        </span>
      </a>

      <ul v-show="isOpen" :id="collapseId" class="collapse show">
        <template v-for="(link, index) in links" :key="index">

          <li v-if="link.children" class="another-level">
            <a
                href="#"
                @click.prevent="toggleSubCollapse(index)"
                :aria-expanded="subOpen[index].toString()"
                :aria-controls="link.collapseId"
                role="button"
            >
              {{ link.name }}
            </a>

            <ul v-show="subOpen[index]" :id="link.collapseId" class="collapse show">
              <li
                  v-for="(child, uIndex) in link.children"
                  :key="uIndex"
                  :class="{ active: isActive(child.path) }"
              >
                <a
                    v-if="isExternalLink(child.path)"
                    :href="child.path"
                    target="_blank"
                    rel="noopener"
                >
                  {{ child.name }}
                </a>

                <RouterLink v-else :to="child.path">
                  {{ child.name }}
                </RouterLink>
              </li>
            </ul>
          </li>

          <li :class="{ active: isActive(link.path) }" v-else>
            <a
                v-if="isExternalLink(link.path)"
                :href="link.path"
                target="_blank"
                rel="noopener"
            >
              {{ link.name }}
            </a>

            <RouterLink v-else :to="link.path">
              {{ link.name }}
            </RouterLink>
          </li>

        </template>
      </ul>
    </li>
  </template>

  <template v-else>
    <li :class="['no-sub', isActive(path) ? 'active' : '']">
      <a v-if="isExternal" :href="path" target="_blank" rel="noopener">
        <SvgIcon :iconId="iconClass" />
        {{ name }}
      </a>
      <RouterLink v-else :to="path || ''">
        <SvgIcon :iconId="iconClass" />
        {{ name }}
      </RouterLink>
    </li>
  </template>
</template>
