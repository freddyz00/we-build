import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Header from "../../../../components/sections/Header";
import Footer from "../../../../components/sections/Footer";

import { Image } from "cloudinary-react";
import { urlFor } from "../../../../lib/sanity";
import Head from "next/head";

export default function Product() {
  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();
  const [headTitle, setHeadTitle] = useState();

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
      const { page, name } = await res.json();
      setHeader(page.sections[0]);
      setFooter(page.sections[page.sections.length - 1]);
      setHeadTitle(name);
    })();
  }, [router.isReady, storeSlug]);

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
  }, [router.isReady, productSlug, storeSlug]);

  useEffect(() => {
    console.log(productDetails);
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>
          {productDetails[0]?.title &&
            `${productDetails[0].title} - ${headTitle} - By `}
          WeBuild
        </title>
      </Head>
      {header && <Header id={header._key} data={header} />}
      {productDetails.length > 0 && (
        <div className="container mx-auto my-12 flex-1 lg:max-w-6xl">
          <div className="flex space-x-20">
            {/* image */}
            <div className="w-1/2">
              <Image
                cloudName="de9qmr17c"
                publicId={productDetails[0].imageId}
                className="w-full h-full object-contain object-top"
                width="1000"
                crop="scale"
                alt="Product Image"
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
