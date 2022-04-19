import { useRef } from "react";
import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { imageBannerState } from "../../atoms/imageBannerAtom";

import { MdOutlineArrowBackIos, MdOutlineFileUpload } from "react-icons/md";

import { sanityClient } from "../../lib/sanity";
import { faker } from "@faker-js/faker";

export default function ImageSelector() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  const [imageBanner, setImageBanner] = useRecoilState(imageBannerState);
  const imageSrc = faker.image.image();

  const imageUploadRef = useRef(null);

  const showImageUploader = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.click();
    }
  };

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    const imageFile = event.target.files[0];
    sanityClient
      .create({
        _type: "about",
        heading: "h1",
        subheading: "123f",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid p-3">
        <div
          onClick={() => setEditingSection([...editingSection].slice(0, -1))}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Select An Image</p>
      </div>

      {/* images */}
      <div className="grid grid-cols-2 p-3 gap-2 overflow-y-auto">
        <button
          onClick={showImageUploader}
          className="flex flex-col items-center justify-center bg-neutral-100 border-2 border-dashed border-neutral-300 hover:border-primary-blue aspect-square cursor-pointer"
        >
          <MdOutlineFileUpload className="text-2xl" />
          <p className="select-none">Upload</p>
        </button>
        <input
          ref={imageUploadRef}
          onInput={handleImageUpload}
          id="uploaded-image"
          type="file"
          accept="image/*"
          className="hidden"
        />
        {/* <button
          onClick={() => {}}
          className="bg-neutral-200 aspect-square hover:opacity-80 focus:border-4 border-primary-blue border-solid cursor-pointer"
        >
          <img src={imageSrc} alt="" className="w-full h-full object-covers" />
        </button> */}
      </div>
    </div>
  );
}
