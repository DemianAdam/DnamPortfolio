import Link from "next/link";
import { Play, GraduationCap, Calendar } from "lucide-react";

export default function QuickActions() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">
        Continue Learning
      </h2>

      <div className="grid md:grid-cols-3 gap-4 rounded-xl
border border-brand-primary/20
bg-brand-primary/5
p-5
">
        <ActionCard
          href="/student/videos"
          icon={<Play size={20} />}
          title="View Sessions"
          description="Watch your tutoring recordings"
        />

        <ActionCard
          href="/student/free"
          icon={<GraduationCap size={20} />}
          title="Free Classes"
          description="Explore free lessons"
        />

        <ActionCard
          href="/student/book"
          icon={<Calendar size={20} />}
          title="Book a Session"
          description="Schedule a tutoring session"
        />
      </div>
    </section>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="
      group
      rounded-2xl
      bg-ui-background/80
      border border-brand-primary/20
      p-5
      flex flex-col gap-3
      hover:border-brand-primary/40
      hover:shadow-md
      transition
      "
    >
      <div
        className="
        w-10 h-10
        rounded-lg
        bg-brand-primary/10
        text-brand-primary
        flex items-center justify-center
        "
      >
        {icon}
      </div>

      <div>
        <p className="font-medium">
          {title}
        </p>

        <p className="text-sm text-ui-text/60">
          {description}
        </p>
      </div>
    </Link>
  );
}