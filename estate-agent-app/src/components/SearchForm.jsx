import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [postcodeArea, setPostcodeArea] = useState("");
  const [addedAfter, setAddedAfter] = useState("");
  const [addedBefore, setAddedBefore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const criteria = {
      type,
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      minBedrooms: minBedrooms ? Number(minBedrooms) : null,
      maxBedrooms: maxBedrooms ? Number(maxBedrooms) : null,
      postcodeArea: postcodeArea.trim()
        ? postcodeArea.trim().toUpperCase()
        : null,
      addedAfter: addedAfter || null,
      addedBefore: addedBefore || null,
    };

    onSearch(criteria);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Find Your Property
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginLeft: "20px",
        }}
      >
        <div>
          <label>Type</label>
          <br />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div>
          <label>Min Price (£)</label>
          <br />
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 200000"
          />
        </div>

        <div>
          <label>Max Price (£)</label>
          <br />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1500000"
          />
        </div>

        <div>
          <label>Min Bedrooms</label>
          <br />
          <input
            type="number"
            min="1"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
            placeholder="e.g. 2"
          />
        </div>

        <div>
          <label>Max Bedrooms</label>
          <br />
          <input
            type="number"
            min="1"
            value={maxBedrooms}
            onChange={(e) => setMaxBedrooms(e.target.value)}
            placeholder="e.g. 5"
          />
        </div>

        <div>
          <label>Postcode Area</label>
          <br />
          <input
            type="text"
            value={postcodeArea}
            onChange={(e) => setPostcodeArea(e.target.value.toUpperCase())}
            placeholder="e.g. BR5"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              textTransform: "uppercase",
            }}
          />
        </div>

        <div>
          <label>Added After</label>
          <br />
          <input
            type="date"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            value={addedAfter}
            onChange={(e) => setAddedAfter(e.target.value)}
          />
        </div>

        <div>
          <label>Added Before</label>
          <br />
          <input
            type="date"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            value={addedBefore}
            onChange={(e) => setAddedBefore(e.target.value)}
          />
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          type="submit"
          style={{
            padding: "12px 40px",
            fontSize: "16px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
