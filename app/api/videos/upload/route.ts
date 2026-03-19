import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { auth } from "@/auth";
import { ROLES } from "@/convex/user/types/role";
import { r2Client } from "@/lib/r2/r2Client";


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
  const extension = filename.split(".").pop();
  const r2Key = `videos/${uniqueId}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: r2Key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return NextResponse.json({
    uploadUrl,
    r2Key,
  });
}