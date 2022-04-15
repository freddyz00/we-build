import ControlPanel from "../components/ControlPanel";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* top header */}
      <div className="flex items-center h-12 border-b border-solid border-slate-200 shadow-sm z-10">
        <button
          onClick={() => console.log("clicked")}
          className="text-white rounded-md bg-primary-blue hover:opacity-80 px-4 py-1.5 ml-auto mr-5"
        >
          Save
        </button>
      </div>
      <div className="flex-1 flex bg-stone-100">
        {/* side control panel */}
        <ControlPanel />
        {/* web preview */}
        <section className="flex-1 grid place-items-center">
          <iframe
            src="/test"
            title="Test"
            height="95%"
            width="95%"
            className="border border-solid shadow rounded"
          ></iframe>
        </section>
      </div>
    </div>
  );
}
