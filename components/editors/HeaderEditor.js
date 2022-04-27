import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sectionsState } from "../../atoms/sectionsAtom";
import { editingSectionState } from "../../atoms/editingSectionAtom";

import { urlFor } from "../../lib/sanity";
import ImageSelector from "./ImageSelector";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { BsX } from "react-icons/bs";
import { MdOutlineArrowBackIos, MdOutlineDragHandle } from "react-icons/md";

export default function HeaderEditor({ id, iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const [sections, setSections] = useRecoilState(sectionsState);
  const sectionData = sections.filter((section) => section._key === id)[0];

  const [header, setHeader] = useState({
    storeName: sectionData.storeName,
    image: sectionData.image,
    links: sectionData.links,
  });

  const [showImageSelector, setShowImageSelector] = useState(false);

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
      { id, section: "header", payload: header },
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }, [header]);

  // update sections when header changes
  useEffect(() => {
    setSections((sections) =>
      sections.map((section) => {
        if (section._key === id) {
          return {
            ...section,
            image: header.image,
            links: header.links,
          };
        }
        return section;
      })
    );
  }, [header]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-full">
        <div>
          {/* title */}
          <div className="flex items-center space-x-2 border-b border-solid p-3">
            <div
              onClick={() =>
                setEditingSection([...editingSection].slice(0, -1))
              }
              className="hover:bg-slate-200 p-1.5 rounded cursor-pointer transition"
            >
              <MdOutlineArrowBackIos />
            </div>
            <p className="font-medium">Header</p>
          </div>

          {/* logo */}
          <div className="flex flex-col space-y-1 px-4 pt-3">
            <p>Logo</p>
            <div
              onClick={() => {
                setShowImageSelector(true);
              }}
              className="image-preview grid place-items-center bg-neutral-200 border-2 border-solid hover:border-primary-blue  h-32 cursor-pointer transition object-cover"
            >
              <button className="bg-white px-3 py-2 rounded hover:bg-neutral-200 transition border-2 border-neutral-400 border-solid transition">
                Select Image
              </button>
            </div>
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
        {showImageSelector && (
          <ImageSelector
            data={header}
            setData={setHeader}
            close={() => setShowImageSelector(false)}
          />
        )}
        <style jsx>{`
          .image-preview {
            background-image: url(${header.image
              ? urlFor(header.image).width(300).url()
              : null});
            background-position: center;
          }
        `}</style>
      </div>
    </DragDropContext>
  );
}
