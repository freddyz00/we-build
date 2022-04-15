import { MdOutlineAddCircleOutline } from "react-icons/md";

export default function AddSection() {
  return (
    <li className="flex space-x-2 items-center p-2 font-medium cursor-pointer hover:bg-slate-100 rounded-md transition ">
      <div>
        <MdOutlineAddCircleOutline className="h-5 w-5 text-primary-blue" />
      </div>
      <div>
        <p className="text-primary-blue select-none">Add Section</p>
      </div>
    </li>
  );
}
