"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { drivers } from "@/lib/data/drivers";
import { teams } from "@/lib/data/teams";
import DriverCard from "@/components/drivers/driver-card";
import DriverProfile from "@/components/drivers/driver-profile";
import { Users, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

function DriversContent() {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [filterTeam, setFilterTeam] = useState<string>("all");
  const [filterNationality, setFilterNationality] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"points" | "wins" | "podiums">("points");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Check URL for "?open=driver-id"
  useEffect(() => {
    const driverIdToOpen = searchParams.get("open");
    if (driverIdToOpen) {
      const exists = drivers.find(d => d.id === driverIdToOpen);
      if (exists) {
        setSelectedDriver(driverIdToOpen);
      }
    }
  }, [searchParams]);

  // --- UPDATED CLOSE HANDLER ---
  const handleCloseModal = () => {
    setSelectedDriver(null);

    // Check if there is a 'returnTo' param (e.g. returnTo=/teams)
    const returnTo = searchParams.get("returnTo");
    
    if (returnTo) {
      // If we came from teams, go back there
      router.push(returnTo);
    } else {
      // Otherwise just clear the URL params and stay on drivers page
      router.replace("/drivers", { scroll: false });
    }
  };

  // Get unique nationalities
  const nationalities = useMemo(() => {
    return Array.from(new Set(drivers.map((d) => d.nationality))).sort();
  }, []);

  // Filter and sort drivers
  const filteredDrivers = useMemo(() => {
    let result = [...drivers];

    if (filterTeam !== "all") {
      result = result.filter((d) => d.team === filterTeam);
    }

    if (filterNationality !== "all") {
      result = result.filter((d) => d.nationality === filterNationality);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "points": return b.points - a.points;
        case "wins": return (b.raceWins || 0) - (a.raceWins || 0);
        case "podiums": return b.podiums - a.podiums;
        default: return 0;
      }
    });

    return result;
  }, [filterTeam, filterNationality, sortBy]);

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl md:text-5xl font-bold">F1 Drivers 2025</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          All 20 drivers competing in the 2025 Formula 1 World Championship
        </p>
      </motion.div>

      {/* Filters & Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 p-6 rounded-lg border bg-card"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Team
            </label>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="w-full px-3 py-2 rounded-md border bg-background"
            >
              <option value="all">All Teams</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Nationality
            </label>
            <select
              value={filterNationality}
              onChange={(e) => setFilterNationality(e.target.value)}
              className="w-full px-3 py-2 rounded-md border bg-background"
            >
              <option value="all">All Nationalities</option>
              {nationalities.map((nat) => (
                <option key={nat} value={nat}>
                  {nat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-md border bg-background"
            >
              <option value="points">Points</option>
              <option value="wins">Race Wins</option>
              <option value="podiums">Podiums</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setFilterTeam("all");
                setFilterNationality("all");
                setSortBy("points");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filteredDrivers.length}</span> of{" "}
            <span className="font-bold text-foreground">{drivers.length}</span> drivers
          </p>
        </div>
      </motion.div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDrivers.map((driver, index) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <DriverCard driver={driver} onClick={() => setSelectedDriver(driver.id)} />
          </motion.div>
        ))}
      </div>

      {/* Driver Profile Modal */}
      {selectedDriver && (
        <DriverProfile
          driver={drivers.find((d) => d.id === selectedDriver)!}
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
}

export default function DriversPage() {
  return (
    <div className="container py-12">
      <Suspense fallback={<div>Loading drivers...</div>}>
        <DriversContent />
      </Suspense>
    </div>
  );
}