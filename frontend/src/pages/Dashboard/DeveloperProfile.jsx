export default function DeveloperProfile({ developer }) {
  if (!developer) {
    return (
      <div className="bg-[#161b22] rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">👨‍💻 Developer Profile</h2>

        <div className="flex items-center justify-center h-72 text-gray-500">
          Select a developer to view the profile.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#161b22] rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">👨‍💻 Developer Profile</h2>

      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src={developer.avatar}
          alt={developer.username}
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          onError={(e) => {
            e.target.src =
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
          }}
        />

        <div>
          <h1 className="text-4xl font-bold">{developer.username}</h1>

          <p className="text-gray-400 mt-2">GitHub Developer</p>

          <a
            href={developer.profile}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
          >
            View GitHub Profile →
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-[#0d1117] rounded-lg p-4 text-center">
          <p className="text-gray-400">Followers</p>
          <h3 className="text-2xl font-bold">{developer.followers ?? "--"}</h3>
        </div>

        <div className="bg-[#0d1117] rounded-lg p-4 text-center">
          <p className="text-gray-400">Following</p>
          <h3 className="text-2xl font-bold">{developer.following ?? "--"}</h3>
        </div>

        <div className="bg-[#0d1117] rounded-lg p-4 text-center">
          <p className="text-gray-400">Public Repositories</p>
          <h3 className="text-2xl font-bold">
            {developer.public_repos ?? "--"}
          </h3>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-8 bg-[#0d1117] rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Bio</h3>

        <p className="text-gray-300">{developer.bio || "No bio available."}</p>
      </div>

      {/* Extra Info */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-[#0d1117] rounded-lg p-4">
          <h4 className="text-gray-400 mb-1">Company</h4>
          <p>{developer.company || "--"}</p>
        </div>

        <div className="bg-[#0d1117] rounded-lg p-4">
          <h4 className="text-gray-400 mb-1">Location</h4>
          <p>{developer.location || "--"}</p>
        </div>
      </div>
    </div>
  );
}
