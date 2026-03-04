type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-7 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium text-brand-primary">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-ui-text/70">
          {description}
        </p>
      )}
    </div>
  );
}