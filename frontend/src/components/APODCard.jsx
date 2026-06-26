function APODCard({ apod, loading, error, onRetry, onFavorite }) {
  if (loading) {
    return (
      <div className="state-box">
        <div className="spinner" />
        <p>Fetching today's astronomy picture…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-box error">
        <span className="state-icon">⚠️</span>
        <p className="state-msg">{error}</p>
        <button className="btn-retry" onClick={onRetry}>Try Again</button>
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