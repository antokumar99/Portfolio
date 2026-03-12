import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Skill   from "@/models/Skill";
import Message from "@/models/Message";

// ─── Projects ───────────────────────────────
export async function getAllProjects() {
  await connectDB();
  return Project.find().sort({ createdAt: -1 }).lean();
}

export async function createProject(data) {
  await connectDB();
  return Project.create(data);
}

export async function updateProject(id, data) {
  await connectDB();
  return Project.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProject(id) {
  await connectDB();
  return Project.findByIdAndDelete(id);
}

// ─── Skills ─────────────────────────────────
export async function getAllSkills() {
  await connectDB();
  return Skill.find().lean();
}

export async function createSkill(data) {
  await connectDB();
  return Skill.create(data);
}

export async function updateSkill(id, data) {
  await connectDB();
  return Skill.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteSkill(id) {
  await connectDB();
  return Skill.findByIdAndDelete(id);
}

// ─── Messages ───────────────────────────────
export async function getAllMessages() {
  await connectDB();
  return Message.find().sort({ createdAt: -1 }).lean();
}

export async function createMessage(data) {
  await connectDB();
  return Message.create(data);
}

export async function markMessageRead(id) {
  await connectDB();
  return Message.findByIdAndUpdate(id, { read: true });
}

export async function deleteMessage(id) {
  await connectDB();
  return Message.findByIdAndDelete(id);
}