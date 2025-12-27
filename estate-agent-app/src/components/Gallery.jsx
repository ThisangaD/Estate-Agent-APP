import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";

const Gallery = ({ criteria, properties }) => {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Filter whenever criteria or properties change
  useEffect(() => {
    let filtered = properties;

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
  }, [criteria, properties]);

  // Show loading state while properties are being fetched by parent
  if (!properties || properties.length === 0) {
    return <p style={{ textAlign: "center", padding: "50px" }}>Loading properties...</p>;
  }

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