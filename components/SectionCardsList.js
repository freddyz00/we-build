import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { editingSectionState } from "../atoms/editingSectionAtom";
import { sectionsState } from "../atoms/sectionsAtom";

import AddSection from "../components/AddSection";
import SectionCard from "../components/SectionCard";

import {
  RiLayoutTop2Line,
  RiImageLine,
  RiFileTextLine,
  RiImageEditLine,
  RiLayoutBottom2Line,
} from "react-icons/ri";
import { MdOutlineSell } from "react-icons/md";

const icons = {
  header: RiLayoutTop2Line,
  imageBanner: RiImageLine,
  about: RiFileTextLine,
  featuredProducts: MdOutlineSell,
  imageWithText: RiImageEditLine,
  footer: RiLayoutBottom2Line,
};

export default function SectionCardsList() {
  const [editingSection, setEditingSection] =
    useRecoilState(editingSectionState);

  const sections = useRecoilValue(sectionsState);

  return (
    <div>
      {sections.length > 0 && (
        <>
          {/* header */}

          <ul className="border-b border-solid border-slate-200 px-3 py-1">
            <SectionCard
              title="Header"
              Icon={icons.header}
              onPress={() =>
                setEditingSection([...editingSection, "headerEditor"])
              }
            />
          </ul>
          {/* main content */}
          <ul className="border-b border-solid border-slate-200 px-3 py-1">
            {sections.map((section, index) => {
              if (section._type === "header" || section._type === "footer")
                return null;
              return (
                <SectionCard
                  key={index}
                  title={section.title}
                  Icon={icons[section._type]}
                  draggable
                  onPress={() =>
                    setEditingSection([
                      ...editingSection,
                      `${section._type}Editor`,
                    ])
                  }
                />
              );
            })}
            {/* <SectionCard
            title="Image Banner"
            Icon={RiImageLine}
            draggable
            onPress={() =>
              setEditingSection([...editingSection, "imageBannerEditor"])
            }
          />
          <SectionCard
            title="About"
            Icon={RiFileTextLine}
            draggable
            onPress={() => setEditingSection([...editingSection, "aboutEditor"])}
          />
          <SectionCard
            title="Featured Products"
            Icon={MdOutlineSell}
            draggable
            onPress={() =>
              setEditingSection([...editingSection, "featuredProductsEditor"])
            }
          />
          <SectionCard
            title="Image With Text"
            Icon={RiImageEditLine}
            draggable
            onPress={() =>
              setEditingSection([...editingSection, "imageWithTextEditor"])
            }
          /> */}
            <AddSection />
          </ul>
          {/* footer */}
          <ul className="px-3 py-1">
            <SectionCard
              title="Footer"
              Icon={icons.footer}
              onPress={() =>
                setEditingSection([...editingSection, "footerEditor"])
              }
            />
          </ul>
        </>
      )}
    </div>
  );
}
