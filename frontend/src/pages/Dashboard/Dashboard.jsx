import { useState } from "react";

import TrendingRepositories from "../../components/dashboard/TrendingRepositories";
import SearchRepository from "../../components/dashboard/SearchRepository";
import SearchDeveloper from "../../components/dashboard/SearchDeveloper";
import Favorites from "../../components/dashboard/Favorites";

import RepositoryDetails from "./RepositoryDetails";
import DeveloperProfile from "./DeveloperProfile";

export default function Dashboard() {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [selectedRepository, setSelectedRepository] = useState(null);

  const [refreshFavorites, setRefreshFavorites] = useState(0);

  const handleFavoriteRefresh = () => {
    setRefreshFavorites((prev) => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-[#111827]/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-[1800px] mx-auto h-[72px] px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">DevHub</h1>

            <p className="text-sm text-slate-400 mt-1">
              Discover • Search • Save GitHub Repositories
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* ================= LEFT ================= */}
          <div className="col-span-8 space-y-6">
            <TrendingRepositories />

            <SearchRepository
              onSelectRepository={setSelectedRepository}
              onFavoriteAdded={handleFavoriteRefresh}
            />

            <RepositoryDetails repo={selectedRepository} />
          </div>

          {/* ================= RIGHT ================= */}
          <div className="col-span-4 space-y-6">
            <SearchDeveloper
              onSelectDeveloper={setSelectedDeveloper}
              onFavoriteAdded={handleFavoriteRefresh}
            />

            <DeveloperProfile developer={selectedDeveloper} />

            <Favorites refresh={refreshFavorites} />
          </div>
        </div>
      </main>
    </div>
  );
}
