"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AddNoteFormType, addNoteSchema } from "./schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "@/components/common/rich-text-editor";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { useNotesStore } from "@/stores/use-notes-store";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const CARD_COLORS = [
  "bg-red-300",
  "bg-orange-300",
  "bg-amber-300",
  "bg-yellow-300",
  "bg-lime-300",
  "bg-green-300",
  "bg-emerald-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-sky-300",
  "bg-blue-300",
  "bg-indigo-300",
  "bg-violet-300",
  "bg-purple-300",
  "bg-fuchsia-300",
  "bg-slate-300",
];

const getRandomCardColor = () => CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];

const getNow = () => new Date().toISOString();

const AddNotePage = () => {
  const titleToastShownRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [cardColor, setCardColor] = useState<string>("bg-red-300");
  const [isLoading, setLoading] = useState<boolean>(false);
  const addNote = useNotesStore((s) => s.addNote);

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

    const date = getNow();

    const payload: AddNoteFormType = {
      ...formData,
      id: uuidv4(),
      modifiedOn: date,
    };

    addNote(payload);
    console.log("payload", payload);
    await new Promise((res) => setTimeout(res, 300));
    redirect("/notes");
  };

  useEffect(() => {
    const random = getRandomCardColor();
    setCardColor(random);
    form.setValue("cardColor", random);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="mt-2 mb-4 flex items-center justify-between">
        <Link
          href={"/notes"}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <Button
          className="inline-flex items-center gap-2 px-4 py-2 active:scale-[0.98] transition-all"
          form={formId}>
          <Save />
          Save
        </Button>
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
                    className="h-14 w-full bg-transparent text-2xl! font-semibold outline-none placeholder:text-muted-foreground border-none rounded-none shadow-none"
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

export default AddNotePage;
