// Project detail data for ProjectDetailsCenter component
export const projectActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "posted a new",
    badge: "Design System",
    time: "2 hours ago",
    icon: "🎨",
    images: [
      "/images/profile-app/20.jpg",
      "/images/profile-app/21.jpg",
      "/images/profile-app/22.jpg"
    ]
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "commented on",
    badge: "Project Update",
    time: "4 hours ago",
    icon: "💬",
    feature: {
      title: "Need a feature",
      description: "We need to add a new feature to the dashboard for better user experience.",
      reactions: "12 likes",
      replies: "3 replies"
    }
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "shared a",
    badge: "Code Review",
    time: "6 hours ago",
    icon: "📝",
    images: [
      "/images/profile-app/23.jpg",
      "/images/profile-app/24.jpg"
    ],
    buttons: true
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "updated",
    badge: "Project Status",
    time: "8 hours ago",
    icon: "📊",
    feature: {
      title: "Project Milestone",
      description: "Completed the first milestone of the project successfully.",
      reactions: "8 likes",
      replies: "2 replies"
    }
  },
  {
    id: 5,
    user: "David Brown",
    action: "created",
    badge: "New Task",
    time: "1 day ago",
    icon: "✅",
    feature: {
      title: "Task Assignment",
      description: "Assigned new tasks to team members for the upcoming sprint.",
      reactions: "5 likes",
      replies: "1 reply"
    }
  }
];

// Project details data for ProjectDetailsLeft component
export const projectDetails = {
  name: "E-commerce Platform",
  manager: "Sarah Johnson",
  startDate: "2024-01-15",
  endDate: "2024-06-15",
  pricing: "$15,000",
  status: "In Progress"
};

// Team members data for ProjectDetailsLeft component
export const teamMembers = [
  {
    name: "John Doe",
    role: "Project Manager",
    imgSrc: "/images/avatar/1.png",
    color: "bg-primary",
    initial: "JD",
    bgColor: "primary"
  },
  {
    name: "Jane Smith",
    role: "UI/UX Designer",
    imgSrc: "/images/avatar/2.png",
    color: "bg-success",
    initial: "JS",
    bgColor: "secondary"
  },
  {
    name: "Mike Johnson",
    role: "Frontend Developer",
    imgSrc: "/images/avatar/3.png",
    color: "bg-info",
    initial: "MJ",
    bgColor: "dark"
  },
  {
    name: "Sarah Wilson",
    role: "Backend Developer",
    imgSrc: "/images/avatar/4.png",
    color: "bg-warning",
    initial: "SW",
    bgColor: "warning"
  },
  {
    name: "David Brown",
    role: "DevOps Engineer",
    imgSrc: "/images/avatar/5.png",
    color: "bg-danger",
    initial: "DB",
    bgColor: "danger"
  },
  {
    name: "Lisa Davis",
    role: "QA Tester",
    imgSrc: null,
    color: "bg-secondary",
    initial: "LD",
    bgColor: "secondary"
  }
];

// Project details 1 data for ProjectDetailsRight component
export const projectDetails1 = {
  description: "This is a comprehensive e-commerce platform designed to provide a seamless shopping experience for customers. The project includes modern UI/UX design, robust backend functionality, and advanced features like real-time inventory management, payment processing, and customer analytics.",
  taskInfo: "The project involves developing a full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Key tasks include user authentication, product catalog, shopping cart, order management, and admin dashboard.",
  backgroundInfo: "The client is a growing retail business looking to expand their online presence. They need a scalable platform that can handle high traffic and provide excellent user experience across all devices."
};

// Project files data for ProjectDetailsRight component
export const projectFiles = [
  {
    name: "Design Files",
    count: "12 files",
    size: "2.4 MB",
    icon: "/images/icons/file-manager-icon/file.png"
  },
  {
    name: "Documentation",
    count: "8 files",
    size: "1.2 MB",
    icon: "/images/icons/file-manager-icon/folder.png"
  },
  {
    name: "Source Code",
    count: "45 files",
    size: "8.7 MB",
    icon: "/images/icons/file-manager-icon/file.png"
  },
  {
    name: "Assets",
    count: "23 files",
    size: "15.3 MB",
    icon: "/images/icons/file-manager-icon/file.png"
  },
  {
    name: "Database",
    count: "3 files",
    size: "2.1 MB",
    icon: "/images/icons/file-manager-icon/zip.png"
  }
];
