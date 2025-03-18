import React from 'react';

export default function SuspenseSkeleton() {
  return (
    <div className="container mx-auto mt-32 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="w-full md:col-span-2 lg:col-span-3">
          <div className="bg-accent h-80 animate-pulse"></div>
        </div>
        <div className="w-full">
          <div className="bg-accent h-48 animate-pulse"></div>
        </div>
        <div className="w-full">
          <div className="bg-accent h-96 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
