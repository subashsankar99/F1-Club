"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import CircuitCard from "@/components/circuits/circuit-card";
import { circuits } from "@/lib/data/circuits";

// ✅ FIXED: Import path updated to point to components/circuits/circuit-map
const CircuitMap = dynamic(
  () => import("@/components/circuits/circuit-map"), 
  { 
    ssr: false,
    loading: () => (
      // Changed height to 500px to match the actual map component height
      <div className="h-[500px] w-full bg-gray-900 animate-pulse rounded-xl flex items-center justify-center text-gray-500 border border-gray-800">
        Loading Map...
      </div>
    )
  }
);

function CircuitsContent() {
  const searchParams = useSearchParams();
  const [selectedCircuitId, setSelectedCircuitId] = useState<string | null>(null);

  // Handle URL Query Params (e.g. redirects from Home Page ?open=suzuka)
  useEffect(() => {
    const openId = searchParams.get("open");
    if (openId) {
      // Check if the ID exists in our data to avoid errors
      const exists = circuits.find(c => c.id === openId);
      if (exists) {
        handleCircuitClick(openId);
      }
    }
  }, [searchParams]);

  const handleCircuitClick = (id: string) => {
    setSelectedCircuitId(id); 

    // Scroll to the specific card
    const element = document.getElementById(`circuit-${id}`);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 min-h-screen bg-black">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold text-white">F1 Circuits 2024</h1>
        <p className="text-gray-400">Explore the global calendar of Formula 1 racing tracks.</p>
      </div>

      {/* Map Section */}
      <section>
        <CircuitMap 
            circuits={circuits} 
            onCircuitClick={handleCircuitClick} 
            selectedCircuitId={selectedCircuitId} 
        />
      </section>

      {/* Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {circuits.map((circuit, index) => (
          <div 
            key={circuit.id} 
            id={`circuit-${circuit.id}`}
            className="transition-all duration-500"
          >
            <CircuitCard 
              circuit={circuit} 
              index={index}
              isSelected={selectedCircuitId === circuit.id}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

// Suspense is required in Next.js when using useSearchParams
export default function CircuitsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading Circuits...</div>}>
      <CircuitsContent />
    </Suspense>
  );
}