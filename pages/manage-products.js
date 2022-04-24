import Link from "next/link";

import { getSession, signOut } from "next-auth/react";

import Image from "next/image";
import Popup from "reactjs-popup";
import { BiLogOut } from "react-icons/bi";

export default function Home({ user }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center px-5 h-12 border-b border-solid border-slate-200 shadow-sm z-10">
        <div>
          <p className="text-lg font-medium">WeBuild</p>
        </div>
        <div className="flex items-center">
          <Popup
            trigger={
              <div className="flex justify-self-end">
                <Image
                  src={user.image}
                  width="30"
                  height="30"
                  className="rounded-full cursor-pointer"
                />
              </div>
            }
            position="bottom right"
          >
            <div className="bg-white p-3 rounded-md shadow border border-slate-200 border-solid">
              {/* account info */}
              <div className="flex items-start border-b border-solid border-gray-300 pb-2">
                <Image
                  src={user.image}
                  width="40"
                  height="40"
                  className="rounded-full cursor-pointer"
                />

                <div className="ml-3">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>

              {/* logout */}
              <div
                className="flex items-center hover:bg-slate-200 cursor-pointer mt-2 rounded px-3 py-2"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <BiLogOut className="text-2xl mr-2" />
                <p>Logout</p>
              </div>
            </div>
          </Popup>
        </div>
      </header>

      <main className="container mx-auto flex flex-col space-y-5 p-5">
        <div className="flex flex-col space-y-5">
          <h2 className="text-2xl font-medium">My Online Store</h2>
          <div className="flex space-x-5">
            <Link href="/preview">
              <a className="text-white rounded-lg px-5 py-2 bg-primary-blue hover:bg-darker-blue">
                View Store
              </a>
            </Link>
            <Link href="/editor">
              <a className="text-white rounded-lg px-5 py-2 bg-primary-blue hover:bg-darker-blue">
                Edit Store
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-medium">Products</h2>
          <button className="text-white rounded-lg px-5 py-2 bg-primary-blue hover:bg-darker-blue">
            Add Product
          </button>
        </div>
        <div className="">
          <table className="table-auto">
            <thead>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </main>
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
    props: {
      user: session.user,
    },
  };
}
