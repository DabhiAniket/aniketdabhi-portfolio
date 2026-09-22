import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiLaravel,
  SiDjango,
  SiFastapi,
} from "react-icons/si";

export const personalData = {
  name: "Aniket Dabhi",
  role: "Full-Stack Software Developer",
  summary:
    "Full-Stack Software Developer with production experience in Laravel, Python FastAPI, Microservices, and REST API development, plus strong frontend skills in React.js, Tailwind CSS, and the MERN stack. Experienced in building scalable web applications, optimizing APIs, integrating backend services, and developing production-ready software systems.",
  contact: {
    email: "aniketdabhi180@gmail.com",
    phone: "+91 81285 16165",
    linkedin: "https://linkedin.com/in/aniketdabhi",
    github: "https://github.com/DabhiAniket",
  },
};

export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Frontend Development",
        icons: [
          <FaHtml5 key="html" />,
          <FaCss3 key="css" />,
          <FaJs key="js" />,
          <FaReact key="react" />,
          <SiTailwindcss key="tailwind" />,
        ],
      },
      {
        title: "Backend Development",
        icons: [
          <FaNodeJs key="node" />,
          <SiExpress key="express" />,
          <FaPhp key="php" />,
          <SiLaravel key="laravel" />,
          <FaPython key="python" />,
          <SiDjango key="django" />,
          <SiFastapi key="fastapi" />,
        ],
      },
      {
        title: "Databases",
        icons: [
          <SiMongodb key="mongodb" />,
          <SiMysql key="mysql" />,
          <SiPostgresql key="postgresql" />,
        ],
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Software Developer - Autobits",
        stage: "May 2026 – Present",
      },
      {
        title: "Junior Software Developer - Uest EdTech",
        stage: "Jan 2026 – Apr 2026",
      },
      {
        title: "Lab Assistant - Noble University",
        stage: "Oct 2025 – Present",
      },
      {
        title: "MERN Stack Developer Intern - Code Technologies",
        stage: "Jun 2025 – Jul 2025",
      },
      {
        title: "Web Developer Intern - Zidio Development",
        stage: "Apr 2025 – May 2025",
      },
      {
        title: "Data Entry Operator - Freelance",
        stage: "Dec 2022 – Nov 2023",
      },
    ],
  },
  {
    title: "education",
    info: [
      {
        title: "MCA - Noble University",
        stage: "2024 – 2026",
      },
      {
        title: "BCA - Shree Saurabh Arts College",
        stage: "2021 – 2024",
      },
      {
        title: "12th (GSEB) - Shree Sarvodaya High School",
        stage: "2021",
      },
      {
        title: "10th (GSEB) - Shree H.V.M. School",
        stage: "2019",
      },
    ],
  },
  {
    title: "achievements",
    info: [
      {
        title: "Employee of the Month - Uest EdTech",
        stage: "Feb 2026",
      },
      {
        title: "Runner-Up - Code Carnival National Hackathon",
        stage: "Oct 2025",
      },
    ],
  },
];

export const workData = {
  slides: [
    {
      images: [
        {
          title: "Social Media Web Application",
          path: "/thumb1.jpg",
          link: "https://friend-zone-client-omega.vercel.app/",
        },
        {
          title: "Student Innovation – National Hackathon",
          path: "/thumb2.jpg",
          link: "#",
        },
      ],
    },
  ],
};

import {
  RxCrop,
  RxDesktop,
  RxRocket,
} from "react-icons/rx";
export const servicesData = [
  {
    icon: <RxDesktop />,
    title: "Frontend Development",
    description: "I build responsive, modern and user-friendly web interfaces with clean component-based architecture and a strong focus on performance and usability. Technologies: React.js, JavaScript, HTML5, CSS3, Tailwind CSS, React Router, Redux Toolkit.",
  },
  {
    icon: <RxDesktop />,
    title: "Web Development",
    description: "Building responsive, fast, and scalable applications.",
  },
  {
    icon: <RxRocket />,
    title: "Backend APIs",
    description: "Designing robust microservices and REST APIs.",
  },
  {
    icon: <RxCrop />,
    title: "Database Design",
    description: "Optimizing databases with MongoDB, MySQL, and PostgreSQL.",
  },
];
