"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

function RentForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (location) searchParams.set("location", location);
    if (date) searchParams.set("moveInDate", date.toISOString());
    router.push(`/rent?${searchParams.toString()}`);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Chennai">Chennai</SelectItem>
            <SelectItem value="Padappai">Padappai</SelectItem>
            <SelectItem value="Tambaram">Tambaram</SelectItem>
            <SelectItem value="Pallikaranai">Pallikaranai</SelectItem>
            <SelectItem value="Mahindra World City">Mahindra World City</SelectItem>
          </SelectContent>
        </Select>

        {/* Move-in Date Picker */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 px-4 border border-slate-200 rounded-md w-full sm:w-auto">
            Select Move-in Date
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0">
            <DropdownMenuItem className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          onClick={handleSearch} 
          className="w-full sm:w-auto bg-indigo-700 hover:bg-indigo-800"
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default RentForm;
