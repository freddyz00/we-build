import { atom } from "recoil";

export const headerState = atom({
  key: "headerState",
  default: {
    logo: "MyLogo",
    links: ["Home", "Shop", "Contact"],
  },
});
