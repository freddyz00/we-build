import { useState, useEffect } from "react";

import { RiShoppingBag3Line } from "react-icons/ri";

export default function Header({ id, data }) {
  const [header, setHeader] = useState({
    brandName: data.brandName,
    links: data.links,
  });

  const handleUpdateHeader = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    if (event.data.section === "header" && event.data.id === id) {
      return setHeader(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateHeader);
    return () => {
      window.removeEventListener("message", handleUpdateHeader);
    };
  }, []);

  return (
    <nav className="h-14 border-b border-slate-200">
      <div className="container mx-auto select-none flex justify-between items-center h-full lg:max-w-6xl">
        <div>
          <p className="text-lg font-medium">{header.brandName}</p>
        </div>
        <ul className="flex items-center space-x-7">
          {header.links.map((link, index) => (
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
