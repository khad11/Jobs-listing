// useFETCH
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const [url, setUrl] = useState(
    "https://json-api.uz/api/project/job-list/jobs"
  );
  const { data } = useFetch(url);

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-lg text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );

  const jobs = Array.isArray(data.data) ? data.data : [];

  return (
    jobs &&
    jobs.map((job) => {
      return (
        <div
          key={job.id}
          className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-between mb-5 mt-14 align-elements"
        >
          <div className="flex items-center gap-6">
            {/* Company Logo */}
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-xs">
              <img src={job.logo} alt="logo" />
            </div>

            {/* Job Info */}
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

          {/* Skills */}
          <div className="flex gap-4">
            {job.languages.map((lan) => (
              <button
                key={lan}
                className="bg-[#EEF6F6] text-[#5CA5A5] px-4 py-2 rounded font-medium hover:bg-[#5CA5A5] hover:text-white transition-colors"
              >
                {lan}
              </button>
            ))}
          </div>
        </div>
      );
    })
  );
}

export default Home;
