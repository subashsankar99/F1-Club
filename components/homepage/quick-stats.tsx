"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flag, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { circuits } from "@/lib/data/circuits"; // Adjust path if necessary
import { drivers } from "@/lib/data/drivers";   // Adjust path if necessary

const QuickStats = () => {
  // 1. Calculate Race Stats
  const completedRaces = circuits.filter((c) => c.status === "completed").length;
  const totalRaces = circuits.length;
  const remainingRaces = totalRaces - completedRaces;
  
  const nextRace = circuits.find((c) => c.status === "upcoming");
  const nextRaceName = nextRace ? nextRace.name.replace("International Circuit", "").replace("Grand Prix", "GP").trim() : "Season Finished";

  // 2. Calculate Driver Stats
  // We sort by points just to be safe, though your array might already be sorted
  const championshipLeader = [...drivers].sort((a, b) => b.points - a.points)[0];

  const stats = [
    {
      icon: Flag,
      label: "Races Completed",
      value: completedRaces.toString(),
      change: `${completedRaces} / ${totalRaces} rounds`,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      icon: Trophy,
      label: "Races Remaining",
      value: remainingRaces.toString(),
      change: `Next: ${nextRaceName}`, // e.g., "Next: Qatar"
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      icon: TrendingUp,
      label: "Championship Leader",
      value: championshipLeader.name, // "Lando Norris"
      change: `${championshipLeader.points} points`,
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuickStats;