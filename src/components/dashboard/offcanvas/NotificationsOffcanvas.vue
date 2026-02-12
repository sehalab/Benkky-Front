<template>
  <div class="offcanvas offcanvas-end shadow border-0 maxwidth-300" tabindex="-1"
       id="view-notification" data-bs-scroll="true" data-bs-backdrop="false">
    <div class="offcanvas-header border-bottom">
      <div class="flex-grow-1">
        <h6 class="mb-0">Notifications</h6>
        <p class="text-secondary">{{ notifications.length }} new updates</p>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <!-- Date Filter -->
    <div class="small text-center p-3 bg-theme-1-subtle text-theme-1 theme-blue">
      <div class="input-group">
        <input type="text" class="form-control" id="daterangepicker">
        <span class="input-group-text text-secondary">
          <i class="bi bi-calendar-week"></i>
        </span>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="offcanvas-body">
      <div v-for="notification in notifications" :key="notification.id"
           class="card bg-none mb-2">
        <div class="card-body">
          <div class="row gx-3">
            <div class="col-auto">
              <figure class="avatar avatar-30 coverimg rounded-circle">
                <img v-if="notification.avatar" :src="notification.avatar" alt="Avatar">
                <div v-else class="avatar avatar-30 rounded-circle"
                     :class="notification.iconClass">
                  <i v-if="notification.icon" :class="notification.icon"></i>
                  <p v-else class="h6 fw-medium">{{ notification.initials }}</p>
                </div>
              </figure>
            </div>
            <div class="col">
              <p class="small mb-2" v-html="notification.message"></p>
              <div class="row gx-3 gx-lg-4 align-items-center">
                <div class="col">
                  <p class="text-secondary small">{{ notification.time }}</p>
                </div>
                <div class="col-auto">
                  <a href="javascript:void(0)" class="btn btn-sm btn-square btn-link theme-red"
                     @click="deleteNotification(notification.id)">
                    <i class="bi bi-trash"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsOffcanvas',
  data() {
    return {
      notifications: [
        {
          id: 1,
          avatar: '/assets/img/modern-ai-image/user-2.jpg',
          message: '<a href="/profile">Alex Smith</a>, <a href="/profile">John McMillan</a> and <span class="fw-medium">36 others</span> are also ordered from same website',
          time: '2:14 pm',
          type: 'order'
        },
        {
          id: 2,
          initials: 'JM',
          iconClass: 'bg-theme-1 border border-theme-1',
          message: '<a href="/profile">Jack Mario</a> commented: "This one is most usable design with great user experience. w..."',
          time: '2 days ago',
          type: 'comment'
        },
        {
          id: 3,
          icon: 'bi bi-bell',
          iconClass: 'bg-warning text-white',
          message: 'Your subscription going to expire soon. Please <a href="/subscription">upgrade</a> to get service interrupt free.',
          time: '4 days ago',
          type: 'alert',
          alertClass: 'alert-warning'
        },
        {
          id: 4,
          avatar: '/assets/img/modern-ai-image/user-4.jpg',
          message: '<a href="/invoices">Roberto Carlos</a> has requested to send $120.00 money.',
          time: '6 days ago',
          type: 'money'
        },
        {
          id: 5,
          icon: 'bi bi-calendar-event',
          iconClass: 'bg-theme-1-subtle text-theme-1 theme-orange',
          title: 'Adminuiux: #1 HTML Templates',
          message: 'Learning for better user experience on Universal app. development',
          attendees: [
            { id: 1, avatar: '/assets/img/modern-ai-image/user-3.jpg', name: 'Mickey' },
            { id: 2, avatar: '/assets/img/modern-ai-image/user-4.jpg', name: 'Jacky' }
          ],
          time: '7 days ago',
          type: 'event'
        },
        {
          id: 6,
          avatar: '/assets/img/modern-ai-image/user-3.jpg',
          message: '<a href="/profile">The AdminUIUX</a> commented: "Thank you so much for this deep view at Adminuiux..."',
          time: '1 year ago',
          type: 'comment'
        }
      ]
    }
  },
  methods: {
    deleteNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    }
  },
  mounted() {
    // Initialiser le date picker
    if (typeof jQuery !== 'undefined' && jQuery().daterangepicker) {
      $('#daterangepicker').daterangepicker({
        opens: 'left'
      })
    }
  }
}
</script>
