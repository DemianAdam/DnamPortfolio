import { VideoListItemDTO } from "@/convex/video/dtos";
import Link from "next/link";

export function VideoRow({ video }: { video: VideoListItemDTO }) {
  const durationMinutes = Math.round(video.duration / 60);

  const freeUntilDate =
    video.freeUntil ? new Date(video.freeUntil) : null;

  return (
    <tr className="border-t">

      <td className="p-3 font-medium">
        {video.title}
      </td>

      <td className="p-3">
        {new Date(video.date).toLocaleDateString()}
      </td>

      <td className="p-3">
        {durationMinutes} min
      </td>

      <td className="p-3">
        {video.isFree ? (
          <span className="text-green-600 font-medium">
            Free
          </span>
        ) : (
          "-"
        )}
      </td>

      <td className="p-3">
        {video.isFree ? (
          freeUntilDate ? (
            <span className={video.isExpired ? "text-red-600" : ""}>
              {freeUntilDate.toLocaleDateString()}
            </span>
          ) : (
            <span className="text-gray-500">
              No limit
            </span>
          )
        ) : (
          "-"
        )}
      </td>

      <td className="p-3 text-right">

        <Link
          href={`/admin/videos/${video.id}`}
          className="text-blue-600 hover:underline"
        >
          Manage
        </Link>

      </td>

    </tr>
  );
}