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
      className="property-card"  // Only class – no conflicting inline styles
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}  // Only keep necessary inline (dragging)
    >
      <img
        src={property.picture}
        alt={`${property.type} in ${property.location}`}
        className="property-image"
      />
      <div className="property-info">
        <h3>{property.type} • {property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''}</h3>
        <h2>£{property.price.toLocaleString()}</h2>
        <p className="location">{property.location}</p>
        <p className="description">{property.description.substring(0, 150)}...</p>

        <div className="button-group">
          <button
            onClick={() => addFavorite(property)}
            disabled={isFavorite}
            className="favorite-btn"
          >
            {isFavorite ? 'Added ❤️' : 'Add to Favorites ❤️'}
          </button>

          <Link to={`/property/${property.id}`} className="details-link">
            <button className="details-btn">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;