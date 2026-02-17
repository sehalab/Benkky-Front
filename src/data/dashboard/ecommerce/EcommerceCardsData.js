// data/dashboard/ecommerce/EcommerceCardsData.js
import {
    PhCurrencyCircleDollar,
    PhXCircle,
    PhCertificate,
    PhUserCirclePlus,
    PhShoppingBagOpen,
    PhSealCheck,
    PhTruck,
    PhHouse,
    PhBellRinging
} from '@phosphor-icons/vue'

export const statCards = [
    {
        id: 1,
        value: "1.2M",
        title: "Total Sales",
        badgeText: "View Report",
        icon: PhCurrencyCircleDollar,
        bgColor: "primary",
        textColor: "primary",
        badgeBg: "light-primary",
    },
    {
        id: 2,
        value: "125",
        title: "Canceled Orders",
        badgeText: "Refunded",
        icon: PhXCircle,
        bgColor: "danger",
        textColor: "danger",
        badgeBg: "light-danger",
    },
    {
        id: 3,
        value: "95%",
        title: "Top Product",
        badgeText: "watch X200",
        icon: PhCertificate,
        bgColor: "warning",
        textColor: "warning",
        badgeBg: "light-dark",
    },
    {
        id: 4,
        value: "8.5k",
        title: "New Customers",
        badgeText: "Active",
        icon: PhUserCirclePlus,
        bgColor: "success",
        textColor: "success",
        badgeBg: "light-success",
    },
]

export const timelineItems = [
    {
        id: 1,
        title: "Order Placed",
        date: "Feb 14/25",
        time: "10:15 AM",
        icon: PhShoppingBagOpen,
        isCompleted: true,
    },
    {
        id: 2,
        title: "Order Confirmed",
        date: "Feb 14/25",
        time: "10:30 AM",
        icon: PhSealCheck,
        isCompleted: true,
    },
    {
        id: 3,
        title: "Shipped via Courier",
        date: "Feb 15/25",
        time: "9:00 AM",
        icon: PhTruck,
        isCompleted: false,
        iconBg: "bg-light-secondary",
        iconTextColor: "text-dark-400",
    },
    {
        id: 4,
        title: "Delivered",
        date: "Feb 18/25",
        time: "3:45 PM",
        icon: PhHouse,
        isCompleted: false,
        iconBg: "bg-light-secondary",
        iconTextColor: "text-dark-400",
    },
]

export const notifications = [
    {
        id: 1,
        type: "header",
        title: "Order Notifications List",
        subtitle: "Last 2H Updates",
        icon: PhBellRinging,
        badgeCount: 4,
    },
    {
        id: 2,
        type: "item",
        message: "New Order Received",
        time: "5 min ago",
        avatarText: "OR",
        avatarBg: "bg-primary",
    },
    {
        id: 3,
        type: "item",
        message: "Order #1024 has been shipped",
        time: "10 min ago",
        avatarImage: "/images/avatar/2.png",
        avatarBg: "bg-success-400",
    },
    {
        id: 4,
        type: "item",
        message: "Order #1022 has been canceled",
        time: "20 min ago",
        avatarImage: "/images/avatar/5.png",
        avatarBg: "bg-danger-400",
    },
    {
        id: 5,
        type: "item",
        message: "Order #1022 has been canceled",
        time: "20 min ago",
        avatarImage: "/images/avatar/5.png",
        avatarBg: "bg-danger-400",
    },
]

// Export all icons for component registration
export const icons = {
    PhCurrencyCircleDollar,
    PhXCircle,
    PhCertificate,
    PhUserCirclePlus,
    PhShoppingBagOpen,
    PhSealCheck,
    PhTruck,
    PhHouse,
    PhBellRinging
}