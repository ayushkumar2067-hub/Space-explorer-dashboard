function Favorites({ favorites, onDelete }) {
  if (favorites.length === 0) {
    return (
      <div className="state-box">
        <span className="state-icon">⭐</span>
        <p>No favourites yet — save an APOD or a Mars photo to see it here!</p>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <h2 className="section-title">⭐ Your Favourites</h2>
      <div className="favorites-grid">
        {favorites.map((fav) => (
          <div key={fav._id} className="fav-card">
            <div className="fav-source-badge">{fav.source}</div>
            <img
              src={fav.imageUrl}
              alt={fav.title}
              className="fav-img"
              loading="lazy"
            />
            <div className="fav-info">
              <p className="fav-title">{fav.title}</p>
              {fav.date && <p className="fav-date">{fav.date}</p>}
            </div>
            <button
              className="btn-delete"
              onClick={() => onDelete(fav._id)}
              title="Remove from favourites"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
