import { PhDeviceMobile , PhLaptop } from "@phosphor-icons/vue";
export const activities = [
  {
    id: 1,
    username: "John Doe",
    activity: "posted a new",
    post: "Design System",
    iconText: "D",
    iconColor: "bg-primary",
    icon: "ph ph-palette",
    content: "New design system components",
    badges: ["UI", "Design", "Components"],
    images: [
      "/images/profile-app/20.jpg",
      "/images/profile-app/21.jpg",
      "/images/profile-app/22.jpg"
    ],
    time: "2 hours ago",
    actions: [
      { label: "Like", color: "primary" },
      { label: "Comment", color: "outline-primary" }
    ]
  },
  {
    id: 2,
    username: "Jane Smith",
    activity: "commented on",
    post: "Project Update",
    iconText: "J",
    iconColor: "bg-success",
    icon: "ph ph-chat-circle",
    content: "Great progress on the project!",
    badges: ["Feedback", "Update"],
    time: "4 hours ago",
    actions: [
      { label: "Reply", color: "primary" }
    ]
  },
  {
    id: 3,
    username: "Mike Johnson",
    activity: "shared a",
    post: "Code Review",
    iconText: "M",
    iconColor: "bg-warning",
    icon: "ph ph-code",
    content: "Code review for new features",
    badges: ["Code", "Review", "Frontend"],
    images: [
      "/images/profile-app/23.jpg",
      "/images/profile-app/24.jpg"
    ],
    time: "6 hours ago",
    actions: [
      { label: "Approve", color: "success" },
      { label: "Request Changes", color: "danger" }
    ]
  }
];

export const weekActivities = [
  {
    id: 1,
    name: "Sarah Wilson",
    action: "completed",
    post: "User Research",
    iconText: "S",
    iconColor: "bg-info",
    content: "User Research Report",
    description: "Comprehensive analysis of user behavior patterns",
    reactions: "12 reactions",
    replies: "5 replies",
    buttonText1: "View Report",
    buttonText2: "Download PDF",
    time: "2 days ago"
  },
  {
    id: 2,
    name: "Alex Brown",
    action: "updated",
    post: "API Documentation",
    iconText: "A",
    iconColor: "bg-secondary",
    content: "API Documentation Update",
    description: "Updated endpoints and examples",
    reactions: "8 reactions",
    replies: "3 replies",
    buttonText1: "View Docs",
    buttonText2: "API Reference",
    time: "3 days ago"
  }
];

export const monthActivities = [
  {
    id: 1,
    user: "Emma Davis",
    reaction: "reacted to",
    post: "Product Launch",
    icon: "🎉",
    message: "Excited about the new product launch!",
    badges: ["Launch", "Product", "Marketing"],
    images: [
      "/images/draggable/02.jpg",
      "/images/draggable/04.jpg",
      "/images/draggable/01.jpg"
    ],
    buttons: [
      { label: "Learn More", class: "btn btn-primary" },
      { label: "Get Started", class: "btn btn-outline-primary" }
    ],
    time: "1 week ago"
  },
  {
    id: 2,
    user: "David Lee",
    reaction: "commented on",
    post: "Team Meeting",
    icon: "ph-duotone ph-users",
    message: "Great discussion in today's team meeting",
    badges: ["Meeting", "Team", "Discussion"],
    buttons: [
      { label: "View Notes", class: "btn btn-success" }
    ],
    time: "2 weeks ago"
  },
  {
    id: 3,
    user: "Lisa Chen",
    reaction: "shared",
    post: "Design Inspiration",
    icon: "✨",
    message: "Found some amazing design inspiration",
    badges: ["Design", "Inspiration", "Creative"],
    images: [
      "/images/profile-app/28.jpg"
    ],
    buttons: [
      { label: "View Gallery", class: "btn btn-info" }
    ],
    time: "3 weeks ago"
  }
];

