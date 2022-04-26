import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Head from "next/head";

import classNames from "classnames";
import PulseLoader from "react-spinners/PulseLoader";

export default function CreateStore() {
  const router = useRouter();

  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await fetch("/api/create-store", {
      method: "POST",
      body: JSON.stringify({ storeName }),
    });

    setLoading(false);

    if (result.status === 409) {
      const data = await result.json();
      return setError(data.message);
    }

    if (result.status === 201) {
      const data = await result.json();
      router.push(`/store/${data.slug}/admin/editor`);
    }
  };

  return (
    <div className="h-screen grid place-items-center">
      <Head>
        <title>Create A New Store - WeBuild</title>
      </Head>
      <div className="flex flex-col space-y-10 w-1/2 max-w-xl p-10 border border-solid border-gray-300 rounded-md shadow">
        <div>
          <h1 className="text-3xl font-medium mb-3">Create a store</h1>
          <h2>
            Enter a name for your store. You can only create 1 store and you
            cannot change the name once it is set.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
          <div>
            <label htmlFor="store-name">Store Name</label>
            <input
              required
              autoComplete="off"
              id="store-name"
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              type="text"
              className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
            />
            <p className="text-red-500">{error}</p>
          </div>
          <button
            className={classNames("text-white rounded-lg px-5 py-2", {
              "bg-gray-300 ": loading,
              "bg-primary-blue hover:bg-darker-blue transition": !loading,
            })}
          >
            {!loading && "Create Store"}
            <PulseLoader loading={loading} color="white" size={6} />
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
