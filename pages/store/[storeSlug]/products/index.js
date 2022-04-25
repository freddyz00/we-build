import { faker } from "@faker-js/faker";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Header from "../../../../components/sections/Header";
import Footer from "../../../../components/sections/Footer";

export default function Products() {
  //   const fakeProduct = {
  //     name: faker.commerce.productName(),
  //     description: faker.commerce.productDescription(),
  //     price: faker.commerce.price(0, 100),
  //   };

  //   console.log(fakeProduct);

  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();

  const router = useRouter();
  const { storeSlug } = router.query;

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

  return (
    <div className="flex flex-col min-h-screen">
      {header && <Header id={header._key} data={header} />}
      <div className="container mx-auto my-12 flex-1 lg:max-w-6xl">
        <h1 className="text-3xl mb-10">All Products</h1>
        <div className="grid grid-cols-4 gap-x-5 gap-y-10">
          {/* products */}
          {[1, 2, 3, 4, 5, 6].map((_) => (
            <div className="group cursor-pointer">
              {/* image */}
              <div className="aspect-square mb-3 overflow-hidden">
                <img
                  src={faker.image.food()}
                  alt=""
                  className="group-hover:scale-105 w-full h-full object-cover transition"
                />
              </div>

              {/* product details */}
              <div>
                <p>Product Name</p>
                <p className="text-xl text-gray-500 font-medium">$9.99</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {footer && <Footer id={footer._key} data={footer} />}
    </div>
  );
}
