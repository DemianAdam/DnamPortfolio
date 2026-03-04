// app/(auth)/signin/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";

    console.log(callbackUrl);
    
    async function handleMagicLink(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        await signIn("resend", {
            email,
            redirect: false,
            redirectTo: callbackUrl
        });

        setLoading(false);
    }

    async function handleGoogle() {
        await signIn("google", {
            redirectTo: callbackUrl
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-ui-background px-4">
            <div className="w-full max-w-md bg-ui-surface rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-ui-text">
                        Welcome back
                    </h1>
                    <p className="text-sm text-ui-text/60">
                        Access your tutoring dashboard
                    </p>
                </div>

                {/* Email Magic Link */}
                <form onSubmit={handleMagicLink} className="space-y-4">
                    <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-brand-primary text-brand-primary-contrast py-3 font-medium hover:opacity-90 transition"
                    >
                        {loading ? "Sending link..." : "Sign in with email"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-black/10" />
                    <span className="text-xs text-ui-text/50">OR</span>
                    <div className="flex-1 h-px bg-black/10" />
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogle}
                    className="w-full rounded-xl border border-black/10 py-3 font-medium hover:bg-black/5 transition"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
}