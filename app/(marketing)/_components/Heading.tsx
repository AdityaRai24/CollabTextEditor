"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Heading = () => {

  const {isAuthenticated,isLoading} = useConvexAuth()

  return (
    <div className={cn("max-w-3xl space-y-4", font.className)}>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>

    {isLoading && (
      <div className="w-full flex items-center justify-center">
        <Spinner size={"lg"}/>
      </div>
    )}

    {isAuthenticated && !isLoading && (
      <Button asChild>
        <Link href="/documents">
          Enter Jotion
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    )}
    </div>
  );
};
