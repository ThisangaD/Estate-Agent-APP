import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";

const Gallery = ({ criteria }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties.json once when component mounts
  useEffect(() => {
    fetch("/properties.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load properties");
        return response.json();
      })
      .then((data) => {
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter whenever criteria changes
  useEffect(() => {
    let filtered = allProperties;

    if (criteria) {
      // Type filter
      if (criteria.type && criteria.type !== "Any") {
        filtered = filtered.filter((p) => p.type === criteria.type);
      }

      // Price filters
      if (criteria.minPrice) {
        filtered = filtered.filter((p) => p.price >= criteria.minPrice);
      }
      if (criteria.maxPrice) {
        filtered = filtered.filter((p) => p.price <= criteria.maxPrice);
      }

      // Bedrooms filters
      if (criteria.minBedrooms) {
        filtered = filtered.filter((p) => p.bedrooms >= criteria.minBedrooms);
      }
      if (criteria.maxBedrooms) {
        filtered = filtered.filter((p) => p.bedrooms <= criteria.maxBedrooms);
      }

      // Postcode area filter
      if (criteria.postcodeArea) {
        filtered = filtered.filter((p) =>
          p.location.toUpperCase().includes(criteria.postcodeArea.toUpperCase())
        );
      }

      // Date added filters (after / before / between)
      if (criteria.addedAfter || criteria.addedBefore) {
        filtered = filtered.filter((p) => {
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const monthIndex = monthNames.indexOf(p.added.month);
          const propertyDate = new Date(p.added.year, monthIndex, p.added.day);

          let afterOk = true;
          let beforeOk = true;

          if (criteria.addedAfter) {
            const afterDate = new Date(criteria.addedAfter);
            afterOk = propertyDate >= afterDate;
          }

          if (criteria.addedBefore) {
            const beforeDate = new Date(criteria.addedBefore);
            beforeDate.setHours(23, 59, 59, 999); // Include whole day
            beforeOk = propertyDate <= beforeDate;
          }

          return afterOk && beforeOk;
        });
      }
    }

    setFilteredProperties(filtered);
  }, [criteria, allProperties]);

  if (loading) return <p style={{ textAlign: "center", padding: "50px" }}>Loading properties...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default Gallery;