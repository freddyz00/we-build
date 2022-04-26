import { useEffect, useRef, useState } from "react";

import { MdOutlineArrowBackIos, MdOutlineFileUpload } from "react-icons/md";

import classNames from "classnames";
import { urlFor } from "../../lib/sanity";

export default function ImageSelector({ data, setData, close }) {
  const [images, setImages] = useState([]);

  const imageUploadRef = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`
      );
      const data = await res.json();
      setImages(data.pageImages);
    })();
  }, []);

  const showImageUploader = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.click();
    }
  };

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    const imageFile = event.target.files[0];

    formData.append("file", imageFile);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-image`, {
      method: "POST",
      body: formData,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`);
    const data = await res.json();
    setImages(data.pageImages);
  };

  const handleImageSelect = (image) => {
    if (data.image?.asset._ref === image.asset._ref) {
      return setData({ ...data, image: null });
    }
    return setData({ ...data, image });
  };

  return (
    <div className="flex flex-col absolute top-0 left-0 right-0 bottom-0 z-10 bg-white overflow-hidden">
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid p-3">
        <div
          onClick={close}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer transition"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Select An Image</p>
      </div>

      {/* images */}
      <div className="grid grid-cols-2 p-3 gap-2 overflow-y-auto">
        <button
          onClick={showImageUploader}
          className="flex flex-col items-center justify-center bg-neutral-100 aspect-square border-2 border-dashed border-neutral-300 hover:border-primary-blue cursor-pointer transition"
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
        {images.map((image) => (
          <div
            onClick={() => handleImageSelect(image)}
            className={classNames(
              "bg-neutral-200 aspect-square hover:opacity-70 cursor-pointer transition",
              {
                "border-4 border-solid border-primary-blue":
                  data.image?.asset._ref === image.asset._ref,
              }
            )}
          >
            <img
              src={urlFor(image).width(300).url()}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
