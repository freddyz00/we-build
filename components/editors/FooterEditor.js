import { useRecoilState } from "recoil";
import { editingSectionState } from "../../atoms/editingSectionAtom";
import { footerState } from "../../atoms/footerAtom";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { BsX } from "react-icons/bs";
import { MdOutlineArrowBackIos, MdOutlineDragHandle } from "react-icons/md";

export default function Footer() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  const [footer, setFooter] = useRecoilState(footerState);

  return (
    <div>
      {/* title */}
      <div className="flex items-center space-x-2 border-b border-solid pb-3">
        <div
          onClick={() => setEditingSection("sectionCardsList")}
          className="hover:bg-slate-200 p-1.5 rounded cursor-pointer"
        >
          <MdOutlineArrowBackIos />
        </div>
        <p className="font-medium">Footer</p>
      </div>
      {/* navigation links */}
      <div className="flex flex-col space-y-1 px-1 pt-5">
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
  );
}
