import { useRecoilValue } from "recoil";
import { aboutState } from "../../atoms/aboutAtom";

export default function About() {
  const about = useRecoilValue(aboutState);
  return (
    <div>
      <div className="container mx-auto flex flex-col items-center space-y-10 lg:max-w-6xl text-center">
        {/* heading */}
        <h1 className="max-w-2xl text-4xl">{about.heading}</h1>

        {/* subheading */}
        <p className="max-w-3xl leading-8">{about.subheading}</p>
      </div>
    </div>
  );
}
