function APODCard({ apod, loading, error, onRetry, onFavorite }) {
  // Sanitize error: if it somehow contains HTML tags or is too long
  const cleanError = error && (
    error.includes("<") || error.includes("DOCTYPE") || error.length > 300
      ? "Could not reach the NASA API. Please check your internet connection."
      : error
  );

  if (loading) {
    return (
      <div className="state-box">
        <div className="spinner" />
        <p>Fetching today's astronomy picture…</p>
      </div>
    );
  }

  if (cleanError) {
    return (
      <div className="state-box error">
        <span className="state-icon">⚠️</span>
        <p className="state-msg">{cleanError}</p>
        <div className="error-tips">
          <p className="state-hint">Things to check:</p>
          <ul className="error-list">
            <li>Your internet connection is active</li>
            <li>NASA API may be temporarily rate-limited — try again in 1 minute</li>
            <li>Your <code>VITE_NASA_API_KEY</code> in <code>frontend/.env</code> is valid</li>
          </ul>
        </div>
        <button className="btn-retry" onClick={onRetry}>🔄 Try Again</button>
      </div>
    );
  }

  if (!apod) return null;

  const handleFavorite = () => {
    onFavorite({
      title: apod.title,
      imageUrl: apod.url,
      date: apod.date,
      mediaType: apod.media_type || "image",
      source: "APOD",
    });
  };

  return (
    <div className="card apod-card">
      <div className="card-badge">📅 {apod.date}</div>
      <h2 className="card-title">{apod.title}</h2>

      {apod.media_type === "video" ? (
        <div className="media-wrapper">
          <iframe
            src={apod.url}
            title={apod.title}
            allowFullScreen
            className="apod-video"
          />
        </div>
      ) : (
        <div className="media-wrapper">
          <img
            src={apod.hdurl || apod.url}
            alt={apod.title}
            className="apod-img"
            onError={(e) => { e.target.src = apod.url; }}
          />
        </div>
      )}

      <p className="card-explanation">{apod.explanation}</p>

      <div className="card-actions">
        <button className="btn-fav" onClick={handleFavorite}>
          ⭐ Save to Favourites
        </button>
        {apod.hdurl && (
          <a
            href={apod.hdurl}
            target="_blank"
            rel="noreferrer"
            className="btn-link"
          >
            🔍 View HD
          </a>
        )}
      </div>
    </div>
  );
}

export default APODCard;