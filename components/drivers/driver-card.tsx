"use client";

import Image from "next/image"; // Ensure this is imported
import { Card, CardContent } from "@/components/ui/card";
import { Driver } from "@/lib/data/drivers";
import { teams } from "@/lib/data/teams";
import { Trophy, Target, Zap } from "lucide-react";

interface DriverCardProps {
  driver: Driver;
  onClick: () => void;
}

const DriverCard = ({ driver, onClick }: DriverCardProps) => {
  const team = teams.find((t) => t.id === driver.team);

  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-all group overflow-hidden"
      onClick={onClick}
      style={{ borderColor: team?.colors.primary + "40" }}
    >
      <CardContent className="p-0">
        {/* Driver Photo Container */}
        <div
          className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${team?.colors.primary}20 0%, ${team?.colors.secondary}20 100%)`,
          }}
        >
          {/* --- FIX START: ADDED IMAGE COMPONENT HERE --- */}
          <Image
            src={driver.photo}
            alt={driver.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top z-0" 
          />
          {/* Optional: Add a gradient overlay so white text remains readable over bright photos */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />
          {/* --- FIX END --- */}

          {/* Big Background Number (Watermark) */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="text-8xl font-bold opacity-10 mix-blend-overlay text-white">
              {driver.number}
            </div>
          </div>

          {/* Top Right Badge */}
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full z-10">
            <span
              className="text-2xl font-bold"
              style={{ color: team?.colors.primary }}
            >
              #{driver.number}
            </span>
          </div>

          {/* Top Left Flags */}
          <div className="absolute top-4 left-4 z-10 shadow-sm">
            <div className="text-4xl leading-none drop-shadow-md">
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
            </div>
          </div>

          {/* Bottom Name Overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 z-10">
            <div className="text-center text-5xl font-bold text-white/30 tracking-wider uppercase truncate px-2">
              {driver.name.split(" ")[1]}
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="p-4 space-y-3 relative z-20 bg-card">
          <div>
            <h3 className="text-2xl font-bold truncate">{driver.name}</h3>
            <p className="text-sm text-muted-foreground">{team?.name}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-lg font-bold">{driver.raceWins}</p>
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-lg font-bold">{driver.podiums}</p>
              <p className="text-xs text-muted-foreground">Podiums</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Zap className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-lg font-bold">{driver.points}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
          </div>

          {driver.championships > 0 && (
            <div
              className="p-2 rounded text-center text-sm font-semibold"
              style={{
                backgroundColor: team?.colors.primary + "20",
                color: team?.colors.primary,
              }}
            >
              🏆 {driver.championships}x World Champion
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverCard;