
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/Spinner';

// Mock price prediction model
const predictPrice = (data: any) => {
  // Base price per square foot
  const basePricePerSqFt = 5000;
  
  // Location multipliers
  const locationMultipliers: { [key: string]: number } = {
    'Chennai': 1.2,
    'Mumbai': 2.0,
    'Delhi': 1.8,
    'Bangalore': 1.7,
    'Pune': 1.4,
    'Hyderabad': 1.5,
  };

  // Property type multipliers
  const propertyTypeMultipliers: { [key: string]: number } = {
    'Apartment': 1.0,
    'Villa': 1.6,
    'House': 1.4,
    'Flat': 1.1,
  };

  let price = data.area_sqm * basePricePerSqFt;
  
  // Apply location multiplier
  const city = data.location.split(',').pop()?.trim();
  if (city && locationMultipliers[city]) {
    price *= locationMultipliers[city];
  }

  // Apply property type multiplier
  if (propertyTypeMultipliers[data.propertyType]) {
    price *= propertyTypeMultipliers[data.propertyType];
  }

  // Add multipliers for beds and baths
  price *= (1 + (data.beds * 0.1));
  price *= (1 + (data.bathrooms * 0.05));

  // Add random variation (±5%)
  const variation = 0.9 + Math.random() * 0.2;
  price *= variation;

  return Math.round(price);
};

export default function PricePrediction() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    location: '',
    beds: 2,
    bathrooms: 2,
    area_sqm: 1000,
    propertyType: 'Apartment'
  });

  const handlePredict = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const predictedPrice = predictPrice(formData);
    setPrediction(predictedPrice);
    setLoading(false);
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Predict Property Price</h2>
      
      <div className="space-y-4">
        <div>
          <Label>Location</Label>
          <Input
            placeholder="Enter location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <div>
          <Label>Bedrooms</Label>
          <Input
            type="number"
            value={formData.beds}
            onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <Label>Bathrooms</Label>
          <Input
            type="number"
            value={formData.bathrooms}
            onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <Label>Area (sq.m)</Label>
          <Input
            type="number"
            value={formData.area_sqm}
            onChange={(e) => setFormData({...formData, area_sqm: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <Label>Property Type</Label>
          <Select
            value={formData.propertyType}
            onValueChange={(value) => setFormData({...formData, propertyType: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Flat">Flat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handlePredict} disabled={loading} className="w-full">
          {loading ? <Spinner /> : 'Predict Price'}
        </Button>

        {prediction && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-lg font-semibold">
              Based on your input, the estimated property price is ₹{prediction.toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
