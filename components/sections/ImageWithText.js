import { useState, useEffect } from "react";

export default function ImageWithText() {
  const [imageWithText, setImageWithText] = useState({
    image: null,
    heading: "Image With Text",
    subheading:
      "Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
    buttonLabel: "Button Label",
  });

  const handleUpdateImageWithText = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    if (event.data.section === "imageWithText") {
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
    <div className="container mx-auto lg:max-w-6xl grid grid-cols-2 gap-x-20">
      <div className="h-[500px] bg-neutral-200">
        <img
          src={imageWithText.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col space-y-5 justify-center">
        <h1 className="text-3xl break-all">{imageWithText.heading}</h1>
        <p className="leading-8 break-all">{imageWithText.subheading}</p>
        <button className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white self-start">
          {imageWithText.buttonLabel}
        </button>
      </div>
    </div>
  );
}
