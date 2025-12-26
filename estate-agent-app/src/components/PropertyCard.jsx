import React from 'react';

const PropertyCard = ({ property }) => {
  const { id, picture, type, bedrooms, price, location, description } = property;

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      maxWidth: '300px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: 'white'
    }}>
      <img 
        src={picture} 
        alt={`${type} in ${location}`}
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h3>{type} • {bedrooms} bedroom{bedrooms > 1 ? 's' : ''}</h3>
      <h2>£{price.toLocaleString()}</h2>
      <p style={{ color: '#555', fontSize: '14px' }}>{location}</p>
      <p style={{ fontSize: '14px' }}>{description.substring(0, 150)}...</p>
      <button style={{
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        View Details
      </button>
    </div>
  );
};

export default PropertyCard;