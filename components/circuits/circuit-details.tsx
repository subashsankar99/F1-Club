"use client";

import { X, MapPin, Trophy, Route } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// --- RELATIVE IMPORTS (Fixes the red lines) ---
import { Circuit } from "../../lib/data/circuits"; 
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
// ----------------------------------------------

interface CircuitDetailsProps {
  circuit: Circuit;
  onClose: () => void;
}

const CircuitDetails = ({ circuit, onClose }: CircuitDetailsProps) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area
  const [mounted, setMounted] = useState(false);

  // 1. Mount Logic
  useEffect(() => {
    setMounted(true);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // 2. AGGRESSIVE FOCUS LOGIC
  // As soon as it mounts, we force focus 3 times with slight delays to beat the browser's rendering engine
  useEffect(() => {
    if (mounted && modalContentRef.current) {
      const focusModal = () => {
        modalContentRef.current?.focus();
        // Also try to focus the scroll container directly if possible
        scrollContainerRef.current?.focus();
      };

      // Attempt 1: Immediate
      focusModal();
      
      // Attempt 2: After 50ms (React render cycle)
      const t1 = setTimeout(focusModal, 50);
      
      // Attempt 3: After 150ms (Animation frame)
      const t2 = setTimeout(focusModal, 150);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [mounted]);

  if (!circuit || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 isolate">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Wrapper */}
      <div 
        ref={modalContentRef}
        tabIndex={-1} // Allows this div to capture keyboard events
        className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl flex flex-col outline-none animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        // MOUSE ENTER FIX: As soon as your mouse touches the modal, it steals focus
        onMouseEnter={() => modalContentRef.current?.focus()} 
        // MOUSE MOVE FIX: If you move the mouse inside, it steals focus again
        onMouseMove={(e) => {
            if (document.activeElement !== modalContentRef.current) {
                modalContentRef.current?.focus();
            }
            e.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="flex-none flex items-start justify-between p-6 bg-[#0a0a0a] border-b border-gray-800 rounded-t-xl select-none">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{circuit.name}</h2>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                {circuit.status || "Upcoming"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{circuit.city}, {circuit.country}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-800 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body - Scrollable Area */}
        {/* Added 'min-h-0' to prevent flexbox overflow bugs */}
        <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto min-h-0 p-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent focus:outline-none"
            tabIndex={-1}
        >
          
          {/* Map Image */}
          <div className="relative w-full border border-dashed rounded-xl bg-gradient-to-b from-gray-900/50 to-black border-gray-800 p-8 flex justify-center select-none">
              <img 
                src={circuit.imagePath} 
                alt={circuit.name} 
                loading="eager"
                decoding="async"
                className="max-h-64 md:max-h-80 w-auto object-contain"
                style={{ contentVisibility: 'auto' }} 
              />
          </div>

          {/* Description */}
          <div className="p-4 border rounded-lg bg-red-500/5 border-red-500/10">
             <h4 className="mb-2 text-sm font-bold text-red-500 flex items-center gap-2">
               <span className="flex items-center justify-center w-4 h-4 text-[10px] border border-red-500 rounded-full">i</span>
               Circuit Info
             </h4>
             <p className="text-gray-300 leading-relaxed">{circuit.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-8 md:grid-cols-2 pb-6">
            <div className="space-y-4">
               <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                 <Route className="w-5 h-5 text-red-500" /> Technical Data
               </h3>
               <div className="grid grid-cols-2 gap-3">
                  <StatBox label="Lap Record" value={circuit.lapRecord?.time} sub={circuit.lapRecord?.driver} />
                  <StatBox label="Track Length" value={circuit.circuitLength ? `${circuit.circuitLength} km` : undefined} />
                  <StatBox label="Race Distance" value={circuit.raceDistance ? `${circuit.raceDistance} km` : undefined} />
                  <StatBox label="Laps" value={circuit.numberOfLaps} />
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                 <Trophy className="w-5 h-5 text-yellow-500" /> Past Winners
               </h3>
               <div className="space-y-2">
                 {circuit.pastWinners?.map((winner, i) => (
                   <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-gray-900/40 border-gray-800 hover:bg-gray-900/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-gray-500">{winner.year}</span>
                        <span className="font-medium text-white">{winner.driver}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] border-gray-700 text-gray-400">
                        {winner.team}
                      </Badge>
                   </div>
                 ))}
                 {!circuit.pastWinners?.length && (
                   <div className="text-sm text-gray-500 italic">No past winner data available</div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const StatBox = ({ label, value, sub }: { label: string, value: string | number | undefined, sub?: string }) => (
  <div className="p-3 border rounded-lg bg-gray-900/50 border-gray-800">
    <p className="text-xs uppercase text-muted-foreground">{label}</p>
    <p className="text-lg font-bold text-white truncate">{value || "-"}</p>
    {sub && <p className="text-xs text-red-400 truncate">{sub}</p>}
  </div>
);

export default CircuitDetails;