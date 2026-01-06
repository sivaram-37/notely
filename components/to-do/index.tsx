"use client";

import { useMemo, useState } from "react";
import PageHeader from "../common/page-header";
import { useTodosStore } from "@/stores/use-todo-store";
import EmptyTodo from "./empty-todo";
import NoSearchResults from "../common/no-search-results";
import TodoCard from "./todo-card";
import AddTodo from "./add-todo/add-todo";
import { LayoutGroup } from "framer-motion";

const ToDo = () => {
  const todos = useTodosStore((s) => s.todos);
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOnClearSearch = () => {
    setSearchText("");
    setSearchOpen(false);
  };

  const handleAddTodo = () => {
    setOpenModal(true);
  };

  const filteredTodos = useMemo(() => {
    if (!searchText?.trim()) return todos;
    const q = searchText?.toLowerCase();
    return todos?.filter((todo) => todo.content?.toLowerCase().includes(q));
  }, [searchText, todos]);

  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      if (a.isCompleted === b.isCompleted) return 0;
      return a.isCompleted ? 1 : -1; // completed → bottom
    });
  }, [filteredTodos]);

  return (
    <>
      <PageHeader
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchbarPlaceholder="Search Todo..."
        searchText={searchText}
        setSearchText={setSearchText}
        addBtnOnClick={handleAddTodo}
      />

      {todos.length === 0 ? (
        <EmptyTodo handleAddTodo={handleAddTodo} />
      ) : filteredTodos.length === 0 ? (
        <NoSearchResults
          title="todos"
          searchText={searchText}
          onClearSearch={handleOnClearSearch}
        />
      ) : (
        <LayoutGroup>
          <div className="p-4 mt-2 h-[calc(100vh-150px)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start overflow-y-auto overflow-x-hidden">
            {sortedTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} searchText={searchText} />
            ))}
          </div>
        </LayoutGroup>
      )}

      {/* Add Todo */}
      {openModal && <AddTodo openModal={openModal} setOpenModal={setOpenModal} isEdit={false} />}
    </>
  );
};

export default ToDo;
