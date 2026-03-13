export default function FreeClasses() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-medium">
        Free Classes
      </h2>

      <div className="space-y-3">

        <FreeClassItem
          title="Dynamic Programming Basics"
          expires="2026-03-10"
        />

        <FreeClassItem
          title="Graph Traversal"
          expires="2026-03-12"
        />

      </div>

    </div>
  );
}

function FreeClassItem({
  title,
  expires,
}: {
  title: string;
  expires: string;
}) {
  return (
    <div className="
rounded-xl
border border-brand-primary/20
bg-brand-primary/5
p-5
flex items-center justify-between
">

      <div>
        <p className="font-medium">
          Dynamic Programming Basics
        </p>

        <p className="text-sm text-ui-text/60">
          Available until 2026-03-10
        </p>
      </div>

      <span className="
px-3 py-1
text-xs
rounded-full
bg-brand-primary
text-white
">
        Free
      </span>

    </div>
  );
}