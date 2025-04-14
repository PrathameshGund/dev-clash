'use client';
import { useState } from 'react';
import Cards from './_components/Cards';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function RentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const allDocuments = useQuery(api.documents.getAllData, {});

  const filteredProperties = allDocuments?.filter((property: any) => {
    const matchesSearch = property.property_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const sortedProperties = [...(filteredProperties || [])].sort((a: any, b: any) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <div className="mx-4 sm:mx-20 flex flex-col">
        <h1 className="text-3xl pt-7 font-semibold">Search Properties for Rent</h1>
        <div className="mt-8 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by property name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-5 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 px-5 py-2 rounded-md"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 px-5 py-2 rounded-md bg-white"
          >
            <option value="">Sort by price</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <button 
            onClick={() => {
              // Trigger search with current filters
              const filtered = allDocuments?.filter((property: any) => {
                const matchesSearch = property.property_name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());
                return matchesSearch && matchesLocation;
              });
              setFilteredProperties(filtered || []);
            }}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      <Cards properties={sortedProperties || []} />
    </div>
  );
}

export default RentPage;