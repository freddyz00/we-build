import { useState, useEffect } from "react";

import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ImageBannerEditor({ iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const [imageBanner, setImageBanner] = useState({
    imageSrc: null,
    heading: "Image Banner",
    subheading:
      "Give customers details about the banner image(s) or content on the template.",
    buttonLabel: "Shop All",
  });

  // post message whenever image banner changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "imageBanner", payload: imageBanner },
      "http://localhost:3000"
    );
  }, [imageBanner]);

  return (
    <div>
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid p-3">
        <div
          onClick={() => setEditingSection([...editingSection].slice(0, -1))}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Image Banner</p>
      </div>

      {/* Image */}
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
          value={imageBanner.heading}
          onChange={(event) => {
            setImageBanner({ ...imageBanner, heading: event.target.value });
          }}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* subheading */}
      <div className="flex flex-col space-y-1 px-4 pt-3">
        <p>Subheading</p>
        <input
          type="text"
          value={imageBanner.subheading}
          onChange={(event) => {
            setImageBanner({ ...imageBanner, subheading: event.target.value });
          }}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* button */}
      <div className="flex flex-col space-y-1 px-4 pt-3">
        <p>Button Label</p>
        <input
          type="text"
          value={imageBanner.buttonLabel}
          onChange={(event) => {
            setImageBanner({ ...imageBanner, buttonLabel: event.target.value });
          }}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
    </div>
  );
}
