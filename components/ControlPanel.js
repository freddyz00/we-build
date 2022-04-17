import { useRecoilState } from "recoil";
import { editingSectionState } from "../atoms/editingSectionAtom";
import { headerState } from "../atoms/headerAtom";
import { footerState } from "../atoms/footerAtom";
import { DragDropContext } from "react-beautiful-dnd";

import SectionCardsList from "./SectionCardsList";
import HeaderEditor from "./editors/HeaderEditor";
import ImageBannerEditor from "./editors/ImageBannerEditor";
import AboutEditor from "./editors/AboutEditor";
import FeaturedProductsEditor from "./editors/FeaturedProductsEditor";
import ImageWithTextEditor from "./editors/ImageWithTextEditor";
import Footer from "./editors/FooterEditor";
import ImageSelector from "./editors/ImageSelector";

export default function ControlPanel() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);
  const [header, setHeader] = useRecoilState(headerState);
  const [footer, setFooter] = useRecoilState(footerState);

  const onDragEnd = async (result) => {
    const { draggableId, source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index == destination.index
    )
      return;

    switch (type) {
      case "navigation-links":
        const newLinks = Array.from(header.links);
        const draggedItem = newLinks[source.index];
        newLinks.splice(source.index, 1);
        newLinks.splice(destination.index, 0, draggedItem);
        setHeader({ ...header, links: newLinks });
        return;
      case "footer-links":
        const newFooterLinks = Array.from(footer.links);
        const draggedFooterItem = newFooterLinks[source.index];
        newFooterLinks.splice(source.index, 1);
        newFooterLinks.splice(destination.index, 0, draggedFooterItem);
        setFooter({ links: newFooterLinks });
      default:
        return;
    }
  };

  const renderEditingSection = () => {
    const currentEditingSection = editingSection[editingSection.length - 1];
    switch (currentEditingSection) {
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
      case "imageSelector":
        return <ImageSelector />;
      default:
        return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <aside className="bg-white w-72 p-3 overflow-y-auto">
        {renderEditingSection()}
      </aside>
    </DragDropContext>
  );
}
