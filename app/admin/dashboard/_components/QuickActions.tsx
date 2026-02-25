export default function QuickActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Quick Actions</h2>

      <div className="flex gap-4">
        <ActionButton href="/videos/create">
          Upload New Video
        </ActionButton>

        <ActionButton href="/access-codes">
          Create Access Code
        </ActionButton>

        <ActionButton href="/users">
          Manage Students
        </ActionButton>
      </div>
    </div>
  );
}

function ActionButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="
        group relative
        px-6 py-3
        rounded-xl

        bg-linear-to-b
        from-brand-primary
        to-[#c48725]

        text-brand-primary-contrast
        font-medium tracking-wide

        border border-white/10
        shadow-[0_6px_20px_rgba(0,0,0,0.45)]

        transition-all duration-200
        hover:-translate-y-px
        hover:shadow-[0_10px_30px_rgba(212,154,53,0.35)]
        active:translate-y-px
        active:scale-[0.99]

        before:absolute
        before:inset-0
        before:rounded-xl
        before:bg-linear-to-b
        before:from-white/20
        before:to-transparent
        before:opacity-50
        before:pointer-events-none"
    >
      {children}
    </a>
  );
}