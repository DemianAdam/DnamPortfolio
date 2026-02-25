export default function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard label="Total Videos" value="12" />
      <StatCard label="Students" value="24" />
      <StatCard label="Active Codes" value="3" />
      <StatCard label="Free Sessions" value="2" />
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-ui-surface/60 border border-white/5 rounded-xl p-6 backdrop-blur-md hover:border-brand-primary/20 transition flex flex-col justify-between">
      <p className="text-sm text-ui-text/60">{label}</p>
      <p className="text-2xl font-semibold mt-2 text-brand-primary">
        {value}
      </p>
    </div>
  );
}