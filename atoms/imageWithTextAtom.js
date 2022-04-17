import { atom } from "recoil";

export const imageWithTextState = atom({
  key: "imageWithTextState",
  default: {
    image: null,
    heading: "Image With Text",
    subheading:
      "Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
    buttonLabel: "Button Label",
  },
});
