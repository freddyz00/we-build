import { atom } from "recoil";

export const aboutState = atom({
  key: "aboutState",
  default: {
    heading: "Talk about your brand",
    subheading:
      "Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.",
  },
});
