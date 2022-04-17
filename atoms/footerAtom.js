import { atom } from "recoil";

export const footerState = atom({
  key: "footerState",
  default: {
    links: ["About Us", "Contact", "Shipping Policy", "Privacy Policy"],
  },
});
