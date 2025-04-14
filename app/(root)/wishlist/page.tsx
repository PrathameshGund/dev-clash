
'use client';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Cards from '../rent/_components/Cards';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const allDocuments = useQuery(api.documents.getAllData, {});
  const [wishlistProperties, setWishlistProperties] = useState<any[]>([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const filtered = allDocuments?.filter((property: any) =>
      wishlist.includes(property.property_name)
    );
    setWishlistProperties(filtered || []);
  }, [allDocuments]);

  return (
    <div>
      <div className="mx-4 sm:mx-20">
        <h1 className="text-3xl pt-7 font-semibold">Your Wishlist</h1>
        {wishlistProperties.length === 0 && (
          <p className="mt-4 text-gray-600">No properties in your wishlist yet.</p>
        )}
      </div>
      <Cards properties={wishlistProperties} />
    </div>
  );
}
