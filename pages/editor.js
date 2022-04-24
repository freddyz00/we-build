import Link from "next/link";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import PulseLoader from "react-spinners/PulseLoader";
import ControlPanel from "../components/ControlPanel";

import { useRecoilState } from "recoil";
import { sectionsState } from "../atoms/sectionsAtom";
import { pageIdState } from "../atoms/pageIdAtom";

export default function Editor({ user }) {
  const iframeRef = useRef(null);
  const [sections, setSections] = useRecoilState(sectionsState);
  const [pageId, setPageId] = useRecoilState(pageIdState);
  const [loading, setLoading] = useState(false);

  const handleSaveData = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-data`,
      {
        method: "POST",
        body: JSON.stringify({ pageId, sections }),
      }
    );

    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-page`
      );
      if (!res.ok) return;
      const { page } = await res.json();
      setSections(page.sections);
      setPageId(page._id);
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
      <div className="flex justify-between items-center px-5 h-12 border-b border-solid border-slate-200 shadow-sm z-10">
        <div>
          <p className="text-lg font-medium">WeBuild</p>
        </div>
        <div className="flex justify-end items-center space-x-5 ">
          <Link href="/preview">
            <a className="hover:text-primary-blue">Preview</a>
          </Link>
          <button
            onClick={handleSaveData}
            disabled={loading}
            className={classNames("text-white rounded-lg px-5 py-2", {
              "bg-gray-300 ": loading,
              "bg-primary-blue hover:bg-darker-blue": !loading,
            })}
          >
            {!loading && "Save"}
            <PulseLoader loading={loading} color="white" size={6} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex bg-stone-100">
        {/* side control panel */}
        <ControlPanel iframeRef={iframeRef} />

        {/* web preview */}
        <section className="flex-1 grid place-items-center">
          <iframe
            ref={iframeRef}
            src="/preview"
            title="Preview"
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
