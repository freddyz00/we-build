import { atom } from "recoil";

export const editingSectionState = atom({
  key: "editingSectionState",
  default: [{ type: "sectionCardsList", id: null }],
});
