import { PriorityLevel } from "@/stores/use-todo-store";
import { clsx, type ClassValue } from "clsx";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { AlertCircle, ArrowDown, Flame } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const getRandomCardColor = () => CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];

export const priorityConfig: Record<
  PriorityLevel,
  {
    label: string;
    icon: React.ElementType;
    badge: string;
    radio: string;
  }
> = {
  low: {
    label: "Low",
    icon: ArrowDown,
    badge: "bg-sky-100 text-sky-700 border-sky-300",
    radio: "bg-sky-50 text-sky-800 border-sky-400",
  },
  medium: {
    label: "Medium",
    icon: AlertCircle,
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    radio: "bg-amber-50 text-amber-900 border-amber-400",
  },
  high: {
    label: "High",
    icon: Flame,
    badge: "bg-rose-100 text-rose-800 border-rose-300",
    radio: "bg-rose-50 text-rose-900 border-rose-400",
  },
};

export const getDueBadge = (date: Date, isCompleted: boolean) => {
  if (isCompleted) return null;

  if (isToday(date)) {
    return {
      label: "Today",
      className: "bg-indigo-100 text-indigo-700 border border-indigo-300",
    };
  }

  if (isTomorrow(date)) {
    return {
      label: "Tomorrow",
      className: "bg-violet-100 text-violet-700 border border-violet-300",
    };
  }

  if (isPast(date)) {
    return {
      label: `Overdue • ${format(date, "dd MMM yy")}`,
      className: "bg-red-100 text-red-700 border border-red-300",
    };
  }

  return null;
};
