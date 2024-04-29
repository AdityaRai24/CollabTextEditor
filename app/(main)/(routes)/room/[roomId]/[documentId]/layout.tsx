import CollaborativeNavbar from "@/app/(main)/_components/CollaborativeNavbar";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";

interface NavbarParams {
    roomId: Id<"rooms">;
    documentId: Id<"documents">;
}


const layout = ({ children,params }: { children: React.ReactNode,params:NavbarParams }) => {
  console.log(params)
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <main className="flex-1 h-full overflow-y-auto">
        <CollaborativeNavbar roomId={params?.roomId} documentId={params?.documentId} />
        {children}
      </main>
    </div>
  );
};

export default layout;
