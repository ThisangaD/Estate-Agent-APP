import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (property) => {
    setFavorites((prev) => {
      // Prevent duplicates
      if (prev.some(p => p.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter(p => p.id !== id));
  };

  const clearFavorites = () => {
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