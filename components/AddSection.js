import { MdOutlineAddCircleOutline } from "react-icons/md";
import SectionCard from "./SectionCard";

import { useRecoilState } from "recoil";
import { sectionsState } from "../atoms/sectionsAtom";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import {
  RiLayoutTop2Line,
  RiImageLine,
  RiFileTextLine,
  RiImageEditLine,
  RiLayoutBottom2Line,
} from "react-icons/ri";
import { MdOutlineSell } from "react-icons/md";

const icons = {
  header: RiLayoutTop2Line,
  imageBanner: RiImageLine,
  about: RiFileTextLine,
  featuredProducts: MdOutlineSell,
  imageWithText: RiImageEditLine,
  footer: RiLayoutBottom2Line,
};

export default function AddSection() {
  const [sections, setSections] = useRecoilState(sectionsState);
  const addNewSection = (type) => {};

  return (
    <Popup
      trigger={
        <li className="flex space-x-2 items-center p-2 font-medium cursor-pointer hover:bg-slate-100 rounded-md transition ">
          <div>
            <MdOutlineAddCircleOutline className="h-5 w-5 text-primary-blue" />
          </div>
          <div>
            <p className="text-primary-blue select-none">Add Section</p>
          </div>
        </li>
      }
      position="top center"
      closeOnDocumentClick
      arrow={false}
      contentStyle={{ width: "280px" }}
    >
      <ul className="flex flex-col select-none">
        <SectionCard
          title={"Image Banner"}
          Icon={icons["imageBanner"]}
          onPress={() => {}}
        />
        <SectionCard
          title={"Image With Text"}
          Icon={icons["imageWithText"]}
          onPress={() => {}}
        />
        <SectionCard title={"About"} Icon={icons["about"]} onPress={() => {}} />
      </ul>
    </Popup>
  );
}
