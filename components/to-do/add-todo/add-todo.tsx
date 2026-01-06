"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AddTodoFormType, addTodoSchema } from "./schema";
import { ListTodo } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, priorityConfig } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePicker from "@/components/common/date-picker";
import { PriorityLevel, TodoType, useTodosStore } from "@/stores/use-todo-store";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const formId = "add-todo";

const AddTodo = ({
  openModal,
  setOpenModal,
  isEdit,
  todoData,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  todoData?: TodoType;
}) => {
  const toastShownRef = useRef(false);
  const addTodo = useTodosStore((s) => s.addTodo);
  const updateTodo = useTodosStore((s) => s.updateTodo);

  const handleOnClose = () => {
    setOpenModal(false);
    toast.dismiss();
    form.reset();
    form.clearErrors();
  };

  const form = useForm<AddTodoFormType>({
    resolver: zodResolver(addTodoSchema),
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      id: "",
      content: "",
      dueDate: undefined,
      isCompleted: false,
      priority: "low",
    },
  });

  const handleOnSave = async (formData: AddTodoFormType) => {
    if (isEdit && todoData) {
      const payload = {
        ...todoData,
        ...formData,
      };

      updateTodo(payload);
    } else {
      const payload = {
        ...formData,
        id: uuidv4(),
      };

      addTodo(payload);
    }

    handleOnClose();
  };

  useEffect(() => {
    if (isEdit && todoData) {
      form.reset({
        ...todoData,
        dueDate: todoData.dueDate ? new Date(todoData.dueDate) : undefined,
      });
    }
  }, [form, isEdit, todoData]);

  useEffect(() => {
    const message = form.formState.errors.content?.message;

    // Error appeared → show toast (once)
    if (message && !toastShownRef.current) {
      toast.error(message, { duration: Infinity });
      toastShownRef.current = true;
      return;
    }

    // Error fixed → dismiss toast
    if (!message && toastShownRef.current) {
      toast.dismiss();
      toastShownRef.current = false;
    }
  }, [form.formState.errors.content?.message]);

  return (
    <AlertDialog open={openModal}>
      <AlertDialogContent className={cn("p-0 border border-primary")}>
        <AlertDialogHeader className="p-2 bg-primary text-white rounded-t-md">
          {/* Modal Title */}
          <AlertDialogTitle className="flex items-center gap-2">
            <ListTodo />
            {isEdit ? "Edit" : " Add New"} Todo
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Modal Body */}
        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(handleOnSave)} className="px-3 space-y-3">
            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={cn(
                        "border-b border-muted-foreground/40",
                        form.formState.errors.content && "border-red-500"
                      )}>
                      <Input
                        placeholder="Type your todo here..."
                        className={cn(
                          " px-0 h-9 w-full bg-transparent text-[16px]! font-semibold outline-none placeholder:text-muted-foreground border-none rounded-none shadow-none",
                          form.formState.errors.content && "text-red-600 placeholder:text-red-400"
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="pt-2 flex items-center gap-4">
                  <FormLabel className="min-w-15">Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-3">
                      {(Object.keys(priorityConfig) as PriorityLevel[]).map((level) => {
                        const Icon = priorityConfig[level].icon;

                        return (
                          <label
                            key={level}
                            className={cn(
                              "text-sm font-semibold flex items-center gap-1 rounded-full px-2.5 py-0.5 border cursor-pointer transition",
                              priorityConfig[level].radio,
                              field.value === level && "ring-2 ring-primary ring-offset-2"
                            )}>
                            <RadioGroupItem value={level} className="hidden" />
                            <Icon size={14} />
                            {priorityConfig[level].label}
                          </label>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="pt-2 flex items-center gap-4">
                  <FormLabel className="min-w-15">Due Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Modal Footer */}
        <AlertDialogFooter className="p-1.5 border-t">
          <AlertDialogCancel className="hover:bg-gray-200" onClick={handleOnClose}>
            Close
          </AlertDialogCancel>
          <AlertDialogAction type="submit" form={formId}>
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTodo;
