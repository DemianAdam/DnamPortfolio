import { useState } from "react";
import { getVideoDuration } from "@/lib/video";
import { SimpleUserDTO } from "@/convex/user/dtos";

export function useVideoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isFree, setIsFree] = useState(false);
  const [freeUntil, setFreeUntil] = useState<string | undefined>();
  const [assignedUsers, setAssignedUsers] = useState<SimpleUserDTO[]>([]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      throw new Error("Invalid file type");
    }

    setVideoFile(file);

    const duration = await getVideoDuration(file);
    setDuration(duration);
  };

  return {
    title,
    description,
    duration,
    videoFile,
    isFree,
    freeUntil,
    assignedUsers,

    setTitle,
    setDescription,
    setIsFree,
    setFreeUntil,
    setAssignedUsers,

    handleFileChange,
  };
}