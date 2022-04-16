import { useRecoilState, useSetRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { headerState } from "../../atoms/headerAtom";

import { MdOutlineArrowBackIos, MdOutlineDragHandle } from "react-icons/md";
import { BsX } from "react-icons/bs";

export default function HeaderEditor() {
  const setEditingSection = useSetRecoilState(editingSectionState);
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
          value={header.logoText}
          onChange={(event) =>
            setHeader({ ...header, logoText: event.target.value })
          }
          className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
        />
      </div>
      {/* navigation links */}
      <div className="flex flex-col space-y-1 px-1 pt-5">
        <p>Navigation Links</p>
        <ul className="select-none">
          {header.links.map((link, index) => (
            <li
              key={index}
              className="flex items-center justify-between border border-solid px-2 py-1.5"
            >
              <div className="flex items-center space-x-2">
                <span className="p-0.5 rounded cursor-grab">
                  <MdOutlineDragHandle />
                </span>
                <span>{link}</span>
              </div>
              <div className="cursor-pointer p-0.5 rounded">
                <BsX />
              </div>
            </li>
          ))}
          <li className="text-primary-blue border-b border-x border-solid px-3 py-1.5 cursor-pointer">
            Add
          </li>
        </ul>
      </div>
    </div>
  );
}
