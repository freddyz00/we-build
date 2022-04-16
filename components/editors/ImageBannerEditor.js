import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ImageBannerEditor() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  return (
    <div>
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid pb-3">
        <div
          onClick={() => setEditingSection("sectionCardsList")}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Image Banner</p>
      </div>

      {/* Image */}
      {/* heading */}
      <div className="flex flex-col space-y-1 px-1 pt-3">
        <p>Heading</p>
        <input
          type="text"
          value="Image"
          onChange={() => {}}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* subheading */}
      <div className="flex flex-col space-y-1 px-1 pt-3">
        <p>Subheading</p>
        <input
          type="text"
          value="Image"
          onChange={() => {}}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* button */}
      <div className="flex flex-col space-y-1 px-1 pt-3">
        <p>Button Label</p>
        <input
          type="text"
          value="Image"
          onChange={() => {}}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
    </div>
  );
}
