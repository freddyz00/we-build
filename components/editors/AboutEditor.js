import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sectionsState } from "../../atoms/sectionsAtom";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import RemoveSection from "../RemoveSection";
import { MdOutlineArrowBackIos } from "react-icons/md";

export default function AboutEditor({ id, iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const [sections, setSections] = useRecoilState(sectionsState);
  const sectionData = sections.filter((section) => section._key === id)[0];

  const [about, setAbout] = useState({
    heading: sectionData.heading,
    subheading: sectionData.subheading,
  });

  // post message whenever about changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { id, section: "about", payload: about },
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }, [about]);

  // update sections when about changes
  useEffect(() => {
    setSections((sections) =>
      sections.map((section) => {
        if (section._key === id) {
          return {
            ...section,
            heading: about.heading,
            subheading: about.subheading,
          };
        }
        return section;
      })
    );
  }, [about]);

  return (
    <div className="absolute w-full flex flex-col justify-between h-full">
      <div className="overflow-y-auto pb-2">
        {/* title */}
        <div className="flex items-center space-x-2 border-b border-solid p-3">
          <div
            onClick={() => setEditingSection([...editingSection].slice(0, -1))}
            className="hover:bg-slate-200 p-1.5 rounded cursor-pointer transition"
          >
            <MdOutlineArrowBackIos />
          </div>
          <p className="font-medium">About</p>
        </div>

        {/* heading */}
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Heading</p>
          <input
            type="text"
            value={about.heading}
            onChange={(event) => {
              setAbout({ ...about, heading: event.target.value });
            }}
            className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
          />
        </div>

        {/* subheading */}
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Subheading</p>
          <input
            type="text"
            value={about.subheading}
            onChange={(event) => {
              setAbout({ ...about, subheading: event.target.value });
            }}
            className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
          />
        </div>
      </div>

      {/* remove section */}
      <div className="px-4 py-1 border-t border-solid">
        <RemoveSection id={id} />
      </div>
    </div>
  );
}
