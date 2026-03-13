import { ReactNode } from "react";
import AdminShell from "./_components/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {

  return <AdminShell>{children}</AdminShell>;
}