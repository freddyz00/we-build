import { atom } from "recoil";

export const imageBannerState = atom({
  key: "imageBannerState",
  default: {
    image: null,
    heading: "Image Banner",
    subheading:
      "Give customers details about the banner image(s) or content on the template.",
    buttonLabel: "Shop All",
  },
});
