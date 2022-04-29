import classNames from "classnames";
import Link from "next/link";
import { Image } from "cloudinary-react";
import { useState, useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { storeSlugState } from "../../atoms/storeSlugAtom";

export default function FeaturedProducts({ id, data }) {
  const [featuredProducts, setFeaturedProducts] = useState({
    featuredProducts: data.featuredProducts,
  });

  const storeSlug = useRecoilValue(storeSlugState);

  const handleUpdateFeaturedProducts = useCallback(
    (event) => {
      if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) return;
      if (event.data.section === "featuredProducts" && event.data.id === id) {
        return setFeaturedProducts(event.data.payload);
      }
    },
    [id]
  );

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateFeaturedProducts);
    return () => {
      window.removeEventListener("message", handleUpdateFeaturedProducts);
    };
  }, [handleUpdateFeaturedProducts]);

  return (
    <div className="container mx-auto my-36 lg:max-w-6xl">
      <h2 className="text-3xl mb-10">Featured Products</h2>
      <div className="grid grid-cols-3 gap-x-5">
        {featuredProducts.featuredProducts.map((product, index) => {
          if (!product) return null;
          return (
            <Link
              key={index}
              passHref={true}
              href={`/store/${storeSlug}/products/${product.slug.current}`}
            >
              <div className="group cursor-pointer">
                <div
                  className={classNames("aspect-square mb-3 overflow-hidden", {
                    "bg-neutral-200": !product.imageId,
                  })}
                >
                  {product.imageId && (
                    <Image
                      cloudName="de9qmr17c"
                      publicId={product.imageId}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition"
                      alt="Image Banner"
                      width="500"
                      crop="scale"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg">{product.title}</p>
                  <p className="text-xl text-gray-500 font-medium">{`$${product.price}`}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
