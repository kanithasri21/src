/**
 * SITE CONFIG — Edit this file to customize your entire portfolio.
 *
 * EmailJS setup:
 * 1. Create account at https://www.emailjs.com
 * 2. Add email service + template with fields: from_name, from_email, subject, message
 * 3. Fill serviceId, templateId, and publicKey below
 */

export type ProjectCategory = 'Frontend' | 'Full Stack' | 'React' | 'Other';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  category: ProjectCategory;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education{
  degree: string;
  institution: string;
  period: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export const siteConfig = {
  name: 'kanitha sri.M',
  title: 'B.Tech Student',
  tagline: 'Building futuristic web experiences with precision and creativity.',
  typingPhrases: [
    'Problem Solver',
    'Full Stack Engineer',
  ],
  email: 'kanithasri05@gmail.com',
  photo: '/images/profile.svg',
  resumePath: '\resume.pdf',

  social: {
    linkedin: 'https://linkedin.com/in/alexrivera',
    instagram: 'https://instagram.com/alexrivera',
    youtube: 'https://youtube.com/@alexrivera',
    github: 'https://github.com/kanithasri21',
  },

  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },

  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Resume', path: '/resume' },
    { label: 'Contact', path: '/contact' },
  ] as NavLink[],

  about: {
    summary: 'I am a passionate B.Tech student interested in software development and learning new technologies. I enjoy coding and continuously improving my technical skills to build innovative solutions.',

    education:[
     {
        degree: "B.Tech Artificial Intelligence and Data Science",
        institution: "Anna University ",
        period: "2024 – 2028",
      },
    ] as Education[],

    experience: [
      {
        role: "Full Stack Developer",
        company: "TechNova Solutions",
        period: "2024 – Present",
        description:
          "Lead development of SaaS dashboards and APIs serving 50k+ users. Architected React frontends and Node.js microservices with MongoDB.",
      },
      {
        role: "Frontend Developer",
        company: "PixelCraft Studio",
        period: "2025 – 2025",
        description:
          "Built responsive marketing sites and e-commerce UIs with React, Tailwind CSS, and Framer Motion animations.",
      },
      {
        role: "Junior Web Developer",
        company: "StartUp Labs",
        period: "2026 – 2027",
        description:
          "Developed landing pages, REST APIs with Express, and integrated third-party services for early-stage startups.",
      },
    ] as Experience[],
  },

  skills: {
    frontend: [
      { name: 'React JS', level: 95 },
      { name: 'JavaScript', level: 92 },
      { name: 'HTML', level: 98 },
      { name: 'CSS', level: 90 },
    ] as Skill[],
    backend: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
    ] as Skill[],
    database: [
      { name: 'MongoDB', level: 82 },
      { name: 'MySQL', level: 78 },
    ] as Skill[],
    tools: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 92 },
      { name: 'VS Code', level: 95 },
    ] as Skill[]
  },

  projectFilters: ['All', 'Frontend', 'Full Stack', 'React', 'Other'] as const,

  projects: [
    {
      id: '1',
      title: 'AI&ML',
      description:
        'A real-time analytics dashboard with interactive charts, dark mode, and role-based access control for enterprise teams.',
      image: '/images/project-1.svg',
      tech: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
      github: 'https://github.com/kanithasri21/src',
      live: 'https://nebula-demo.example.com',
      category: 'Full Stack',
    },
    {
      id: '2',
      title: 'Python for data science',
      description:
        'Open-source component library with glassmorphism cards, animated buttons, and accessible form primitives.',
      image: '/images/project-2.svg',
      tech: ['React', 'Framer Motion', 'CSS'],
      github: 'https://github.com/kanithasri21/src',
      live: 'https://pulse-ui.example.com',
      category: 'React',
    },
    {
      id: '3',
      title: 'web developing',
      description:
        'Premium SaaS landing page with scroll-triggered animations, 3D hero elements, and optimized conversion flows.',
      image: '/images/project-3.svg',
      tech: ['React', 'Three.js', 'Tailwind'],
      github: 'https://github.com/kanithasri21/src',
      live: 'https://aurora.example.com',
      category: 'Frontend',
    },
    {
      id: '4',
      title: 'python',
      description:
        'RESTful task management API with JWT auth, MongoDB persistence, and comprehensive error handling.',
      image: '/images/project-4.svg',
      tech: ['Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/kanithasri21/src',
      live: 'https://taskflow-api.example.com',
      category: 'Full Stack',
    }
  ] as Project[],
};
