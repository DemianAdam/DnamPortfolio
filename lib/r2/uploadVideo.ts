export async function uploadVideo(file: File): Promise<string> {
  const res = await fetch("/api/videos/upload", {
    method: "POST",
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get upload URL");
  }

  const { uploadUrl, r2Key } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!uploadRes.ok) {
    throw new Error("Upload failed");
  }

  return r2Key;
}