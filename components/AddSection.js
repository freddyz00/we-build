import { MdOutlineAddCircleOutline } from "react-icons/md";
import SectionCard from "./SectionCard";
import { defaultData } from "../lib/defaultData";
import { nanoid } from "nanoid";

import { useRecoilState, useRecoilValue } from "recoil";
import { sectionsState } from "../atoms/sectionsAtom";
import { pageIdState } from "../atoms/pageIdAtom";

import { sanityClient } from "../lib/sanity";

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
  const pageId = useRecoilValue(pageIdState);
  const addNewSection = (closePopup, type) => {
    setSections((sections) => [
      ...sections.slice(0, sections.length - 1),
      { _key: nanoid(), ...defaultData[type] },
      sections[sections.length - 1],
    ]);

    closePopup();

    // fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/section`, {
    //   method: "POST",
    //   body: JSON.stringify({ type, pageId }),
    // })
    //   .then(async (res) => {
    //     if (res.status !== 200) return;
    //     const query = `*[_type == "page"][0]`;
    //     const data = await sanityClient.fetch(query);
    //     setSections(data.sections);
    //   })
    //   .catch((error) => console.log(error))
    //   .finally(() => {
    //     closePopup();
    //   });
  };

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
      {(close) => (
        <ul className="flex flex-col select-none">
          <SectionCard
            title={"Image Banner"}
            Icon={icons["imageBanner"]}
            onPress={() => addNewSection(close, "imageBanner")}
          />
          <SectionCard
            title={"Image With Text"}
            Icon={icons["imageWithText"]}
            onPress={() => addNewSection(close, "imageWithText")}
          />
          <SectionCard
            title={"About"}
            Icon={icons["about"]}
            onPress={() => addNewSection(close, "about")}
          />
        </ul>
      )}
    </Popup>
  );
}
