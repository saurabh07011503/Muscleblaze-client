
import React, { useEffect, useState } from "react";
import axios from "axios";

const Supplements = () => {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://muscleblaze-server.onrender.com/supplements")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        if (Array.isArray(response.data)) {
          setSupplements(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setSupplements([]); // Fallback to an empty array
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Supplements List</h2>
      <ul>
        {Array.isArray(supplements) && supplements.length > 0 ? (
          supplements.map((supplement) => (
           
            <li key={supplement.id}>
              <strong>
                <a href={`/supplements/${supplement.id}`}>{supplement.supplement}</a>
              </strong> - {supplement.city}

              <p>
                <a href={`/getSupplementsByType/${supplement.type}`}>
                  See more restaurants in {supplement.type}
                </a>
              </p>

            </li>

            
          ))
        ) : (
          <p>No supplements available.</p>
        )}
      </ul>

      
    </div>
  );
};

export default Supplements;

