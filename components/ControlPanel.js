import { useRecoilState } from "recoil";
import { editingSectionState } from "../atoms/editingSectionAtom";

import SectionCardsList from "./SectionCardsList";
import HeaderEditor from "./editors/HeaderEditor";
import ImageBannerEditor from "./editors/ImageBannerEditor";
import AboutEditor from "./editors/AboutEditor";
import FeaturedProductsEditor from "./editors/FeaturedProductsEditor";
import ImageWithTextEditor from "./editors/ImageWithTextEditor";
import Footer from "./editors/FooterEditor";

export default function ControlPanel() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const renderEditingSection = () => {
    switch (editingSection) {
      case "sectionCardsList":
        return <SectionCardsList />;
      case "headerEditor":
        return <HeaderEditor />;
      case "imageBannerEditor":
        return <ImageBannerEditor />;
      case "aboutEditor":
        return <AboutEditor />;
      case "featuredProductsEditor":
        return <FeaturedProductsEditor />;
      case "imageWithTextEditor":
        return <ImageWithTextEditor />;
      case "footerEditor":
        return <Footer />;
      default:
        return;
    }
  };

  return (
    <aside className="bg-white w-72 p-3 overflow-y-auto">
      {renderEditingSection()}
    </aside>
  );
}
