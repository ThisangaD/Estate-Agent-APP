import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useFavorites } from '../context/FavoritesContext';

const PropertyCard = ({ property }) => {
  const { favorites, addFavorite } = useFavorites();
  const isFavorite = favorites.some(p => p.id === property.id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: { property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        maxWidth: '300px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        transition: 'opacity 0.2s'
      }}
    >
      <img
        src={property.picture}
        alt={`${property.type} in ${property.location}`}
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h3>{property.type} • {property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''}</h3>
      <h2>£{property.price.toLocaleString()}</h2>
      <p style={{ color: '#555', fontSize: '14px' }}>{property.location}</p>
      <p style={{ fontSize: '14px' }}>{property.description.substring(0, 150)}...</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={() => addFavorite(property)}
          disabled={isFavorite}
          style={{
            flex: 1,
            backgroundColor: isFavorite ? '#999' : '#e91e63',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            cursor: isFavorite ? 'not-allowed' : 'pointer'
          }}
        >
          {isFavorite ? 'Added ❤️' : 'Add to Favorites ❤️'}
        </button>

        <Link to={`/property/${property.id}`} style={{ flex: 1 }}>
          <button style={{
            width: '100%',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;