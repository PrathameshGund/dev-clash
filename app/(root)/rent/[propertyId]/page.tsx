'use client';

import React, { useEffect, useState } from 'react';
import BackLink from './_components/link';
import property1 from '@/public/images/property-1.jpg';
import Heading from './_components/heading';
import Info from './_components/info';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import PropertyMap from './_components/map';


const PropertyPagebyId = ({
  params: { propertyId },
}: {
  params: { propertyId: Id<'properties'> };
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = useQuery(api.documents.getById, {
    documentId: propertyId,
  });

  // Placeholder for property data; needs to be fetched correctly from data
  const property = data?.data || { location: { lat: 34.0522, lng: -118.2437 } };


  return (
    <div suppressHydrationWarning className="w-[80%] m-auto">
      <BackLink />
      <Heading data={data} />
      <Info data={data} />
      <div className="px-6 py-4">
        <PropertyMap location={property.location} />
      </div>
    </div>
  );
};
export default PropertyPagebyId;

// Placeholder Map Component
const PropertyMap = ({ location }: { location: { lat: number; lng: number } }) => {
  return (
    <div>
      {/* Replace this with actual map implementation using Leaflet or other library */}
      <p>Map Placeholder: Latitude: {location.lat}, Longitude: {location.lng}</p>
    </div>
  );
};