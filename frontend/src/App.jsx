import { useEffect, useState } from "react";
import api from "./services/api";
import APODCard from "./components/APODCard";

function App() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    fetchAPOD();
  }, []);

  const fetchAPOD = async () => {
    try {
      const response = await api.get("/apod");

      setApod(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        🚀 Space Explorer Dashboard
      </h1>

      {apod ? (
        <APODCard apod={apod} />
      ) : (
        <h2 style={{ textAlign: "center" }}>
          Loading APOD...
        </h2>
      )}
    </div>
  );
}

export default App;