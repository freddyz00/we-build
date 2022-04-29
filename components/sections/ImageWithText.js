import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { storeSlugState } from "../../atoms/storeSlugAtom";
import { urlFor } from "../../lib/sanity";
import { Image } from "cloudinary-react";

export default function ImageWithText({ id, data }) {
  const [imageWithText, setImageWithText] = useState({
    imageId: data.imageId,
    heading: data.heading,
    subheading: data.subheading,
    buttonLabel: data.buttonLabel,
  });

  const storeSlug = useRecoilValue(storeSlugState);
  const router = useRouter();

  const handleUpdateImageWithText = useCallback(
    (event) => {
      if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) return;
      if (event.data.section === "imageWithText" && event.data.id === id) {
        return setImageWithText(event.data.payload);
      }
    },
    [id]
  );

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateImageWithText);
    return () => {
      window.removeEventListener("message", handleUpdateImageWithText);
    };
  }, [handleUpdateImageWithText]);

  return (
    <div className="container mx-auto my-36 lg:max-w-6xl grid grid-cols-2 gap-x-20">
      <div className="relative h-[500px] bg-neutral-200">
        {imageWithText.imageId && (
          <Image
            cloudName="de9qmr17c"
            publicId={imageWithText.imageId}
            className="absolute w-full h-full object-cover object-center"
            width="1000"
            crop="scale"
            alt="Image With Text"
          />
        )}
      </div>

      <div className="flex flex-col space-y-5 justify-center">
        <h1 className="text-3xl break-all">{imageWithText.heading}</h1>
        <p className="leading-8 break-all">{imageWithText.subheading}</p>
        <button
          onClick={() => router.push(`/store/${storeSlug}/products`)}
          className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white self-start transition"
        >
          {imageWithText.buttonLabel}
        </button>
      </div>
    </div>
  );
}
