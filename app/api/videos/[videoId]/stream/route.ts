import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/r2/r2Client";


export async function GET(
  _req: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { videoId } = await params;

    const r2Key = await fetchQuery(api.video.queries.getR2Key, {
      videoId: videoId,
    }, {
      token: session.convexToken
    });

    if (!r2Key) {
      return new NextResponse("Forbidden", { status: 403 });
    }



    //console.log("Result\n",result);

    // 3️⃣ Generate signed URL
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: r2Key,
    });

    const signedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 180, // 3 minutes
    });

    // 4️⃣ Return signed URL
    return NextResponse.json({
      url: signedUrl,
    });

  } catch (error) {
    console.error("STREAM ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}