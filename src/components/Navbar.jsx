function Navbar() {
  return (
    <>
      <div className="navbar bg-[#5CA5A5] py-14"></div>
      <div className="bg-white p-4 rounded-lg shadow-md  items-center justify-between align-elements hidden">
        {/* Filterlar ro‘yxati */}
        <div className="flex gap-3">
          {["Frontend", "CSS", "JavaScript"].map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-[#EEF6F6] text-[#5CA5A5] px-3 py-2 rounded-lg"
            >
              <span className="mr-2">{tag}</span>
              <button className="bg-[#2B3939] text-white w-6 h-6 rounded-full flex items-center justify-center">
                ✖
              </button>
            </div>
          ))}
        </div>

        {/* Clear tugmasi */}
        <button className="text-[#5CA5A5] hover:underline">Clear</button>
      </div>
    </>
  );
}

export default Navbar;
