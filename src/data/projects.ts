import type { Project } from "@/types";

/**
 * Projects shown in the portfolio.
 *
 * To add a project:
 *   1. Drop a cover image in /public/images/projects/<slug>.webp (1600×1000 recommended).
 *   2. Append an object to this array. `featured: true` gives it a large card at the top.
 *   3. Fill `links.github` / `links.demo` when available — empty links render as "coming soon".
 *
 * Several images per project: list every extra screenshot in `gallery` (public paths, any
 * number). They show as a thumbnail grid in the details modal, and the cover plus the whole
 * gallery open in one full-screen viewer with arrow-key navigation. A path whose file does
 * not exist yet renders a designed placeholder, so paths can be added before the screenshots.
 */
export const projects: Project[] = [
  {
  slug: 'spu-university-timetable-generator',

  title: 'SPU-University Timetable Generator',

  subtitle: 'AI-powered academic scheduling using genetic algorithms',

  summary:
    'A web-based intelligent scheduling system that automatically generates weekly timetables for private universities using genetic algorithms while optimizing academic and operational constraints.',

  description: [
    'Developed an intelligent web-based system for automatically generating weekly university timetables while addressing the complex academic and operational constraints involved in manual scheduling.',
    'Implemented a specialized genetic algorithm with a custom chromosome representation for timetable schedules and a multi-criteria fitness function to evaluate and optimize candidate solutions.',
    'Designed genetic operations including selection, crossover, and mutation to continuously improve timetable solutions and reduce scheduling conflicts.',
    'Integrated the scheduling algorithm with an interactive React and Vite frontend, providing a responsive interface for configuring scheduling constraints, managing parameters, and reviewing generated timetables.',
    'Connected the frontend to the backend business logic through dedicated APIs, enabling users to submit scheduling parameters, retrieve generated solutions, and update configuration settings dynamically.',
    'The system demonstrated rapid convergence toward an optimized solution, achieving a reported fitness value of 32 within 100 generations under the project evaluation setup.',
    'Designed the solution as an extensible platform that can help reduce the time and manual effort required for academic scheduling while minimizing scheduling errors and conflicts.',
  ],

  features: [
    'Automatic weekly timetable generation',
    'Genetic algorithm optimization',
    'Custom chromosome representation',
    'Multi-criteria fitness evaluation',
    'Selection, crossover, and mutation operators',
    'Conflict-aware scheduling',
    'Academic and operational constraint management',
    'Interactive scheduling parameters',
    'API-based frontend and backend integration',
    'Real-time timetable generation and results',
    'Responsive React interface',
    'Extensible scheduling architecture',
  ],

  tech: [
    'React.js',
    'Vite',
    'Genetic Algorithms',
    'Artificial Intelligence',
    'Optimization',
    'REST API',
  ],

  image: '/images/projects/spu/1.webp',

  imageAlt:
    'Screenshot of the University Timetable Generator web application',

  gallery: [
    '/images/projects/spu/2.webp',
    '/images/projects/spu/3.webp',
    '/images/projects/spu/4.webp',
    
  ],

  links: {
    github: '',
    demo: '',
  },

  visual: 'dashboard',

  featured: true,

  highlights: [
    'Artificial Intelligence',
    'Genetic Algorithms',
    'Optimization',
    'React.js',
    'Academic Scheduling',
  ],
},
  {
    slug: "citizen-reporting-platform",

    title: "Citizen Reporting Platform",

    subtitle: "AI-powered citizen incident reporting system",

    summary:
      "An AI-powered digital reporting platform that helps citizens submit incidents through a unified mobile application and automatically classifies reports to suggest the appropriate response department.",

    description: [
      "Developed an MVP digital platform designed to simplify citizen incident reporting by providing a unified mobile application for submitting reports without requiring users to know which authority handles each type of incident.",
      "Built an AI-powered classification workflow that analyzes the submitted report description and categorizes it into predefined incident types such as traffic accidents, fires, theft, medical emergencies, and assistance requests.",
      "Implemented a mobile application using React Native, Expo, and TypeScript, allowing citizens to create accounts, sign in, submit reports, and optionally attach images and geographic location data.",
      "Developed a backend using Node.js and Express.js with MongoDB for user, report, and application data management.",
      "Integrated a Large Language Model (LLM) to analyze and classify submitted reports and determine the appropriate destination within the experimental system, such as Police, Traffic, Ambulance, or Civil Defense.",
      "Developed a React.js-based administrative dashboard that allows system administrators to review report details, manage reports, and update their status while citizens can track the progress of their submitted reports.",
      "Designed the system with a modular architecture that can be extended in the future with real government integrations, improved geolocation services, real-time notifications, additional report categories, and more advanced AI models.",
    ],

    features: [
      "Unified citizen incident reporting",
      "AI-powered report classification",
      "LLM-based text analysis",
      "Incident category detection",
      "Simulated department routing",
      "Citizen account registration and authentication",
      "Report creation and status tracking",
      "Optional image attachments",
      "Optional geographic location",
      "Administrative dashboard",
      "Report management and status updates",
      "Mobile and web applications",
      "Extensible MVP architecture",
    ],

    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "LLM",
    ],

    image: "/images/projects/citizen/4.webp",

    imageAlt: "Screenshot of the AI-powered Citizen Reporting Platform",

    gallery: [
      "/images/projects/citizen/2.webp",
      "/images/projects/citizen/3.webp",
      "/images/projects/citizen/1.webp",
      "/images/projects/citizen/5.webp",
    ],

    links: {
      github: "",
      demo: "",
    },

    visual: "neural",

    featured: true,

    highlights: [
      "Artificial Intelligence",
      "Mobile Development",
      "LLM",
      "Full Stack",
      "React Native",
      "Backend",
    ],
  },
  {
    slug: "lung-ai-analysis-platform",

    title: "Lung AI Analysis Platform",

    subtitle: "AI-powered chest X-ray analysis platform",

    summary:
      "An AI-powered medical web platform for analyzing chest X-ray images and providing preliminary screening support for pneumonia and lung cancer using deep learning models.",

    description: [
      "Developed an integrated medical web platform that allows users to upload chest X-ray images and receive AI-powered preliminary analysis for pneumonia and lung cancer.",
      "Built a complete system using React, Vite, Node.js, Express, TypeScript, MongoDB, Python, and FastAPI, with a dedicated AI service separated from the main backend for better system organization and future model management.",
      "Integrated a YOLOv8-based model for pneumonia analysis and a DenseNet-based model for lung cancer analysis, with support for heatmap visualization when available.",
      "Implemented secure authentication, role-based access control, analysis history, administrative dashboards, and API-based communication between the frontend, backend, database, and AI service.",
    ],

    features: [
      "AI-powered chest X-ray analysis",
      "Preliminary pneumonia screening",
      "Preliminary lung cancer screening",
      "YOLOv8 model integration for pneumonia analysis",
      "DenseNet model integration for lung cancer analysis",
      "Heatmap visualization when available",
      "Secure JWT authentication",
      "Role-based access control for users and administrators",
      "Analysis history and result tracking",
      "Administrative dashboard with analytics",
      "REST API integration between system components",
      "Responsive React interface",
    ],

    tech: [
      "React.js",
      "Vite",
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Python",
      "FastAPI",
      "YOLOv8",
      "DenseNet",
      "JWT",
      "bcryptjs",
      "Axios",
    ],

    image: "/images/projects/lung/1.webp",

    imageAlt:
      "Screenshot of the Lung AI Analysis Platform for chest X-ray analysis",

    gallery: [
      "/images/projects/lung/2.webp",
      "/images/projects/lung/3.webp",
      "/images/projects/lung/4.webp",
      "/images/projects/lung/5.webp",
    ],

    links: {
      github: "",
      demo: "",
    },

    visual: "neural",

    featured: true,

    highlights: [
      "Artificial Intelligence",
      "Deep Learning",
      "Medical AI",
      "Full Stack",
    ],
  },
  {
    slug: "skin-lesion-classification",

    title: "Skin Lesion Classification",

    subtitle: "Deep learning-powered skin lesion analysis",

    summary:
      "A deep learning web application that analyzes digital skin lesion images and classifies them into predefined categories using a trained PyTorch model, providing class probabilities and confidence scores.",

    description: [
      "Developed a web-based medical AI system for analyzing digital skin lesion images using a deep learning image classification model.",
      "Built an integrated architecture consisting of a web interface, a Node.js and Express.js backend for authentication and analysis management, and an independent FastAPI service responsible for image processing and model inference using PyTorch.",
      "Implemented secure user authentication with JWT, file type and size validation, analysis history, MongoDB data storage, and dedicated image and result storage.",
      "The AI service returns the most probable lesion class along with its confidence score and the probabilities of all supported classes.",
      "Designed a clear separation between the frontend, backend, and AI inference service to simplify maintenance, experimentation, and future model replacement or upgrades.",
      "Integrated visual explanation support through Grad-CAM heatmaps to help visualize image regions considered relevant by the deep learning model when available.",
    ],

    features: [
      "Deep learning-based skin lesion classification",
      "Image upload and preprocessing",
      "Multi-class prediction with probability scores",
      "Confidence score for predicted class",
      "PyTorch model inference",
      "Independent FastAPI AI service",
      "JWT-based authentication",
      "File type and size validation",
      "Analysis history and result tracking",
      "MongoDB data storage",
      "Grad-CAM visual explanations when available",
      "Separated frontend, backend, and AI services",
      "Responsive web interface",
    ],

    tech: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "PyTorch",
      "MongoDB",
      "JWT",
      "Grad-CAM",
    ],

    image: "/images/projects/skin/1.webp",

    imageAlt: "Screenshot of the Skin Lesion Classification web application",

    gallery: [
      "/images/projects/skin/2.webp",
      "/images/projects/skin/3.webp",
      "/images/projects/skin/4.webp",
      "/images/projects/skin/5.webp",
    ],

    links: {
      github: "",
      demo: "",
    },

    visual: "neural",

    featured: true,

    highlights: [
      "Artificial Intelligence",
      "Deep Learning",
      "Computer Vision",
      "Medical AI",
      "PyTorch",
      "FastAPI",
    ],
  },
  
  {
    slug: "qastly-bnpl",

    title: "Qastly — Buy Now, Pay Later",

    subtitle: "Digital installment and BNPL mobile platform",

    summary:
      "A mobile BNPL platform designed for the Syrian market, connecting customers with local partners and enabling them to purchase products and services through structured interest-free installment plans.",

    description: [
      "Developed Qastly as a digital Buy Now, Pay Later (BNPL) platform designed for the Syrian market, providing users with a structured way to purchase selected products and services through installment plans.",
      "The initial version focuses on three main categories: electronics, furniture, and educational installments, allowing users to browse available offerings, review pricing and installment options, and submit installment purchase requests.",
      "Designed the platform around a local partner ecosystem where merchants and service providers can list their products or services and reach customers through a dedicated digital channel.",
      "Implemented an interest-free 0% installment model within the proposed business model, with Qastly receiving an 8% partner commission per transaction and an annual subscription model for regular users.",
      "Built the mobile application using React Native and TypeScript, with a backend powered by Node.js and Express.js and MongoDB with Mongoose for data management.",
      "Implemented authentication, session management, and role-based access control to organize secure access to user accounts, orders, installment plans, and platform features.",
      "Designed the user journey to cover the complete digital process from account creation and product discovery to installment request submission, order tracking, installment plan management, and payment history.",
    ],

    features: [
      "Buy Now, Pay Later (BNPL) experience",
      "Interest-free 0% installment plans",
      "Product and service browsing",
      "Electronics, furniture, and education categories",
      "Installment plan and pricing details",
      "Installment purchase requests",
      "Order status tracking",
      "Installment and payment history",
      "User account and profile management",
      "Local partner product and service listings",
      "Authentication and session management",
      "Role-based access control",
      "Structured backend and database architecture",
      "Responsive and mobile-first user experience",
    ],

    tech: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST API",
      "Authentication",
    ],

    image: "/images/projects/qastly/5.webp",

    imageAlt:
      "Screenshot of the Qastly dashboard listing installment orders and their status",

    gallery: [
      "/images/projects/qastly/1.webp",
      "/images/projects/qastly/2.webp",
      "/images/projects/qastly/3.webp",
      "/images/projects/qastly/4.webp",
      "/images/projects/qastly/6.webp",
    ],

    links: {
      github: "",
      demo: "",
    },

    visual: "commerce",

    featured: true,

    highlights: [
      "FinTech",
      "BNPL",
      "Mobile Development",
      "React Native",
      "Backend",
      "MongoDB",
    ],
  },
  {
    slug: "ecommerce-store",
    title: "E-Commerce Online Store",
    subtitle: "Laptops · Mobile phones · Headphones",
    summary:
      "A responsive online store for laptops, mobile phones and headphones with dark mode and a product-focused, modern shopping experience.",
    description: [
      "Responsive online store for laptops, mobile phones and headphones.",
      "Built around a product-focused UI with dark mode and a modern shopping experience.",
    ],
    features: [
      "Responsive design",
      "Dark mode",
      "Product-focused UI",
      "Modern shopping experience",
    ],
    tech: ["React.js", "Material UI", "CSS", "JavaScript", "PHP Laravel"],
    image: "/images/projects/ecommerce.webp",
    imageAlt: "Screenshot of the e-commerce online store",
    gallery: [],
    links: { github: "", demo: "" },
    visual: "commerce",
  },
 
 {
    slug: "teachlearn-academy",
    title: "TeachLearn Academy",
    subtitle: "E-learning web platform",
    summary:
      "A comprehensive e-learning platform for Information Technology courses with dedicated Admin, Student and Instructor dashboards, AI course recommendations and an intelligent chatbot.",
    description: [
      "Developed a comprehensive e-learning platform specializing in Information Technology courses.",
      "The platform includes three dedicated dashboards — Admin, Student and Instructor — and combines AI-powered course recommendations with an intelligent chatbot to deliver a personalized learning experience.",
    ],
    features: [
      "AI-powered course recommendation system",
      "Intelligent chatbot",
      "Admin, Student & Instructor dashboards",
      "Course management",
      "Student management",
      "Personalized learning experience",
    ],
    tech: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "Python",
      "Axios API",
      "ASP.NET Core",
      "Netlify",
    ],
    image: "/images/projects/teachlearn.webp",
    imageAlt:
      "Screenshot of the TeachLearn Academy e-learning platform dashboards",
    gallery: [],
    links: { github: "", demo: "" },
    visual: "dashboard",
    featured: false,
    highlights: ["AI Recommendations", "Chatbot", "3 Dashboards"],
  },
  {
    slug: "pet-shop",
    title: "Pet Shop",
    subtitle: "E-commerce for pet supplies",
    summary:
      "A responsive e-commerce platform for selling pet supplies and food.",
    description: [
      "Responsive e-commerce platform for selling pet supplies and food.",
    ],
    features: ["Pet supplies & food catalogue", "Responsive e-commerce layout"],
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP Laravel"],
    image: "/images/projects/pet-shop.webp",
    imageAlt: "Screenshot of the Pet Shop e-commerce platform",
    gallery: [],
    links: { github: "", demo: "" },
    visual: "shop",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
