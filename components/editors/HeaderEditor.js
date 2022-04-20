import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
// import { headerState } from "../../atoms/headerAtom";

import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { BsX } from "react-icons/bs";
import { MdOutlineArrowBackIos, MdOutlineDragHandle } from "react-icons/md";

export default function HeaderEditor({ iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  // const [header, setHeader] = useRecoilState(headerState);
  const [header, setHeader] = useState({
    brandName: "Brand",
    links: ["Home", "Shop", "Contact"],
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
      case "navigation-links":
        const newLinks = Array.from(header.links);
        const draggedItem = newLinks[source.index];
        newLinks.splice(source.index, 1);
        newLinks.splice(destination.index, 0, draggedItem);
        setHeader({ ...header, links: newLinks });
        return;
      default:
        return;
    }
  };

  // post message whenever header changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "header", payload: header },
      "http://localhost:3000"
    );
  }, [header]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {/* title */}
        <div className="flex items-center space-x-2 border-b border-solid p-3">
          <div
            onClick={() => setEditingSection([...editingSection].slice(0, -1))}
            className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
          >
            <MdOutlineArrowBackIos />
          </div>
          <p className="font-medium">Header</p>
        </div>
        {/* logo */}
        <div className="flex flex-col space-y-1 px-4 pt-3">
          <p>Brand Name</p>
          <input
            type="text"
            value={header.brandName}
            onChange={(event) =>
              setHeader({ ...header, brandName: event.target.value })
            }
            className="border border-solid border-slate-300 w-full px-3 py-1.5 rounded"
          />
        </div>
        {/* navigation links */}
        <div className="flex flex-col space-y-1 px-4 pt-5">
          <p>Navigation Links</p>
          <Droppable droppableId="navigation-links" type="navigation-links">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="select-none"
              >
                {header.links.map((link, index) => (
                  <Draggable
                    draggableId={`link-${index}`}
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
                            contentEditable
                            suppressContentEditableWarning
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                event.target.blur();
                              }
                            }}
                            onBlur={(event) => {
                              setHeader({
                                ...header,
                                links: [
                                  ...header.links.slice(0, index),
                                  event.target.textContent,
                                  ...header.links.slice(index + 1),
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
                            setHeader({
                              ...header,
                              links: [
                                ...header.links.slice(0, index),
                                ...header.links.slice(index + 1),
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
                {header.links.length < 5 && (
                  <li
                    onClick={() => {
                      setHeader({
                        ...header,
                        links: [...header.links, "New Link"],
                      });
                    }}
                    className="text-primary-blue hover:bg-slate-200 border-b border-x border-solid px-5 py-1.5 cursor-pointer"
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
