import { useState } from "react";
import api from "../services/api";

const ROVERS = ["curiosity", "perseverance", "opportunity", "spirit"];
const CAMERAS = {
  curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
  perseverance: ["EDL_RUCAM", "EDL_RDCAM", "EDL_DDCAM", "EDL_PUCAM1", "EDL_PUCAM2", "NAVCAM_LEFT", "NAVCAM_RIGHT", "MCZ_RIGHT", "MCZ_LEFT", "FRONT_HAZCAM_LEFT_A", "FRONT_HAZCAM_RIGHT_A", "REAR_HAZCAM_LEFT", "REAR_HAZCAM_RIGHT"],
  opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
};

function MarsGallery({ onFavorite }) {
  const [rover, setRover] = useState("curiosity");
  const [earthDate, setEarthDate] = useState("2020-07-01");
  const [camera, setCamera] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    setPhotos([]);
    try {
      const params = { rover, earth_date: earthDate };
      if (camera) params.camera = camera;
      const res = await api.get("/mars", { params });
      setPhotos(res.data.photos || []);
      setSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Mars photos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mars-section">
      {/* Controls */}
      <div className="mars-controls card">
        <h2 className="controls-title">🔴 Mars Rover Photos</h2>
        <div className="controls-grid">
          <label className="ctrl-label">
            Rover
            <select
              className="ctrl-select"
              value={rover}
              onChange={(e) => { setRover(e.target.value); setCamera(""); }}
            >
              {ROVERS.map((r) => (
                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
              ))}
            </select>
          </label>

          <label className="ctrl-label">
            Earth Date
            <input
              type="date"
              className="ctrl-input"
              value={earthDate}
              max={new Date().toISOString().split("T")[0]}
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
              {(CAMERAS[rover] || []).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <button className="btn-search" onClick={fetchPhotos} disabled={loading}>
          {loading ? "Searching…" : "🔭 Search Photos"}
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="state-box">
          <div className="spinner" />
          <p>Contacting NASA Mars Rover API…</p>
        </div>
      )}

      {error && (
        <div className="state-box error">
          <span className="state-icon">⚠️</span>
          <p className="state-msg">{error}</p>
        </div>
      )}

      {!loading && searched && photos.length === 0 && !error && (
        <div className="state-box">
          <span className="state-icon">🔍</span>
          <p>No photos found for this date / camera combination. Try a different date.</p>
        </div>
      )}

      {photos.length > 0 && (
        <>
          <p className="results-count">{photos.length} photo{photos.length !== 1 ? "s" : ""} found</p>
          <div className="mars-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="mars-photo-card">
                <img
                  src={photo.img_src}
                  alt={`${photo.rover.name} - ${photo.camera.full_name}`}
                  className="mars-img"
                  loading="lazy"
                />
                <div className="mars-photo-info">
                  <span className="mars-camera">{photo.camera.full_name}</span>
                  <span className="mars-date">{photo.earth_date}</span>
                  <button
                    className="btn-fav-sm"
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
