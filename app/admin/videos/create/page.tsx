"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateVideoDTO } from "@/convex/video/dtos";


export default function CreateVideoPage() {
  const createVideo = useMutation(api.video.mutations.createVideo);

  const [form, setForm] = useState<CreateVideoDTO>({
    title: "",
    description: "",
    r2Key: "",
    duration: 0,
    isFree: false,
    freeUntil: undefined,
    date: Date.now(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setForm((prev) => ({
      ...prev,
      isFree: checked,
      freeUntil: checked ? prev.freeUntil : undefined,
    }));
  };

  const handleFreeUntil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      freeUntil: value ? new Date(value).getTime() : undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createVideo(form);

    alert("Video created!");

    setForm({
      title: "",
      description: "",
      r2Key: "",
      duration: 0,
      isFree: false,
      freeUntil: undefined,
      date: Date.now(),
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>

        {/* R2 Key */}
        <div>
          <label className="block text-sm font-medium">R2 Key</label>
          <input
            name="r2Key"
            value={form.r2Key}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium">
            Duration (seconds)
          </label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Free */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isFree}
            onChange={handleCheckbox}
          />
          <label>Free Video</label>
        </div>

        {/* Free Until */}
        {form.isFree && (
          <div>
            <label className="block text-sm font-medium">
              Free Until
            </label>
            <input
              type="date"
              onChange={handleFreeUntil}
              className="w-full border rounded p-2"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Video
        </button>
      </form>
    </div>
  );
}