import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const Heroes = () => {
  return (
    <div className={cn("flex flex-col items-center justify-center max-w-5xl",font.className)}>
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            fill
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <Image
            src="/documents-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Documents"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/reading.png"
            fill
            className="object-contain dark:hidden"
            alt="Reading"
          />
          <Image
            src="/reading-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  )
}