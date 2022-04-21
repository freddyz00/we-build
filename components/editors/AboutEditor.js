import { useState, useEffect } from "react";

import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import { MdOutlineArrowBackIos } from "react-icons/md";

export default function AboutEditor({ id, iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const [about, setAbout] = useState({
    heading: "Talk about your brand",
    subheading:
      "Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.",
  });

  // post message whenever about changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { id, section: "about", payload: about },
      "http://localhost:3000"
    );
  }, [about]);

  return (
    <div>
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid p-3">
        <div
          onClick={() => setEditingSection([...editingSection].slice(0, -1))}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
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
  );
}
