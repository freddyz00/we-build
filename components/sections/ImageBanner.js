import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { storeSlugState } from "../../atoms/storeSlugAtom";
import { urlFor } from "../../lib/sanity";

export default function ImageBanner({ id, data }) {
  const [imageBanner, setImageBanner] = useState({
    image: data.image,
    textColor: data.textColor,
    heading: data.heading,
    subheading: data.subheading,
    buttonLabel: data.buttonLabel,
  });

  const storeSlug = useRecoilValue(storeSlugState);

  const router = useRouter();

  const handleUpdateImageBanner = (event) => {
    if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) return;
    if (event.data.section === "imageBanner" && event.data.id === id) {
      return setImageBanner(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateImageBanner);
    return () => {
      window.removeEventListener("message", handleUpdateImageBanner);
    };
  }, []);

  return (
    <div
      className={`image-banner h-screen flex flex-col space-y-5 justify-center items-center bg-cover bg-neutral-200`}
    >
      <h2 className="text-color text-5xl max-w-3xl break-all text-center">
        {imageBanner.heading}
      </h2>

      <p className="text-color max-w-5xl break-all text-center">
        {imageBanner.subheading}
      </p>

      <button
        onClick={() => router.push(`/store/${storeSlug}/products`)}
        className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white transition"
      >
        {imageBanner.buttonLabel}
      </button>
      <style jsx>{`
        .image-banner {
          background-image: url(${imageBanner.image
            ? urlFor(imageBanner.image).url()
            : null});
        }
        .text-color {
          color: ${imageBanner.textColor === "dark" ? "#000" : "#fff"};
        }
      `}</style>
    </div>
  );
}
