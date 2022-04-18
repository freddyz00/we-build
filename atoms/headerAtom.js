import { atom } from "recoil";

export const headerState = atom({
  key: "headerState",
  default: {
    brandName: "Brand Name",
    links: ["Home", "Shop", "Contact"],
  },
});
