import Link from "next/link";

export default function SessionItem({
  id,
  title,
  date,
  status,
}: {
  id: string;
  title: string;
  date: string;
  status: "Available" | "Free" | "Locked";
}) {
  const badgeStyles = {
    Available:
      "bg-state-success/10 text-state-success",
    Free:
      "bg-brand-primary/10 text-brand-primary",
    Locked:
      "bg-ui-text/5 text-ui-text/40",
  };

  const content = (
    <div
      className="
      group
      flex items-center justify-between
      rounded-xl
      px-5 py-4
      bg-ui-surface
      border border-ui-text/5
      hover:border-brand-primary/30
      hover:shadow-md
      transition
    "
    >
      <div className="flex items-start gap-4">
        <div
          className="
          h-9 w-9
          rounded-lg
          bg-brand-primary/10
          flex items-center justify-center
          text-brand-primary
          font-semibold
        "
        >
          ▶
        </div>

        <div>
          <p className="font-medium">{title}</p>

          <p className="text-sm text-ui-text/50">
            {date}
          </p>
        </div>
      </div>

      <span
        className={`
        text-xs
        px-3 py-1
        rounded-full
        ${badgeStyles[status]}
      `}
      >
        {status}
      </span>
    </div>
  );

  if (status === "Locked") return content;

  return <Link href={`/student/videos/${id}`}>{content}</Link>;
}