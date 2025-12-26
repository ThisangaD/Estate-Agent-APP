import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import PropertyDetail from './components/PropertyDetail';
import FavoritesList from './components/FavoritesList';
import './App.css';

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('/properties.json')
      .then(res => res.json())
      .then(data => setProperties(data.properties));
  }, []);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div>
      <header style={{ 
        backgroundColor: '#007bff', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center' 
      }}>
        <h1>Estate Agent Property Search</h1>
        <p>Find your dream home in London</p>
      </header>

      <Routes>
        {/* Search Page */}
        <Route path="/" element={
          <>
            <SearchForm onSearch={handleSearch} />
            
            <div className="main-container">
              <div className="layout-flex">
                <div className="gallery-section">
                  <Gallery criteria={searchCriteria} properties={properties} />
                </div>
                <div className="favorites-section">
                  <FavoritesList />
                </div>
              </div>
            </div>
          </>
        } />

        <Route path="/property/:id" element={<PropertyDetail properties={properties} />} />
      </Routes>
    </div>
  );
}

export default App;