import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { headerState } from "../../atoms/headerAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function HeaderEditor() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  const [header, setHeader] = useRecoilState(headerState);

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
        <p className="font-medium">Header</p>
      </div>
      {/* logo */}
      <div className="flex flex-col space-y-1 px-1 pt-3">
        <p>Logo</p>
        <input
          type="text"
          value={header}
          onChange={(event) => setHeader(event.target.value)}
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* navigation links */}
      <div className="flex flex-col space-y-1 px-1 pt-5">
        <p>Navigation Links</p>
        <ul>
          <li className="border border-solid px-3 py-1.5 ">Home</li>
          <li className="border-b border-x border-solid px-3 py-1.5 ">Shop</li>
          <li className="border-b border-x border-solid px-3 py-1.5 ">
            Contact
          </li>
          <li className="border-b border-x border-solid px-3 py-1.5 ">Add</li>
        </ul>
      </div>
    </div>
  );
}
