"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/homepage/hero-section";
import QuickStats from "@/components/homepage/quick-stats";
import FeaturedNews from "@/components/homepage/featured-news";
import UpcomingRace from "@/components/homepage/upcoming-race";
import RaceCountdown from "@/components/homepage/race-countdown";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RaceCountdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <QuickStats />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <UpcomingRace />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <FeaturedNews />
        </motion.div>
      </div>
    </div>
  );
}