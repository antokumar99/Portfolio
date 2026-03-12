// lib/data.js
// In production replace with a real DB (Prisma + PostgreSQL / Supabase)

export const projects = [
  {
    id: "1",
    title: "NeuralCart",
    description:
      "AI-powered e-commerce platform with real-time personalisation engine and dynamic pricing.",
    longDescription:
      "Built with Next.js, OpenAI embeddings for product recommendations, Stripe for payments, and Redis for session caching. Reduced cart abandonment by 34% in A/B tests. Features an admin panel with live analytics.",
    tags: ["Next.js", "OpenAI", "Stripe", "Redis", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: "2024-02-10",
  },
  {
    id: "2",
    title: "Void Analytics",
    description:
      "Real-time SaaS analytics dashboard with WebSocket streaming and D3 visualisations.",
    longDescription:
      "Multi-tenant platform processing 2M+ events/day. Stack: React, Node.js, ClickHouse, Kafka, Redis. Features custom charting, funnel analysis, user journey maps, and Slack/email alerts.",
    tags: ["React", "Node.js", "ClickHouse", "Kafka", "D3.js"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: "2024-04-18",
  },
  {
    id: "3",
    title: "Luminary CMS",
    description:
      "Headless CMS built for developers — GraphQL API, real-time previews, and version control.",
    longDescription:
      "Developer-first headless CMS with a visual block editor, Git-based content versioning, multi-language support, and edge-cached delivery via Cloudflare Workers.",
    tags: ["GraphQL", "TypeScript", "Cloudflare Workers", "Postgres"],
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: "2024-06-05",
  },
  {
    id: "4",
    title: "FlowForge",
    description:
      "Visual workflow automation tool — drag-and-drop pipeline builder with 60+ integrations.",
    tags: ["React Flow", "Node.js", "Docker", "RabbitMQ"],
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5734595e?w=900&q=80",
    githubUrl: "https://github.com",
    featured: false,
    createdAt: "2024-07-20",
  },
  {
    id: "5",
    title: "CodePulse",
    description:
      "Real-time collaborative code editor with AI suggestions and instant deployment.",
    tags: ["WebSockets", "Monaco Editor", "Docker", "Go"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
    githubUrl: "https://github.com",
    featured: false,
    createdAt: "2024-08-11",
  },
];

export const skills = [
  {
    id: "1",
    name: "React / Next.js",
    category: "Frontend",
    level: 96,
    icon: "⚛️",
  },
  {
    id: "2",
    name: "JavaScript (ES2024)",
    category: "Frontend",
    level: 95,
    icon: "⚡",
  },
  {
    id: "3",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 93,
    icon: "🎨",
  },
  { id: "4", name: "Node.js", category: "Backend", level: 90, icon: "🟢" },
  { id: "5", name: "PostgreSQL", category: "Backend", level: 85, icon: "🐘" },
  { id: "6", name: "Python", category: "Backend", level: 82, icon: "🐍" },
  { id: "8", name: "Docker", category: "DevOps", level: 82, icon: "🐳" },
  { id: "9", name: "AWS / Vercel", category: "DevOps", level: 78, icon: "☁️" },
  { id: "10", name: "Redis", category: "DevOps", level: 75, icon: "🔴" },
  { id: "11", name: "C++", category: "Language", level: 88, icon: "Cpp" },
  { id: "12", name: "Python", category: "Language", level: 85, icon: "Python" },
  {
    id: "13",
    name: "JavaScript",
    category: "Language",
    level: 95,
    icon: "JavaScript",
  },
];

export const messages = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@techventures.io",
    subject: "Partnership opportunity — AI project",
    message:
      "Hi! I discovered your portfolio through a mutual connection and I'm genuinely impressed by Void Analytics. We're building something similar in the fintech space and would love to explore a collaboration. Could we jump on a call this week?",
    read: false,
    createdAt: "2024-08-02T09:15:00Z",
  },
  {
    id: "2",
    name: "Tom Ekwueme",
    email: "tom@buildfast.co",
    subject: "Senior Engineer role — remote, $180k+",
    message:
      "Hey Alex — we're scaling our core platform team and your background in real-time systems is exactly what we need. The role is fully remote, equity-bearing, and the team is genuinely world-class. Worth a conversation?",
    read: true,
    createdAt: "2024-07-29T16:42:00Z",
  },
  {
    id: "3",
    name: "Mei Lin",
    email: "mei@designstudio.com",
    subject: "Freelance Next.js project",
    message:
      "Hello! We're a design studio looking for a developer to bring our Figma designs to life in Next.js. The project is an agency portfolio site with some unique scroll animations. Timeline is 6 weeks, budget is flexible.",
    read: false,
    createdAt: "2024-08-05T11:00:00Z",
  },
];

export const educations = [
  {
    id: "1",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Khulna University of Engineering & Technology",
    shortName: "KUET",
    location: "Khulna, Bangladesh",
    period: "2022 – Present",
    result: "CGPA 3.32 / 4.00",
    type: "degree",
    current: true,
    description:
      "Studied core CS fundamentals — algorithms, data structures, operating systems, and software engineering. Final year project focused on scalable real-time web architectures.",
    courses: ["Data Structures & Algorithms", "Operating Systems", "Database Systems", "Software Engineering"],
  },
  {
    id: "2",
    degree: "Higher Secondary School Certificate (HSC)",
    institution: "Madhupur Shahid Smrity Higher Secondary School",
    shortName: "MSSH",
    location: "Tangail, Dhaka",
    period: "2018 – 2020",
    result: "GPA 5.00 / 5.00",
    type: "degree",
    current: false,
    description:
      "Completed Higher Secondary education in Science group with distinction. Developed strong foundations in mathematics, physics, and analytical thinking.",
    courses: ["Physics", "Mathematics",],
  },
  {
    id: "3",
    degree: "Full-Stack Web Development",
    institution: "Basic to Advanced Web Development",
    shortName: "WEB",
    location: "Online",
    period: "2025",
    result: "Top 10% of cohort",
    type: "certification",
    current: false,
    description:
      "Intensive bootcamp covering modern full-stack development. Built 5 complete projects using React, Node.js, MongoDB, and deployed on Vercel and Railway.",
    courses: ["React & Next.js", "Node.js & Express", "MongoDB & Mongoose", "REST APIs"],
  },
  {
    id: "4",
    degree: "Next.js & Advanced React Patterns",
    institution: "Zero To Mastery Academy",
    shortName: "ZTM",
    location: "Online",
    period: "2025 – Present",
    result: "In Progress",
    type: "certification",
    current: true,
    description:
      "Deep dive into Next.js App Router, server components, performance optimisation, and advanced React patterns for production-grade applications.",
    courses: ["Next.js App Router", "Server Components", "Performance & Caching", "Testing"],
  },
]

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
