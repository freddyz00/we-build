import Link from "next/link";
import { useRef, useEffect } from "react";
import { getSession } from "next-auth/react";

import ControlPanel from "../components/ControlPanel";

import { useRecoilState } from "recoil";
import { sectionsState } from "../atoms/sectionsAtom";
import { pageIdState } from "../atoms/pageIdAtom";

import { sanityClient } from "../lib/sanity";

export default function Editor({ user }) {
  const iframeRef = useRef(null);
  const [sections, setSections] = useRecoilState(sectionsState);
  const [pageId, setPageId] = useRecoilState(pageIdState);

  const handleSaveData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-data`,
      {
        method: "POST",
        body: JSON.stringify({ pageId, sections }),
      }
    );
  };

  useEffect(() => {
    (async () => {
      const query = `*[_type == "page"][0]`;
      const data = await sanityClient.fetch(query);
      setSections(data.sections);
      setPageId(data._id);
    })();
  }, []);

  // post message whenever sections changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "sections", payload: sections },
      "http://localhost:3000"
    );
  }, [sections]);

  return (
    <div className="flex flex-col h-screen">
      {/* top header */}
      <div className="flex items-center h-12 border-b border-solid border-slate-200 shadow-sm z-10">
        <Link href="/test">
          <a>Preview</a>
        </Link>
        <button
          onClick={handleSaveData}
          className="text-white rounded-lg bg-primary-blue hover:bg-darker-blue px-5 py-2 ml-auto mr-5"
        >
          Save
        </button>
      </div>

      <div className="flex-1 flex bg-stone-100">
        {/* side control panel */}
        <ControlPanel iframeRef={iframeRef} />

        {/* web preview */}
        <section className="flex-1 grid place-items-center">
          <iframe
            ref={iframeRef}
            src="/test"
            title="Test"
            height="95%"
            width="95%"
            className="border border-solid shadow rounded"
          ></iframe>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
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
