import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (property) => {
    // Add property to favorites with duplicate prevention (robust state management)
    setFavorites((prev) => {
      // Prevent duplicates
      if (prev.some(p => p.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  const removeFavorite = (id) => {
    // Remove favorite by ID – used by button and drag-to-trash
    setFavorites((prev) => prev.filter(p => p.id !== id));
  };

  const clearFavorites = () => {
    // Clear all favorites – provides complete list management
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};