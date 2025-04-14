
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const Map = ({ location }: { location: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      // Dynamically import Leaflet only on client side
      import('leaflet').then((L) => {
        const mapInstance = L.map(mapRef.current!).setView([13.0827, 80.2707], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        // Geocode the location
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
          .then(res => res.json())
          .then(data => {
            if (data.length > 0) {
              const { lat, lon } = data[0];
              mapInstance.setView([lat, lon], 15);
              L.marker([lat, lon]).addTo(mapInstance);
            }
          });

        return () => mapInstance.remove();
      });
    }
  }, [location]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px' }} />;
};

// Prevent SSR for the map component
export default dynamic(() => Promise.resolve(Map), {
  ssr: false
});
