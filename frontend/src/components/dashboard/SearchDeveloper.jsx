import { useState } from "react";
import {
  searchDevelopers,
  addFavoriteDeveloper,
  getDeveloperProfile,
} from "../../api/github";

export default function SearchDeveloper({
  onSelectDeveloper,
  onFavoriteAdded,
}) {
  const [query, setQuery] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchDevelopers(query.trim());
      setDevelopers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to search developers.");
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#161b22] rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">👨‍💻 Search Developers</h2>

      {/* Search Bar */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-[#0d1117] border border-gray-700 text-white outline-none focus:border-blue-500"
          placeholder="Search developer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 px-5 rounded-lg font-semibold transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Results */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {!loading &&
          developers.map((developer) => (
            <div
              key={developer.github_id}
              onClick={async () => {
                try {
                  const fullDeveloper = await getDeveloperProfile(
                    developer.username,
                  );

                  onSelectDeveloper(fullDeveloper);
                } catch (err) {
                  console.error(err);
                }
              }}
              className="relative border border-gray-700 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-blue-500 hover:bg-[#1c2128] transition-all duration-200"
            >
              <button
                onClick={async (e) => {
                  e.stopPropagation();

                  try {
                    await addFavoriteDeveloper({
                      github_id: developer.github_id,
                      username: developer.username,
                      avatar_url: developer.avatar,
                      profile_url: developer.profile,
                    });

                    alert("Developer added to favorites ⭐");

                    if (onFavoriteAdded) {
                      onFavoriteAdded();
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="absolute top-3 right-3 text-yellow-400 hover:scale-125 transition"
              >
                ⭐
              </button>
              <img
                src={developer.avatar}
                alt={developer.username}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">
                  {developer.username}
                </h3>

                <a
                  href={developer.profile}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-400 hover:underline text-sm"
                >
                  View GitHub Profile →
                </a>
              </div>
            </div>
          ))}

        {!loading && developers.length === 0 && !error && (
          <div className="text-center text-gray-400 py-10">
            Search for a developer to see results.
          </div>
        )}

        {!loading && developers.length === 0 && query && !error && (
          <div className="text-center text-gray-400 py-6">
            No developers found.
          </div>
        )}
      </div>
    </div>
  );
}
