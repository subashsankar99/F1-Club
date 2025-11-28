"use client";

import { motion } from "framer-motion";
import { Team } from "@/lib/data/teams";
import { X, MapPin, User, Wrench, Calendar, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Link import removed as it is no longer used
import { useRouter } from "next/navigation";

interface TeamDetailsProps {
  team: Team;
  onClose: () => void;
}

const TeamDetails = ({ team, onClose }: TeamDetailsProps) => {
  const router = useRouter();

  const handleViewProfile = (driverName: string) => {
    const driverId = driverName.toLowerCase().trim().replace(/\s+/g, "-");
    
    // Close the current modal
    onClose();
    
    // Navigate to drivers page, BUT add 'returnTo=/teams'
    router.push(`/drivers?open=${driverId}&returnTo=/teams`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="max-w-5xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: team.colors.primary }}
          >
            {/* Header with Video */}
            <div className="relative h-64 bg-gradient-to-r from-black to-gray-900">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
              >
                <source src={team.videoPath} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="absolute bottom-6 left-6">
                <h2 className="text-4xl font-bold mb-2">{team.name}</h2>
                <p className="text-xl text-muted-foreground">{team.fullName}</p>
              </div>
            </div>

            {/* Content */}
            <div className="bg-card p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                  <TabsTrigger value="specs">Car Specs</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <p className="text-lg">{team.description}</p>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Base</span>
                      </div>
                      <p className="font-semibold">{team.base}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span className="text-sm">Team Chief</span>
                      </div>
                      <p className="font-semibold">{team.teamChief}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Wrench className="h-4 w-4" />
                        <span className="text-sm">Technical Chief</span>
                      </div>
                      <p className="font-semibold">{team.technicalChief}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">First Entry</span>
                      </div>
                      <p className="font-semibold">{team.firstEntry}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm">Championships</span>
                      </div>
                      <p className="font-semibold">{team.worldChampionships}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm">2025 Points</span>
                      </div>
                      <p className="font-semibold" style={{ color: team.colors.primary }}>
                        {team.points}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{team.polePositions}</p>
                      <p className="text-sm text-muted-foreground">Pole Positions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{team.fastestLaps}</p>
                      <p className="text-sm text-muted-foreground">Fastest Laps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{team.worldChampionships}</p>
                      <p className="text-sm text-muted-foreground">World Titles</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="drivers" className="space-y-4">
                  {team.drivers.map((driver) => (
                    <div
                      key={driver}
                      className="p-4 rounded-lg border"
                      style={{ borderColor: team.colors.primary + "40" }}
                    >
                      <h4 className="text-xl font-bold mb-2">{driver}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Racing for {team.name} in the 2025 season
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProfile(driver)}
                      >
                        View Full Profile
                      </Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="specs" className="space-y-6">
                     <div className="grid gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <h4 className="font-semibold mb-2">Chassis</h4>
                      <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>
                        {team.chassis}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted">
                      <h4 className="font-semibold mb-2">Power Unit</h4>
                      <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>
                        {team.powerUnit}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-semibold mb-2">Engine</h4>
                        <p className="text-sm">{team.carSpecs.engine}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-semibold mb-2">Transmission</h4>
                        <p className="text-sm">{team.carSpecs.transmission}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-semibold mb-2">Weight</h4>
                        <p className="text-sm">{team.carSpecs.weight}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-semibold mb-2">Fuel Capacity</h4>
                        <p className="text-sm">{team.carSpecs.fuelCapacity}</p>
                      </div>
                    </div>
                  </div>
                  {/* 3D Car Model Link removed from here */}
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                   <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Team Timeline</h4>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: team.colors.primary }}
                            />
                            <div className="w-0.5 h-full bg-border" />
                          </div>
                          <div className="pb-8">
                            <p className="font-semibold">Founded</p>
                            <p className="text-sm text-muted-foreground">{team.firstEntry}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: team.colors.primary }}
                            />
                            <div className="w-0.5 h-full bg-border" />
                          </div>
                          <div className="pb-8">
                            <p className="font-semibold">World Championships</p>
                            <p className="text-sm text-muted-foreground">
                              {team.worldChampionships} Constructor titles
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: team.colors.primary }}
                            />
                          </div>
                          <div>
                            <p className="font-semibold">Current Season</p>
                            <p className="text-sm text-muted-foreground">
                              P{team.position} with {team.points} points
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamDetails;