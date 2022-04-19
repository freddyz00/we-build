import Link from "next/link";
import { useRef, useEffect } from "react";
import { getSession } from "next-auth/react";

import { useRecoilValue, useRecoilState } from "recoil";
import { aboutState } from "../atoms/aboutAtom";
import { footerState } from "../atoms/footerAtom";
import { headerState } from "../atoms/headerAtom";
import { imageBannerState } from "../atoms/imageBannerAtom";
import { imageWithTextState } from "../atoms/imageWithTextAtom";

import ControlPanel from "../components/ControlPanel";

import { sanityClient, urlFor } from "../lib/sanity";

const sections = ["header", "imageBanner", "about", "imageWithText", "footer"];

export default function Editor({ user }) {
  const iframeRef = useRef(null);
  const [header, setHeader] = useRecoilState(headerState);
  const [imageBanner, setImageBanner] = useRecoilState(imageBannerState);
  const [about, setAbout] = useRecoilState(aboutState);
  const [imageWithText, setImageWithText] = useRecoilState(imageWithTextState);
  const [footer, setFooter] = useRecoilState(footerState);

  useEffect(() => {
    (async () => {
      const query = `*[_type == "page" && user=="Me"]`;
      const data = await sanityClient.fetch(query);
      console.log(data);

      // for (let section of data) {
      //   if (section._type === "header") {
      //     setHeader({ brandName: section.brandName, links: section.links });
      //   } else if (section._type === "footer") {
      //     setFooter({ links: section.links });
      //   } else if (section._type === "about") {
      //     setAbout({
      //       heading: section.heading,
      //       subheading: section.subheading,
      //     });
      //   } else if (section._type === "imageBanner") {
      //     setImageBanner({
      //       image: urlFor(section.image).url(),
      //       heading: section.heading,
      //       subheading: section.subheading,
      //       buttonLabel: section.buttonLabel,
      //     });
      //   } else if (section._type === "imageWithText") {
      //     setImageWithText({
      //       image: urlFor(section.image).url(),
      //       heading: section.heading,
      //       subheading: section.subheading,
      //       buttonLabel: section.buttonLabel,
      //     });
      //   }
      // }
    })();
  }, []);

  // post message whenever header changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "header", payload: header },
      "http://localhost:3000"
    );
  }, [header]);

  // post message whenever image banner changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "imageBanner", payload: imageBanner },
      "http://localhost:3000"
    );
  }, [imageBanner]);

  // post message whenever about changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "about", payload: about },
      "http://localhost:3000"
    );
  }, [about]);

  // post message whenever image with text changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "imageWithText", payload: imageWithText },
      "http://localhost:3000"
    );
  }, [imageWithText]);

  // post message whenever footer changes
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage(
      { section: "footer", payload: footer },
      "http://localhost:3000"
    );
  }, [footer]);

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
