import { useState, useEffect } from "react";

export default function Footer({ id }) {
  const [footer, setFooter] = useState({
    links: ["About Us", "Contact", "Shipping Policy", "Privacy Policy"],
  });

  const handleUpdateFooter = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    if (event.data.section === "footer" && event.data.id === id) {
      return setFooter(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateFooter);
    return () => {
      window.removeEventListener("message", handleUpdateFooter);
    };
  }, []);

  return (
    <div className="border-t border-solid border-slate-200 py-10">
      <div className="container mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-3 justify-items-center mb-10">
          <div>
            <p className="text-lg mb-3 font-medium">Links</p>
            <ul className="flex flex-col space-y-1">
              {footer.links.map((link, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-primary-blue"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
          <div></div>
          <form className="flex flex-col space-y-3">
            <p className="text-lg font-medium">Subscribe to our newsletter</p>
            <input
              type="email"
              placeholder="Email"
              className="py-2 px-3 w-80 border border-solid border-slate-500 rounded"
            />
          </form>
        </div>
        <p className="text-center text-sm">© 2022, Built with WEBuild</p>
      </div>
    </div>
  );
}
