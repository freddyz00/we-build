import Link from "next/link";
import { useState, useEffect } from "react";

import { RiShoppingBag3Line } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { storeSlugState } from "../../atoms/storeSlugAtom";
import { Image, Transformation } from "cloudinary-react";

export default function Header({ id, data }) {
  const [header, setHeader] = useState({});
  const storeSlug = useRecoilValue(storeSlugState);

  useEffect(() => {
    setHeader({
      storeName: data.storeName,
      imageId: data.imageId,
      links: data.links,
    });
  }, [data]);

  const handleUpdateHeader = (event) => {
    if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) return;
    if (event.data.section === "header" && event.data.id === id) {
      return setHeader(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateHeader);
    return () => {
      window.removeEventListener("message", handleUpdateHeader);
    };
  }, []);

  return (
    <nav className="h-14 border-b border-slate-200">
      <div className="container mx-auto select-none flex justify-between items-center h-full lg:max-w-6xl">
        <div>
          {!header.imageId && (
            <p className="text-xl font-medium">{header.storeName}</p>
          )}
          {header.imageId && (
            <Image
              cloudName="de9qmr17c"
              publicId={header.imageId}
              className="h-12 object-contain object-center"
            />
          )}
        </div>
        <ul className="flex items-center space-x-7">
          {header.links?.map((link, index) => (
            <li
              className="cursor-pointer hover:text-primary-blue transition"
              key={index}
            >
              <Link
                href={
                  link === "Shop" && storeSlug
                    ? `/store/${storeSlug}/products`
                    : `/store/${storeSlug}`
                }
              >
                {link}
              </Link>
            </li>
          ))}
          <li className="cursor-pointer hover:text-primary-blue transition">
            <RiShoppingBag3Line className="text-2xl font-light" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
