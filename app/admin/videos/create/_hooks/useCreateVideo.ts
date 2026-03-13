import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { uploadVideo } from "@/lib/r2/uploadVideo";
import { SimpleUserDTO } from "@/convex/user/dtos";
import { deleteVideo } from "@/lib/r2/deleteVideo";

export function useCreateVideo() {
  const createVideo = useMutation(api.video.mutations.createVideo);
  const [uploading, setUploading] = useState(false);

  const submitVideo = async (input: {
    title: string;
    description: string;
    duration: number;
    file: File;
    isFree: boolean;
    freeUntil?: string;
    assignedUsers: SimpleUserDTO[]
  }) => {
    setUploading(true);
    let r2Key: string | undefined;
    try {
      r2Key = await uploadVideo(input.file);

      await createVideo({
        title: input.title,
        description: input.description,
        duration: input.duration,
        r2Key,
        isFree: input.isFree,
        freeUntil: input.freeUntil
          ? new Date(input.freeUntil).getTime()
          : undefined,
        date: Date.now(),
        assignedUsers: input.assignedUsers
      });

    } catch (err) {
      if (r2Key) {
        await deleteVideo(r2Key);
      }
      throw err
    } finally {
      setUploading(false);
    }
  };

  return { submitVideo, uploading };
}