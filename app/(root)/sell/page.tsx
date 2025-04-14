'use client';

import React, { useState } from 'react';
import CategoryHead from './_components/categoryHead';
// import Input from './_components/Input';
import SelectInput from './_components/SelectInput';
import InputFile from './_components/InputFile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PricePrediction from '@/components/PricePrediction';
import { Label } from '@/components/ui/label';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function SellForm() {
  const [image_url, setImage_url] = React.useState('');
  const [url, seturl] = React.useState('');
  const [data, setdata] = useState({
    property_name: '',
    location: '',
    price: 0,
  });

  const create = useMutation(api.documents.createEntry);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(data);
    if (e.target.name === 'price') {
      setdata({ ...data, [e.target.name]: parseInt(e.target.value) });
      return;
    }
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    create({
      ...data,
      image_url,
    }).then((re) => {
      alert('Property added');
    });
  };

  return (
    <div className="w-10/12 m-auto mb-20">
      <div className="text-2xl font-semibold text-slate-800 mb-4">
        Add a property
      </div>
      <div className="w-full border-slate- mb-5 border rounded-lg">
        <CategoryHead title="Property Details" />
        <div className="px-8 py-4">
          <Label htmlFor="property_name">Property Name</Label>
          <Input
            id="property_name"
            name="property_name"
            onChange={handleChange}
            title="Property Name"
            placeholder="Enter property name"
          />
        </div>
        <div className="px-8 py-4">
          <Label htmlFor="location">Property Address</Label>
          <Input
            id="location"
            name="location"
            onChange={handleChange}
            title="Property Name"
            placeholder="Enter Address"
          />
        </div>
        <div className="px-8 py-4">
          <Label htmlFor="price">Property Price</Label>
          <Input
            id="price"
            name="price"
            onChange={handleChange}
            title="Price"
            placeholder="Enter Price"
          />
        </div>

        <InputFile title="Upload Image " setUrl={setImage_url} url={image_url} />
        <InputFile title="Upload EC/Sell deed /property tax receipt" setUrl={seturl} url={url} />
      </div>
      <Button onClick={handleSubmit} className="mb-8">Submit</Button>
      <button 
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors mb-8"
          >
            Search
          </button>

      <div className="w-full border-slate- mb-5 border rounded-lg">
        <CategoryHead title="Price Prediction Tool" />
        <div className="px-8 py-4">
          <PricePrediction />
        </div>
      </div>
    </div>
  );
}

export default SellForm;