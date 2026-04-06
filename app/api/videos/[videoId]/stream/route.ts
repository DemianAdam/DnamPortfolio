import { api } from "@/convex/_generated/api";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/r2/r2Client";
import { apiHandler } from "@/lib/api/apiHandler";
import { NextResponse } from "next/server";

export const GET = apiHandler<"/api/videos/[videoId]/stream">(
  {},
  async (ctx) => {
    const r2Key = await ctx.convex.query(api.video.queries.getR2Key, {
      videoId: ctx.params.videoId,
    });

    const bucket = process.env.R2_BUCKET_NAME!;

    // ✅ ONLY sign the playlist (not segments)
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: r2Key,
    });

    const signedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 20, // 5 minutes (safe for playback start)
    });

    return { url: signedUrl }
  }
);