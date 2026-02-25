"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-ui-background">
      {/* Sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader setOpen={setOpen} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="bg-ui-background/90 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}