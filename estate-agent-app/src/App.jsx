import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import Gallery from "./components/Gallery";
import PropertyDetail from "./components/PropertyDetail";
import FavoritesList from "./components/FavoritesList";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    //Load properties from JSON. PUBLIC_URL ensures correct path on GitHub Pages deployment
    const propertiesUrl = `${process.env.PUBLIC_URL}/properties.json`;

    fetch(propertiesUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch properties: Status ${res.status}. Server returned HTML.`
          );
        }
        return res.json();
      })
      .then((data) => setProperties(data.properties))
      .catch((error) => console.error("Error loading property data:", error));
  }, []);

  const handleSearch = (criteria) => {
    //Receive search criteria from SearchForm and trigger Gallery filtering
    setSearchCriteria(criteria);
  };

  return (
    <div>
      <header
        style={{
          backgroundColor: "#A89A9E",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            marginBottom: "8px",
            fontFamily: '"Great Vibes", cursive',
            fontWeight: "normal",
          }}
        >
          Estate Agent Property Search
        </h1>
        <p>Find your dream home in London</p>
      </header>

      {/* React Router setup – home page with search + gallery + favorites, detail page via /property/:id */}
      <Routes>
        {/* Search Page */}
        <Route
          path="/"
          element={
            <>
              <SearchForm onSearch={handleSearch} />

              <div className="main-container">
                <div className="layout-flex">
                  <div className="gallery-section">
                    <Gallery
                      criteria={searchCriteria}
                      properties={properties}
                    />
                  </div>
                  <div className="favorites-section">
                    <FavoritesList />
                  </div>
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/property/:id"
          element={<PropertyDetail properties={properties} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
