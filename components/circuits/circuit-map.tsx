"use client";

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useMemo, memo } from "react";

// --- ICONS ---
const f1Icon = L.divIcon({
  className: "custom-div-icon",
  html: "<div style='background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);'></div>",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -10],
  tooltipAnchor: [0, -12]
});

const activeF1Icon = L.divIcon({
  className: "active-div-icon",
  html: "<div style='background-color: #eab308; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(234, 179, 8, 0.8); animation: pulse 2s infinite;'></div>",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -16],
  tooltipAnchor: [0, -18]
});

interface Circuit {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

interface CircuitMapProps {
  circuits: Circuit[];
  onCircuitClick: (id: string) => void;
  selectedCircuitId: string | null;
}

// --- MAP CONTROLLER ---
const MapController = ({ selectedId, circuits }: { selectedId: string | null, circuits: Circuit[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;

    const target = circuits.find(c => c.id === selectedId);
    if (target && typeof target.latitude === 'number' && typeof target.longitude === 'number') {
      const currentCenter = map.getCenter();
      const dist = currentCenter.distanceTo([target.latitude, target.longitude]);
      
      if (dist > 1000) { 
        map.flyTo([target.latitude, target.longitude], 5, {
          animate: true,
          duration: 1.5
        });
      }
    }
  }, [selectedId, circuits, map]);

  return null;
};

const CircuitMap = ({ circuits, onCircuitClick, selectedCircuitId }: CircuitMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validCircuits = useMemo(() => {
    return circuits.filter(c => typeof c.latitude === "number" && typeof c.longitude === "number");
  }, [circuits]);

  // 1. DEFINE STRICT BOUNDS
  // 85 degrees is used instead of 90 because Web Mercator projection gets weird at the exact poles
  const corner1 = L.latLng(-85, -180);
  const corner2 = L.latLng(85, 180);
  const bounds = L.latLngBounds(corner1, corner2);

  if (!isMounted) {
    return (
      <div className="h-[500px] w-full bg-gray-900 rounded-xl flex items-center justify-center text-gray-500 border border-gray-800">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="relative h-[500px] w-full rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
      <MapContainer
        key="global-map"
        center={[20, 0]} 
        zoom={2}
        minZoom={2} // Prevents zooming out too far to see repeating world
        
        // 2. PREVENT DRAGGING (The solution to your problem)
        maxBounds={bounds}
        maxBoundsViscosity={1.0} // 1.0 means "Solid Wall". You cannot drag past the edge.
        
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        style={{ background: "#1f2937" }}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          // 3. PREVENT VISUAL REPEATING
          noWrap={true} 
        />

        <MapController selectedId={selectedCircuitId} circuits={validCircuits} />

        {validCircuits.map((circuit) => (
          <Marker
            key={circuit.id}
            position={[circuit.latitude, circuit.longitude]}
            icon={selectedCircuitId === circuit.id ? activeF1Icon : f1Icon}
            eventHandlers={{
              click: () => onCircuitClick(circuit.id),
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="text-center min-w-[100px]">
                <div className="text-slate-900 font-extrabold text-sm leading-tight">
                  {circuit.name}
                </div>
                <div className="text-slate-600 text-xs font-medium mt-1">
                  {circuit.country}
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-6 left-6 z-[1000] bg-gray-900/90 backdrop-blur border border-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none">
        Showing {validCircuits.length} Locations
      </div>
    </div>
  );
};

export default memo(CircuitMap);