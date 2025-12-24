import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PriorityLevel = "low" | "medium" | "high";
export type TodoType = {
  id: string;
  content: string;
  isCompleted: boolean;
  priority: PriorityLevel;
  dueDate?: Date;
};

type TodosStore = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  getTodoById: (id: string) => TodoType | undefined;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
};

export const useTodosStore = create<TodosStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),

      getTodoById: (id) => {
        return get().todos.find((n) => n.id === id);
      },

      updateTodo: (updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((n) => (n.id === updatedTodo.id ? updatedTodo : n)),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((n) => n.id !== id),
        })),
    }),
    {
      name: "notely-todo-storage",
    }
  )
);
