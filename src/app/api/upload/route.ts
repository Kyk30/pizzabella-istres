import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { uploadImage, deleteImage } from "@/lib/content";

// POST /api/upload - Upload an image
export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non supporté. Utilisez JPG, PNG, WebP ou GIF." },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Fichier trop volumineux. Maximum 5 Mo." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImage(filename, buffer, file.type);

    return NextResponse.json({ url });
  } catch (e) {
    console.error("Upload failed:", e);
    return NextResponse.json({ error: "Erreur lors de l'upload" }, { status: 500 });
  }
}

// DELETE /api/upload - Delete an image
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL requise" }, { status: 400 });
    }

    await deleteImage(url);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete failed:", e);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
