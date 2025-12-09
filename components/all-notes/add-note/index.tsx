"use client";

import CardWrapper from "@/components/common/cardWrapper";
import { AddNoteForm, addNoteSchema } from "./add-note-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { Save } from "lucide-react";
import { useNotesStore } from "@/stores/useNotesStore";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { useState } from "react";
import { NotelyLoader } from "@/components/common/notely-loader";

const AddNote = () => {
  const [loading, setLoading] = useState(false);
  const addNote = useNotesStore((s) => s.addNote);

  const formId = "save-note";
  const form = useForm<AddNoteForm>({
    resolver: zodResolver(addNoteSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      id: "",
      createdOnDate: "",
      lastModifiedOnDate: "",
    },
  });

  const onSubmit = async (data: AddNoteForm) => {
    setLoading(true);

    const now = format(new Date(), "dd/MM/yyyy");

    const note = {
      ...data,
      id: data.id || uuid(),
      createdOnDate: data.createdOnDate || now,
      lastModifiedOnDate: now,
    };

    addNote(note);

    // Give spinner a moment to show
    await new Promise((res) => setTimeout(res, 300));

    redirect("/notes");
  };

  return (
    <CardWrapper
      outerClassName="mt-3 w-full border border-primary"
      className="bg-secondary"
      title="Add Note"
      customBtn={
        <Button
          size="icon-sm"
          form={formId}
          type="submit"
          disabled={loading}
          className="flex items-center justify-center">
          <Save />
        </Button>
      }>
      {loading ? (
        <div className="h-[calc(100vh-150px)] flex justify-center items-center">
          <NotelyLoader />
        </div>
      ) : (
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Input
                    {...field}
                    placeholder="Write your title here..."
                    className="bg-background"
                    required
                  />
                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <RichTextEditor value={field.value} onChange={field.onChange} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      )}
    </CardWrapper>
  );
};

export default AddNote;
