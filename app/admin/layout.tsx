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

  return <AdminShell>{children}</AdminShell>;
}