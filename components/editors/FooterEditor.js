import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sectionsState } from "../../atoms/sectionsAtom";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { BsX } from "react-icons/bs";
import { MdOutlineArrowBackIos, MdOutlineDragHandle } from "react-icons/md";

export default function Footer({ id, iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const sections = useRecoilValue(sectionsState);
  const sectionData = sections.filter((section) => section._key === id)[0];

  const [footer, setFooter] = useState({
    links: sectionData.links,
  });

  const onDragEnd = async (result) => {
    const { draggableId, source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index == destination.index
    )
      return;
    switch (type) {
      case "footer-links":
        const newFooterLinks = Array.from(footer.links);
        const draggedFooterItem = newFooterLinks[source.index];
        newFooterLinks.splice(source.index, 1);
        newFooterLinks.splice(destination.index, 0, draggedFooterItem);
        setFooter({ links: newFooterLinks });
      default:
        return;
    }
  };

  // // post message whenever footer changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { id, section: "footer", payload: footer },
      "http://localhost:3000"
    );
  }, [footer]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {/* title */}
        <div className="flex items-center space-x-2 border-b border-solid p-3">
          <div
            onClick={() => setEditingSection([...editingSection].slice(0, -1))}
            className="hover:bg-slate-200 p-1.5 rounded cursor-pointer transition"
          >
            <MdOutlineArrowBackIos />
          </div>
          <p className="font-medium">Footer</p>
        </div>
        {/* navigation links */}
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Links</p>
          <Droppable droppableId="footer-links" type="footer-links">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="select-none"
              >
                {footer.links.map((link, index) => (
                  <Draggable
                    draggableId={`footer-link-${index}`}
                    key={index}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="flex items-center justify-between bg-white border border-solid px-2 py-1.5"
                      >
                        <div className="flex items-center w-full space-x-2">
                          <span
                            {...provided.dragHandleProps}
                            className="p-0.5 rounded cursor-grab"
                          >
                            <MdOutlineDragHandle />
                          </span>
                          <span
                            suppressContentEditableWarning
                            contentEditable
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                event.target.blur();
                              }
                            }}
                            onBlur={(event) => {
                              setFooter({
                                links: [
                                  ...footer.links.slice(0, index),
                                  event.target.textContent,
                                  ...footer.links.slice(index + 1),
                                ],
                              });
                            }}
                            className="flex-1 outline-none"
                          >
                            {link}
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            setFooter({
                              links: [
                                ...footer.links.slice(0, index),
                                ...footer.links.slice(index + 1),
                              ],
                            });
                          }}
                          className="cursor-pointer p-0.5 rounded"
                        >
                          <BsX />
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {footer.links.length < 5 && (
                  <li
                    onClick={() => {
                      setFooter({
                        links: [...footer.links, "New Link"],
                      });
                    }}
                    className="text-primary-blue hover:bg-slate-200 border-b border-x border-solid px-5 py-1.5 cursor-pointer transition"
                  >
                    Add Link
                  </li>
                )}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
