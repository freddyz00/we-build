import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { aboutState } from "../atoms/aboutAtom";
import { footerState } from "../atoms/footerAtom";
import { headerState } from "../atoms/headerAtom";
import { imageBannerState } from "../atoms/imageBannerAtom";
import { imageWithTextState } from "../atoms/imageWithTextAtom";

import About from "../components/sections/About";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import ImageBanner from "../components/sections/ImageBanner";
import ImageWithText from "../components/sections/ImageWithText";
import SectionSpacing from "../components/sections/SectionSpacing";

export default function Test() {
  const setHeader = useSetRecoilState(headerState);
  const setImageBanner = useSetRecoilState(imageBannerState);
  const setAbout = useSetRecoilState(aboutState);
  const setImageWithText = useSetRecoilState(imageWithTextState);
  const setFooter = useSetRecoilState(footerState);

  const handleUpdateFromParentWindow = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    switch (event.data.section) {
      case "header":
        return setHeader(event.data.payload);
      case "imageBanner":
        return setImageBanner(event.data.payload);
      case "about":
        return setAbout(event.data.payload);
      case "imageWithText":
        return setImageWithText(event.data.payload);
      case "footer":
        return setFooter(event.data.payload);
    }
  };

  // listen to events from parent for updates to state
  useEffect(() => {
    window.addEventListener("message", handleUpdateFromParentWindow);
    return () => {
      window.removeEventListener("message", handleUpdateFromParentWindow);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <ImageBanner />
      <SectionSpacing />
      <About />
      <SectionSpacing />
      <FeaturedProducts />
      <SectionSpacing />
      <ImageWithText />
      <SectionSpacing />
      <Footer />
    </div>
  );
}
