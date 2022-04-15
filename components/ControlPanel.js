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

export default function ControlPanel() {
  return (
    <aside className="bg-white w-72 p-3 overflow-y-auto">
      {/* header */}
      <ul className="border-b border-solid border-slate-200 py-1">
        <SectionCard title="Header" Icon={RiLayoutTop2Line} />
      </ul>
      {/* main content */}
      <ul className="border-b border-solid border-slate-200 py-1">
        <SectionCard title="Image Banner" Icon={RiImageLine} />
        <SectionCard title="About" Icon={RiFileTextLine} />
        <SectionCard title="Featured Products" Icon={MdOutlineSell} />
        <SectionCard title="Image With Text" Icon={RiImageEditLine} />
        <AddSection />
      </ul>
      {/* footer */}
      <ul className="py-1">
        <SectionCard title="Footer" Icon={RiLayoutBottom2Line} />
      </ul>
    </aside>
  );
}
