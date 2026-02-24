// data/dashboard/project/TopCardsData.js

// Vos données existantes pour taskOverviewCards
export const taskOverviewCards = [
    {
        id: 1,
        day: "overview.balance",
        date: "",
        borderColor: "primary",
        bgColor: "primary",
        badgeColor: "primary",
        textColor: "primary",
        providedTime: "6 Day's",
        workingTime: "60M",
        badgeValue: "80",
    },
    {
        id: 2,
        day: "DEPOT",
        date: "",
        borderColor: "success",
        bgColor: "success",
        badgeColor: "success",
        textColor: "success",
        providedTime: "8 Day's",
        workingTime: "40M",
        badgeValue: "152",
    },
    {
        id: 3,
        day: "RETRAIT",
        date: "",
        borderColor: "danger",
        bgColor: "danger",
        badgeColor: "danger",
        textColor: "danger",
        providedTime: "3 Week",
        workingTime: "80H",
        badgeValue: "200",
    },
]

// Vos données pour projectTasksLeft
export const projectTasksLeft = [
    {
        id: 1,
        title: "New Task Assigned",
        icon: "/images/icons/language/logo1.png",
        iconBg: "danger-200",
    },
    {
        id: 2,
        title: "Database Migration",
        icon: "/images/icons/language/logo5.png",
        iconBg: "success-200",
    },
    {
        id: 3,
        title: "New Task Assigned",
        icon: "/images/icons/language/logo6.png",
        iconBg: "info-200",
    },
]

// Vos données pour projectTasksRight
export const projectTasksRight = [
    {
        id: 4,
        title: "API Development Phase",
        icon: "/images/icons/language/logo4.png",
        iconBg: "primary-200",
    },
    {
        id: 5,
        title: "UI/UX Design Update",
        icon: "/images/icons/language/logo3.png",
        iconBg: "danger-200",
    },
    {
        id: 6,
        title: "New Task Assigned",
        icon: "/images/icons/language/logo2.png",
        iconBg: "info-200",
    },
]

// Votre fonction taskOverviewOptions
export const taskOverviewOptions = (color) => ({
    series: [
        {
            name: "Tasks",
            data: [18.5, 19.2, 20, 19.5, 21, 20.8, 19.9],
        },
    ],
    chart: {
        type: "line",
        height: 40,
        width: 100,
        offsetY: 0,
        offsetX: 0,
        toolbar: { show: false },
        sparkline: { enabled: true },
    },
    stroke: {
        width: 2,
        curve: "smooth",
    },
    dataLabels: { enabled: false },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            colorStops: [
                { offset: 0, color: `rgba(var(--${color}),.4)`, opacity: 1 },
                { offset: 100, color: `rgba(var(--${color}),.1)`, opacity: 1 },
            ],
        },
    },
    colors: [`rgba(var(--${color}))`],
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: false },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 40,
                    width: 60,
                },
            },
        },
    ],
})

// NOUVELLES DONNÉES À AJOUTER POUR LE WALLET
export const walletOverviewCards = [
    {
        id: 1,
        title: "Solde Principal",
        icon: "fas fa-wallet",
        borderColor: "primary",
        bgColor: "primary",
        textColor: "primary",
        badgeColor: "primary",
        amount: "25,430.75",
        currency: "USD",
        badgeValue: "ACTIF",
        lastUpdate: "17 Fév 2026, 14:30",
        action1: "Voir historique",
        action1Variant: "outline-primary",
        action1Icon: "fas fa-history",
        action2: null
    },
    {
        id: 2,
        title: "Dernier Rechargement",
        icon: "fas fa-arrow-up",
        borderColor: "success",
        bgColor: "success",
        textColor: "success",
        badgeColor: "success",
        amount: "5,000.00",
        currency: "USD",
        badgeValue: "RÉUSSI",
        transactionDate: "17 Fév 2026",
        status: "Confirmé",
        statusColor: "success",
        statusIcon: "fas fa-check-circle",
        action1: "Recharger",
        action1Variant: "success",
        action1Icon: "fas fa-plus-circle",
        action2: "Planifier",
        action2Variant: "outline-success",
        action2Icon: "far fa-calendar"
    },
    {
        id: 3,
        title: "Dernier Retrait",
        icon: "fas fa-arrow-down",
        borderColor: "warning",
        bgColor: "warning",
        textColor: "warning",
        badgeColor: "warning",
        amount: "1,250.00",
        currency: "USD",
        badgeValue: "EN ATTENTE",
        transactionDate: "15 Fév 2026",
        status: "En cours",
        statusColor: "warning",
        statusIcon: "fas fa-clock",
        action1: "Retirer",
        action1Variant: "warning",
        action1Icon: "fas fa-minus-circle",
        action2: "Annuler",
        action2Variant: "outline-warning",
        action2Icon: "fas fa-times"
    }
]
