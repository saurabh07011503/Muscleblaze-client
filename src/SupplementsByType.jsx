import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const SupplementsByType = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5500/supplements")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const uniqueTypes = [...new Set(response.data.map((t) => t.type))];
          setTypes(uniqueTypes);
        }
      })
      .catch((error) => console.error("Error fetching types:", error));
  }, []);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5500/supplements/type/${type}`)
      .then((response) => {
        setSupplements(response.data.supplementList || []);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch supplements.");
        setLoading(false);
      });
  };

  return (
    <div>
    <main>
      <div className="fixed">
        <div className="logo">
          <img
            src="https://cdn.labdoor.io/brand/images/npjn65sqqnrw4117kp28io.jpg"
            alt="MuscleBlaze Logo"
            height="100px"
            width="100px"
          />
        </div>

       
        <div className="container">
    <h1 className="title">Muscleblaze</h1>

    <div className="dropdown-container">
      <label><strong>Select a Type:</strong></label>
      <select onChange={handleTypeChange} value={selectedType}>
        <option value="">-- Select --</option>
        {types.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>

    {loading && <p className="loading">Loading supplements...</p>}
    {error && <p className="error">{error}</p>}

    <div className="supplement-list">
      {supplements.length > 0 ? (
        supplements.map((supplement) => (
          <div key={supplement.id} className="supplement-card">
            <Link to={`/supplement/${supplement.id}`} className="supplement-link">
              <img
                src={supplement.image || "/default-supplement.jpg"}
                alt={supplement.supplement}
                className="supplement-image"
              />
              <div className="supplement-details">
                <h2>{supplement.type}</h2>
                <p>{supplement.weight}</p>
                <p>Price: ₹{supplement.price}</p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="no-data">No supplements found for this type.</p>
      )}
    </div>
  </div>





        <div className="favourites">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
        </div>

        <div className="cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </div>

        <div className="login">
          <button className="search-button">Login/Sign Up</button>
        </div>

  </div>


      
  <div className="list">
        <div className="images">
          <h5><b>ALL PRODUCTS</b></h5>
        </div>
        <div className="images">
          <h5><b>OFFERS</b></h5>
        </div>
        <div className="images">
          <h5><b>STORES</b></h5>
        </div>
        <div className="images">
          <h5><b>OUR STORY</b></h5>
        </div>
        <div className="images">
          <h5><b>AUTHENTICITY</b></h5>
        </div>
        <div className="images">
          <h5><b>CHAT SUPPORT</b></h5>
        </div>
      </div>



    </main>
  </div>
  );
};

export default SupplementsByType;
