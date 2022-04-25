import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sectionsState } from "../../../atoms/sectionsAtom";
import { storeSlugState } from "../../../atoms/storeSlugAtom";
import * as SectionComponents from "../../../components/sections";

export default function Preview() {
  const router = useRouter();
  const { storeSlug } = router.query;
  const [sections, setSections] = useRecoilState(sectionsState);
  const setStoreSlug = useSetRecoilState(storeSlugState);

  // fetch page data
  useEffect(() => {
    if (!router.isReady) return;
    if (sections.length > 0) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-page?slug=${storeSlug}`
      );
      if (!res.ok) return;
      const { page } = await res.json();
      setSections(page.sections);
      setStoreSlug(storeSlug);
    })();
  }, [router.isReady]);

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
      {sections.map((section, index) => {
        const SectionComponent = SectionComponents[section._type];
        return (
          <div key={index}>
            <SectionComponent id={section._key} data={section} />
            {/* {section._type !== "header" && section._type !== "footer" && (
          <SectionSpacing />
        )} */}
          </div>
        );
      })}
    </div>
  );
}
