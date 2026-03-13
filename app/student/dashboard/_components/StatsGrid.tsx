export default function StatsGrid() {
  return (
    <section
      className="
  rounded-2xl
  border border-brand-primary/20
  bg-gradient-to-br
  from-brand-primary/15
  via-brand-primary/5
  to-transparent
  p-8
  space-y-6
  "
    >
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back 👋
        </h1>

        <p className="text-ui-text/60 mt-1">
          Continue learning and review your latest tutoring sessions.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Sessions Watched" value="8" />
        <StatCard label="Hours Studied" value="12h" />
        <StatCard label="Available Videos" value="5" />
        <StatCard label="Last Session" value="Feb 12" />
      </div>
    </section>
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
    <div
      className="
      relative
      rounded-xl
      bg-ui-surface
      border border-brand-primary/10
      p-6
      shadow-sm
      overflow-hidden
    "
    >
      <div
        className="
        absolute
        inset-x-0
        top-0
        h-1
        bg-brand-primary
      "
      />

      <p className="text-sm text-ui-text/60">
        {label}
      </p>

      <p className="text-2xl font-semibold mt-2">
        {value}
      </p>
    </div>
  );
}