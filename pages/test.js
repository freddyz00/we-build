import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { sectionsState } from "../atoms/sectionsAtom";

import * as SectionComponents from "../components/sections";
import SectionSpacing from "../components/sections/SectionSpacing";

export default function Test() {
  const [sections, setSections] = useRecoilState(sectionsState);

  const handleUpdateSections = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    if (event.data.section === "sections") {
      return setSections(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateSections);
    return () => {
      window.removeEventListener("message", handleUpdateSections);
    };
  }, [sections]);

  return (
    <div className="bg-white min-h-screen">
      {/* <Header />
      <ImageBanner />
      <SectionSpacing />
      <About />
      <SectionSpacing />
      <FeaturedProducts />
      <SectionSpacing />
      <ImageWithText />
      <SectionSpacing />
      <Footer /> */}
      {sections.map((section, index) => {
        const SectionComponent = SectionComponents[section._type];

        return (
          <>
            <SectionComponent key={index} />
            {section._type !== "header" && section._type !== "footer" && (
              <SectionSpacing />
            )}
          </>
        );
      })}
    </div>
  );
}
