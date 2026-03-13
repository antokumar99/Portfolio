import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

await mongoose.connect(process.env.MONGODB_URI);

// Define schemas inline for the seed script
const Project = mongoose.models.Project || mongoose.model("Project", new mongoose.Schema({
  title: String, description: String, longDescription: String,
  tags: [String], image: String, liveUrl: String, githubUrl: String,
  featured: Boolean, createdAt: Date,
}));

const Skill = mongoose.models.Skill || mongoose.model("Skill", new mongoose.Schema({
  name: String, category: String, level: Number, icon: String,
}));

// Clear existing
await Project.deleteMany({});
await Skill.deleteMany({});

// Seed projects
await Project.insertMany([
  {
    title: "NeuralCart",
    description: "AI-powered e-commerce with real-time personalisation.",
    longDescription: "Built with Next.js + OpenAI embeddings for product recommendations, Stripe for payments, and Redis caching.",
    tags: ["Next.js", "OpenAI", "Stripe", "Redis", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: new Date("2024-02-10"),
  },
  {
    title: "Void Analytics",
    description: "Real-time SaaS analytics dashboard with WebSocket streaming.",
    longDescription: "Multi-tenant platform processing 2M+ events/day.",
    tags: ["React", "Node.js", "ClickHouse", "Kafka", "D3.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: new Date("2024-04-18"),
  },
  {
    title: "Luminary CMS",
    description: "Headless CMS — GraphQL API, live previews, git-based versioning.",
    longDescription: "Developer-first CMS with visual block editor and edge-cached delivery.",
    tags: ["GraphQL", "Cloudflare Workers", "Postgres", "React"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: new Date("2024-06-05"),
  },
  {
    title: "FlowForge",
    description: "Visual no-code workflow automation with 60+ integrations.",
    longDescription: "Drag-and-drop builder for automating business workflows.",
    tags: ["React Flow", "Node.js", "Docker", "RabbitMQ"],
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5734595e?w=900&q=80",
    githubUrl: "https://github.com",
    featured: false,
    createdAt: new Date("2024-07-20"),
  },
  {
    title: "CodePulse",
    description: "Real-time collaborative code editor with AI completions.",
    longDescription: "Monaco-based editor with live collaboration and instant deployments.",
    tags: ["WebSockets", "Monaco Editor", "Docker", "Go"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
    githubUrl: "https://github.com",
    featured: false,
    createdAt: new Date("2024-08-11"),
  },
]);

// Seed skills
await Skill.insertMany([
  { name: "React / Next.js",   category: "Frontend", level: 96, icon: "⚛️" },
  { name: "JavaScript ES2024", category: "Frontend", level: 95, icon: "⚡" },
  { name: "Tailwind CSS",      category: "Frontend", level: 92, icon: "🎨" },
  { name: "Three.js / WebGL",  category: "Frontend", level: 72, icon: "🌐" },
  { name: "Node.js",           category: "Backend",  level: 90, icon: "🟢" },
  { name: "PostgreSQL",        category: "Backend",  level: 85, icon: "🐘" },
  { name: "Python",            category: "Backend",  level: 80, icon: "🐍" },
  { name: "GraphQL",           category: "Backend",  level: 78, icon: "◈"  },
  { name: "Docker",            category: "DevOps",   level: 82, icon: "🐳" },
  { name: "AWS / Vercel",      category: "DevOps",   level: 78, icon: "☁️" },
  { name: "Redis",             category: "DevOps",   level: 74, icon: "🔴" },
  { name: "Figma",             category: "Design",   level: 87, icon: "🎯" },
]);

console.log("✅ Database seeded!");
console.log("   5 projects inserted");
console.log("   12 skills inserted");

await mongoose.disconnect();