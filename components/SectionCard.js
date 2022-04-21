import { Draggable } from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";

export default function SectionCard({
  title,
  Icon,
  draggable,
  onPress,
  index,
  _key,
}) {
  if (draggable)
    return (
      <Draggable draggableId={`section-${_key}`} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <li
              onClick={onPress}
              className="group flex justify-between items-center p-2 font-medium cursor-pointer hover:bg-slate-100 rounded-md transition "
            >
              <div className="flex items-center space-x-2">
                {Icon && <Icon className="h-5 w-5" />}
                <p className="select-none">{title}</p>
              </div>
              <div
                {...provided.dragHandleProps}
                className="p-1 opacity-0 group-hover:opacity-100 transition hover:bg-slate-200 rounded cursor-grab"
              >
                <MdDragIndicator className="text-lg" />
              </div>
            </li>
          </div>
        )}
      </Draggable>
    );

  return (
    <li
      onClick={onPress}
      className="group flex justify-between items-center p-2 font-medium cursor-pointer hover:bg-slate-100 rounded-md transition "
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-5 w-5" />}
        <p className="select-none">{title}</p>
      </div>
      {draggable && (
        <div className="p-1 opacity-0 group-hover:opacity-100 transition hover:bg-slate-200 rounded cursor-grab">
          <MdDragIndicator className="text-lg" />
        </div>
      )}
    </li>
  );
}
