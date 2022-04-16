import Link from "next/link";
import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { headerState } from "../atoms/headerAtom";
import ControlPanel from "../components/ControlPanel";

export default function Home() {
  const iframeRef = useRef(null);
  const { logoText } = useRecoilValue(headerState);

  // post message whenever logo changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "header", logoText },
      "http://localhost:3000"
    );
  }, [logoText]);

  return (
    <div className="flex flex-col h-screen">
      {/* top header */}
      <div className="flex items-center h-12 border-b border-solid border-slate-200 shadow-sm z-10">
        <Link href="/test">
          <a>Preview</a>
        </Link>
        <button className="text-white rounded-lg bg-primary-blue hover:bg-darker-blue px-5 py-2 ml-auto mr-5">
          Save
        </button>
      </div>
      <div className="flex-1 flex bg-stone-100">
        {/* side control panel */}
        <ControlPanel />
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
