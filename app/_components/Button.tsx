import { cn } from "@/lib/cn";
import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps =
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const baseStyles =
  "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/40 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-brand-primary-contrast hover:bg-brand-primary/90",
  secondary:
    "border border-white/10 bg-ui-surface hover:bg-white/5",
  ghost:
    "hover:bg-white/5",
  destructive:
    "bg-state-destructive text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "py-2 px-4 text-sm",
  md: "py-2.3 px-6 text-sm",
  lg: "py-2.5 px-8 text-base",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    className,
    href,
    ...props
  },
  ref
) {
  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
});