import { useState, useEffect } from "react";

export default function ImageBanner({ id }) {
  const [imageBanner, setImageBanner] = useState({
    imageSrc: null,
    heading: "Image Banner",
    subheading:
      "Give customers details about the banner image(s) or content on the template.",
    buttonLabel: "Shop All",
  });

  const handleUpdateImageBanner = (event) => {
    if (event.origin !== "http://localhost:3000") return;
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
      <h2 className="text-5xl max-w-3xl break-all text-center">
        {imageBanner.heading}
      </h2>

      <p className="max-w-5xl break-all text-center">
        {imageBanner.subheading}
      </p>

      <button className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white">
        {imageBanner.buttonLabel}
      </button>
      {/* <style jsx>{`
        .image-banner {
          background-image: url(${imageBanner.image});
        }
      `}</style> */}
    </div>
  );
}
