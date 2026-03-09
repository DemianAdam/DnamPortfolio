import { VideoTable } from "./components/VideoTable";
import Link from "next/link";

export default function AdminVideosPage() {
    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Videos
                </h1>

                <Link
                    href="/admin/videos/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Upload Video
                </Link>
            </div>

            <VideoTable />

        </div>
    );
}