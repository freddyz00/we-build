export default function ImageBanner() {
  return (
    <div className="h-screen flex flex-col space-y-5 justify-center items-center bg-cover bg-[url('/image-banner.jpg')]">
      <h2 className="text-5xl">Image Banner</h2>
      <p>
        Give customers details about the banner image(s) or content on the
        template.
      </p>
      <button className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg text-white">
        Shop Now
      </button>
    </div>
  );
}
