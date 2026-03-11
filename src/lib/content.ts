import { SiteContent } from "./types";
import fs from "fs";
import path from "path";

const CONTENT_BLOB_KEY = "pizza-bella/content.json";
const isDev = process.env.NODE_ENV === "development";
const defaultContentPath = path.join(process.cwd(), "data", "content.json");

function getDefaultContent(): SiteContent {
  const raw = fs.readFileSync(defaultContentPath, "utf-8");
  return JSON.parse(raw);
}

export async function getContent(): Promise<SiteContent> {
  // In development, read from local file
  if (isDev) {
    return getDefaultContent();
  }

  // In production, try Vercel Blob first, then fall back to default
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: "pizza-bella/content" });
      const contentBlob = blobs.find((b) => b.pathname === CONTENT_BLOB_KEY);
      if (contentBlob) {
        const response = await fetch(contentBlob.url, { cache: "no-store" });
        if (response.ok) {
          return await response.json();
        }
      }
    }
  } catch (e) {
    console.warn("Failed to read from Vercel Blob, using default content:", e);
  }

  return getDefaultContent();
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (isDev) {
    // In development, write to local file
    fs.writeFileSync(defaultContentPath, JSON.stringify(content, null, 2), "utf-8");
    return;
  }

  // In production, save to Vercel Blob
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  const { put } = await import("@vercel/blob");
  await put(CONTENT_BLOB_KEY, JSON.stringify(content, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export async function uploadImage(
  filename: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  if (isDev) {
    // In development, save to public/images
    const uploadsDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);
    return `/images/${filename}`;
  }

  // In production, upload to Vercel Blob
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  const { put } = await import("@vercel/blob");
  const blob = await put(`pizza-bella/images/${filename}`, buffer, {
    access: "public",
    contentType,
  });
  return blob.url;
}

export async function deleteImage(url: string): Promise<void> {
  if (isDev) {
    // In development, delete from public/images
    const filename = url.replace("/images/", "");
    const filePath = path.join(process.cwd(), "public", "images", filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) return;

  try {
    const { del } = await import("@vercel/blob");
    await del(url);
  } catch (e) {
    console.warn("Failed to delete image from Vercel Blob:", e);
  }
}
