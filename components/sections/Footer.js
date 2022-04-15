export default function Footer() {
  return (
    <div className="border-t border-solid border-slate-200 py-10">
      <div className="container mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-3 justify-items-center items-center mb-10">
          <div>
            <p className="text-lg mb-3 font-medium">Links</p>
            <ul className="flex flex-col space-y-1">
              <li className="cursor-pointer hover:text-primary-blue">
                About Us
              </li>

              <li className="cursor-pointer hover:text-primary-blue">
                Contact
              </li>

              <li className="cursor-pointer hover:text-primary-blue">
                Shipping Policy
              </li>
              <li className="cursor-pointer hover:text-primary-blue">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div></div>
          <form className="flex flex-col space-y-3">
            <p className="text-lg font-medium">Subscribe to our newsletter</p>
            <input
              type="email"
              placeholder="Email"
              className="py-2 px-3 w-80 border border-solid border-slate-500 rounded"
            />
          </form>
        </div>
        <p className="text-center text-sm">© 2022, Built with WEBuild</p>
      </div>
    </div>
  );
}
