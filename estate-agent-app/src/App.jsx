import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';  // ← NEW
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import PropertyDetail from './components/PropertyDetail';
import './App.css';

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [properties, setProperties] = useState([]);  // Fetch properties here for sharing

  // Fetch data once
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
      <header style={{ backgroundColor: '#007bff', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>Estate Agent Property Search</h1>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <>
            <SearchForm onSearch={handleSearch} />
            <Gallery criteria={searchCriteria} properties={properties} />  // Pass properties
          </>
        } />

        <Route path="/property/:id" element={
          <PropertyDetail properties={properties} />  // Pass properties
        } />
      </Routes>
    </div>
  );
}

export default App;