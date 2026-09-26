export default function RepositoryCard({ repo }) {
  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const languageColors = {
    JavaScript: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    TypeScript: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    Python: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    Java: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    C: "bg-gray-500/10 text-gray-300 border-gray-500/20",
    "C++": "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    Go: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    Rust: "bg-orange-600/10 text-orange-300 border-orange-600/20",
  };

  return (
    <div className="group bg-[#0d1117] border border-[#30363d] rounded-2xl p-5 transition-all duration-300 hover:border-[#58A6FF] hover:shadow-[0_0_25px_rgba(88,166,255,0.12)] hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate group-hover:text-[#58A6FF] transition-colors">
            {repo.name}
          </h3>

          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
            {repo.description || "No description available."}
          </p>
        </div>

        <img
          src={
            repo.avatar ||
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          }
          alt={repo.owner}
          className="w-12 h-12 rounded-full border border-[#30363d] object-cover"
        />
      </div>

      {/* Owner */}
      <div className="mt-5">
        <p className="text-xs uppercase tracking-wider text-gray-500">Owner</p>

        <p className="mt-1 text-white font-medium">{repo.owner}</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 mt-5">
        <div className="px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-sm">
          ⭐ <span className="font-semibold">{formatNumber(repo.stars)}</span>
        </div>

        <div className="px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-sm">
          🍴 <span className="font-semibold">{formatNumber(repo.forks)}</span>
        </div>

        <div
          className={`px-3 py-2 rounded-xl border text-sm font-medium ${
            languageColors[repo.language] ||
            "bg-slate-700/20 text-slate-300 border-slate-600"
          }`}
        >
          💻 {repo.language || "Unknown"}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#30363d] flex items-center justify-between">
        <span className="text-xs text-gray-500">GitHub Repository</span>

        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] transition-all duration-200 font-medium text-sm"
        >
          View →
        </a>
      </div>
    </div>
  );
}
