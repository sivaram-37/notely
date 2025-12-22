"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type RichTextEditorProps = {
  value: string | undefined;
  onChange: (value: { html: string; text: string }) => void;
  placeholder?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your note here…",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ paragraph: { HTMLAttributes: { class: "pb-2" } } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange({
        html: editor.getHTML(),
        text: editor.getText(),
      });
    },
    editorProps: {
      attributes: {
        class:
          "ProseMirror h-[calc(100vh-270px)] overflow-y-auto text-base p-3 bg-transparent outline-none leading-relaxed",
        "data-placeholder": "Write your note here…",
      },
    },
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
