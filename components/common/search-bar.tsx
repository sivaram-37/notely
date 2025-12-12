"use client";

import { Search } from "lucide-react";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SearchBar = ({
  placeholder = "Search…",
  setSearchText,
}: {
  placeholder?: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  return (
    <div className="flex items-center">
      <motion.div
        initial={{ width: "40px" }}
        animate={{ width: open ? "300px" : "40px" }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="flex items-center bg-white rounded-full overflow-hidden border shadow-md">
        <motion.button
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "h-10 w-10 rounded-full cursor-pointer flex items-center justify-center border border-primary hover:bg-muted",
            open && "ml-[5px] bg-primary hover:bg-rose-600/90"
          )}
          initial={false}
          animate={{ x: open ? -5 : 0 }}>
          <Search className={cn("text-primary", open && "text-white")} />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.input
              ref={inputRef}
              key="search-input"
              type="text"
              placeholder={placeholder}
              className="bg-transparent outline-none p-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
