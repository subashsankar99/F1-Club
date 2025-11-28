"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Trophy } from "lucide-react";
import { circuits } from "@/lib/data/circuits"; 

const RaceCountdown = () => {
  const nextRaceData = circuits.find((circuit) => circuit.status === "upcoming");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isSeasonOver, setIsSeasonOver] = useState(false);

  useEffect(() => {
    if (!nextRaceData) {
      setIsSeasonOver(true);
      return;
    }

    const raceDateIso = `${nextRaceData.raceDate}T17:00:00`; 
    const targetDate = new Date(raceDateIso);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRaceData]);

  if (isSeasonOver) {
    return (
      // ✅ ID added here too, so the link works even if season is over
      <div id="countdown-section" className="w-full mb-8">
        <Card className="border-yellow-600/50 bg-gradient-to-br from-yellow-950/20 to-background">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-500">
                <Trophy className="h-5 w-5" />
                Season Completed
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text-center text-2xl font-bold text-muted-foreground">
                See you in 2026!
            </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    // ✅ ID matches the Footer "Standings" link
    <div id="countdown-section" className="w-full pt-4 pb-8">
      <Card className="border-red-600/50 bg-gradient-to-br from-red-950/20 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-600" />
            Next Race: {nextRaceData ? nextRaceData.name : "Loading..."}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-red-600 tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm text-muted-foreground uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaceCountdown;
