import React, { useEffect } from "react";
import { signIn, signOut, getSession } from "next-auth/react";

export default function Home() {
  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/editor" });
  };
  return (
    <div className="grid place-items-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="px-5 py-3 text-white bg-primary-blue hover:bg-darker-blue transition rounded-lg"
      >
        Sign In With Google
      </button>
      <button
        onClick={signOut}
        className="px-5 py-3 text-white bg-primary-blue hover:bg-darker-blue transition rounded-lg"
      >
        Sign Out
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/editor",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
