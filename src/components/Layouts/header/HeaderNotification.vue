<script setup>
import { ref } from 'vue'
import { BButton, BOffcanvas } from 'bootstrap-vue-next'
import { PhBell, PhTrash, PhBellRinging } from '@phosphor-icons/vue'


const showNotification = ref(false)

const notifications = ref([
  {
    id: 1,
    title: "Gene Hart wants to edit Report.doc",
    actions: [
      { text: "Approve", variant: "success" },
      { text: "Deny", variant: "danger" }
    ],
    time: "Sep 23"
  },
  {
    id: 2,
    title: "Hey Emery McKenzie, get ready: Your order from @Shopper.com",
    actions: [],
    time: "Sep 23"
  },
  {
    id: 3,
    title: "Simon Young shared a file called Dropdown.pdf",
    actions: [],
    time: "30 min"
  },
  {
    id: 4,
    title: "Becky G. Hayes added a comment to Final_Report.pdf",
    actions: [],
    time: "45 min"
  },
  {
    id: 5,
    title: "@Romaine invited you to a meeting",
    actions: [
      { text: "Join", variant: "success" },
      { text: "Decline", variant: "danger" }
    ],
    time: "1 hour ago"
  }
])

function toggleNotification() {
  showNotification.value = !showNotification.value
}

function removeNotification(id) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}
</script>

<template>
  <div>
    <!-- Notification Button -->
    <b-button
        variant="light-secondary"
        class="position-relative rounded-circle p-2"
        @click="toggleNotification"
    >
      <PhBell size="22" />
      <span
          class="position-absolute translate-middle p-1 bg-primary border border-light rounded-circle animate__animated animate__fadeIn animate__infinite animate__slower"
      ></span>
    </b-button>

    <!-- Offcanvas (single body fix) -->
    <b-offcanvas
        v-model="showNotification"
        placement="end"
        class="header-notification-canvas"
        body-class="app-scroll"
    >
    <!-- Header -->
    <template #header>
      <div class="d-flex justify-content-between align-items-center w-100">
        <h5 class="mb-0">Notifications</h5>
        <b-button
            aria-label="Close"
            class="btn-close"
            type="button"
            variant="link"
            @click="toggleNotification"
        ></b-button>
      </div>
    </template>

    <!-- Body Content -->

      <div v-if="notifications.length">
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-message head-box p-3 border-bottom d-flex align-items-start"
        >
          <div class="message-content-box flex-grow-1 pe-2">
            <router-link
                class="f-s-15 text-dark mb-2 d-block"
                to="read-email"
            >
              {{ notification.title }}
            </router-link>

            <div v-if="notification.actions.length">
              <a
                  v-for="(action, index) in notification.actions"
                  :key="index"
                  href="#"
                  class="d-inline-block f-w-500 me-2"
                  :class="{
                    'text-success': action.variant === 'success',
                    'text-danger': action.variant === 'danger'
                  }"
              >
                {{ action.text }}
              </a>
            </div>
          </div>

          <div class="text-end">
            <PhTrash
                size="18"
                class="text-danger cursor-pointer mb-2"
                @click="removeNotification(notification.id)"
            />
            <div>
                <span class="badge bg-light-primary text-primary">
                  {{ notification.time }}
                </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-4 px-3">
        <PhBellRinging size="50" class="text-primary mb-3" />
        <h6 class="mb-2">No Notifications</h6>
        <p class="text-dark">
          When new notifications arrive, they will appear here.
        </p>
      </div>

    </b-offcanvas>
  </div>
</template>


