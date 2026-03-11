import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";
import { revalidatePath } from "next/cache";

// GET /api/content - Get current content
export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (e) {
    console.error("Failed to get content:", e);
    return NextResponse.json({ error: "Impossible de charger le contenu" }, { status: 500 });
  }
}

// PUT /api/content - Update content (requires auth)
export async function PUT(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const content = await request.json();

    // Basic validation
    if (!content.info || !content.menu || !content.hero) {
      return NextResponse.json(
        { error: "Données incomplètes" },
        { status: 400 }
      );
    }

    await saveContent(content);

    // Revalidate all public pages so changes appear immediately
    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/contact");

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Failed to save content:", e);
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde" },
      { status: 500 }
    );
  }
}
