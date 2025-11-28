"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Trophy, Cpu, Mic } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image"; 

// --- IMPORTS (Make sure these file names match exactly what is in your folder) ---
import img1 from "./max verstappen.jpg";
import img2 from "./Ferrari.jpg"; 
import img3 from "./Lewis Hamilton.jpg"; 

const FeaturedNews = () => {
  const news = [
    {
      id: 1,
      title: "Verstappen Dominates Australian GP",
      excerpt: "Red Bull Racing's Max Verstappen claims his third consecutive victory of the season in a commanding performance at Albert Park.",
      date: "March 16, 2025",
      category: "Race Report",
      categoryIcon: <Trophy className="w-3 h-3 mr-1" />,
      image: img1, 
    },
    {
      id: 2,
      title: "Ferrari Unveils Major Upgrades for Japan",
      excerpt: "Scuderia Ferrari brings significant aerodynamic improvements to Suzuka, targeting better cornering speeds in sector one.",
      date: "March 15, 2025",
      category: "Tech News",
      categoryIcon: <Cpu className="w-3 h-3 mr-1" />,
      image: img2,
    },
    {
      id: 3,
      title: "Hamilton Reflects on Mercedes Progress",
      excerpt: "Seven-time champion discusses the team's development trajectory for 2025 and his optimism for the upcoming European leg.",
      date: "March 14, 2025",
      category: "Interview",
      categoryIcon: <Mic className="w-3 h-3 mr-1" />,
      image: img3,
    },
  ];

  return (
    // --- ID ADDED HERE TO FIX NAVIGATION ---
    <section id="latest-news-section" className="w-full py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
        <button className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          View All 
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-muted/60 bg-card">
              
              <div className="relative w-full aspect-video overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="flex items-center px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-sm">
                    {item.categoryIcon}
                    {item.category}
                  </span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6 flex flex-col">
                <div className="flex items-center text-xs text-muted-foreground mb-3 gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {item.excerpt}
                </p>

                <div className="flex items-center text-sm font-medium text-red-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-auto pt-2">
                  Read Article <ArrowRight className="ml-2 h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedNews;
