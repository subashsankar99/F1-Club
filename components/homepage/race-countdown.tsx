"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flag, Timer } from "lucide-react";

const QuickStats = () => {
  return (
    // ADDED ID HERE ↓
    <div id="countdown-section" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Card 1 */}
      <Card className="bg-black/50 border-gray-800 backdrop-blur">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="h-12 w-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
            <Flag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Races Completed</p>
            <p className="text-2xl font-bold text-white">22</p>
            <p className="text-xs text-muted-foreground">22 / 24 rounds</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="bg-black/50 border-gray-800 backdrop-blur">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="h-12 w-12 rounded-full bg-green-600/10 flex items-center justify-center text-green-600">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Races Remaining</p>
            <p className="text-2xl font-bold text-white">2</p>
            <p className="text-xs text-muted-foreground">Next: Lusail</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3 */}
      <Card className="bg-black/50 border-gray-800 backdrop-blur">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="h-12 w-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
            <Timer className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Championship Leader</p>
            <p className="text-2xl font-bold text-white">Lando Norris</p>
            <p className="text-xs text-muted-foreground">432 points</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
