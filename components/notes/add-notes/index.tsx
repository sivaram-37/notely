"use client";

import { Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AddNoteFormType, addNoteSchema } from "./schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CARD_COLORS, cn, getRandomCardColor } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "@/components/common/rich-text-editor";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { Note, useNotesStore } from "@/stores/use-notes-store";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import BackButton from "@/components/common/back-button";
import SaveButton from "@/components/common/save-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getNow = () => new Date().toISOString();

const AddNote = ({ isEdit, noteData }: { isEdit: boolean; noteData?: Note }) => {
  const titleToastShownRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [cardColor, setCardColor] = useState<string>("bg-red-300");
  const [isLoading, setLoading] = useState<boolean>(false);
  const addNote = useNotesStore((s) => s.addNote);
  const updateNote = useNotesStore((s) => s.updateNote);

  const formId = "add-note";
  const form = useForm<AddNoteFormType>({
    resolver: zodResolver(addNoteSchema),
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      id: "",
      title: "",
      contentHtml: "",
      contentText: "",
      modifiedOn: "",
      cardColor: "",
    },
  });

  const handleOnSave = async (formData: AddNoteFormType) => {
    setLoading(true);

    const now = getNow();

    if (isEdit && noteData) {
      const payload: Note = {
        ...noteData,
        ...formData,
        modifiedOn: now,
        contentHtml: formData.contentHtml ?? "",
        contentText: formData.contentText ?? "",
      };

      updateNote(payload);
    } else {
      const payload: Note = {
        ...formData,
        id: uuidv4(),
        modifiedOn: now,
        contentHtml: formData.contentHtml ?? "",
        contentText: formData.contentText ?? "",
      };

      addNote(payload);
    }

    await new Promise((res) => setTimeout(res, 300));
    redirect("/notes");
  };

  useEffect(() => {
    if (isEdit && noteData) {
      form.reset(noteData);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCardColor(noteData.cardColor);
    } else {
      const random = getRandomCardColor();
      setCardColor(random);
      form.setValue("cardColor", random);
    }
    setMounted(true);
  }, [form, isEdit, noteData]);

  // for showing toast message for error
  useEffect(() => {
    const message = form.formState.errors.title?.message;

    // Error appeared → show toast (once)
    if (message && !titleToastShownRef.current) {
      toast.error(message, { duration: Infinity });
      titleToastShownRef.current = true;
      return;
    }

    // Error fixed → dismiss toast
    if (!message && titleToastShownRef.current) {
      toast.dismiss();
      titleToastShownRef.current = false;
    }
  }, [form.formState.errors.title?.message]);

  if (!mounted || isLoading) return <Loading />;

  return (
    <>
      <h1 className="text-xl font-semibold text-center">{isEdit ? "Edit Note" : "Add Note"}</h1>
      <div className="mt-2 mb-4 flex items-center justify-between">
        <BackButton href="/notes" label="Back to notes" />
        <div className="flex gap-1">
          {isEdit && noteData && (
            <Button asChild variant={"outline"}>
              <Link href={`/notes/${noteData.id}`}>Back to view note</Link>
            </Button>
          )}
          <SaveButton formId={formId} />
        </div>
      </div>

      <Form {...form}>
        <form
          id={formId}
          onSubmit={form.handleSubmit(handleOnSave)}
          className={cn("rounded-xl border border-border shadow-sm transition-colors", cardColor)}>
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    placeholder="Title"
                    className="h-12 w-full bg-transparent text-2xl! font-semibold outline-none placeholder:text-muted-foreground border-none rounded-none shadow-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="contentHtml"
            render={() => (
              <FormItem>
                <FormControl>
                  <RichTextEditor
                    value={form.getValues("contentHtml")}
                    onChange={({ html, text }) => {
                      form.setValue("contentHtml", html);
                      form.setValue("contentText", text);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Bottom toolbar */}
      <div className="mt-2.5 flex items-center justify-between">
        {/* Color picker */}
        <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg">
          <Palette className="text-black" size={18} />

          {CARD_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCardColor(c);
                form.setValue("cardColor", c);
              }}
              className={cn(
                "w-6 h-6 rounded-full border transition cursor-pointer",
                cardColor === c && "ring-2 ring-primary ring-offset-2",
                c
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AddNote;
