import React from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="grid place-items-center h-screen">
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}
