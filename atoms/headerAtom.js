import { atom } from "recoil";

export const headerState = atom({
  key: "headerState",
  default: {
    logoText: "MyLogo",
    links: ["Home", "Shop", "Contact"],
  },
});
