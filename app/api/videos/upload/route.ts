import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2";
import crypto from "crypto";
import { auth } from "@/auth";
import { ROLES } from "@/convex/user/roles";


export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!session.user || !session.role || session.role !== ROLES.ADMIN) {
    return new Response("Forbidden", { status: 403 });
  }


  const { filename, contentType } = await req.json();

  const uniqueId = crypto.randomUUID();
  const r2Key = `videos/${uniqueId}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: r2Key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return NextResponse.json({
    uploadUrl,
    r2Key,
  });
}

async function testUpload() {
  const file = new File(["hello world"], "test.txt", { type: "text/plain" });
  const res = await fetch("/api/r2/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType: file.type })
  });
  const { uploadUrl, r2Key } = await res.json();
  await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
  console.log("Uploaded with key:", r2Key);
}
testUpload();