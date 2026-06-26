function APODCard({ apod }) {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#1a1a2e",
      }}
    >
      <h2>{apod.title}</h2>

      <img
        src={apod.url}
        alt={apod.title}
        style={{
          width: "100%",
          borderRadius: "10px",
        }}
      />

      <p style={{ marginTop: "15px" }}>
        {apod.explanation}
      </p>
    </div>
  );
}

export default APODCard;