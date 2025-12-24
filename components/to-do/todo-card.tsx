import { cn, getDueBadge, priorityConfig } from "@/lib/utils";
import { TodoType, useTodosStore } from "@/stores/use-todo-store";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { tinyConfetti } from "@/lib/confetti";
import HighlightText from "../common/highlight-text";

interface TodoCardProps {
  todo: TodoType;
  searchText: string;
}

const TodoCard = ({ todo, searchText }: TodoCardProps) => {
  const prevCompleted = useRef(todo.isCompleted);
  const updateTodo = useTodosStore((s) => s.updateTodo);
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

  return (
    <motion.div
      layout
      initial={false}
      animate={{ scale: todo.isCompleted ? 0.98 : 1, opacity: todo.isCompleted ? 0.7 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative p-4 h-30 rounded-xl border bg-white shadow-sm",
        "flex flex-col justify-between",
        "hover:shadow-md hover:border-primary hover:shadow-primary",
        todo.isCompleted && "bg-green-100"
      )}>
      {/* Hover Actions */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        {!todo.isCompleted && (
          <button className="p-1.5 rounded-md bg-muted cursor-pointer hover:bg-muted/80">
            <Pencil size={14} />
          </button>
        )}

        <button className="p-1.5 rounded-md bg-muted cursor-pointer hover:bg-red-100 text-red-600">
          <Trash2 size={14} />
        </button>
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
            "text-sm font-medium leading-snug",
            todo.isCompleted && "line-through text-muted-foreground"
          )}>
          <HighlightText text={todo.content} query={searchText} />
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
            <span className="text-emerald-800">Completed on {format(new Date(), "dd MMM yy")}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TodoCard;
