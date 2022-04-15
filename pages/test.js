import About from "../components/sections/About";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import ImageBanner from "../components/sections/ImageBanner";
import ImageWithText from "../components/sections/ImageWithText";
import SectionSpacing from "../components/sections/SectionSpacing";

export default function () {
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
