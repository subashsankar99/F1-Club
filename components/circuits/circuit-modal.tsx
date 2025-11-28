"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Circuit } from "@/lib/data/circuits";
import { ZoomIn, Info, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CircuitModalProps {
  circuit: Circuit | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CircuitModal({ circuit, isOpen, onClose }: CircuitModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!circuit) return null;

  const getStatusColor = () => {
    switch (circuit.status) {
      case "completed": return "bg-green-600/20 text-green-600";
      case "upcoming": return "bg-blue-600/20 text-blue-600";
      case "cancelled": return "bg-red-600/20 text-red-600";
      default: return "bg-gray-600/20 text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-[#0B0E14] text-white border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            {circuit.name}
            <span className={cn("text-xs px-2 py-1 rounded-full border border-white/10", getStatusColor())}>
              {circuit.status}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Clickable Image Container */}
          <div 
            className="relative h-56 w-full bg-gradient-to-r from-gray-900 to-slate-900 rounded-xl border border-white/5 p-6 cursor-zoom-in group/image"
            onDoubleClick={() => setIsZoomed(true)}
          >
             <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-gray-400 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center gap-1 z-10 pointer-events-none">
                <ZoomIn className="w-3 h-3" /> Double click to zoom
            </div>
            <Image
              src={circuit.imagePath}
              alt={`${circuit.name} layout`}
              fill
              className="object-contain drop-shadow-2xl filter invert transition-transform duration-300 group-hover/image:scale-105"
            />
          </div>

          {/* Description */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/5">
            <h4 className="flex items-center gap-2 font-semibold text-red-500 mb-3">
              <Info className="w-4 h-4" /> Circuit Information
            </h4>
            <p className="text-gray-300 leading-relaxed">{circuit.description}</p>
          </div>

          {/* Technical Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Technical Data</h4>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">Length</p>
                    <p className="font-bold text-white">{circuit.circuitLength} km</p>
                  </div>
                  <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">Laps</p>
                    <p className="font-bold text-white">{circuit.numberOfLaps}</p>
                  </div>
                  <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">Race Distance</p>
                    <p className="font-bold text-white">{(circuit.circuitLength * circuit.numberOfLaps).toFixed(2)} km</p>
                  </div>
                  <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">First GP</p>
                    <p className="font-bold text-white">{circuit.firstGrandPrix}</p>
                  </div>
                </div>
              </div>
              
              {/* Winners (Placeholder if array exists) */}
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                  <Trophy className="w-4 h-4 text-yellow-500" /> Lap Record
                </h4>
                 <div className="bg-[#151A23] p-4 rounded-lg border border-white/5">
                    <p className="text-2xl font-mono font-bold text-white">{circuit.lapRecord.time}</p>
                    <p className="text-sm text-gray-400 mt-1">{circuit.lapRecord.driver} ({circuit.lapRecord.year})</p>
                 </div>
              </div>
          </div>
        </div>
      </DialogContent>

      {/* Full Screen Zoom Overlay */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-8 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
        >
             <button className="absolute top-8 right-8 text-white p-2 bg-white/10 rounded-full hover:bg-white/20"><X className="w-8 h-8" /></button>
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                <Image src={circuit.imagePath} alt="Full layout" fill className="object-contain filter invert" />
            </div>
        </div>
      )}
    </Dialog>
  );
}