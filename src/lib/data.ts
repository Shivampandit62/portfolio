export const PROFILE = {
  name: "Shivam Pandey",
  firstName: "Shivam",
  greeting: "HELLO, I'M",
  title: "Frontend Developer | Backend Developer | AI Enthusiast",
  location: "Uttar Pradesh, India",
  email: "shivampandey30791@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivam-pandey-b20088321",
  github: "https://github.com/Shivampandit62",
  photo: "/images/shiva.JPEG",
  status: "Open to Learning & Opportunities",
  heroDescription:
    "I build modern web experiences, explore backend technologies and experiment with AI-powered solutions to turn ideas into useful digital products.",
  about: [
    "I'm currently pursuing B.Tech in Computer Science Engineering. My interest in development started with learning how websites work, and gradually I began exploring frontend development, backend technologies and AI-powered applications.",
    "I enjoy working on projects where I can understand the complete development process, from creating the user interface to implementing backend functionality.",
    "I believe that practical projects and continuous learning are important for becoming a better developer. I like experimenting with technologies, solving development problems and turning ideas into working products.",
  ],
} as const;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SkillCategory = {
  category: string;
  icon: "layout" | "server" | "code" | "sparkles";
  skills: { name: string; note?: string }[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: "layout",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React", note: "Learning through practical projects" },
    ],
  },
  {
    category: "Backend Development",
    icon: "server",
    skills: [
      { name: "Node.js" },
      { name: "Backend Development" },
      { name: "API Integration" },
      { name: "Server-side Development" },
    ],
  },
  {
    category: "Programming",
    icon: "code",
    skills: [{ name: "Python" }],
  },
  {
    category: "AI & Development Tools",
    icon: "sparkles",
    skills: [
      { name: "AI-powered coding tools" },
      { name: "AI integration & experimentation" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
    ],
  },
];

export type Project = {
  index: string;
  name: string;
  status: "Live" | "Upcoming";
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: "blue" | "violet";
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Jivorax",
    status: "Live",
    description:
      "Jivorax is a web project developed by me to explore modern website design, frontend development and deployment. It represents my interest in creating clean digital experiences with attention to presentation, usability and responsive design.",
    stack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://jivorax.tech/",
    githubUrl: "https://github.com/Shivampandit62/jivorax",
    accent: "blue",
  },
  {
    index: "02",
    name: "News Portal",
    status: "Live",
    description:
      "A news portal website developed to explore website structure, content presentation and practical web development. The project focuses on organizing news content and presenting it through a user-friendly interface.",
    stack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Shivampandit62/News-Portal",
    accent: "violet",
  },
  {
    index: "03",
    name: "KnowBridge",
    status: "Upcoming",
    description:
      "KnowBridge is an upcoming learning platform concept focused on making complex information easier to understand. The idea is to explore how AI can support learning through simplified explanations, visual learning and interactive experiences.",
    stack: ["Concept in progress"],
    accent: "blue",
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech — Computer Science Engineering",
    institute: "Prasad Institute of Technology, Jaunpur",
    status: "Currently pursuing",
  },
  {
    degree: "Diploma — Computer Science Engineering",
    institute: "Prasad Polytechnic, Jaunpur",
    status: "Completed",
  },
  {
    degree: "Summer Training",
    institute: "Techphile Private Limited, Lucknow",
    status: "Completed",
  },
];

export const EXPLORING = [
  "Artificial Intelligence",
  "Machine Learning",
  "Python",
  "Backend Development",
  "API Integration",
  "Data Structures & Algorithms",
  "AI-powered web applications",
];

export const APPROACH = [
  {
    title: "Build",
    description:
      "I enjoy converting ideas into functional websites and applications.",
  },
  {
    title: "Explore",
    description:
      "I experiment with modern development tools, technologies and AI-powered workflows.",
  },
  {
    title: "Improve",
    description:
      "I continuously work on improving my coding, design and problem-solving skills.",
  },
];
