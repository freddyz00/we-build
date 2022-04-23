import { useRecoilState } from "recoil";
import { editingSectionState } from "../atoms/editingSectionAtom";
import { sectionsState } from "../atoms/sectionsAtom";

import AddSection from "../components/AddSection";
import SectionCard from "../components/SectionCard";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

export default function SectionCardsList() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const [sections, setSections] = useRecoilState(sectionsState);

  const onDragEnd = async (result) => {
    const { draggableId, source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index == destination.index
    )
      return;

    if (type !== "sections") return;

    const newSections = Array.from(sections);
    const [removed] = newSections.splice(source.index + 1, 1);
    newSections.splice(destination.index + 1, 0, removed);
    setSections(newSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="absolute w-full flex flex-col justify-between">
        {sections.length > 0 && (
          <>
            {/* header */}
            <ul className="border-b border-solid border-slate-200 px-3 py-1">
              <SectionCard
                title="Header"
                Icon={icons.header}
                onPress={() =>
                  setEditingSection([
                    ...editingSection,
                    {
                      id: sections[0]._key,
                      type: "headerEditor",
                    },
                  ])
                }
              />
            </ul>
            {/* main content */}
            <Droppable droppableId="sections" type="sections">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="border-b border-solid border-slate-200 px-3 py-1"
                >
                  {sections
                    .filter(
                      (section) =>
                        section._type !== "header" && section._type !== "footer"
                    )
                    .map((section, index) => (
                      <SectionCard
                        key={section._key}
                        _key={section._key}
                        index={index}
                        title={section.title}
                        Icon={icons[section._type]}
                        draggable
                        onPress={() =>
                          setEditingSection([
                            ...editingSection,
                            {
                              id: section._key,
                              type: `${section._type}Editor`,
                            },
                          ])
                        }
                      />
                    ))}
                  {provided.placeholder}
                  <AddSection />
                </ul>
              )}
            </Droppable>
            {/* footer */}
            <ul className="px-3 py-1">
              <SectionCard
                title="Footer"
                Icon={icons.footer}
                onPress={() =>
                  setEditingSection([
                    ...editingSection,
                    {
                      id: sections[sections.length - 1]._key,

                      type: "footerEditor",
                    },
                  ])
                }
              />
            </ul>
          </>
        )}
      </div>
    </DragDropContext>
  );
}
