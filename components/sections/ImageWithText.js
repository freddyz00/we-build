export default function ImageWithText() {
  return (
    <div className="container mx-auto lg:max-w-6xl grid grid-cols-2 gap-x-20">
      <div className="h-[500px] bg-neutral-200"></div>
      <div className="flex flex-col space-y-5 justify-center">
        <h1 className="text-3xl">Image With Text</h1>
        <p className="leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          dolorem repellat, ex labore deleniti eos velit ea quam impedit! Unde,
          necessitatibus! Minus vel suscipit soluta aliquid assumenda illum
          sequi. Iusto?
        </p>
        <button className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white self-start">
          Button Label
        </button>
      </div>
    </div>
  );
}
