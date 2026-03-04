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
      {
        !session ? (
          resendForm
        ) : (
          <button onClick={() => signOut()}>Logout</button>
        )
      }
    </div>
  );
}
const resendAction = (formData: FormData) => {

  signIn("resend", {
    email: formData.get("email")
  })
}
const resendForm =
  <form action={resendAction}>
    <label htmlFor="email">
      Email
      <input type="email" id="email" name="email" />
    </label>
    <input type="submit" value="Signin with" />
  </form>