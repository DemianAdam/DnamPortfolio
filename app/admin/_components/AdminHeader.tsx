"use client";

import { signOut } from "next-auth/react";

export default function AdminHeader({
  setOpen,
}: {
  setOpen: (v: boolean) => void;
}) {
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 bg-ui-background/70 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          className="lg:hidden text-ui-text/70 hover:text-brand-primary transition"
          onClick={() => {setOpen(true); console.log("test")}}
        >
          ☰
        </button>

        <div className="h-2 w-2 bg-brand-primary rounded-full animate-pulse hidden lg:block" />
        <span className="text-sm tracking-wide text-ui-text/70 hidden sm:block">
          Admin Interface
        </span>
      </div>

      <button
        onClick={() => signOut()}
        className="text-sm text-ui-text/60 hover:text-brand-primary transition"
      >
        Sign out
      </button>
    </header>
  );
}