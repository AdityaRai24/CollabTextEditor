"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

interface NavbarParams {
  roomId: Id<"rooms">;
  documentId: Id<"documents">;
}

const CollaborativeNavbar = ({ roomId, documentId }: NavbarParams) => {
  const [copied, setCopied] = useState(false);
  const [copiedP, setCopiedP] = useState(false);

  const room = useQuery(api.documents.getRoomById,{
      roomId : roomId
  })

  const roomPassword = "12345678";

  const onCopy = () => {
    navigator.clipboard.writeText(room?._id || "");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onCopyPassword = () => {
    navigator.clipboard.writeText(room?.roomPassword || "");
    setCopiedP(true);

    setTimeout(() => {
      setCopiedP(false);
    }, 1000);
  };

  return (
    <div className="p-5 flex items-center justify-start gap-5">
      <div className="flex items-center">
        Room Id : &ensp;
        <input
          className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
          value={room?._id}
          disabled
        />
        <Button
          onClick={onCopy}
          disabled={copied}
          className="h-8 rounded-l-none"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex items-center">
        Room Password : &ensp;
        <input
          className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
          value={room?.roomPassword}
          disabled
        />
        <Button
          onClick={onCopyPassword}
          disabled={copiedP}
          className="h-8 rounded-l-none"
        >
          {copiedP ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CollaborativeNavbar;
