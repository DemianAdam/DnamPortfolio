import { r2Client } from "@/lib/r2/r2Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  const { r2Key } = await req.json();

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: r2Key,
    })
  );

  return new Response("ok");
}