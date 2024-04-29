import { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "../liveblocks.config";
import { useUser } from "@clerk/clerk-react";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

type EditorProps = {
  onEditorChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  doc: Y.Doc;
  provider: any;
};

interface MainEditorProps {
  onEditorChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({
  onEditorChange,
  initialContent,
  editable,
}: MainEditorProps) => {
  
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <BlockNote
      onEditorChange={onEditorChange}
      initialContent={initialContent}
      editable={editable}
      doc={doc}
      provider={provider}
    />
  );
};

function generateRandomColor() {
  const colors = [
    "#ff0000", // red
    "#00ff00", // green
    "#0000ff", // blue
    "#ffff00", // yellow
    "#ff00ff", // magenta
    "#00ffff", // cyan
    "#ff8000", // orange
    "#8000ff", // purple
    "#0080ff", // light blue
    "#ff0080", // pink
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function BlockNote({
  onEditorChange,
  initialContent,
  editable,
  doc,
  provider,
}: EditorProps) {
  const clerkUser = useUser();
  const userColor = generateRandomColor();
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });

    return response.url;
  };
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: clerkUser?.user?.fullName,
        color: userColor,
      },
    },
  });

  return (
    <BlockNoteView
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
      onChange={() => onEditorChange(JSON.stringify(editor.document, null, 2))}
      editor={editor}
    />
  );
}

export default Editor;
