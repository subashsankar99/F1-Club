import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "F1 Racing 2025 | Formula 1 World Championship",
  description: "Experience the thrill of Formula 1 racing with live updates, team information, driver stats, and circuit details.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth"> 
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">F1 Racing</h3>
                <p className="text-sm text-muted-foreground">
                  Your ultimate destination for Formula 1 news, stats, and live updates.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {/* FIXED: Removed /F1-Club prefix because basePath handles it */}
                  <li><Link href="/teams" className="hover:text-foreground">Teams</Link></li>
                  <li><Link href="/drivers" className="hover:text-foreground">Drivers</Link></li>
                  <li><Link href="/circuits" className="hover:text-foreground">Circuits</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {/* FIXED: Removed /F1-Club prefix */}
                  <li>
                    <Link href="/#next-race-section" className="hover:text-foreground">
                      Schedule
                    </Link>
                  </li>
                  <li>
                    <Link href="/#countdown-section" className="hover:text-foreground">
                      Standings
                    </Link>
                  </li>
                  <li>
                    <Link href="/#latest-news-section" className="hover:text-foreground">
                      News
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Twitter</a></li>
                  <li><a href="#" className="hover:text-foreground">Instagram</a></li>
                  <li><a href="#" className="hover:text-foreground">YouTube</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; 2025 F1 Racing. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
