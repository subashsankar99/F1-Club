"use client";

import { useState } from "react";
// REMOVED: import Image from "next/image"; (Causes server crash on lists)
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Circuit } from "@/lib/data/circuits";
import { MapPin, Calendar, Clock, CheckCircle2, AlertCircle, Trophy, Info, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircuitCardProps {
  circuit: Circuit;
  index?: number;
  isSelected?: boolean;
}

const CircuitCard = ({ circuit, index = 0, isSelected = false }: CircuitCardProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const getStatusIcon = () => {
    switch (circuit.status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "upcoming": return <Clock className="h-5 w-5 text-blue-600" />;
      case "cancelled": return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (circuit.status) {
      case "completed": return "bg-green-600/20 text-green-600";
      case "upcoming": return "bg-blue-600/20 text-blue-600";
      case "cancelled": return "bg-red-600/20 text-red-600";
      default: return "bg-gray-600/20 text-gray-600";
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card 
            className={cn(
              "cursor-pointer transition-all duration-500 group overflow-hidden h-full bg-gray-950",
              isSelected 
                ? "border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] scale-[1.03] z-10 ring-1 ring-red-500" 
                : "border-gray-800 hover:shadow-xl hover:scale-[1.01]"
            )}
          >
            <CardContent className="p-0">
              {/* Header Image Section */}
              <div className={cn(
                "relative h-48 overflow-hidden p-4 transition-colors duration-500",
                isSelected ? "bg-gradient-to-br from-red-600/30 to-gray-900" : "bg-gradient-to-br from-red-900/20 to-gray-900"
              )}>
                <div className="absolute inset-0 w-full h-full p-6 z-0 transition-transform duration-500 group-hover:scale-110">
                  {/* FIX: Used standard <img> to prevent server crash */}
                  <img
                    src={circuit.imagePath}
                    alt={`${circuit.name} layout`}
                    className="w-full h-full object-contain drop-shadow-2xl filter invert"
                    loading="lazy"
                  />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={cn("px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-md border border-white/10", getStatusColor())}>
                    {getStatusIcon()}
                    <span className="text-sm font-semibold capitalize">{circuit.status}</span>
                  </div>
                </div>

                {/* Background Number */}
                <div className="absolute bottom-2 left-4 z-10">
                  <div className={cn(
                    "text-6xl font-bold transition-colors duration-500",
                    isSelected ? "text-red-500/30" : "text-white/5"
                  )}>
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  {/* Title */}
                  <h3 className={cn(
                    "text-2xl font-bold mb-2 transition-colors",
                    isSelected ? "text-red-500" : "text-white group-hover:text-red-500"
                  )}>
                    {circuit.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{circuit.city}, {circuit.country}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(circuit.raceDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800 text-white">
                  <div>
                    <p className="text-sm text-gray-500">Laps</p>
                    <p className="text-xl font-bold">{circuit.numberOfLaps}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Length</p>
                    <p className="text-xl font-bold">{circuit.circuitLength} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">First GP</p>
                    <p className="text-xl font-bold">{circuit.firstGrandPrix}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        {/* DIALOG CONTENT */}
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
            {/* Image Container */}
            <div 
                className="relative h-56 w-full bg-gradient-to-r from-gray-900 to-slate-900 rounded-xl border border-white/5 p-6 cursor-zoom-in group/image"
                onDoubleClick={() => setIsZoomed(true)}
            >
                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-gray-400 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center gap-1 z-10 pointer-events-none">
                    <ZoomIn className="w-3 h-3" /> Double click to zoom
                </div>

                {/* FIX: Used standard <img> */}
                <img
                    src={circuit.imagePath}
                    alt={`${circuit.name} layout`}
                    className="w-full h-full object-contain drop-shadow-2xl filter invert transition-transform duration-300 group-hover/image:scale-105"
                    loading="eager" // Eager load inside modal
                />
            </div>

            {/* Description */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/5">
              <h4 className="flex items-center gap-2 font-semibold text-red-500 mb-3">
                <Info className="w-4 h-4" /> Circuit Information
              </h4>
              <p className="text-gray-300 leading-relaxed">{circuit.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Technical Data</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">Lap Record</p>
                    <p className="font-bold text-white">{circuit.lapRecord?.time || "-"}</p>
                    <p className="text-xs text-red-400 mt-1">{circuit.lapRecord?.driver}</p>
                  </div>
                  <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">Track Length</p>
                    <p className="font-bold text-white">{circuit.circuitLength} km</p>
                  </div>
                  <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">Total Distance</p>
                    <p className="font-bold text-white">{(circuit.circuitLength * circuit.numberOfLaps).toFixed(3)} km</p>
                  </div>
                  <div className="bg-[#151A23] p-3 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">Turns</p>
                    <p className="font-bold text-white">15</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-lg mb-4">
                  <Trophy className="w-4 h-4 text-yellow-500" /> Recent Winners
                </h4>
                <div className="space-y-2">
                  {circuit.pastWinners && circuit.pastWinners.length > 0 ? (
                    circuit.pastWinners.map((winner: any, i: number) => (
                      <div key={i} className="flex items-center justify-between bg-[#151A23] p-3 rounded-lg border border-white/5 hover:border-red-500/30 transition">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 font-mono text-sm">{winner.year}</span>
                          <span className="font-medium text-white">{winner.driver}</span>
                        </div>
                        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{winner.team}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No past winner data available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* FULL SCREEN ZOOM OVERLAY */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-8 cursor-zoom-out animate-in fade-in duration-200"
            onClick={() => setIsZoomed(false)}
        >
            <button 
                className="absolute top-8 right-8 text-white/50 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
                onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            >
                <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                {/* FIX: Used standard <img> */}
                <img
                    src={circuit.imagePath}
                    alt={`${circuit.name} layout full`}
                    className="w-full h-full object-contain drop-shadow-2xl filter invert"
                />
            </div>
        </div>
      )}
    </>
  );
};

export default CircuitCard;