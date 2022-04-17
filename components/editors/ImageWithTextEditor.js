import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { imageWithTextState } from "../../atoms/imageWithTextAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ImageWithTextEditor() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  const [imageWithText, setImageWithText] = useRecoilState(imageWithTextState);

  return (
    <div className="">
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid pb-3">
        <div
          onClick={() => setEditingSection("sectionCardsList")}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Image With Text</p>
      </div>

      {/* image */}
      <div className="flex flex-col space-y-1 px-1 pt-3">
        <p>Image</p>
        <div className="grid place-items-center bg-neutral-200 border-2 border-solid hover:border-primary-blue  h-32 cursor-pointer transition ">
          <button className="bg-white px-3 py-2 rounded hover:bg-neutral-200 transition border-2 border-neutral-400 border-solid">
            Select Image
          </button>
        </div>
      </div>
      {/* heading */}
      <div className="flex flex-col space-y-1 px-1 pt-3">
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
      <div className="flex flex-col space-y-1 px-1 pt-3">
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
      <div className="flex flex-col space-y-1 px-1 pt-3">
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
