import { useState } from "react";
import api from "../services/api";
import nasaApi from "../services/nasaApi";

// ── Rover metadata ────────────────────────────────────────────────────────────
const ROVER_INFO = {
  curiosity: {
    label: "Curiosity",
    minDate: "2012-08-06",
    maxDate: null,
    defaultDate: "2023-06-15",
    cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
    status: "active",
    badge: "🟢 Active",
  },
  perseverance: {
    label: "Perseverance",
    minDate: "2021-02-18",
    maxDate: null,
    defaultDate: "2023-06-15",
    cameras: [
      "NAVCAM_LEFT", "NAVCAM_RIGHT",
      "MCZ_RIGHT", "MCZ_LEFT",
      "FRONT_HAZCAM_LEFT_A", "FRONT_HAZCAM_RIGHT_A",
      "REAR_HAZCAM_LEFT", "REAR_HAZCAM_RIGHT",
    ],
    status: "active",
    badge: "🟢 Active",
  },
  opportunity: {
    label: "Opportunity",
    minDate: "2004-01-25",
    maxDate: "2018-06-10",
    defaultDate: "2018-06-10",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    status: "inactive",
    badge: "🔴 Inactive since 2018",
  },
  spirit: {
    label: "Spirit",
    minDate: "2004-01-04",
    maxDate: "2010-03-21",
    defaultDate: "2010-03-01",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    status: "inactive",
    badge: "🔴 Inactive since 2010",
  },
};

const TODAY = new Date().toISOString().split("T")[0];

function MarsGallery({ onFavorite }) {
  const [roverKey, setRoverKey] = useState("curiosity");
  const [earthDate, setEarthDate] = useState(ROVER_INFO.curiosity.defaultDate);
  const [camera, setCamera] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const rover = ROVER_INFO[roverKey];

  const handleRoverChange = (newRover) => {
    setRoverKey(newRover);
    setCamera("");
    setPhotos([]);
    setError(null);
    setSearched(false);
    setEarthDate(ROVER_INFO[newRover].defaultDate);
  };

  // Sanitize error: never show raw HTML
  const sanitizeError = (msg) => {
    if (!msg) return "Failed to fetch Mars photos. Please try again.";
    if (msg.includes("<") || msg.includes("DOCTYPE") || msg.length > 300)
      return "Could not reach the NASA API. Check your internet connection and try again.";
    return msg;
  };

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    setPhotos([]);

    const range = rover;
    const maxDate = range.maxDate || TODAY;

    // Client-side date range validation before even calling NASA
    if (earthDate < range.minDate || earthDate > maxDate) {
      setError(
        `The ${rover.label} rover was only active between ${range.minDate} and ${range.maxDate || "today"}. Please choose a date in that range.`
      );
      setLoading(false);
      return;
    }

    try {
      // Call NASA directly from the browser
      const params = { earth_date: earthDate };
      if (camera) params.camera = camera;

      const res = await nasaApi.get(
        `/mars-photos/api/v1/rovers/${roverKey}/photos`,
        { params }
      );

      setPhotos(res.data.photos || []);
      setSearched(true);
    } catch (err) {
      const raw =
        err.response?.data?.error?.message ||
        err.response?.data?.msg ||
        err.message ||
        "";
      setError(sanitizeError(raw));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mars-section">
      {/* Controls */}
      <div className="mars-controls card">
        <h2 className="controls-title">🔴 Mars Rover Photos</h2>

        {/* Rover selector cards */}
        <div className="rover-cards">
          {Object.entries(ROVER_INFO).map(([key, info]) => (
            <button
              key={key}
              className={`rover-card ${roverKey === key ? "selected" : ""}`}
              onClick={() => handleRoverChange(key)}
            >
              <span className="rover-name">{info.label}</span>
              <span className={`rover-badge ${info.status}`}>{info.badge}</span>
            </button>
          ))}
        </div>

        {/* Date range hint */}
        <p className="date-hint">
          📅 <strong>{rover.label}</strong> was active:{" "}
          <span className="date-range-text">
            {rover.minDate} → {rover.maxDate || "Present"}
          </span>
          {rover.status === "inactive" && (
            <span className="inactive-warn"> — only dates in this range will return photos</span>
          )}
        </p>

        {/* Date + Camera row */}
        <div className="controls-grid">
          <label className="ctrl-label">
            Earth Date
            <input
              type="date"
              className="ctrl-input"
              value={earthDate}
              min={rover.minDate}
              max={rover.maxDate || TODAY}
              onChange={(e) => setEarthDate(e.target.value)}
            />
          </label>

          <label className="ctrl-label">
            Camera (optional)
            <select
              className="ctrl-select"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
            >
              <option value="">All Cameras</option>
              {rover.cameras.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <button className="btn-search" onClick={fetchPhotos} disabled={loading}>
          {loading ? "Searching…" : "🔭 Search Photos"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="state-box">
          <div className="spinner" />
          <p>Contacting NASA Mars Rover API…</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="state-box error">
          <span className="state-icon">⚠️</span>
          <p className="state-msg">{error}</p>
          <div className="error-tips">
            <p className="state-hint">Things to check:</p>
            <ul className="error-list">
              <li>Valid date range: <strong>{rover.minDate}</strong> → <strong>{rover.maxDate || "today"}</strong></li>
              <li>Internet connection is active</li>
              <li>NASA API may be temporarily rate-limited</li>
            </ul>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && searched && photos.length === 0 && !error && (
        <div className="state-box">
          <span className="state-icon">🔍</span>
          <p>No photos found for this date / camera combination.</p>
          <p className="state-hint">
            Try a different date between <strong>{rover.minDate}</strong> and{" "}
            <strong>{rover.maxDate || "today"}</strong>.
          </p>
        </div>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <>
          <p className="results-count">
            {photos.length} photo{photos.length !== 1 ? "s" : ""} found for{" "}
            <strong>{rover.label}</strong> on <strong>{earthDate}</strong>
          </p>
          <div className="mars-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="mars-photo-card">
                <img
                  src={photo.img_src}
                  alt={`${photo.rover.name} — ${photo.camera.full_name}`}
                  className="mars-img"
                  loading="lazy"
                />
                <div className="mars-photo-info">
                  <span className="mars-camera">{photo.camera.full_name}</span>
                  <span className="mars-date">{photo.earth_date}</span>
                  <button
                    className="btn-fav-sm"
                    title="Save to Favourites"
                    onClick={() =>
                      onFavorite({
                        title: `${photo.rover.name} — ${photo.camera.full_name}`,
                        imageUrl: photo.img_src,
                        date: photo.earth_date,
                        mediaType: "image",
                        source: "MARS",
                      })
                    }
                  >
                    ⭐
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MarsGallery;
