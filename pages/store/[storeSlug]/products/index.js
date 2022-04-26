import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Header from "../../../../components/sections/Header";
import Footer from "../../../../components/sections/Footer";
import { urlFor } from "../../../../lib/sanity";
import Link from "next/link";
import Head from "next/head";

export default function Products() {
  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();

  const router = useRouter();
  const { storeSlug } = router.query;

  const [headTitle, setHeadTitle] = useState();
  const [products, setProducts] = useState([]);

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
  }, [router.isReady]);

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
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{headTitle && `Products - ${headTitle} - By `}WeBuild</title>
      </Head>
      {header && <Header id={header._key} data={header} />}
      {products.length > 0 ? (
        <div className="container mx-auto my-12 flex-1 lg:max-w-6xl">
          <h1 className="text-3xl mb-10">All Products</h1>
          <div className="grid grid-cols-4 gap-x-5 gap-y-10">
            {/* products */}
            {products.map((product) => (
              <Link
                href={`/store/${storeSlug}/products/${product.slug.current}`}
              >
                <div key={product._id} className="group cursor-pointer">
                  {/* image */}
                  <div className="aspect-square mb-3 overflow-hidden">
                    <img
                      src={
                        product.image
                          ? urlFor(product.image).width(300).url()
                          : null
                      }
                      alt=""
                      className="group-hover:scale-105 w-full h-full object-cover transition"
                    />
                  </div>

                  {/* product details */}
                  <div>
                    <p className="text-lg">{product.title}</p>
                    <p className="text-xl text-gray-500 font-medium">{`$${product.price}`}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1"></div>
      )}
      {footer && <Footer id={footer._key} data={footer} />}
    </div>
  );
}
