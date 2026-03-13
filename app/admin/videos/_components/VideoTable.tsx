"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { VideoRow } from "./VideoRow";
import { VideoListItemDTO } from "@/convex/video/dtos";


export function VideoTable() {

  const videos = useQuery(api.video.queries.listVideos);

  if (!videos) {
    return <div>Loading...</div>;
  }

  if (videos.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No videos yet
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">
          <tr className="text-left text-sm">
            <th className="p-3">Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Free</th>
            <th className="p-3">Free Until</th>
            <th className="p-3"></th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video) => (
            <VideoRow key={video.id} video={video} />
          ))}
        </tbody>

      </table>

    </div>
  );
}