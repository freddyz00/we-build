import AddSection from "../components/AddSection";
import SectionCard from "../components/SectionCard";

import {
  RiLayoutTop2Line,
  RiImageLine,
  RiFileTextLine,
  RiImageEditLine,
  RiLayoutBottom2Line,
} from "react-icons/ri";
import { MdOutlineSell } from "react-icons/md";

import { useRecoilState } from "recoil";
import { editingSectionState } from "../atoms/editingSectionAtom";

export default function SectionCardsList() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  return (
    <div>
      {/* header */}
      <ul className="border-b border-solid border-slate-200 px-3 py-1">
        <SectionCard
          title="Header"
          Icon={RiLayoutTop2Line}
          onPress={() => setEditingSection([...editingSection, "headerEditor"])}
        />
      </ul>
      {/* main content */}
      <ul className="border-b border-solid border-slate-200 px-3 py-1">
        <SectionCard
          title="Image Banner"
          Icon={RiImageLine}
          draggable
          onPress={() =>
            setEditingSection([...editingSection, "imageBannerEditor"])
          }
        />
        <SectionCard
          title="About"
          Icon={RiFileTextLine}
          draggable
          onPress={() => setEditingSection([...editingSection, "aboutEditor"])}
        />
        <SectionCard
          title="Featured Products"
          Icon={MdOutlineSell}
          draggable
          onPress={() =>
            setEditingSection([...editingSection, "featuredProductsEditor"])
          }
        />
        <SectionCard
          title="Image With Text"
          Icon={RiImageEditLine}
          draggable
          onPress={() =>
            setEditingSection([...editingSection, "imageWithTextEditor"])
          }
        />
        <AddSection />
      </ul>
      {/* footer */}
      <ul className="px-3 py-1">
        <SectionCard
          title="Footer"
          Icon={RiLayoutBottom2Line}
          onPress={() => setEditingSection([...editingSection, "footerEditor"])}
        />
      </ul>
    </div>
  );
}
