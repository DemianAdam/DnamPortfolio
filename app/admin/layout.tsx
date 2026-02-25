import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminShell from "./_components/AdminShell";
import { ROLES } from "@/convex/user/roles";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  
  if (session && session.role !== ROLES.ADMIN) {
    redirect("/");
  }
  else if (!session) {
    redirect("/api/auth/signin");
  }

  return <AdminShell>{children}</AdminShell>;
}