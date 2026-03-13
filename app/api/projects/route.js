import { getAllProjects, createProject, updateProject, deleteProject } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

async function auth() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function GET() {
  try {
    const projects = await getAllProjects();
    const data = projects.map((p) => ({ ...p, id: p._id.toString(), _id: undefined }));
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    await createProject(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, ...data } = await req.json();
    await updateProject(id, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
