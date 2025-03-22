import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const SupplementsById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplement, setSupplement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://muscleblaze-server.onrender.com/supplements/${id}`)
      .then((response) => {
        setSupplement(response.data.supplement);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch supplement details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="supplement-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">⬅ Go Back</button>
      <h1 className="supplement-title">{supplement.type}</h1>
      <img
        src={supplement.image || "/default-supplement.jpg"}
        alt={supplement.type}
        className="supplement-detail-image"
      />
      <p className="supplement-type">Weight: {supplement.weight}</p>
      <p className="supplement-description">Price: ₹{supplement.price}</p>
    </div>
  );
};

export default SupplementsById;
