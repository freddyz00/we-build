export default function ImageBanner() {
  return (
    <div className="h-screen flex flex-col space-y-5 justify-center items-center bg-cover bg-neutral-200">
      <h2 className="text-5xl">Image Banner</h2>
      <p>
        Give customers details about the banner image(s) or content on the
        template.
      </p>
      <button className="bg-primary-blue hover:bg-darker-blue px-5 py-3 rounded-lg text-white">
        Shop All
      </button>
    </div>
  );
}
