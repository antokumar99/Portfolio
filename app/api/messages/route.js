import { getAllMessages, markMessageRead, deleteMessage } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

async function auth() {
  return await getServerSession(authOptions);
}

export async function GET() {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const messages = await getAllMessages();
    const data = messages.map((m) => ({ ...m, id: m._id.toString(), _id: undefined }));
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await markMessageRead(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
