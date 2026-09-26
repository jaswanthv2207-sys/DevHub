import { useEffect, useState } from "react";
import {
  getFavoriteRepositories,
  getFavoriteDevelopers,
  deleteFavoriteRepository,
  deleteFavoriteDeveloper,
} from "../../api/github";

export default function Favorites({ refresh }) {
  const [repositories, setRepositories] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const loadFavorites = async () => {
    try {
      const repos = await getFavoriteRepositories();
      const devs = await getFavoriteDevelopers();

      setRepositories(repos);
      setDevelopers(devs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRepository = async (repoId) => {
    try {
      await deleteFavoriteRepository(repoId);
      await loadFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDeveloper = async (githubId) => {
    try {
      await deleteFavoriteDeveloper(githubId);
      await loadFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [refresh]);

  return (
    <div className="bg-[#161b22] rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">⭐ Favorites</h2>

      <div className="space-y-6">
        {/* Repository Favorites */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Repositories</h3>

          {repositories.length === 0 ? (
            <p className="text-gray-500">No favorite repositories.</p>
          ) : (
            repositories.map((repo) => (
              <div
                key={repo.repo_id}
                className="relative border border-gray-700 rounded-lg p-3 mb-3"
              >
                <button
                  onClick={() => handleDeleteRepository(repo.repo_id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-400 text-lg transition"
                >
                  🗑️
                </button>

                <h4 className="font-bold text-white">{repo.repo_name}</h4>

                <p className="text-gray-400 mb-2">Owner: {repo.owner}</p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Open Repository →
                </a>
              </div>
            ))
          )}
        </div>

        {/* Developer Favorites */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Developers</h3>

          {developers.length === 0 ? (
            <p className="text-gray-500">No favorite developers.</p>
          ) : (
            developers.map((dev) => (
              <div
                key={dev.github_id}
                className="relative flex items-center gap-3 border border-gray-700 rounded-lg p-3 mb-3"
              >
                <button
                  onClick={() => handleDeleteDeveloper(dev.github_id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-400 text-lg transition"
                >
                  🗑️
                </button>

                <img
                  src={dev.avatar_url}
                  alt={dev.username}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
                  }}
                />

                <div>
                  <h4 className="font-bold">{dev.username}</h4>

                  <a
                    href={dev.profile_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
