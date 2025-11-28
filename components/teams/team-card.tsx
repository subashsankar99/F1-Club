"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Team } from "@/lib/data/teams";
import { Trophy, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface TeamCardProps {
  team: Team;
  onClick: () => void;
}

const TeamCard = ({ team, onClick }: TeamCardProps) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-all group overflow-hidden"
      onClick={onClick}
      style={{
        borderColor: team.colors.primary + "40",
      }}
    >
      <CardContent className="p-0">
        <div className="flex">
          {/* Color Bar */}
          <div
            className="w-2 group-hover:w-3 transition-all"
            style={{ backgroundColor: team.colors.primary }}
          />

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: team.colors.primary }}
                  >
                    #{team.position}
                  </span>
                  <Trophy className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{team.name}</h3>
                <p className="text-sm text-muted-foreground">{team.fullName}</p>
              </div>
              <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Points</p>
                <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>
                  {team.points}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Championships</p>
                <p className="text-2xl font-bold">{team.worldChampionships}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold">Drivers</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {team.drivers.map((driver) => (
                  <span
                    key={driver}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: team.colors.primary + "20",
                      color: team.colors.primary,
                    }}
                  >
                    {driver}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;