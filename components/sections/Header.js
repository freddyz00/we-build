import { useRecoilValue } from "recoil";
import { headerState } from "../../atoms/headerAtom";

import { RiShoppingBag3Line } from "react-icons/ri";

export default function Header() {
  const { brandName, links } = useRecoilValue(headerState);
  return (
    <nav className="h-14 border-b border-slate-200">
      <div className="container mx-auto select-none flex justify-between items-center h-full lg:max-w-6xl">
        <div>
          <p className="text-lg font-medium">{brandName}</p>
        </div>
        <ul className="flex items-center space-x-7">
          {links.map((link, index) => (
            <li className="cursor-pointer hover:text-primary-blue" key={index}>
              {link}
            </li>
          ))}
          <li className="cursor-pointer hover:text-primary-blue">
            <RiShoppingBag3Line className="text-2xl font-light" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
