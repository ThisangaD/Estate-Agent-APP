import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [postcodeArea, setPostcodeArea] = useState("");
  const [addedAfter, setAddedAfter] = useState("");
  const [addedBefore, setAddedBefore] = useState("");

  // Type options for react-select
  const typeOptions = [
    { value: "Any", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build criteria object – null for empty fields to allow flexible filtering
    const criteria = {
      type,
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      minBedrooms: minBedrooms ? Number(minBedrooms) : null,
      maxBedrooms: maxBedrooms ? Number(maxBedrooms) : null,
      postcodeArea: postcodeArea.trim() ? postcodeArea.trim().toUpperCase() : null,
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
          {/* Enhanced Type Dropdown */}
          <div>
            <label>Type</label>
            <Select
              value={typeOptions.find(opt => opt.value === type)}
              onChange={(option) => setType(option ? option.value : "Any")}
              options={typeOptions}
              placeholder="Select property type"
              isClearable={false}
            />
          </div>

          {/* Price & Bedrooms - kept as enhanced number inputs */}
          <div>
            <label>Min Price (£)</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="e.g. 200000"
              min="0"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label>Max Price (£)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 1500000"
              min="0"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label>Min Bedrooms</label>
            <input
              type="number"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
              placeholder="e.g. 2"
              min="1"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label>Max Bedrooms</label>
            <input
              type="number"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
              placeholder="e.g. 5"
              min="1"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Postcode */}
          <div>
            <label>Postcode Area</label>
            <input
              type="text"
              value={postcodeArea}
              onChange={(e) => setPostcodeArea(e.target.value.toUpperCase())}
              placeholder="e.g. BR5"
              maxLength="4"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                textTransform: "uppercase",
              }}
            />
          </div>

          {/* Enhanced Date Pickers */}
          <div>
            <label>Added After</label>
            <DatePicker
              selected={addedAfter ? new Date(addedAfter) : null}
              onChange={(date) => setAddedAfter(date ? date.toISOString().split("T")[0] : "")}
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </div>

          <div>
            <label>Added Before</label>
            <DatePicker
              selected={addedBefore ? new Date(addedBefore) : null}
              onChange={(date) => setAddedBefore(date ? date.toISOString().split("T")[0] : "")}
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
              className="form-control"
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