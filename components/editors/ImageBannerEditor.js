import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sectionsState } from "../../atoms/sectionsAtom";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import RemoveSection from "../RemoveSection";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { urlFor } from "../../lib/sanity";
import ImageSelector from "./ImageSelector";
import Select from "react-select";
import { Image } from "cloudinary-react";
import classNames from "classnames";

const options = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

export default function ImageBannerEditor({ id, iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [sections, setSections] = useRecoilState(sectionsState);
  const sectionData = sections.filter((section) => section._key === id)[0];

  const [imageBanner, setImageBanner] = useState({
    imageId: sectionData.imageId,
    textColor: sectionData.textColor,
    heading: sectionData.heading,
    subheading: sectionData.subheading,
    buttonLabel: sectionData.buttonLabel,
  });

  // post message whenever image banner changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { id, section: "imageBanner", payload: imageBanner },
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }, [imageBanner, id, iframeRef]);

  // update sections when image banner changes
  useEffect(() => {
    setSections((sections) =>
      sections.map((section) => {
        if (section._key === id) {
          return {
            ...section,
            imageId: imageBanner.imageId,
            textColor: imageBanner.textColor,
            heading: imageBanner.heading,
            subheading: imageBanner.subheading,
            buttonLabel: imageBanner.buttonLabel,
          };
        }
        return section;
      })
    );
  }, [imageBanner, id, setSections]);

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
          <p className="font-medium">Image Banner</p>
        </div>

        {/* Image */}
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Image</p>
          <div
            onClick={() => {
              setShowImageSelector(true);
            }}
            className={classNames(
              "relative grid place-items-center border-2 border-solid hover:border-primary-blue h-32 cursor-pointer transition object-cover",
              {
                "bg-neutral-200": !imageBanner.imageId,
              }
            )}
          >
            {imageBanner.imageId && (
              <Image
                cloudName="de9qmr17c"
                publicId={imageBanner.imageId}
                className="absolute w-full h-full object-cover object-center"
                width="300"
                crop="scale"
                alt="Image preview"
              />
            )}
            <button className="bg-white px-3 py-2 rounded hover:bg-neutral-200 transition border-2 border-neutral-400 border-solid transition z-10">
              Select Image
            </button>
          </div>
        </div>

        {/* text color */}
        <div className="px-4 pt-3">
          <p>Text Color</p>
          <Select
            options={options}
            defaultValue={
              imageBanner.textColor === "dark" ? options[0] : options[1]
            }
            onChange={(event) => {
              setImageBanner({ ...imageBanner, textColor: event.value });
            }}
          />
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
              setImageBanner({
                ...imageBanner,
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
            value={imageBanner.buttonLabel}
            onChange={(event) => {
              setImageBanner({
                ...imageBanner,
                buttonLabel: event.target.value,
              });
            }}
            className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
          />
        </div>
        {showImageSelector && (
          <ImageSelector
            data={imageBanner}
            setData={setImageBanner}
            close={() => setShowImageSelector(false)}
          />
        )}
      </div>

      {/* remove section */}
      <div className="px-4 py-1 border-t border-solid">
        <RemoveSection id={id} />
      </div>
    </div>
  );
}
