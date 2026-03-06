"use client";
import { Button } from "@/app/_components/Button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export function Navbar() {
  const { data: session } = useSession();
  const handleClick = async () => {
    if (!session) {
      await signIn(undefined, {
        redirectTo: "/student"
      })
    }
    else {
      redirect("/student/dashboard");
    }
  }
  return (
    <div className="sticky top-0 z-50 backdrop-blur border-b border-white/5">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <span className="font-medium tracking-tight">
          Demian Adam
        </span>

        <div className="flex items-center gap-8 text-sm text-ui-text/70">
          <a href="#proyectos">Proyectos</a>
          <a href="#mentorías">Mentorías</a>
          <a href="#contacto">Contacto</a>
          <Button onClick={handleClick} size="sm">
            {!session ? "Inicia Sesion" : "Mi Panel"}
          </Button>
        </div>
      </div>
    </div>
  );
}