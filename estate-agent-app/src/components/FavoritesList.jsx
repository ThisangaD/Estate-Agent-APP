import React from "react";
import { useDrop } from "react-dnd";
import { useFavorites } from "../context/FavoritesContext";
import { useDrag } from "react-dnd"; // Add this import

// New: A single favorite item component that is draggable
const FavoriteItem = ({ property, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "favorite", // Different type from property to avoid confusion
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        background: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}${property.picture}`}
        alt={property.type}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />
      <p style={{ margin: "10px 0 5px", fontWeight: "bold" }}>
        £{property.price.toLocaleString()}
      </p>
      <p style={{ margin: "0 0 10px", fontSize: "14px" }}>
        {property.type} in {property.location}
      </p>
      <button
        onClick={() => onRemove(property.id)}
        style={{
          background: "#f44336",
          color: "white",
          border: "none",
          padding: "8px",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Remove
      </button>
    </div>
  );
};

const FavoritesList = () => {
  const { favorites, removeFavorite, clearFavorites, addFavorite } = useFavorites();

  // Main drop zone for adding
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "property",
    drop: (item) => addFavorite(item.property),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // New: Trash drop zone for removing
  const [{ isOverTrash }, dropTrash] = useDrop(() => ({
    accept: "favorite",
    drop: (item) => removeFavorite(item.id),
    collect: (monitor) => ({
      isOverTrash: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "#e3f2fd" : "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        minHeight: "300px",
        border: "2px dashed #aaa",
        transition: "background-color 0.3s",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Favorites ({favorites.length})</h2>

      {favorites.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          Drag properties here or click ❤️ to add to favorites
        </p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {favorites.map((property) => (
              <FavoriteItem
                key={property.id}
                property={property}
                onRemove={removeFavorite}
              />
            ))}
          </div>

          <button
            onClick={clearFavorites}
            style={{
              marginTop: "20px",
              background: "#d32f2f",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Clear All Favorites
          </button>

          {/* New: Trash Zone */}
          <div
            ref={dropTrash}
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: isOverTrash ? "#ffcccc" : "#ffebee",
              border: "2px dashed #f44336",
              borderRadius: "8px",
              textAlign: "center",
              color: "#d32f2f",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {isOverTrash ? "Release to Remove" : "Drag here to remove from favorites 🗑️"}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesList;