import React from "react";
import { signIn, getSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/store" });
  };
  return (
    <div className="grid place-items-center h-screen">
      <Head>
        <title>Login - WeBuild</title>
      </Head>
      <div className="flex flex-col mb-20">
        <img
          src="/we-build-logo.png"
          alt="WeBuild Logo"
          className="h-[300px]"
        />
        <button
          onClick={signInWithGoogle}
          className="text-white text-2xl self-center bg-primary-blue hover:bg-darker-blue rounded-xl px-10 py-4 transition"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/store",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
