// src/data/ticketData.js

// Helper functions for badge classes
export const getPriorityClass = (priority) => {
    switch(priority) {
        case 'High': return 'text-outline-success';
        case 'Medium': return 'text-outline-warning';
        case 'Lower': return 'text-outline-danger';
        default: return 'text-outline-secondary';
    }
};

export const getStatusClass = (status) => {
    switch(status) {
        case 'in progress': return 'text-outline-success';
        case 'open': return 'text-outline-primary';
        case 'closed': return 'text-outline-info';
        default: return 'text-outline-secondary';
    }
};

// Helper function to get current date in "8 jan 2024" format
export const getCurrentDateFormatted = () => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
};

// Helper function to get future date (7 days from now)
export const getFutureDateFormatted = () => {
    const future = new Date();
    future.setDate(future.getDate() + 7);
    const day = future.getDate();
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = monthNames[future.getMonth()];
    const year = future.getFullYear();
    return `${day} ${month} ${year}`;
};

// Helper function to format date for input field (from "8 jan 2024" to YYYY-MM-DD)
export const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';

    // Handle relative dates like "6 hours ago"
    if (dateStr.includes('hours') || dateStr.includes('ago')) {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    // Handle "8 jan 2024" format
    const months = {
        jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
        jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
    };

    const parts = dateStr.split(' ');
    if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = months[parts[1].toLowerCase()];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }

    return '';
};

// Helper function to format date for display (from YYYY-MM-DD to "8 jan 2024")
export const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const day = date.getDate();
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

// Initial ticket data
export const initialTicketData = [
    {
        id: 'AR 2044',
        agent: {
            name: 'Gavin Cortez',
            image: '/images/avtar/1.png',
            bgClass: 'text-bg-primary'
        },
        priority: { text: 'Medium', class: 'text-outline-warning' },
        title: 'Bug Report',
        status: { text: 'in progress', class: 'text-outline-success' },
        date: '1 jan 2024',
        dueDate: '3 feb 2024'
    },
    {
        id: 'AR 1763',
        agent: {
            name: 'Martena Mccray',
            image: '/images/avtar/14.png',
            bgClass: 'text-bg-dark'
        },
        priority: { text: 'lower', class: 'text-outline-danger' },
        title: 'Feature Request',
        status: { text: 'closed', class: 'text-outline-info' },
        date: '8 jan 2024',
        dueDate: '10 mar 2024'
    },
    {
        id: 'AR 7452',
        agent: {
            name: 'Gavin Joyce',
            image: '/images/avtar/10.png',
            bgClass: 'text-bg-info'
        },
        priority: { text: 'High', class: 'text-outline-success' },
        title: 'Performance Issue',
        status: { text: 'in progress', class: 'text-outline-success' },
        date: '14 jan 2024',
        dueDate: '30 jan 2024'
    },
    {
        id: 'AR 1023',
        agent: {
            name: 'Gloria Little',
            image: '/images/avtar/2.png',
            bgClass: 'text-bg-dark'
        },
        priority: { text: 'Medium', class: 'text-outline-warning' },
        title: 'Security Concern',
        status: { text: 'open', class: 'text-outline-primary' },
        date: '6 hours ago',
        dueDate: '12 feb 2024'
    },
    {
        id: 'AR 2305',
        agent: {
            name: 'Jena Gaines',
            image: '/images/avtar/08.png',
            bgClass: 'text-bg-dark'
        },
        priority: { text: 'High', class: 'text-outline-success' },
        title: 'User Access/Permissions',
        status: { text: 'closed', class: 'text-outline-info' },
        date: '6 hours ago',
        dueDate: '16 jan 2024'
    }
];