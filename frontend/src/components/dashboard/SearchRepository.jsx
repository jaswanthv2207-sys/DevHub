import { useState } from "react";
import { Search, Star, GitFork, Code2, Loader2 } from "lucide-react";

import { searchRepositories, addFavoriteRepository } from "../../api/github";

export default function SearchRepository({
  onSelectRepository,
  onFavoriteAdded,
}) {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const languageColors = {
    JavaScript: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    TypeScript: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    Python: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    Java: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await searchRepositories(query);

      setRepos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#161b22] rounded-3xl border border-[#30363d] shadow-xl p-6">
      <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
        <Search className="text-cyan-400" />
        Search Repository
      </h2>

      <div className="flex gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search repositories..."
          className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-2xl px-5 py-3 focus:border-cyan-400 outline-none transition"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-36 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Search"}
        </button>
      </div>

      <div className="space-y-4 max-h-[620px] overflow-y-auto pr-2">
        {!loading && repos.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Search for a repository to see results.
          </div>
        )}

        {repos.map((repo) => (
          <div
            key={repo.id}
            onClick={() => {
              setSelectedRepo(repo.id);
              onSelectRepository(repo);
            }}
            className={`group rounded-2xl border p-5 transition-all duration-300 cursor-pointer
            ${
              selectedRepo === repo.id
                ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.25)]"
                : "border-[#30363d] hover:border-cyan-400"
            }`}
          >
            <button
              onClick={async (e) => {
                e.stopPropagation();

                try {
                  await addFavoriteRepository({
                    repo_id: repo.id,
                    repo_name: repo.name,
                    owner: repo.owner,
                    html_url: repo.url,
                  });

                  onFavoriteAdded?.();
                } catch (err) {
                  console.error(err);
                }
              }}
              className="absolute right-5 top-5 text-yellow-400 hover:scale-125 transition"
            >
              ⭐
            </button>

            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold group-hover:text-cyan-400 transition">
                  {repo.name}
                </h3>

                <p className="text-gray-400 mt-2 line-clamp-2">
                  {repo.description || "No description available."}
                </p>
              </div>

              <img
                src={repo.avatar}
                alt=""
                className="w-12 h-12 rounded-full border border-[#30363d]"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="px-3 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center gap-2">
                <Star size={15} />
                {formatNumber(repo.stars)}
              </div>

              <div className="px-3 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center gap-2">
                <GitFork size={15} />
                {formatNumber(repo.forks)}
              </div>

              <div
                className={`px-3 py-2 rounded-xl border ${
                  languageColors[repo.language] ??
                  "bg-slate-700/20 border-slate-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code2 size={15} />
                  {repo.language || "Unknown"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
