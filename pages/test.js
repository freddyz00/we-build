import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { headerState } from "../atoms/headerAtom";
import About from "../components/sections/About";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import ImageBanner from "../components/sections/ImageBanner";
import ImageWithText from "../components/sections/ImageWithText";
import SectionSpacing from "../components/sections/SectionSpacing";

export default function Test() {
  const [header, setHeader] = useRecoilState(headerState);

  const handleUpdateFromParentWindow = (event) => {
    if (event.origin !== "http://localhost:3000") return;
    switch (event.data.section) {
      case "header":
        return setHeader({ ...header, logoText: event.data.logoText });
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
