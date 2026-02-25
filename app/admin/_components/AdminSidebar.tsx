"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <aside
      className={`
        fixed lg:static
        z-40
        min-h-screen
        w-64
        
        bg-ui-surface/90
        border-r border-white/5
        p-8
        flex flex-col
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-wide text-brand-primary">
            Demian Control
          </h2>
          <p className="text-xs text-ui-text/50 mt-1">Admin Panel</p>
        </div>

        {/* Close button mobile */}
        <button
          className="lg:hidden text-ui-text/60 hover:text-brand-primary"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-3 text-sm">
        <SidebarLink href="/admin/dashboard" label="Dashboard" />
        <SidebarLink href="/admin/videos" label="Videos" />
        <SidebarLink href="/admin/users" label="Users" />
        <SidebarLink href="/admin/access-codes" label="Access Codes" />
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg transition-all duration-200 ${
        active
          ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
          : "text-ui-text/70 hover:bg-white/5 hover:text-ui-text"
      }`}
    >
      {label}
    </Link>
  );
}