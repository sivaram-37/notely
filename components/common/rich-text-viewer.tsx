"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type RichTextViewerProps = {
  value: string;
};

export default function RichTextViewer({ value }: RichTextViewerProps) {
  const editor = useEditor({
    extensions: [StarterKit.configure({ paragraph: { HTMLAttributes: { class: "pb-2" } } })],
    content: value,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "ProseMirror text-base leading-relaxed bg-transparent outline-none select-text text-base",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex-1 overflow-y-auto px-3 pb-2 mt-2">
      <EditorContent editor={editor} />
    </div>
  );
}
