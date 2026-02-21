"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function TestAuthPage() {
  const { data: session } = useSession();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      {!session ? (
        <button onClick={() => signIn()}>Login</button>
      ) : (
        <button onClick={() => signOut()}>Logout</button>
      )}
    </div>
  );
}