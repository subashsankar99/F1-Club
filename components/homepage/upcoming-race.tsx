"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { circuits } from "@/lib/data/circuits"; 

const UpcomingRace = () => {
  const nextRace = circuits.find((c) => c.status === "upcoming") || circuits[0];
  
  return (
    // ✅ ID matches the Footer "Schedule" link
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
                    src={nextRace.imagePath} 
                    alt={nextRace.name}
                    fill
                    className="object-contain p-2 opacity-100 transition-transform duration-700 group-hover:scale-110"
                    />
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
                    </div>
                    
                    <Link 
                    href={`/circuits?open=${nextRace.id}&returnTo=/`} 
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
