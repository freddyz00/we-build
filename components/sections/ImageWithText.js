import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { storeSlugState } from "../../atoms/storeSlugAtom";
import { urlFor } from "../../lib/sanity";

export default function ImageWithText({ id, data }) {
  const [imageWithText, setImageWithText] = useState({
    image: data.image,
    heading: data.heading,
    subheading: data.subheading,
    buttonLabel: data.buttonLabel,
  });

  const storeSlug = useRecoilValue(storeSlugState);
  const router = useRouter();

  const handleUpdateImageWithText = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    if (event.data.section === "imageWithText" && event.data.id === id) {
      return setImageWithText(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateImageWithText);
    return () => {
      window.removeEventListener("message", handleUpdateImageWithText);
    };
  }, []);

  return (
    <div className="container mx-auto my-36 lg:max-w-6xl grid grid-cols-2 gap-x-20">
      <div className="h-[500px] bg-neutral-200">
        <img
          src={imageWithText.image ? urlFor(imageWithText.image).url() : null}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col space-y-5 justify-center">
        <h1 className="text-3xl break-all">{imageWithText.heading}</h1>
        <p className="leading-8 break-all">{imageWithText.subheading}</p>
        <button
          onClick={() => router.push(`/store/${storeSlug}/products`)}
          className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white self-start"
        >
          {imageWithText.buttonLabel}
        </button>
      </div>
    </div>
  );
}
