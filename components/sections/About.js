import { useState, useEffect } from "react";

export default function About({ id, data }) {
  const [about, setAbout] = useState({
    heading: data.heading,
    subheading: data.subheading,
  });

  const handleUpdateAbout = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    if (event.data.section === "about" && event.data.id === id) {
      return setAbout(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateAbout);
    return () => {
      window.removeEventListener("message", handleUpdateAbout);
    };
  }, []);

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center space-y-10 lg:max-w-6xl text-center">
        {/* heading */}
        <h1 className="max-w-2xl text-4xl">{about.heading}</h1>

        {/* subheading */}
        <p className="max-w-3xl leading-8">{about.subheading}</p>
      </div>
    </div>
  );
}
