import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { sectionsState } from "../../atoms/sectionsAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

import Select from "react-select";
import RemoveSection from "../RemoveSection";

export default function FeaturedProductsEditor({ id, iframeRef }) {
  const router = useRouter();
  const { storeSlug } = router.query;

  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const [sections, setSections] = useRecoilState(sectionsState);
  const sectionData = sections.filter((section) => section._key === id)[0];

  const [featuredProducts, setFeaturedProducts] = useState({
    featuredProducts: sectionData.featuredProducts,
  });
  const [products, setProducts] = useState([]);

  const options = products.map((product) => ({
    value: product,
    label: product.title,
  }));

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

  // useEffect(() => {
  //   console.log(featuredProducts.featuredProducts);
  // }, [featuredProducts]);

  // post message whenever featured products changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { id, section: "featuredProducts", payload: featuredProducts },
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }, [featuredProducts, id, iframeRef]);

  // update sections when featuredProducts changes
  useEffect(() => {
    setSections((sections) =>
      sections.map((section) => {
        if (section._key === id) {
          return {
            ...section,
            featuredProducts: featuredProducts.featuredProducts,
          };
        }
        return section;
      })
    );
  }, [featuredProducts, id, setSections]);

  return (
    <div className="absolute w-full flex flex-col justify-between h-full">
      <div className="overflow-y-auto flex-1 pb-2">
        {/* title */}
        <div className="flex items-center space-x-2 border-b border-solid p-3">
          <div
            onClick={() => setEditingSection([...editingSection].slice(0, -1))}
            className="hover:bg-slate-200 p-1.5 rounded cursor-pointer transition"
          >
            <MdOutlineArrowBackIos />
          </div>
          <p className="font-medium">Featured Products</p>
        </div>

        {/* products */}
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Featured Product 1</p>
          <Select
            isClearable
            defaultValue={
              featuredProducts.featuredProducts[0] && {
                value: featuredProducts.featuredProducts[0],
                label: featuredProducts.featuredProducts[0]?.title,
              }
            }
            onChange={(event) =>
              setFeaturedProducts({
                ...featuredProducts,
                featuredProducts: [
                  event?.value ? event?.value : undefined,
                  featuredProducts.featuredProducts[1],
                  featuredProducts.featuredProducts[2],
                ],
              })
            }
            options={options}
          />
        </div>
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Featured Product 2</p>
          <Select
            isClearable
            defaultValue={
              featuredProducts.featuredProducts[1] && {
                value: featuredProducts.featuredProducts[1],
                label: featuredProducts.featuredProducts[1]?.title,
              }
            }
            onChange={(event) =>
              setFeaturedProducts({
                ...featuredProducts,
                featuredProducts: [
                  featuredProducts.featuredProducts[0],
                  event?.value ? event?.value : undefined,
                  featuredProducts.featuredProducts[2],
                ],
              })
            }
            options={options}
          />
        </div>
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Featured Product 3</p>
          <Select
            isClearable
            defaultValue={
              featuredProducts.featuredProducts[2] && {
                value: featuredProducts.featuredProducts[2],
                label: featuredProducts.featuredProducts[2]?.title,
              }
            }
            onChange={(event) =>
              setFeaturedProducts({
                ...featuredProducts,
                featuredProducts: [
                  featuredProducts.featuredProducts[0],
                  featuredProducts.featuredProducts[1],
                  event?.value ? event?.value : undefined,
                ],
              })
            }
            options={options}
          />
        </div>
      </div>

      {/* remove section */}
      <div className="px-4 py-1 border-t border-solid">
        <RemoveSection id={id} />
      </div>
    </div>
  );
}
