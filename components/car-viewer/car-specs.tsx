"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/lib/data/teams";
import { Gauge, Zap, Weight, Fuel, Cog, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CarSpecsProps {
  team: Team;
}

const CarSpecs = ({ team }: CarSpecsProps) => {
  const [showExploded, setShowExploded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Main Specs Card */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Gauge className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Chassis</p>
                <p className="font-semibold">{team.chassis}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Zap className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Power Unit</p>
                <p className="font-semibold">{team.powerUnit}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Cog className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Engine</p>
                <p className="font-semibold text-sm">{team.carSpecs.engine}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Cog className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Transmission</p>
                <p className="font-semibold text-sm">{team.carSpecs.transmission}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Weight className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Minimum Weight</p>
                <p className="font-semibold">{team.carSpecs.weight}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Fuel className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Fuel Capacity</p>
                <p className="font-semibold">{team.carSpecs.fuelCapacity}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exploded View Card */}
      <Card>
        <CardHeader>
          <CardTitle>Component View</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setShowExploded(!showExploded)}
          >
            {showExploded ? "Show Assembled" : "Show Exploded View"}
          </Button>

          <div className="space-y-2 text-sm">
            <div className="p-3 rounded bg-muted">
              <p className="font-semibold">Front Wing Assembly</p>
              <p className="text-xs text-muted-foreground">Carbon fiber construction</p>
            </div>
            <div className="p-3 rounded bg-muted">
              <p className="font-semibold">Monocoque Chassis</p>
              <p className="text-xs text-muted-foreground">Carbon fiber composite</p>
            </div>
            <div className="p-3 rounded bg-muted">
              <p className="font-semibold">Power Unit</p>
              <p className="text-xs text-muted-foreground">V6 Turbo Hybrid</p>
            </div>
            <div className="p-3 rounded bg-muted">
              <p className="font-semibold">Rear Wing</p>
              <p className="text-xs text-muted-foreground">DRS-enabled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Stats Card */}
      <Card style={{ borderColor: team.colors.primary + "40" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" style={{ color: team.colors.primary }} />
            Team Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">World Championships</span>
              <span className="text-2xl font-bold" style={{ color: team.colors.primary }}>
                {team.worldChampionships}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pole Positions</span>
              <span className="text-2xl font-bold" style={{ color: team.colors.primary }}>
                {team.polePositions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fastest Laps</span>
              <span className="text-2xl font-bold" style={{ color: team.colors.primary }}>
                {team.fastestLaps}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AR View Button (Mobile) */}
      <Card>
        <CardContent className="p-4">
          <Button className="w-full" variant="outline">
            📱 View in AR (Mobile Only)
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Available on iOS and Android devices
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarSpecs;