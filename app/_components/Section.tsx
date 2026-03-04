import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
};

export function Section({
  children,
  className,
  size = "default",
}: SectionProps) {
  const spacing = {
    sm: "py-16",
    default: "py-24",
    lg: "py-32",
  };

  return (
    <section className={`${spacing[size]} ${className ?? ""}`}>
      {children}
    </section>
  );
}