import { RiShoppingBag3Line } from "react-icons/ri";

export default function Header() {
  return (
    <nav className="h-14 border-b border-slate-200">
      <div className="container mx-auto select-none flex justify-between items-center h-full lg:max-w-6xl">
        <div>
          <p>WEBuild</p>
        </div>
        <ul className="flex items-center space-x-7">
          <li className="cursor-pointer hover:text-primary-blue">Home</li>
          <li className="cursor-pointer hover:text-primary-blue">Shop</li>
          <li className="cursor-pointer hover:text-primary-blue">Contact</li>
          <li className="cursor-pointer hover:text-primary-blue">
            <RiShoppingBag3Line className="text-2xl font-light" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
