import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { storeSlugState } from "../../atoms/storeSlugAtom";
import { Image } from "cloudinary-react";
import classNames from "classnames";

export default function ImageBanner({ id, data }) {
  const [imageBanner, setImageBanner] = useState({
    imageId: data.imageId,
    textColor: data.textColor,
    heading: data.heading,
    subheading: data.subheading,
    buttonLabel: data.buttonLabel,
  });

  const storeSlug = useRecoilValue(storeSlugState);

  const router = useRouter();

  const handleUpdateImageBanner = useCallback(
    (event) => {
      if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) return;
      if (event.data.section === "imageBanner" && event.data.id === id) {
        return setImageBanner(event.data.payload);
      }
    },
    [id]
  );

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateImageBanner);
    return () => {
      window.removeEventListener("message", handleUpdateImageBanner);
    };
  }, [handleUpdateImageBanner]);

  return (
    <div
      className={classNames(
        `h-screen relative flex flex-col space-y-5 justify-center items-center`,
        {
          "bg-neutral-200": !imageBanner.imageId,
        }
      )}
    >
      {imageBanner.imageId && (
        <Image
          cloudName="de9qmr17c"
          publicId={imageBanner.imageId}
          className="absolute w-full h-full object-cover object-center opacity-80"
          alt="Image Banner"
        />
      )}

      <h2 className="text-color text-5xl max-w-3xl break-all text-center z-20">
        {imageBanner.heading}
      </h2>

      <p className="text-color max-w-5xl break-all text-center z-20">
        {imageBanner.subheading}
      </p>

      <button
        onClick={() => router.push(`/store/${storeSlug}/products`)}
        className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white transition z-20"
      >
        {imageBanner.buttonLabel}
      </button>

      <style jsx>{`
        .text-color {
          color: ${imageBanner.textColor === "dark" ? "#000" : "#fff"};
        }
      `}</style>
    </div>
  );
}
