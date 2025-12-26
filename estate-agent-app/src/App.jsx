import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const [searchCriteria, setSearchCriteria] = useState(null);  // State for criteria

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);  // Update criteria on search
  };

  return (
    <div>
      <header style={{ backgroundColor: '#007bff', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>Estate Agent Property Search</h1>
      </header>
      <SearchForm onSearch={handleSearch} />  
      <Gallery criteria={searchCriteria} />  
    </div>
  );
}

export default App;