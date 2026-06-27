import { useEffect, useState, useCallback } from "react";
import api from "./services/api";
import nasaApi from "./services/nasaApi";
import APODCard from "./components/APODCard";
import MarsGallery from "./components/MarsGallery";
import Favorites from "./components/Favorites";

function App() {
  const [activeTab, setActiveTab] = useState("apod");
  const [apod, setApod] = useState(null);
  const [apodLoading, setApodLoading] = useState(true);
  const [apodError, setApodError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null); // { msg, type: 'success'|'error' }

  useEffect(() => {
    fetchAPOD();
    fetchFavorites();
  }, []);

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  // ── APOD — direct browser → NASA ────────────────────────────────────────
  const fetchAPOD = async () => {
    setApodLoading(true);
    setApodError(null);
    try {
      const response = await nasaApi.get("/planetary/apod");
      setApod(response.data);
    } catch (error) {
      const msg =
        error.response?.data?.error?.message ||
        error.response?.data?.msg ||
        (error.code === "ECONNABORTED" || error.message?.includes("timeout")
          ? "NASA API timed out. Please try again."
          : "Failed to fetch APOD. Check your internet connection.");
      setApodError(msg);
    } finally {
      setApodLoading(false);
    }
  };

  // ── Favourites — browser → backend → MongoDB ─────────────────────────────
  const fetchFavorites = useCallback(async () => {
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data.data || []);
    } catch {
      // Backend offline — favourites unavailable but not fatal
    }
  }, []);

  const addFavorite = async (item) => {
    try {
      await api.post("/favorites", item);
      await fetchFavorites();
      showToast("⭐ Saved to Favourites!");
    } catch (err) {
      console.error("Failed to save favourite:", err.message);
      showToast("❌ Could not save — is the backend running?", "error");
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
      showToast("🗑 Removed from Favourites.");
    } catch (err) {
      console.error("Failed to delete favourite:", err.message);
      showToast("❌ Could not delete — is the backend running?", "error");
    }
  };

  const tabs = [
    { id: "apod",      label: "🌌 Astronomy Picture" },
    { id: "mars",      label: "🔴 Mars Rover" },
    { id: "favorites", label: `⭐ Favourites (${favorites.length})` },
  ];

  return (
    <div className="app">
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <span className="header-logo">🚀</span>
          <div>
            <h1 className="header-title">Space Explorer</h1>
            <p className="header-sub">Powered by NASA Open APIs</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main">
        {activeTab === "apod" && (
          <APODCard
            apod={apod}
            loading={apodLoading}
            error={apodError}
            onRetry={fetchAPOD}
            onFavorite={addFavorite}
          />
        )}
        {activeTab === "mars" && (
          <MarsGallery onFavorite={addFavorite} />
        )}
        {activeTab === "favorites" && (
          <Favorites favorites={favorites} onDelete={deleteFavorite} />
        )}
      </main>

      <footer className="footer">
        <p>
          Data provided by{" "}
          <a href="https://api.nasa.gov" target="_blank" rel="noreferrer">
            NASA Open APIs
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;