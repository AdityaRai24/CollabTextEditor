"use client";

import { Cover } from "@/components/Cover";
import Editor from "@/components/editor";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
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

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="w-full mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4 ">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="w-full ">
        <Toolbar initialData={document} />
        <RoomProvider id={document._id} initialPresence={{}}>
          <ClientSideSuspense fallback="Loading…">
            {() => (
              <Editor
                onEditorChange={onEditorChange}
                initialContent={document.content}
              />
            )}
          </ClientSideSuspense>
        </RoomProvider>
      </div>
    </div>
  );
};

export default DocumentIdPage;
