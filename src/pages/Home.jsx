// Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const apiUrl = import.meta.env.VITE_API_KEY;
  const [url] = useState(apiUrl);
  const { data } = useFetch(url);

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  //  localStorage dan tillarni olib state ga joylash
  useEffect(() => {
    const storedLanguages =
      JSON.parse(localStorage.getItem("selectedLanguages")) || [];
    setSelectedLanguages(storedLanguages);
  }, []);

  const jobs = data && Array.isArray(data.data) ? data.data : [];

  // Tanlangan tilni localStorage ga qoshish va state ni yangilash
  const setLangugeToLocalStorrage = (lan) => {
    setSelectedLanguages((prevLanguages) => {
      if (!prevLanguages.includes(lan)) {
        const updatedLanguages = [...prevLanguages, lan];
        localStorage.setItem(
          "selectedLanguages",
          JSON.stringify(updatedLanguages)
        );
        return updatedLanguages;
      }
      return prevLanguages;
    });
  };

  // Tanlangan tillarga qarab  filter qilish)
  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        selectedLanguages.length === 0 ||
        selectedLanguages.some((lang) => job.languages.includes(lang))
    );
  }, [jobs, selectedLanguages]);

  // clear funksiya
  const clearFilters = () => {
    localStorage.removeItem("selectedLanguages");
    setSelectedLanguages([]);
  };

  return (
    <>
      {!data ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            <p className="mt-4 text-lg text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between align-elements">
            <div className="flex gap-3">
              {selectedLanguages.map((lang) => (
                <div
                  key={lang}
                  className="flex items-center bg-[#EEF6F6] text-[#5CA5A5] px-3 py-2 rounded-lg"
                >
                  <span className="mr-2">{lang}</span>
                  <button
                    onClick={() => {
                      const updatedLanguages = selectedLanguages.filter(
                        (l) => l !== lang
                      );
                      setSelectedLanguages(updatedLanguages);
                      localStorage.setItem(
                        "selectedLanguages",
                        JSON.stringify(updatedLanguages)
                      );
                    }}
                    className="bg-[#2B3939] text-white w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={clearFilters}
              className="text-[#5CA5A5] hover:underline"
            >
              Clear
            </button>
          </div>

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-between mb-5 mt-14 align-elements"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-xs">
                  <img src={job.logo} alt="logo" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5CA5A5] font-medium">
                      {job.company}
                    </span>
                    {job.new && (
                      <span className="bg-[#5CA5A5] text-white px-2 py-1 rounded-full text-sm uppercase font-medium">
                        New!
                      </span>
                    )}
                    {job.featured && (
                      <span className="bg-[#2B3939] text-white px-2 py-1 rounded-full text-sm uppercase font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-[#2B3939] hover:text-[#5CA5A5] cursor-pointer">
                    {job.position}
                  </h2>
                  <div className="flex items-center text-[#7C8F8F]">
                    <span>{job.postedAt}</span>
                    <span className="w-1 h-1 bg-current rounded-full mx-4" />
                    <span>{job.contract}</span>
                    <span className="w-1 h-1 bg-current rounded-full mx-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {job.languages.map((lan) => (
                  <button
                    key={lan}
                    onClick={() => setLangugeToLocalStorrage(lan)}
                    className="bg-[#EEF6F6] text-[#5CA5A5] px-4 py-2 rounded font-medium hover:bg-[#5CA5A5] hover:text-white transition-colors"
                  >
                    {lan}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Home;
