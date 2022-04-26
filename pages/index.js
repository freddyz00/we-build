import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-white px-5 h-16 border-b border-solid border-slate-200 shadow-sm z-10">
        <div>
          <img src="/we-build-logo.png" className="h-16" />
        </div>
        <div className="flex space-x-5 items-center">
          <Link href="/login">
            <a className=" hover:text-primary-blue transition">Log In</a>
          </Link>
          <Link href="/login">
            <a className="text-white bg-primary-blue hover:bg-darker-blue rounded-lg px-5 py-2 transition">
              Get Started
            </a>
          </Link>
        </div>
      </header>
      <section className="flex flex-1 justify-center items-center relative">
        <img
          src="/banner.jpg"
          alt=""
          className="absolute opacity-10 w-full h-full object-cover"
        />
        <div className="flex flex-col max-w-4xl z-10">
          <h1 className="font-medium text-center text-7xl leading-snug mb-10">
            Create your e-commerce store in minutes
          </h1>
          <Link href="/login">
            <a className="text-white text-2xl self-center bg-primary-blue hover:bg-darker-blue rounded-xl px-10 py-4 transition">
              Get Started
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
