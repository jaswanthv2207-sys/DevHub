import { useEffect, useState } from "react";
import { getTrendingRepositories } from "../../api/github";
import RepositoryCard from "./RepositoryCard";

export default function TrendingRepositories() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await getTrendingRepositories();
        setRepos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadTrending();
  }, []);

  return (
    <section className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#30363d]">
        <div>
          <h2 className="text-2xl font-bold text-white">
            🔥 Trending Repositories
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Explore the most popular open-source repositories.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
          {repos.length} Repositories
        </span>
      </div>

      {/* Body */}
      <div className="max-h-[700px] overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            Loading trending repositories...
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No repositories found.
          </div>
        ) : (
          repos.map((repo) => (
            <div
              key={repo.id}
              className="transition duration-300 hover:scale-[1.01]"
            >
              <RepositoryCard repo={repo} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
