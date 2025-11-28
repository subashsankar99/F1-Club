"use client";

import Image from "next/image"; // <--- ADDED THIS IMPORT
import { motion } from "framer-motion";
import { Driver } from "@/lib/data/drivers";
import { teams } from "@/lib/data/teams";
import { X, Calendar, MapPin, Trophy, TrendingUp, Award, Zap } from "lucide-react";

interface DriverProfileProps {
  driver: Driver;
  onClose: () => void;
}

const DriverProfile = ({ driver, onClose }: DriverProfileProps) => {
  const team = teams.find((t) => t.id === driver.team);

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
            style={{ borderColor: team?.colors.primary }}
          >
            {/* Header */}
            <div
              className="relative h-96 overflow-hidden" // Increased height slightly for better image fit
              style={{
                background: `linear-gradient(135deg, ${team?.colors.primary} 0%, ${team?.colors.secondary} 100%)`,
              }}
            >
              <div className="absolute inset-0 racing-stripes opacity-10" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background z-50"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Big Background Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[300px] font-bold opacity-10 mix-blend-overlay text-white select-none">
                  {driver.number}
                </div>
              </div>

              {/* --- FIX: ADDED DRIVER IMAGE HERE --- */}
              <div className="absolute inset-0 flex items-end justify-end md:justify-center z-0">
                 <div className="relative w-full h-full md:w-3/4">
                    <Image 
                        src={driver.photo} 
                        alt={driver.name}
                        fill
                        className="object-contain object-bottom drop-shadow-2xl"
                        priority
                    />
                 </div>
              </div>
              {/* ----------------------------------- */}

              {/* Gradient Overlay to make text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-6xl drop-shadow-lg">
                        {driver.flagCode === "NL" && "🇳🇱"}
                        {driver.flagCode === "MX" && "🇲🇽"}
                        {driver.flagCode === "MC" && "🇲🇨"}
                        {driver.flagCode === "ES" && "🇪🇸"}
                        {driver.flagCode === "GB" && "🇬🇧"}
                        {driver.flagCode === "AU" && "🇦🇺"}
                        {driver.flagCode === "CA" && "🇨🇦"}
                        {driver.flagCode === "FR" && "🇫🇷"}
                        {driver.flagCode === "TH" && "🇹🇭"}
                        {driver.flagCode === "US" && "🇺🇸"}
                        {driver.flagCode === "JP" && "🇯🇵"}
                        {driver.flagCode === "DE" && "🇩🇪"}
                        {driver.flagCode === "DK" && "🇩🇰"}
                        {driver.flagCode === "FI" && "🇫🇮"}
                        {driver.flagCode === "CN" && "🇨🇳"}
                      </span>
                      <div className="text-white">
                        <p className="text-sm opacity-90">{driver.nationality}</p>
                        <h2 className="text-5xl font-bold">{driver.name}</h2>
                      </div>
                    </div>
                    <p className="text-xl text-white/90">{team?.fullName}</p>
                  </div>
                  <div
                    className="text-8xl font-bold drop-shadow-lg hidden md:block"
                    style={{ color: team?.colors.accent || '#fff' }}
                  >
                    #{driver.number}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-card p-8">
              {/* Championships Banner */}
              {driver.championships > 0 && (
                <div
                  className="mb-8 p-6 rounded-lg text-center"
                  style={{ backgroundColor: team?.colors.primary + "20" }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Trophy className="h-8 w-8" style={{ color: team?.colors.primary }} />
                    <h3 className="text-3xl font-bold" style={{ color: team?.colors.primary }}>
                      {driver.championships}x Formula 1 World Champion
                    </h3>
                  </div>
                </div>
              )}

              {/* Biography */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Biography</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {driver.biography}
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-4">Personal Information</h3>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-semibold">{new Date(driver.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Place of Birth</p>
                      <p className="font-semibold">{driver.placeOfBirth}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Position</p>
                      <p className="font-semibold">P{driver.position} in Championship</p>
                    </div>
                  </div>
                </div>

                {/* Career Stats Summary */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-4">Career Highlights</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Grand Prix Entered</p>
                      <p className="text-3xl font-bold">{driver.careerStats.grandsPrixEntered}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Highest Finish</p>
                      <p className="text-3xl font-bold">{driver.careerStats.highestRaceFinish}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Pole Positions</p>
                      <p className="text-3xl font-bold">{driver.polePositions}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Fastest Laps</p>
                      <p className="text-3xl font-bold">{driver.fastestLaps}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div>
                <h3 className="text-2xl font-bold mb-4">2025 Season Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: team?.colors.primary + "15" }}
                  >
                    <Trophy className="h-8 w-8 mx-auto mb-2" style={{ color: team?.colors.primary }} />
                    <p className="text-4xl font-bold mb-1">{driver.raceWins}</p>
                    <p className="text-sm text-muted-foreground">Race Wins</p>
                  </div>

                  <div
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: team?.colors.primary + "15" }}
                  >
                    <Award className="h-8 w-8 mx-auto mb-2" style={{ color: team?.colors.primary }} />
                    <p className="text-4xl font-bold mb-1">{driver.podiums}</p>
                    <p className="text-sm text-muted-foreground">Podiums</p>
                  </div>

                  <div
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: team?.colors.primary + "15" }}
                  >
                    <Zap className="h-8 w-8 mx-auto mb-2" style={{ color: team?.colors.primary }} />
                    <p className="text-4xl font-bold mb-1">{driver.polePositions}</p>
                    <p className="text-sm text-muted-foreground">Pole Positions</p>
                  </div>

                  <div
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: team?.colors.primary + "15" }}
                  >
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" style={{ color: team?.colors.primary }} />
                    <p className="text-4xl font-bold mb-1">{driver.fastestLaps}</p>
                    <p className="text-sm text-muted-foreground">Fastest Laps</p>
                  </div>

                  <div
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: team?.colors.primary + "15" }}
                  >
                    <Trophy className="h-8 w-8 mx-auto mb-2" style={{ color: team?.colors.primary }} />
                    <p className="text-4xl font-bold mb-1">{driver.points}</p>
                    <p className="text-sm text-muted-foreground">Points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DriverProfile;