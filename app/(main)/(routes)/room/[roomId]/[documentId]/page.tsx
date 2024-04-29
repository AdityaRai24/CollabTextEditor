"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import CollaborativeEditor from "@/components/editor";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Cover } from "@/components/Cover";
import Toolbar from "@/components/toolbar";
import CollaborativeNavbar from "@/app/(main)/_components/CollaborativeNavbar";

interface RoomPageProps {
  params: {
    roomId: Id<"rooms">;
    documentId: Id<"documents">;
  };
}

const page = ({ params }: RoomPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onEditorChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document === null) {
    return <div>not found</div>;
  }

  const { user } = useUser();

  return (
    <>
      <RoomProvider id={params.roomId} initialPresence={{}}>
        <ClientSideSuspense fallback="Loading…">
          {() => (
            <>
              <Cover url={document?.coverImage} />
              <div className="w-full">
                <Toolbar initialData={document} />
                <CollaborativeEditor
                  onEditorChange={onEditorChange}
                  initialContent={document?.content}
                  username={user?.fullName || "User"}
                />
              </div>
            </>
          )}
        </ClientSideSuspense>
      </RoomProvider>

      {}
    </>
  );
};

export default page;
