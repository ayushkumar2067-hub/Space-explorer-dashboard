import { useEffect, useState } from "react";
import api from "./services/api";
import APODCard from "./components/APODCard";
import MarsGallery from "./components/MarsGallery";
import Favorites from "./components/Favorites";

function App() {
  const [activeTab, setActiveTab] = useState("apod");
  const [apod, setApod] = useState(null);
  const [apodLoading, setApodLoading] = useState(true);
  const [apodError, setApodError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchAPOD();
    fetchFavorites();
  }, []);

  const fetchAPOD = async () => {
    setApodLoading(true);
    setApodError(null);
    try {
      const response = await api.get("/apod");
      // Backend returns { success: true, data: { title, url, ... } }
      setApod(response.data.data);
    } catch (error) {
      setApodError(
        error.response?.data?.message || "Failed to connect to backend. Is the server running?"
      );
    } finally {
      setApodLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data.data || []);
    } catch {
      // silently fail for favourites on load
    }
  };

  const addFavorite = async (item) => {
    try {
      await api.post("/favorites", item);
      fetchFavorites();
    } catch (err) {
      console.error("Failed to save favourite:", err.message);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Failed to delete favourite:", err.message);
    }
  };

  const tabs = [
    { id: "apod", label: "🌌 Astronomy Picture" },
    { id: "mars", label: "🔴 Mars Rover" },
    { id: "favorites", label: `⭐ Favourites (${favorites.length})` },
  ];

  return (
    <div className="app">
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
        <p>Data provided by <a href="https://api.nasa.gov" target="_blank" rel="noreferrer">NASA Open APIs</a></p>
      </footer>
    </div>
  );
}

export default App;