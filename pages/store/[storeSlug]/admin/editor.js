import Link from "next/link";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import PulseLoader from "react-spinners/PulseLoader";
import ControlPanel from "../../../../components/ControlPanel";
import { MdExitToApp } from "react-icons/md";

import { useRecoilState, useSetRecoilState } from "recoil";
import { sectionsState } from "../../../../atoms/sectionsAtom";
import { pageIdState } from "../../../../atoms/pageIdAtom";
import { storeSlugState } from "../../../../atoms/storeSlugAtom";

import { sanityClient } from "../../../../lib/sanity";

export default function Editor() {
  const router = useRouter();
  const { storeSlug } = router.query;
  const iframeRef = useRef(null);
  const [sections, setSections] = useRecoilState(sectionsState);
  const [pageId, setPageId] = useRecoilState(pageIdState);
  const setStoreSlug = useSetRecoilState(storeSlugState);
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
    if (!router.isReady) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-page?slug=${storeSlug}`
      );
      if (!res.ok) return;
      const { page } = await res.json();
      setSections(page.sections);
      setPageId(page._id);
      setStoreSlug(storeSlug);
    })();
  }, [router.isReady]);

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
        <div className="flex items-center">
          <div
            onClick={() => router.back()}
            className="p-1 rounded cursor-pointer hover:bg-neutral-200 mr-3"
          >
            <MdExitToApp className="text-2xl -scale-100" />
          </div>
          <p className="text-lg font-medium">WeBuild</p>
        </div>
        <div className="flex justify-end items-center space-x-5 ">
          <Link href={`/store/${storeSlug}`}>
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
            src={`/store/${storeSlug}`}
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
  const { storeSlug } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // check to see if logged in user is the owner of the store
  const query = `*[_type == "store" && slug=="${storeSlug}"][0]{
    "ownerEmail": owner -> email
  }`;
  const data = await sanityClient.fetch(query);

  // redirect if user is not the owner of the store
  if (data.ownerEmail !== session.user.email) {
    return {
      redirect: {
        destination: `/store/${storeSlug}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
