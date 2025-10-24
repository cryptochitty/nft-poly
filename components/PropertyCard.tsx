import React from 'react';

// FIX: This component is not used in the application and was causing compilation errors
// because it referenced types (PropertyTile, RailroadTile, UtilityTile) that do not exist.
// It has been replaced with a null-rendering component to fix the build.
const PropertyCard: React.FC = () => {
  return null;
};

export default PropertyCard;
