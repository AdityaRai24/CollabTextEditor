"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
  onEditorChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onEditorChange, initialContent, editable }: EditorProps) => {

  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async(file:File)=>{
    const response = await edgestore.publicFiles.upload({file})

    return response.url
  }

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
      uploadFile:handleUpload
  });

  return (
    <BlockNoteView
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
      onChange={()=>onEditorChange(JSON.stringify(editor.document,null,2))}
      editor={editor}
    />
  );
};  

export default Editor;