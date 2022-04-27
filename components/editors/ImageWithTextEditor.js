import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sectionsState } from "../../atoms/sectionsAtom";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { urlFor } from "../../lib/sanity";

import { MdOutlineArrowBackIos } from "react-icons/md";
import RemoveSection from "../RemoveSection";
import ImageSelector from "./ImageSelector";

export default function ImageWithTextEditor({ id, iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const [sections, setSections] = useRecoilState(sectionsState);
  const sectionData = sections.filter((section) => section._key === id)[0];

  const [imageWithText, setImageWithText] = useState({
    image: sectionData.image,
    heading: sectionData.heading,
    subheading: sectionData.subheading,
    buttonLabel: sectionData.buttonLabel,
  });

  // post message whenever image with text changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { id, section: "imageWithText", payload: imageWithText },
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }, [imageWithText]);

  // update sections when image with text changes
  useEffect(() => {
    setSections((sections) =>
      sections.map((section) => {
        if (section._key === id) {
          return {
            ...section,
            image: imageWithText.image,
            heading: imageWithText.heading,
            subheading: imageWithText.subheading,
            buttonLabel: imageWithText.buttonLabel,
          };
        }
        return section;
      })
    );
  }, [imageWithText]);

  return (
    <div className="absolute w-full flex flex-col justify-between h-full">
      <div className="overflow-y-auto pb-2">
        {/* title */}
        <div className="flex items-center space-x-2 border-b border-solid p-3">
          <div
            onClick={() => setEditingSection([...editingSection].slice(0, -1))}
            className="hover:bg-slate-200 p-1.5 rounded cursor-pointer transition"
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
              setShowImageSelector(true);
            }}
            className="image-preview grid place-items-center bg-neutral-200 border-2 border-solid hover:border-primary-blue  h-32 cursor-pointer transition "
          >
            <button className="bg-white px-3 py-2 rounded hover:bg-neutral-200 transition border-2 border-neutral-400 border-solid transition">
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
              setImageWithText({
                ...imageWithText,
                heading: event.target.value,
              });
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
        {showImageSelector && (
          <ImageSelector
            data={imageWithText}
            setData={setImageWithText}
            close={() => setShowImageSelector(false)}
          />
        )}
        <style jsx>{`
          .image-preview {
            background-image: url(${imageWithText.image
              ? urlFor(imageWithText.image).width(300).url()
              : null});
            background-position: center;
          }
        `}</style>
      </div>
      {/* remove section */}
      <div className="px-4 py-1 border-t border-solid">
        <RemoveSection id={id} />
      </div>
    </div>
  );
}
