import { cn, getDueBadge, priorityConfig } from "@/lib/utils";
import { TodoType, useTodosStore } from "@/stores/use-todo-store";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { tinyConfetti } from "@/lib/confetti";
import HighlightText from "../common/highlight-text";
import AddTodo from "./add-todo/add-todo";
import { toast } from "sonner";

interface TodoCardProps {
  todo: TodoType;
  searchText: string;
}

const TodoCard = ({ todo, searchText }: TodoCardProps) => {
  const prevCompleted = useRef(todo.isCompleted);
  const updateTodo = useTodosStore((s) => s.updateTodo);
  const deleteTodo = useTodosStore((s) => s.deleteTodo);
  const priority = priorityConfig[todo.priority];
  const PriorityIcon = priority.icon;
  const dueBadge = todo.dueDate && getDueBadge(new Date(todo.dueDate), todo.isCompleted);

  useEffect(() => {
    // fire ONLY when unchecked → checked
    if (!prevCompleted.current && todo.isCompleted) {
      tinyConfetti();
    }
    prevCompleted.current = todo.isCompleted;
  }, [todo.isCompleted]);

  // Edit todo modal
  const [openModal, setOpenModal] = useState(false);
  const handleEditTodo = () => {
    setOpenModal(true);
  };

  // Delete todo
  const handleDeleteTodo = () => {
    toast("Delete this todo?", {
      description: "You won’t be able to recover it later.",
      duration: Infinity,
      action: {
        label: "Delete",
        onClick: () => {
          deleteTodo(todo.id);
          toast.success("Todo deleted", { duration: 1000 });
        },
      },
      actionButtonStyle: { backgroundColor: "rgb(239 68 68)" },
      cancel: { label: "Cancel", onClick: () => toast.dismiss() },
      cancelButtonStyle: { border: "1px solid #333" },
    });
  };

  return (
    <>
      <motion.div
        layout
        initial={false}
        animate={{ scale: todo.isCompleted ? 0.98 : 1, opacity: todo.isCompleted ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "group relative p-4 h-30 rounded-xl border bg-white shadow-sm",
          "flex flex-col justify-between",
          "hover:shadow-md hover:border-primary hover:shadow-primary",
          todo.isCompleted && "bg-green-50"
        )}>
        {/* Hover Actions */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute -top-4 right-1.5 z-10",
            "opacity-0 group-hover:opacity-100",
            "translate-y-1 group-hover:translate-y-0",
            "transition-all duration-200"
          )}>
          <div className="relative flex items-center gap-1 rounded-full px-1.5 py-1 shadow-sm bg-white border">
            {!todo.isCompleted && (
              <button
                className="p-1.5 rounded-full hover:bg-muted transition cursor-pointer"
                onClick={handleEditTodo}>
                <Pencil size={14} />
              </button>
            )}

            <button
              className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition cursor-pointer"
              onClick={handleDeleteTodo}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={todo.isCompleted}
            onCheckedChange={() => {
              updateTodo({ ...todo, isCompleted: !todo.isCompleted });
            }}
            className="mt-0.5 cursor-pointer"
          />

          {/* Text */}
          <p
            className={cn(
              "relative text-sm font-medium leading-snug",
              todo.isCompleted && "text-muted-foreground"
            )}>
            <span
              className={cn(
                "relative",
                todo.isCompleted &&
                  "after:absolute after:left-0 after:right-0 after:top-[60%] after:h-0.5 after:bg-primary"
              )}>
              <HighlightText text={todo.content} query={searchText} />
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between text-xs">
          {/* Priority */}
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border shadow-sm",
              priority.badge
            )}>
            <PriorityIcon size={12} />
            {priority.label}
          </span>

          {/* Due date */}
          <div className="flex flex-col items-end">
            {dueBadge ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-medium border shadow-sm",
                  dueBadge.className
                )}>
                {dueBadge.label}
              </span>
            ) : (
              todo.dueDate && (
                <span className="text-muted-foreground">
                  Due on {format(new Date(todo.dueDate), "dd MMM yy")}
                </span>
              )
            )}
            {todo.isCompleted && (
              <span className="text-emerald-800">
                Completed on {format(new Date(), "dd MMM yy")}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Edit Todo */}
      {openModal && (
        <AddTodo openModal={openModal} setOpenModal={setOpenModal} isEdit={true} todoData={todo} />
      )}
    </>
  );
};

export default TodoCard;
