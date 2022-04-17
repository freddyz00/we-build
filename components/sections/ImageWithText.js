import { useRecoilValue } from "recoil";
import { imageWithTextState } from "../../atoms/imageWithTextAtom";

export default function ImageWithText() {
  const imageWithText = useRecoilValue(imageWithTextState);
  return (
    <div className="container mx-auto lg:max-w-6xl grid grid-cols-2 gap-x-20">
      <div className="h-[500px] bg-neutral-200"></div>
      <div className="flex flex-col space-y-5 justify-center">
        <h1 className="text-3xl break-all">{imageWithText.heading}</h1>
        <p className="leading-8 break-all">{imageWithText.subheading}</p>
        <button className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white self-start">
          {imageWithText.buttonLabel}
        </button>
      </div>
    </div>
  );
}
