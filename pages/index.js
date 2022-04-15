import AddSection from "../components/AddSection";
import SectionCard from "../components/SectionCard";

import {
  RiLayoutTop2Line,
  RiImageLine,
  RiFileTextLine,
  RiVideoLine,
  RiLayoutBottom2Line,
} from "react-icons/ri";
import { MdOutlineSell } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <nav className="h-12 border-b border-solid border-slate-200 shadow-sm z-10"></nav>
      <div className="flex-1 flex bg-stone-100">
        {/* side panel */}
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
            <SectionCard title="Video" Icon={RiVideoLine} />
            <AddSection />
          </ul>
          {/* footer */}
          <ul className="py-1">
            <SectionCard title="Footer" Icon={RiLayoutBottom2Line} />
          </ul>
        </aside>
        {/* web preview */}
        <main className="flex-1 grid place-items-center">
          <iframe
            src="/test"
            title="Test"
            height="95%"
            width="95%"
            className="border border-solid shadow"
          ></iframe>
        </main>
      </div>
    </div>
  );
}
