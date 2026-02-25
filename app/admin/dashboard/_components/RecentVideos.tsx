export default function RecentVideos() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Recent Videos</h2>

      <div className="space-y-3">
        <RecentVideoItem
          title="Recursion Session"
          date="2026-02-10"
          status="Free"
        />
        <RecentVideoItem
          title="SQL Practice"
          date="2026-02-14"
          status="Assigned"
        />
        <RecentVideoItem
          title="Group Debugging"
          date="2026-02-18"
          status="Locked"
        />
      </div>
    </div>
  );
}

function RecentVideoItem({
  title,
  date,
  status,
}: {
  title: string;
  date: string;
  status: string;
}) {
  return (
    <div className="flex justify-between items-center bg-ui-surface/60 border border-white/5 rounded-lg px-5 py-4 hover:border-brand-primary/20 transition">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-ui-text/50">{date}</p>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-ui-text/60">
        {status}
      </span>
    </div>
  );
}