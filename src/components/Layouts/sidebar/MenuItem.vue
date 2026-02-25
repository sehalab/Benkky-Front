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
          :aria-expanded="isOpen"
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

        <span class="dropdown-arrow" :class="{ 'open': isOpen }">▶</span>
      </a>

      <ul v-show="isOpen" :id="collapseId" class="collapse-menu">
        <template v-for="(link, index) in links" :key="index">

          <li v-if="link.children" class="another-level">
            <a
                href="#"
                @click.prevent="toggleSubCollapse(index)"
                :aria-expanded="subOpen[index]"
                :aria-controls="link.collapseId"
                role="button"
            >
              {{ link.name }}
              <span class="dropdown-arrow small" :class="{ 'open': subOpen[index] }">▶</span>
            </a>

            <ul v-show="subOpen[index]" :id="link.collapseId" class="collapse-submenu">
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

<style scoped>
.dropdown-arrow {
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(90deg);
}

.dropdown-arrow.small {
  font-size: 10px;
  margin-left: 4px;
}

.collapse-menu,
.collapse-submenu {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.collapse-submenu {
  padding-left: 20px;
}

.another-level > a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Style pour les liens actifs */
.router-link-active,
.active > a {
  color: #6BC4A6;
  background-color: rgba(106, 196, 166, 0.1);
}

/* Ajustements généraux */
a {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

a:hover {
  background-color: rgba(106, 196, 166, 0.1);
  color: #6BC4A6;
}

.menu-title {
  padding: 16px 16px 8px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-notification {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}



/* Supprimer les flèches Bootstrap par défaut */
.dropdown-toggle::after,
[data-bs-toggle="collapse"]::after,
.collapse-toggle::after,
a[aria-expanded]::after {
  display: none !important;
  content: none !important;
}

/* Supprimer les pseudo-éléments qui pourraient créer des carrés */
a[role="button"]::after,
a[href="#"]::after {
  display: none !important;
  content: none !important;
}

/* Supprimer les flèches des menus déroulants */
.nav-link.dropdown-toggle::after,
.nav-item.dropdown .dropdown-toggle::after {
  display: none !important;
  border: none !important;
  content: "" !important;
}

/* Supprimer les flèches des collapse */
.collapse-toggle::after,
[data-bs-toggle="collapse"]::after {
  display: none !important;
  transform: none !important;
}



</style>
