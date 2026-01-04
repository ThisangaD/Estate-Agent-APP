import React from "react";
import { useParams } from "react-router-dom"; // Get id from URL
import ImageGallery from "react-image-gallery"; // For gallery
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Tabs styles
import "react-image-gallery/styles/css/image-gallery.css"; // Gallery styles

const PropertyDetail = ({ properties }) => {
  const { id } = useParams(); // Get prop id from URL (e.g., prop1)
  const property = properties.find((p) => p.id === id); // Find matching property

  if (!property) return <p>Property not found</p>;

  // Format images for gallery
  const galleryImages = property.images.map((img) => ({
    original: `${process.env.PUBLIC_URL}${img}`,
    thumbnail: `${process.env.PUBLIC_URL}${img}`,
  }));

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1>
        {property.type} in {property.location}
      </h1>
      <h2>
        £{property.price.toLocaleString()}
        {
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "15px",
              margin: "30px 0",
              padding: "20px",
              background: "#f9f9f9",
              borderRadius: "10px",
              fontSize: "1.1rem",
            }}
          >
            <div>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </div>
            <div>
              <strong>Type:</strong> {property.type}
            </div>
            <div>
              <strong>Tenure:</strong> {property.tenure || "N/A"}{" "}
              {/* If you have tenure in JSON */}
            </div>
            <div>
              <strong>Location:</strong> {property.location}
            </div>
            {/* Add more if in your JSON, e.g. garage if present */}
          </div>
        }
      </h2>

      {/* Image Gallery */}
      <ImageGallery items={galleryImages} showThumbnails={true} />

      {/* Tabs */}
      <Tabs style={{ marginTop: "30px" }}>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p dangerouslySetInnerHTML={{ __html: property.longDescription }} />
        </TabPanel>

        <TabPanel>
          <img
            src={`${process.env.PUBLIC_URL}${property.floorPlan}`}
            alt="Floor Plan"
            style={{ width: "100%" }}
          />
        </TabPanel>

        <TabPanel>
          <div dangerouslySetInnerHTML={{ __html: property.mapEmbed }} />
        </TabPanel>
      </Tabs>

      <button
        onClick={() => window.history.back()}
        style={{ marginTop: "20px" }}
      >
        Back to Search
      </button>
    </div>
  );
};

export default PropertyDetail;
