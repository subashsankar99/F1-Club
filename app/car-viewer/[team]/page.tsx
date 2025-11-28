import { Suspense } from "react";
import { teams } from "@/lib/data/teams";
import { notFound } from "next/navigation";
import CarViewer3D from "@/components/car-viewer/car-viewer-3d";
import CarSpecs from "@/components/car-viewer/car-specs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 1. REQUIRED: This function tells Next.js which paths to build statically
export async function generateStaticParams() {
  return teams.map((team) => ({
    team: team.id,
  }));
}

// 2. Note: "use client" was removed from the top so this runs as a Server Component
export default function CarViewerPage({ params }: { params: { team: string } }) {
  const team = teams.find((t) => t.id === params.team);

  if (!team) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-6">
          <Link href="/teams">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Teams
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{team.chassis}</h1>
            <p className="text-xl text-muted-foreground">{team.fullName}</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Viewer - 2 columns */}
          <div className="lg:col-span-2">
            <Suspense fallback={<CarViewerSkeleton />}>
              <CarViewer3D team={team} />
            </Suspense>
          </div>

          {/* Specifications - 1 column */}
          <div className="lg:col-span-1">
            <CarSpecs team={team} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CarViewerSkeleton() {
  return (
    <div className="w-full h-[600px] rounded-lg bg-muted animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading 3D model...</p>
    </div>
  );
}