import { useEffect, useRef, useState } from "react";

import { Image } from "cloudinary-react";

import { MdOutlineArrowBackIos, MdOutlineFileUpload } from "react-icons/md";

import classNames from "classnames";

export default function ImageSelector({ data, setData, close }) {
  const [imagePublicIds, setImagePublicIds] = useState([]);
  const imageUploadRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`
      );
      const data = await res.json();
      setLoading(false);
      if (data.pageImages) {
        setImagePublicIds(data.pageImages);
      }
    })();
  }, []);

  const showImageUploader = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.click();
    }
  };

  const handleImageUpload = async (event) => {
    setLoading(true);

    const reader = new FileReader();
    const file = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-image`, {
        method: "POST",
        body: JSON.stringify({ fileString: reader.result }),
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`
      );
      const data = await res.json();
      setLoading(false);
      setImagePublicIds(data.pageImages);
    };
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const handleImageSelect = (imagePublicId) => {
    if (data.imageId === imagePublicId) {
      return setData({ ...data, imageId: null });
    }
    return setData({ ...data, imageId: imagePublicId });
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
        {imagePublicIds?.map((imagePublicId, index) => (
          <div
            key={index}
            onClick={() => handleImageSelect(imagePublicId)}
            className={classNames(
              "bg-neutral-200 aspect-square hover:opacity-70 cursor-pointer transition",
              {
                "border-4 border-solid border-primary-blue":
                  data.imageId === imagePublicId,
              }
            )}
          >
            <Image
              cloudName="de9qmr17c"
              publicId={imagePublicId}
              className="w-full h-full object-cover object-center"
              width="200"
              crop="scale"
              alt="Uploaded images"
            />
          </div>
        ))}
        {loading && <div className="bg-neutral-300 animate-pulse"></div>}
      </div>
    </div>
  );
}
