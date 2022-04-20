import { useState, useEffect } from "react";

import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ImageWithTextEditor({ iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const [imageWithText, setImageWithText] = useState({
    image: null,
    heading: "Image With Text",
    subheading:
      "Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
    buttonLabel: "Button Label",
  });

  // post message whenever image with text changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "imageWithText", payload: imageWithText },
      "http://localhost:3000"
    );
  }, [imageWithText]);

  return (
    <div className="">
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid p-3">
        <div
          onClick={() => setEditingSection([...editingSection].slice(0, -1))}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Image With Text</p>
      </div>

      {/* image */}
      <div className="flex flex-col space-y-1 px-4 pt-3">
        <p>Image</p>
        <div
          onClick={() => {
            setEditingSection([...editingSection, "imageSelector"]);
          }}
          className="grid place-items-center bg-neutral-200 border-2 border-solid hover:border-primary-blue  h-32 cursor-pointer transition "
        >
          <button className="bg-white px-3 py-2 rounded hover:bg-neutral-200 transition border-2 border-neutral-400 border-solid">
            Select Image
          </button>
        </div>
      </div>
      {/* heading */}
      <div className="flex flex-col space-y-1 px-4 pt-3">
        <p>Heading</p>
        <input
          type="text"
          value={imageWithText.heading}
          onChange={(event) => {
            setImageWithText({ ...imageWithText, heading: event.target.value });
          }}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* subheading */}
      <div className="flex flex-col space-y-1 px-4 pt-3">
        <p>Subheading</p>
        <input
          type="text"
          value={imageWithText.subheading}
          onChange={(event) => {
            setImageWithText({
              ...imageWithText,
              subheading: event.target.value,
            });
          }}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* button */}
      <div className="flex flex-col space-y-1 px-4 pt-3">
        <p>Button Label</p>
        <input
          type="text"
          value={imageWithText.buttonLabel}
          onChange={(event) => {
            setImageWithText({
              ...imageWithText,
              buttonLabel: event.target.value,
            });
          }}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
    </div>
  );
}
