import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import React from "react";
import "@blocknote/react/style.css";

interface MainEditorProps {
  onEditorChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const PreviewEditor = ({
  onEditorChange,
  initialContent,
  editable,
}: MainEditorProps) => {

    const { resolvedTheme } = useTheme();

    console.log(initialContent)

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
      onChange={() => onEditorChange(JSON.stringify(editor.document, null, 2))}
      editor={editor}
    />
  );
};

export default PreviewEditor;
