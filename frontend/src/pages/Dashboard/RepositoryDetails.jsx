export default function RepositoryDetails({ repo }) {
  if (!repo) {
    return (
      <div className="bg-[#161b22] rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📦 Repository Details</h2>

        <div className="h-80 flex items-center justify-center text-gray-400">
          Select a repository to view details.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#161b22] rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-5">📦 Repository Details</h2>

      {/* Repository Name */}
      <h1 className="text-3xl font-bold">{repo.name}</h1>

      <p className="text-gray-400 mt-1 mb-5">
        {repo.description || "No description available."}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0d1117] rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">⭐ Stars</p>
          <h3 className="text-2xl font-bold">{repo.stars}</h3>
        </div>

        <div className="bg-[#0d1117] rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">🍴 Forks</p>
          <h3 className="text-2xl font-bold">{repo.forks}</h3>
        </div>

        <div className="bg-[#0d1117] rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">👀 Watchers</p>
          <h3 className="text-2xl font-bold">{repo.watchers ?? "N/A"}</h3>
        </div>

        <div className="bg-[#0d1117] rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">❗ Issues</p>
          <h3 className="text-2xl font-bold">{repo.open_issues ?? "N/A"}</h3>
        </div>
      </div>

      {/* Information */}
      <div className="bg-[#0d1117] rounded-lg p-5 space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400">👤 Owner</span>
          <span>{repo.owner}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">💻 Language</span>
          <span>{repo.language || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">📄 License</span>
          <span>{repo.license || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">📅 Created</span>
          <span>{repo.created_at || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">🔄 Updated</span>
          <span>{repo.updated_at || "N/A"}</span>
        </div>
      </div>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">🏷️ Topics</h3>

          <div className="flex flex-wrap gap-2">
            {repo.topics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Button */}
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold"
      >
        🔗 View Repository on GitHub
      </a>
    </div>
  );
}
