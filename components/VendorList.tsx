import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin } from "lucide-react";
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export type Vendor = {
  id: number;
  name: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  specialties: string[];
  isOpen: boolean;
};

interface VendorListProps {
  vendors: Vendor[];
  fromDashboard?: boolean; // Add this prop
}

const VendorList: React.FC<VendorListProps> = ({ vendors, fromDashboard }) => {
  const router = useRouter();
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);

  // Simulate proximity sorting (in real app, use geolocation)
  const sortedVendors = [...vendors].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedVendorId(id);
    if (id) router.push(`/vendors/${id}${fromDashboard ? '?from=dashboard' : ''}`);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <label htmlFor="vendor-select" className="font-medium text-gray-700">Select nearest Vendor:</label>
        <select
          id="vendor-select"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandgreen"
          value={selectedVendorId || ''}
          onChange={handleSelect}
        >
          <option value="">-- Choose --</option>
          {sortedVendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id} disabled={!vendor.isOpen}>
              {vendor.name} ({vendor.distance}) {vendor.isOpen ? '' : '(Closed)'}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {sortedVendors.map((vendor) => (
          <Card key={vendor.id} className="flex flex-col h-full">
            <CardContent className="flex flex-col flex-1 p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <img
                  src={vendor.image || "/placeholder.svg"}
                  alt={vendor.name}
                  className="w-16 h-16 rounded-lg object-cover border mb-2 sm:mb-0"
                />
                <div className="flex-1 w-full">
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{vendor.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{vendor.rating}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{vendor.deliveryTime}</span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{vendor.distance}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {vendor.specialties.map((specialty) => (
                  <Badge key={specialty} className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between mt-auto gap-2 sm:gap-0">
                <Badge variant={vendor.isOpen ? "default" : "secondary"} className={vendor.isOpen ? "bg-brandgreen" : "bg-gray-400"}>
                  {vendor.isOpen ? "Open" : "Closed"}
                </Badge>
                <Button
                  size="sm"
                  className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-white shadow-md w-full sm:w-auto"
                  onClick={() => router.push(`/vendors/${vendor.id}${fromDashboard ? '?from=dashboard' : ''}`)}
                  disabled={!vendor.isOpen}
                >
                  Shop Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorList; 