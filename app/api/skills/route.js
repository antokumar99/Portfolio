import { getAllSkills, createSkill, updateSkill, deleteSkill } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

async function auth() {
  return await getServerSession(authOptions);
}

export async function GET() {
  try {
    const skills = await getAllSkills();
    const data = skills.map((s) => ({ ...s, id: s._id.toString(), _id: undefined }));
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    await createSkill(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, ...data } = await req.json();
    await updateSkill(id, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteSkill(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
