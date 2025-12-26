import React from 'react';
import { useParams } from 'react-router-dom';  // Get id from URL
import ImageGallery from 'react-image-gallery';  // For gallery
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';  // Tabs styles
import 'react-image-gallery/styles/css/image-gallery.css';  // Gallery styles

const PropertyDetail = ({ properties }) => {
  const { id } = useParams();  // Get prop id from URL (e.g., prop1)
  const property = properties.find(p => p.id === id);  // Find matching property

  if (!property) return <p>Property not found</p>;

  // Format images for gallery
  const galleryImages = property.images.map(img => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>{property.type} in {property.location}</h1>
      <h2>£{property.price.toLocaleString()}</h2>

      {/* Image Gallery */}
      <ImageGallery items={galleryImages} showThumbnails={true} />

      {/* Tabs */}
      <Tabs style={{ marginTop: '30px' }}>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p dangerouslySetInnerHTML={{ __html: property.longDescription }} />
        </TabPanel>

        <TabPanel>
          <img src={property.floorPlan} alt="Floor Plan" style={{ width: '100%' }} />
        </TabPanel>

        <TabPanel>
          <div dangerouslySetInnerHTML={{ __html: property.mapEmbed }} />
        </TabPanel>
      </Tabs>

      <button onClick={() => window.history.back()} style={{ marginTop: '20px' }}>
        Back to Search
      </button>
    </div>
  );
};

export default PropertyDetail;