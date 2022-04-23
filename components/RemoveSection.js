import { useRecoilState } from "recoil";
import { sectionsState } from "../atoms/sectionsAtom";
import { editingSectionState } from "../atoms/editingSectionAtom";

import { RiDeleteBin6Line } from "react-icons/ri";

export default function RemoveSection({ id }) {
  const [sections, setSections] = useRecoilState(sectionsState);
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const handleRemoveSection = () => {
    setEditingSection([...editingSection].slice(0, -1));
    setSections((sections) =>
      sections.filter((section) => section._key !== id)
    );
  };

  return (
    <button
      onClick={handleRemoveSection}
      className="flex w-full space-x-2 items-center p-2 font-medium cursor-pointer hover:bg-slate-100 rounded-md transition "
    >
      <div>
        <RiDeleteBin6Line className="h-5 w-5 text-red-600" />
      </div>
      <div>
        <p className="text-red-600 select-none">Remove Section</p>
      </div>
    </button>
  );
}
