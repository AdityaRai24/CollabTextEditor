import { Home } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const JoinRoom = () => {
  const initialValues = {
    roomId: "",
    roomPassword: "",
  };
  const [inputs, setInputs] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const roomCheck = useAction(api.documents.roomJoinCheck);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      const checkdata = await roomCheck({
        roomId: inputs.roomId as Id<"rooms">,
        roomPassword: inputs.roomPassword,
      });
      if (checkdata?.error) {
        toast.error(checkdata?.msg);
      } else {
        router.push(
          `/room/${checkdata?.finalRoom?._id}/${checkdata?.finalRoom?.documentId}`
        );
        toast.success(checkdata?.msg);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="min-w-full flex cursor-pointer items-center gap pl-4 gap-2  hover:bg-neutral-300 dark:hover:bg-neutral-700/50">
            <Home className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-muted-foreground">Join a room</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5">Join a Room.</DialogTitle>
            <DialogDescription>
              <div>
                <Label className="text-xs">Enter Room Id </Label>
                <Input
                  type="text"
                  name="roomId"
                  value={inputs.roomId}
                  onChange={(e) => handleChange(e)}
                  className="mt-1"
                  placeholder="Room Id"
                />
              </div>
              <div className="mt-2">
                <Label className="text-xs">Enter Room Password </Label>
                <Input
                  type="password"
                  name="roomPassword"
                  value={inputs.roomPassword}
                  onChange={(e) => handleChange(e)}
                  className="mt-1"
                  placeholder="Room Password"
                />
              </div>
              <Button className="mt-5 min-w-full" onClick={handleSubmit}>
                {" "}
                Join Room
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JoinRoom;
