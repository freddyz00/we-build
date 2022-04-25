import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { getSession, signOut } from "next-auth/react";

import { urlFor } from "../../../../lib/sanity";

import Popup from "reactjs-popup";
import { BiLogOut } from "react-icons/bi";
import classNames from "classnames";

export default function Admin({ user }) {
  const router = useRouter();
  const { storeSlug } = router.query;

  const [products, setProducts] = useState([]);

  // get all products
  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const res = await fetch(`/api/get-all-products?storeSlug=${storeSlug}`);
      if (!res.ok) return;
      const data = await res.json();
      setProducts(data);
    })();
  }, [router.isReady]);

  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      <header className="flex justify-between items-center bg-white px-5 h-12 border-b border-solid border-slate-200 shadow-sm z-10">
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
            <Link href={`/store/${storeSlug}`}>
              <a className="text-white rounded-lg px-5 py-2 bg-primary-blue hover:bg-darker-blue">
                View Store
              </a>
            </Link>
            <Link href={`/store/${storeSlug}/admin/editor`}>
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
        <div className="bg-white rounded-lg shadow">
          {products.length > 0 && (
            <table className="w-full table-fixed">
              <thead className="border-b border-solid border-gray-300 text-left">
                <th className="w-20"></th>
                <th className="w-1/4 font-medium py-2">Product</th>
                <th className=" font-medium py-2">Description</th>
                <th className="w-20 font-medium py-2">Price</th>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    className={classNames(
                      "border-solid border-gray-300 cursor-pointer",
                      {
                        "border-b": index !== products.length - 1,
                      }
                    )}
                  >
                    <td className="py-2">
                      <div className="w-12 h-12 border rounded mx-auto">
                        <img
                          src={
                            product.image
                              ? urlFor(product.image).width(100).url()
                              : null
                          }
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="py-2">{product.title}</td>
                    <td className="py-2">
                      {product.description.slice(0, 50)}...
                    </td>
                    <td className="py-2">${product.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
