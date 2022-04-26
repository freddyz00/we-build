import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Header from "../../../../components/sections/Header";
import Footer from "../../../../components/sections/Footer";

import { urlFor } from "../../../../lib/sanity";

export default function Product() {
  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();

  const router = useRouter();
  const { storeSlug, productSlug } = router.query;

  const [productDetails, setProductDetails] = useState([]);

  const [productCount, setProductCount] = useState(1);

  const increment = () => {
    setProductCount(productCount + 1);
  };

  const decrement = () => {
    if (productCount === 1) {
      return;
    }
    setProductCount(productCount - 1);
  };

  // get store header and footer
  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-page?slug=${storeSlug}`
      );
      if (!res.ok) return;
      const { sections } = (await res.json()).page;
      setHeader(sections[0]);
      setFooter(sections[sections.length - 1]);
    })();
  }, [router.isReady]);

  // get product details
  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const res = await fetch(
        `/api/get-product?storeSlug=${storeSlug}&productSlug=${productSlug}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setProductDetails(data);
    })();
  }, [router.isReady]);

  return (
    <div className="flex flex-col min-h-screen">
      {header && <Header id={header._key} data={header} />}
      {productDetails.length > 0 && (
        <div className="container mx-auto my-12 flex-1 lg:max-w-6xl">
          <div className="flex space-x-20">
            {/* image */}
            <div className="w-1/2">
              <img
                src={
                  productDetails[0].image
                    ? urlFor(productDetails[0].image).width(700).url()
                    : null
                }
                className="w-full h-full object-contain object-top"
                alt="Image of product"
              />
            </div>
            {/* product details */}
            <div className="flex flex-col space-y-5 w-1/2 ">
              {/* product name */}
              <div>
                <p className="text-3xl">{productDetails[0].title}</p>
              </div>
              {/* price */}
              <div>
                <p className="text-2xl text-gray-500">{`$${productDetails[0].price}`}</p>
              </div>
              {/* choose quantity */}
              <div>
                <p className="text-gray-500 text-lg mb-2">Quantity</p>
                <div className="border border-gray-500 border-solid w-fit">
                  <button className="px-5 py-3 text-xl" onClick={decrement}>
                    -
                  </button>
                  <span className="px-5 py-3 text-lg">{productCount}</span>
                  <button className="px-5 py-3 text-xl" onClick={increment}>
                    +
                  </button>
                </div>
              </div>

              {/* add to cart */}
              <button className="text-white  py-3 bg-primary-blue hover:bg-darker-blue transition">
                Add To Cart
              </button>

              {/* description */}
              <div>
                <p>{productDetails[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {footer && <Footer id={footer._key} data={footer} />}
    </div>
  );
}