// Connections data for ConnectionSettings component
export const connections = [
  {
    id: 1,
    title: "GitHub",
    description: "Connect your Google Drive account to sync files and documents across all your devices.",
    imgSrc: "/images/setting-app/geethub.png"
  },
  {
    id: 2,
    title: "Slack",
    description: "Integrate Dropbox to access your cloud storage and share files with your team.",
    imgSrc: "/images/setting-app/slack.png"
  },
  {
    id: 3,
    title: "Google",
    description: "Connect Slack to receive notifications and manage team communications.",
    imgSrc: "/images/setting-app/google.png"
  },
  {
    id: 4,
    title: "Figma",
    description: "Link your GitHub account to track commits and manage repositories.",
    imgSrc: "/images/setting-app/figma.png"
  },
  {
    id: 5,
    title: "Drive",
    description: "Integrate Microsoft Teams for video calls and team collaboration.",
    imgSrc: "/images/setting-app/drive.png"
  },
  {
    id: 6,
    title: "Drop Box",
    description: "Connect Trello to manage project boards and track task progress.",
    imgSrc: "/images/setting-app/drop-box.png"
  },
  {
    id: 7,
    title: "Facebook",
    description: "Integrate Zoom for video conferencing and webinar management.",
    imgSrc: "/images/setting-app/facebook.png"
  },
  {
    id: 8,
    title: "Instagram",
    description: "Connect Notion to sync notes, documents, and project documentation.",
    imgSrc: "/images/setting-app/instagram.png"
  },
  {
    id: 9,
    title: "Twitter",
    description: "Link Figma to collaborate on design projects and share prototypes.",
    imgSrc: "/images/setting-app/twitter.png"
  }
];

// Privacy options data for PrivacyCard component
export const privacyOptions = [
  {
    id: "public",
    value: "option1",
    label: "Public",
    description: "Anyone can view and access your project",
    icon: "ph-globe",
    color: "bg-primary"
  },
  {
    id: "private",
    value: "option2",
    label: "Private",
    description: "Only you can view and access your project",
    icon: "ph-lock",
    color: "bg-danger"
  },
  {
    id: "restricted",
    value: "option3",
    label: "Restricted",
    description: "Only invited users can view your project",
    icon: "ph-users",
    color: "bg-warning"
  },
  {
    id: "team",
    value: "option4",
    label: "Team Only",
    description: "Only team members can access your project",
    icon: "ph-users-three",
    color: "bg-info"
  }
];

// User options data for PrivacyCard component
export const userOptions = [
  {
    id: "all-users",
    value: "useroption1",
    label: "All Users",
    description: "Allow all users to interact with your project",
    icon: "ph-users",
    color: "bg-primary"
  },
  {
    id: "followers-only",
    value: "useroption2",
    label: "Followers Only",
    description: "Only your followers can interact with your project",
    icon: "ph-heart",
    color: "bg-success"
  },
  {
    id: "friends-only",
    value: "useroption3",
    label: "Friends Only",
    description: "Only your friends can interact with your project",
    icon: "ph-user-check",
    color: "bg-info"
  },
  {
    id: "no-interaction",
    value: "useroption4",
    label: "No Interaction",
    description: "No users can interact with your project",
    icon: "ph-prohibit",
    color: "bg-secondary"
  }
];

// Security items data for SecurityCard component
export const securityItems = [
  {
    icon: "🔐",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account by enabling two-factor authentication.",
    badge: {
      color: "success",
      icon: "✓",
      text: "Enabled"
    },
    button: {
      color: "outline-primary",
      text: "Manage"
    }
  },
  {
    icon: "📱",
    title: "SMS Authentication",
    description: "Receive verification codes via SMS for secure account access.",
    badge: {
      color: "warning",
      icon: "⚠",
      text: "Pending"
    },
    button: {
      color: "primary",
      text: "Setup"
    }
  },
  {
    icon: "🔑",
    title: "Recovery Codes",
    description: "Generate backup codes to access your account if you lose your device.",
    rightText: "5 codes remaining"
  },
  {
    icon: "🌐",
    title: "Login Activity",
    description: "Monitor recent login attempts and suspicious activity on your account.",
    button: {
      color: "outline-secondary",
      text: "View Activity"
    }
  }
];

// Left session list data
export const leftSessionList = [
  {
    name: "MacBook Pro",
    location: "San Francisco, CA",
    status: "online",
    iconColor: "primary",
    icon: PhLaptop ,
  },
  {
    name: "iPhone 13",
    location: "San Francisco, CA",
    status: "online",
    iconColor: "success",
    icon: PhDeviceMobile ,
  },
  {
    name: "iPad Air",
    location: "San Francisco, CA",
    status: "offline",
    iconColor: "info",
    icon: PhDeviceMobile ,
  },
];

// Right session list data
export const rightSessionList = [
  {
    name: "Windows PC",
    location: "New York, NY",
    status: "online",
    iconColor: "primary",
    icon: PhDeviceMobile ,
  },
  {
    name: "Android Phone",
    location: "New York, NY",
    status: "offline",
    iconColor: "success",
    icon: PhDeviceMobile,
  },
  {
    name: "Chrome Browser",
    location: "New York, NY",
    status: "online",
    iconColor: "warning",
    icon: PhDeviceMobile ,
  }
];
