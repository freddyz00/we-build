import { MdDragIndicator } from "react-icons/md";

export default function SectionCard({ title, Icon }) {
  return (
    <li className="group flex justify-between items-center p-2 font-medium cursor-pointer hover:bg-slate-100 rounded-md transition ">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-5 w-5" />}
        <p className="select-none">{title}</p>
      </div>
      <div className="p-1 opacity-0 group-hover:opacity-100 transition hover:bg-slate-200 rounded cursor-grab">
        <MdDragIndicator className="text-lg" />
      </div>
    </li>
  );
}
