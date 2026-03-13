import SessionItem from "./SessionItem";

export default function RecentSessions() {
  return (
    <section
      className="
      relative
rounded-2xl
border border-ui-text/15
bg-ui-surface
p-4
    "
    >
      <div className="
absolute left-0 top-0 bottom-0 w-1
bg-brand-primary/40
rounded-l-xl
"/>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Sessions
        </h2>

        <span className="text-sm text-ui-text/50">
          Your latest recordings
        </span>
      </div>

      <div className="space-y-3">
        <SessionItem
          id=""
          title="Recursion Practice"
          date="Feb 10"
          status="Available"
        />

        <SessionItem
          id=""
          title="SQL Joins"
          date="Feb 14"
          status="Locked"
        />
      </div>
    </section>
  );
}