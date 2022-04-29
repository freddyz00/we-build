import { useRecoilState } from "recoil";
import { editingSectionState } from "../atoms/editingSectionAtom";

import SectionCardsList from "./SectionCardsList";
import HeaderEditor from "./editors/HeaderEditor";
import ImageBannerEditor from "./editors/ImageBannerEditor";
import AboutEditor from "./editors/AboutEditor";
import FeaturedProductsEditor from "./editors/FeaturedProductsEditor";
import ImageWithTextEditor from "./editors/ImageWithTextEditor";
import FooterEditor from "./editors/FooterEditor";

export default function ControlPanel({ iframeRef }) {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const renderEditingSection = () => {
    const currentEditingSection = editingSection[editingSection.length - 1];
    switch (currentEditingSection.type) {
      case "sectionCardsList":
        return <SectionCardsList />;
      case "headerEditor":
        return (
          <HeaderEditor id={currentEditingSection.id} iframeRef={iframeRef} />
        );
      case "imageBannerEditor":
        return (
          <ImageBannerEditor
            id={currentEditingSection.id}
            iframeRef={iframeRef}
          />
        );
      case "aboutEditor":
        return (
          <AboutEditor id={currentEditingSection.id} iframeRef={iframeRef} />
        );
      case "featuredProductsEditor":
        return (
          <FeaturedProductsEditor
            id={currentEditingSection.id}
            iframeRef={iframeRef}
          />
        );
      case "imageWithTextEditor":
        return (
          <ImageWithTextEditor
            id={currentEditingSection.id}
            iframeRef={iframeRef}
          />
        );
      case "footerEditor":
        return (
          <FooterEditor id={currentEditingSection.id} iframeRef={iframeRef} />
        );
      default:
        return;
    }
  };

  return (
    <aside className="bg-white w-72 max-h-full overflow-y-auto relative">
      {renderEditingSection()}
    </aside>
  );
}
