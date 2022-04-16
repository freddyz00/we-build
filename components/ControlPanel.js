import { useRecoilState } from "recoil";
import { editingSectionState } from "../atoms/editingSectionAtom";

import SectionCardsList from "./SectionCardsList";
import HeaderEditor from "./editors/HeaderEditor";

export default function ControlPanel() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const renderEditingSection = () => {
    switch (editingSection) {
      case "sectionCardsList":
        return <SectionCardsList />;
      case "headerEditor":
        return <HeaderEditor />;
    }
  };

  console.log("editingSection", editingSection);

  return (
    <aside className="bg-white w-72 p-3 overflow-y-auto">
      {renderEditingSection()}
    </aside>
  );
}
