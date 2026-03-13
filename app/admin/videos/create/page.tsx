"use client";

import { useQuery } from "convex/react";
import { useCreateVideo } from "./_hooks/useCreateVideo";
import { useVideoForm } from "./_hooks/useVideoForm";
import { api } from "@/convex/_generated/api";


export default function CreateVideoPage() {
  const form = useVideoForm();
  const { submitVideo, uploading } = useCreateVideo();
  const users = useQuery(api.user.queries.listUsersForAssignment);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.videoFile) {
      alert("Please select a video file");
      return;
    }

    try {
      await submitVideo({
        title: form.title,
        description: form.description,
        duration: form.duration,
        file: form.videoFile,
        isFree: form.isFree,
        freeUntil: form.freeUntil,
        assignedUsers: form.assignedUsers
      });

      alert("Video created successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to create video");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Create Video</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => form.setTitle(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
            className="border rounded px-3 py-2"
            rows={4}
            required
          />
        </div>

        {/* Video file */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Video file</label>
          <input
            type="file"
            accept="video/*"
            onChange={form.handleFileChange}
          />

          {form.duration > 0 && (
            <span className="text-sm text-gray-500">
              Duration: {Math.round(form.duration)} seconds
            </span>
          )}
        </div>

        {/* Free video */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isFree}
            onChange={(e) => form.setIsFree(e.target.checked)}
          />
          <label>Free video</label>
        </div>

        {/* Free until */}
        {form.isFree && (
          <div className="flex flex-col gap-1">
            <label className="font-medium">Free until</label>
            <input
              type="date"
              value={form.freeUntil ?? ""}
              onChange={(e) => form.setFreeUntil(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-medium">Assign to users</label>

          <div className="border rounded p-3 max-h-40 overflow-y-auto">
            {users?.map((user) => (
              <label key={user.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!form.assignedUsers.find(x => x.id === user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      form.setAssignedUsers([...form.assignedUsers, user]);
                    } else {
                      form.setAssignedUsers(
                        form.assignedUsers.filter((x) => x.id !== user.id)
                      );
                    }
                  }}
                />
                {user.name} ({user.email})
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Create Video"}
        </button>
      </form>
    </div>
  );
}