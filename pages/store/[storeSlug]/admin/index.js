import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Image as CloudinaryImage } from "cloudinary-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { getSession, signOut } from "next-auth/react";

import { sanityClient } from "../../../../lib/sanity";

import Popup from "reactjs-popup";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import classNames from "classnames";

export default function Admin({ user }) {
  const router = useRouter();
  const { storeSlug } = router.query;

  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState();
  const [newFileString, setNewFileString] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFileInput = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setNewFileString(reader.result);
    };
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/add-product`, {
      method: "POST",
      body: JSON.stringify({
        title: newProductTitle,
        description: newProductDescription,
        fileString: newFileString,
        price: newProductPrice,
        storeSlug,
      }),
    });

    const data = await res.json();
    setLoading(false);
    setProducts([...products, data.result]);
    setOpen(false);
  };

  const handleDelete = async (productId, imageId, closeModal) => {
    setLoading(true);
    const res = await fetch(`/api/delete-product`, {
      method: "DELETE",
      body: JSON.stringify({ productId, imageId }),
    });

    setLoading(false);
    setProducts(products.filter((product) => product._id !== productId));
    closeModal();
  };

  // get all products
  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const res = await fetch(`/api/get-all-products?storeSlug=${storeSlug}`);
      if (!res.ok) return;
      const data = await res.json();
      setProducts(data);
    })();
  }, [router.isReady, storeSlug]);

  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      <Head>
        <title>Admin - WeBuild</title>
      </Head>
      <header className="flex justify-between items-center bg-white px-5 h-16 border-b border-solid border-slate-200 shadow-sm z-10">
        <div>
          <img src="/we-build-logo.png" alt="WeBuild Logo" className="h-16" />
        </div>
        <div className="flex items-center">
          <Popup
            trigger={
              <div className="flex justify-self-end">
                <Image
                  src={user?.image}
                  alt="User Avatar"
                  width="35"
                  height="35"
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
                  alt="User Avatar"
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
                className="flex items-center hover:bg-slate-200 cursor-pointer mt-2 rounded px-3 py-2 transition"
                onClick={() => signOut({ callbackUrl: "/" })}
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
              <a className="text-white rounded-lg px-5 py-2 bg-primary-blue hover:bg-darker-blue transition">
                View Store
              </a>
            </Link>
            <Link href={`/store/${storeSlug}/admin/editor`}>
              <a className="text-white rounded-lg px-5 py-2 bg-primary-blue hover:bg-darker-blue transition">
                Edit Store
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-medium">Products</h2>
          <button
            onClick={() => setOpen(true)}
            className="text-white rounded-lg px-5 py-2 bg-primary-blue hover:bg-darker-blue transition"
          >
            Add Product
          </button>
          <Popup
            open={open}
            onClose={() => {
              setOpen(false);
              setNewProductTitle("");
              setNewProductDescription("");
              setNewFileString("");
              setNewProductPrice("");
            }}
            modal
            contentStyle={{
              backgroundColor: "white",
              width: "50%",
              borderRadius: "10px",
            }}
            overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            {(close) => (
              <div className="p-5">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl">Add Product</h2>
                  <button onClick={close}>
                    <MdClose className="text-xl" />
                  </button>
                </div>
                <form
                  className="flex flex-col space-y-3"
                  onSubmit={handleAddProduct}
                >
                  {/* title */}
                  <div className="flex flex-col">
                    <label>Title</label>
                    <input
                      required
                      value={newProductTitle}
                      onChange={(event) =>
                        setNewProductTitle(event.target.value)
                      }
                      type="text"
                      className="border border-solid border-slate-300 px-3 py-1.5 rounded"
                    />
                  </div>
                  {/* description */}
                  <div className="flex flex-col">
                    <label>Description</label>
                    <textarea
                      required
                      value={newProductDescription}
                      onChange={(event) =>
                        setNewProductDescription(event.target.value)
                      }
                      rows={3}
                      className="border border-solid border-slate-300 px-3 py-1.5 rounded"
                    ></textarea>
                  </div>
                  {/* image */}
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <label>Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onInput={handleFileInput}
                      />
                    </div>
                    {newFileString && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={newFileString}
                          alt="Uploaded Image Preview"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    )}
                  </div>
                  {/* price */}
                  <div className="flex flex-col">
                    <label>Price</label>
                    <input
                      required
                      value={newProductPrice}
                      onChange={(event) =>
                        setNewProductPrice(event.target.value)
                      }
                      placeholder="0.00"
                      type="number"
                      className="border border-solid border-slate-300 px-3 py-1.5 rounded"
                    />
                  </div>
                  <button
                    disabled={loading}
                    className={classNames(
                      "text-white rounded-lg px-5 py-2 self-end",
                      {
                        "bg-gray-300 ": loading,
                        "bg-primary-blue hover:bg-darker-blue transition":
                          !loading,
                      }
                    )}
                  >
                    {!loading && "Add"}
                    <PulseLoader loading={loading} color="white" size={6} />
                  </button>
                </form>
              </div>
            )}
          </Popup>
        </div>
        <div className="bg-white rounded-lg shadow">
          {products.length > 0 && (
            <table className="w-full table-fixed">
              <thead className="border-b border-solid border-gray-300 text-left">
                <tr>
                  <th className="w-20"></th>
                  <th className="w-1/4 font-medium py-2">Product</th>
                  <th className=" font-medium py-2">Description</th>
                  <th className="w-20 font-medium py-2">Price</th>
                  <th className="w-20"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className={classNames("border-solid border-gray-300", {
                      "border-b": index !== products.length - 1,
                    })}
                  >
                    <td className="py-2">
                      <div className="w-12 h-12 border rounded mx-auto">
                        <CloudinaryImage
                          cloudName="de9qmr17c"
                          publicId={product.imageId}
                          className="w-full h-full object-cover object-center"
                          width="100"
                          crop="scale"
                        />
                      </div>
                    </td>
                    <td className="py-2">{product?.title}</td>
                    <td className="py-2">
                      {product?.description?.slice(0, 70)}
                      {product?.description?.length > 70 && "..."}
                    </td>
                    <td className="py-2">${product?.price?.toFixed(2)}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-center">
                        <Popup
                          position="bottom center"
                          nested
                          trigger={
                            <div className="p-1 rounded cursor-pointer hover:bg-neutral-100 transition">
                              <BsThreeDots />
                            </div>
                          }
                        >
                          {(closePopup) => (
                            <div className="bg-white rounded-md shadow border border-slate-200 border-solid">
                              <Popup
                                modal
                                onClose={closePopup}
                                trigger={
                                  <div className="group p-3 cursor-pointer hover:bg-red-500 rounded-md transition">
                                    <p className="text-red-500 group-hover:text-white transition">
                                      Remove Product
                                    </p>
                                  </div>
                                }
                                contentStyle={{
                                  backgroundColor: "white",
                                  width: "50%",
                                  borderRadius: "10px",
                                }}
                                overlayStyle={{
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                }}
                              >
                                {(closeModal) => (
                                  <div className="flex flex-col space-y-10 p-5">
                                    <div>
                                      <p className="text-xl">
                                        Are you sure you want to delete this
                                        product?
                                      </p>
                                    </div>
                                    <div className="flex space-x-5 self-end">
                                      <button
                                        disabled={loading}
                                        onClick={() =>
                                          handleDelete(
                                            product._id,
                                            product.imageId,
                                            closeModal
                                          )
                                        }
                                        className={classNames(
                                          "text-white rounded-lg px-5 py-2 self-end",
                                          {
                                            "bg-gray-300 ": loading,
                                            "bg-red-500 hover:bg-red-600 transition":
                                              !loading,
                                          }
                                        )}
                                      >
                                        {!loading && "Delete"}
                                        <PulseLoader
                                          loading={loading}
                                          color="white"
                                          size={6}
                                        />
                                      </button>
                                      <button
                                        onClick={closeModal}
                                        className="px-5 py-2 bg-neutral-300 hover:bg-neutral-400 rounded-lg transition"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Popup>
                            </div>
                          )}
                        </Popup>
                      </div>
                    </td>
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
  const { storeSlug } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // check to see if logged in user is the owner of the store
  const query = `*[_type == "store" && slug=="${storeSlug}"][0]{
    "ownerEmail": owner -> email
  }`;
  const data = await sanityClient.fetch(query);

  // redirect if user is not the owner of the store
  if (data.ownerEmail !== session.user.email) {
    return {
      redirect: {
        destination: `/store/${storeSlug}`,
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
