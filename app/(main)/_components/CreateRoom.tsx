"use client";

import { Doc } from "@/convex/_generated/dataModel";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RoomProps {
  document: Doc<"documents">;
}

const CreateRoom = ({ document }: RoomProps) => {

  const [creating, setCreating] = useState(false)

  const create = useMutation(api.documents.createRoom)

  const router = useRouter()

  const createRoom = async()=>{
    
      try {
        setCreating(true)
        const roomId = await create({documentId: document._id,password: "123456"})
        router.push(`/room/${roomId}/${document._id}`)
        toast.success("Room Created Successfully...")
        setCreating(false)
      } catch (error) {
        toast.success("Error while creating room...")
      }
  }

  return (
    <Dialog>
      <DialogTrigger>Create Room</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl tracking-normal">
            Creating room for file {document?.title}
          </DialogTitle>
          <div className="py-[20px]">
            <Input
              type="password"
              placeholder="Enter Room Password"
              className=""
            />
            <p className="text-xs mt-2">
              Create a password for the room. Users will be required to enter
              this in order to join the room.
            </p>
          </div>
          <Button onClick={()=>createRoom()} disabled={creating}>{creating ? "Creating Room...." : "Create Room"}</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
