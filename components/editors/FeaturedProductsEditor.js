import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function FeaturedProductsEditor() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  return (
    <div className="border-b border-solid p-3">
      {/* title */}
      <div className="flex items-center space-x-2">
        <div
          onClick={() => setEditingSection([...editingSection].slice(0, -1))}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Featured Products</p>
      </div>
      {/* products */}
    </div>
  );
}
