import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { aboutState } from "../../atoms/aboutAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ImageSelector() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  return (
    <div>
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid pb-3">
        <div
          onClick={() => setEditingSection([...editingSection].slice(0, -1))}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Select An Image</p>
      </div>

      {/* image */}
    </div>
  );
}
