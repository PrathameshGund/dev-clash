
'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function PropertyMap({ location }: { location: string }) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([13.0827, 80.2707], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Use OpenStreetMap Nominatim API to geocode the location
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0 && mapRef.current) {
          const { lat, lon } = data[0];
          mapRef.current.setView([lat, lon], 15);
          L.marker([lat, lon]).addTo(mapRef.current);
        }
      });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location]);

  return <div id="map" style={{ height: '400px', width: '100%', marginTop: '20px' }} />;
}
