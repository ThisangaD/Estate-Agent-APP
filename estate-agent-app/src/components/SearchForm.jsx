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
    <div className="search-form-container" style={{ padding: "20px", background: "#dad9d9ff" }}>
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
            <label htmlFor="type">Type</label>
            <br />
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Any">Any</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          <div>
            <label htmlFor="minPrice">Min Price (£)</label>
            <br />
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="e.g. 200000"
            />
          </div>

          <div>
            <label htmlFor="maxPrice">Max Price (£)</label>
            <br />
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 1500000"
            />
          </div>

          <div>
            <label htmlFor="minBedrooms">Min Bedrooms</label>
            <br />
            <input
              id="minBedrooms"
              type="number"
              min="1"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label htmlFor="maxBedrooms">Max Bedrooms</label>
            <br />
            <input
              id="maxBedrooms"
              type="number"
              min="1"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
              placeholder="e.g. 5"
            />
          </div>

          <div>
            <label htmlFor="postcodeArea">Postcode Area</label>
            <br />
            <input
              id="postcodeArea"
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
            <label htmlFor="addedAfter">Added After</label>
            <br />
            <input
              id="addedAfter"
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
            <label htmlFor="addedBefore">Added Before</label>
            <br />
            <input
              id="addedBefore"
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
              background: "#a7a29dff",
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
    </div>
  );
};

export default SearchForm;