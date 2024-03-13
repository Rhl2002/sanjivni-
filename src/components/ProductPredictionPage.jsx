import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductPredictionPage() {
  const { pluno,month } = useParams();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await axios.get(
          // `http://127.0.0.1:8000/prediction/${pluno}`
          // `http://localhost:8000/predict/pluno/1006/April`
          `http://localhost:8000/predict/pluno/${pluno}/${month}`
        );
        setPrediction(response.data.predictions[0].prediction);
        console.log(response)
      } catch (error) {
        setError("Prediction not found");
        console.error("Error fetching prediction:", error);
      }
    };

    fetchPrediction();
  }, [pluno]);

  return (
    <div className="container">
      <h2>Prediction for Product {pluno}</h2>
      {prediction !== null ? (
        <p>Prediction: {prediction}</p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default ProductPredictionPage;
