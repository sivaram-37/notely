"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Plugin } from "prosemirror-state";
import { Extension } from "@tiptap/core";

const EmptyPlaceholderFix = Extension.create({
  name: "emptyPlaceholderFix",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        view: (view) => ({
          update: () => {
            const html = view.dom.innerHTML
              .replace(/<p><br><\/p>/g, "")
              .replace(/<p><\/p>/g, "")
              .trim();

            if (!html) {
              view.dom.classList.add("is-editor-empty");
            } else {
              view.dom.classList.remove("is-editor-empty");
            }
          },
        }),
      }),
    ];
  },
});

type RichTextEditorProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your note here…",
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ paragraph: { HTMLAttributes: { class: "pb-2" } } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    immediatelyRender: false,

    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "ProseMirror h-[calc(100vh-248px)] overflow-y-auto text-sm p-3 border rounded-lg bg-background",
        "data-placeholder": "Write your note here…",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
}
