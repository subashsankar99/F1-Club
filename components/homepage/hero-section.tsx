"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CalendarDays, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// --- DATA: Paths matched exactly to your Screenshot ---
const HIGHLIGHT_VIDEOS = [
  {
    id: "1",
    title: "F1 Highlights",
    src: "/videos/highlights/video1.mp4", // Matches public/videos/highlights/video1.mp4
  },
  {
    id: "2",
    title: "Overtakes",
    src: "/videos/highlights/video2.mp4",
  },
  {
    id: "3",
    title: "Best Moments",
    src: "/videos/highlights/video3.mp4",
  },
];

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(HIGHLIGHT_VIDEOS[0]);

  const scrollToSchedule = () => {
    const element = document.getElementById("next-race-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* --- BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 z-0">
        {/* 
           We use standard HTML video tag here. 
           muted + autoPlay is required for browsers to allow background video.
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 pointer-events-none"
        >
          {/* Path matches public/videos/f1-hero.mp4 */}
          <source src="/videos/f1-hero.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">
            2025 F1 SEASON
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the pinnacle of motorsport with cutting-edge technology,
            legendary drivers, and heart-stopping racing action.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            
            {/* --- WATCH HIGHLIGHTS (MODAL) --- */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Highlights
                </Button>
              </DialogTrigger>
              
              <DialogContent className="w-[95vw] h-[90vh] max-w-none bg-black/95 border-red-900 text-white flex flex-col p-0 gap-0">
                
                {/* Header */}
                <DialogHeader className="p-6 border-b border-white/10 bg-black">
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <Film className="text-red-600" /> 
                    Season Highlights
                  </DialogTitle>
                </DialogHeader>
                
                {/* Body */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  
                  {/* 1. VIDEO PLAYER AREA */}
                  <div className="flex-1 bg-black/50 flex items-center justify-center p-4 bg-[#050505]">
                    <div className="w-full h-full relative flex items-center justify-center rounded-lg overflow-hidden border border-white/10">
                      {/* 
                          IMPORTANT: key={currentVideo.id} tells React to destroy 
                          and recreate this video tag when the ID changes. 
                          This fixes the issue where the video wouldn't change.
                      */}
                      <video
                        key={currentVideo.id}
                        controls
                        autoPlay
                        className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
                      >
                        <source src={currentVideo.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  {/* 2. PLAYLIST SIDEBAR */}
                  <div className="w-full md:w-80 border-l border-white/10 bg-[#0a0a0a] p-4 flex flex-col gap-3 overflow-y-auto">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Up Next
                    </h3>
                    {HIGHLIGHT_VIDEOS.map((vid) => (
                      <Button
                        key={vid.id}
                        variant={currentVideo.id === vid.id ? "default" : "ghost"}
                        onClick={() => setCurrentVideo(vid)}
                        className={`h-auto py-3 px-4 justify-start text-left text-sm transition-all ${
                          currentVideo.id === vid.id 
                            ? "bg-red-600 text-white hover:bg-red-700" 
                            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="h-8 w-8 rounded-full bg-black/40 flex items-center justify-center flex-shrink-0">
                            <Play className="h-3 w-3 fill-current" />
                          </div>
                          <span className="truncate">{vid.title}</span>
                        </div>
                      </Button>
                    ))}
                  </div>

                </div>
              </DialogContent>
            </Dialog>

            {/* --- VIEW SCHEDULE BUTTON --- */}
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToSchedule}
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              View Schedule
            </Button>

          </div>
        </motion.div>

        <div className="absolute inset-0 f1-grid-pattern opacity-20 pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
