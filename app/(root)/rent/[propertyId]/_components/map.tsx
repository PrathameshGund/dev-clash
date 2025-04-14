
'use client';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function PropertyMap({ location }: { location: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([13.0827, 80.2707], 13); // Default to Chennai coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Use OpenStreetMap Nominatim API to geocode the location
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            map.setView([lat, lon], 15);
            L.marker([lat, lon]).addTo(map);
          }
        });

      return () => map.remove();
    }
  }, [location]);

  return <div id="map" style={{ height: '400px', width: '100%', marginTop: '20px' }} />;
}
