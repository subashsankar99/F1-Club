"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { circuits } from "@/lib/data/circuits"; 

const UpcomingRace = () => {
  const nextRace = circuits.find((c) => c.status === "upcoming") || circuits[0];

  // ... (Keep existing logic for dates/winners) ...
  const formattedDate = new Date(nextRace.raceDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const latestWinner = nextRace.pastWinners && nextRace.pastWinners.length > 0 
    ? nextRace.pastWinners[0] 
    : null;

  const gpName = `${nextRace.country.toUpperCase()} GP`;

  return (
    <section id="next-race-section" className="py-10 container mx-auto">
      <Card className="overflow-hidden bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Next Race</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side Image */}
                <div className="relative h-80 md:h-auto min-h-[300px] bg-[#121212] group overflow-hidden flex items-center justify-center">
                    <Image
                    // This automatically uses the path from circuits.ts (e.g., /F1-Club/circuits/qatar.png)
                    src={nextRace.imagePath} 
                    alt={nextRace.name}
                    fill
                    className="object-contain p-2 opacity-100 transition-transform duration-700 group-hover:scale-110"
                    />
                     <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black/40" />
                     <div className="relative z-10 h-full flex items-center justify-center">
                        <div className="text-center space-y-2 p-8 opacity-10 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-4xl font-bold text-white tracking-tighter">{gpName}</h3>
                            <p className="text-xl text-gray-100">{nextRace.city}</p>
                            <div className="flex items-center justify-center gap-2 text-gray-200 font-medium">
                            <Calendar className="h-4 w-4" />
                            <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Details */}
                <div className="p-6 space-y-6 bg-[#0a0a0a] text-white flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                            <div>
                                <p className="font-semibold text-white">{nextRace.name}</p>
                                <p className="text-sm text-gray-400">{nextRace.city}, {nextRace.country}</p>
                            </div>
                        </div>
                        {latestWinner && (
                            <div className="flex items-start gap-3">
                                <Trophy className="h-5 w-5 text-red-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-white">Previous Winner ({latestWinner.year})</p>
                                    <p className="text-sm text-gray-400">
                                    {latestWinner.driver} ({latestWinner.team})
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                     <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                        <div>
                            <p className="text-sm text-gray-500">Laps</p>
                            <p className="text-2xl font-bold text-white">{nextRace.numberOfLaps}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Distance</p>
                            <p className="text-2xl font-bold text-white">{nextRace.raceDistance} km</p>
                        </div>
                    </div>
                    
                    {/* FIXED LINK PATH BELOW */}
                    <Link 
                    href={`/F1-Club/circuits?open=${nextRace.id}&returnTo=/F1-Club/`} 
                    className="block w-full"
                    >
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        View Circuit Details
                    </Button>
                    </Link>
                </div>
            </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default UpcomingRace;
