"use client";

import { Search } from "lucide-react";
import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SearchBar = ({
  open,
  setOpen,
  placeholder = "Search…",
  searchText,
  setSearchText,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  placeholder?: string;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(id);
    }
  }, [open]);

  // 🔥 Clear search when closed
  useEffect(() => {
    if (!open) {
      setSearchText("");
    }
  }, [open, setSearchText]);

  const handleBlur = () => {
    // Delay allows click on search button to register
    setTimeout(() => {
      if (!searchText.trim()) {
        setOpen(false);
      }
    }, 100);
  };

  return (
    <div className="flex items-center">
      <motion.div
        initial={{ width: "36px", height: "36px" }}
        animate={{ width: open ? "300px" : "36px", height: "36px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex items-center bg-white rounded-full overflow-hidden border shadow-md">
        <motion.button
          onClick={() => {
            if (open) setOpen(false);
            else setOpen(true);
          }}
          className={cn(
            "h-9 w-9 rounded-full cursor-pointer flex items-center justify-center hover:bg-muted",
            open && "ml-[5px] bg-primary hover:bg-rose-600/90"
          )}
          initial={false}
          animate={{ x: open ? -5 : 0 }}>
          <Search size={20} className={cn("text-primary", open && "text-white")} />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.input
              ref={inputRef}
              key="search-input"
              type="text"
              placeholder={placeholder}
              className="h-9 bg-transparent outline-none p-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onBlur={handleBlur}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
