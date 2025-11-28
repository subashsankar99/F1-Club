"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teams } from "@/lib/data/teams";
import TeamCard from "@/components/teams/team-card";
import TeamDetails from "@/components/teams/team-details";
import { Trophy } from "lucide-react";

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl md:text-5xl font-bold">F1 Teams 2025</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Explore all 10 Formula 1 teams competing in the 2025 World Championship
        </p>
      </motion.div>

      {/* Teams Grid - 2x5 Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {teams
          .sort((a, b) => a.position - b.position)
          .map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TeamCard
                team={team}
                onClick={() => setSelectedTeam(team.id)}
              />
            </motion.div>
          ))}
      </div>

      {/* Team Details Modal */}
      <AnimatePresence>
        {selectedTeam && (
          <TeamDetails
            team={teams.find((t) => t.id === selectedTeam)!}
            onClose={() => setSelectedTeam(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}