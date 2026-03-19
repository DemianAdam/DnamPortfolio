import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/r2/r2Client";
//import { apiHandler } from "@/lib/apiHandler";
import { apiHandler } from "@/lib/api/apiHandler"

export const GET = apiHandler<"/api/videos/[videoId]/stream">({
}, async (ctx) => {

  const r2Key = await fetchQuery(api.video.queries.getR2Key, {
    videoId: ctx.params.videoId,
  });


  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: r2Key,
  });

  const signedUrl = await getSignedUrl(r2Client, command, {
    expiresIn: 20
  });

  return NextResponse.redirect(signedUrl)
});