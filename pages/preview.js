import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { sectionsState } from "../atoms/sectionsAtom";

import { getSession } from "next-auth/react";

import * as SectionComponents from "../components/sections";
import SectionSpacing from "../components/sections/SectionSpacing";

export default function Preview() {
  const [sections, setSections] = useRecoilState(sectionsState);

  useEffect(() => {
    if (sections.length > 0) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-page`
      );
      if (!res.ok) return;
      const { page } = await res.json();
      setSections(page.sections);
    })();
  }, []);

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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
