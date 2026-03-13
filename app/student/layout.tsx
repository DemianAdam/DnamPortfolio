"use client";
import { signOut } from 'next-auth/react'
import React from 'react'

export default function StudentLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-ui-background flex flex-col">

            <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 bg-ui-background/70 backdrop-blur-md">

                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-brand-primary rounded-full animate-pulse" />
                    <span className="text-sm tracking-wide text-ui-text/70">
                        Student Portal
                    </span>
                </div>

                <button
                    onClick={() =>
                        signOut({
                            redirectTo: "/",
                        })
                    }
                    className="text-sm text-ui-text/60 hover:text-brand-primary transition"
                >
                    Sign out
                </button>

            </header>



            <main className="flex-1 px-6 py-10">
                <div className="max-w-5xl mx-auto space-y-12">
                    {children}
                </div>
            </main>



        </div >
    )
}
