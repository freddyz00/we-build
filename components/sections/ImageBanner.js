import { useRecoilValue } from "recoil";
import { imageBannerState } from "../../atoms/imageBannerAtom";

export default function ImageBanner() {
  const imageBanner = useRecoilValue(imageBannerState);
  return (
    <div className="h-screen flex flex-col space-y-5 justify-center items-center bg-cover bg-neutral-200">
      {/* image  */}

      <h2 className="text-5xl max-w-3xl break-all text-center">
        {imageBanner.heading}
      </h2>

      <p className="max-w-5xl break-all text-center">
        {imageBanner.subheading}
      </p>

      <button className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white">
        {imageBanner.buttonLabel}
      </button>
    </div>
  );
}
