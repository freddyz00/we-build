import { RiShoppingBag3Line } from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerState } from "../../atoms/headerAtom";

export default function Header() {
  const header = useRecoilValue(headerState);
  return (
    <nav className="h-14 border-b border-slate-200">
      <div className="container mx-auto select-none flex justify-between items-center h-full lg:max-w-6xl">
        <div>
          <p>{header}</p>
        </div>
        <ul className="flex items-center space-x-7">
          {/* {header.links.map((link, index) => (
            <li className="cursor-pointer hover:text-primary-blue" key={index}>
              {link}
            </li>
          ))} */}
          <li className="cursor-pointer hover:text-primary-blue">
            <RiShoppingBag3Line className="text-2xl font-light" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
