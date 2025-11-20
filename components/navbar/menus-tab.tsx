"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "All", href: "/" },
  { label: "Notes", href: "/notes" },
  { label: "To-do", href: "/to-do" },
  { label: "Meetings", href: "/meetings" },
];

const MenuTab = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring",
                "text-foreground dark:text-muted-foreground",
                isActive &&
                  "bg-background text-primary border-primary dark:text-foreground dark:border-input dark:bg-input/30"
              )}>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MenuTab;
