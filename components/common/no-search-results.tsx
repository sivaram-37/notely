"use client";

import { Button } from "@/components/ui/button";

type NoSearchResultsProps = {
  title: "notes" | "todos";
  searchText: string;
  onClearSearch: () => void;
};

const NoSearchResults = ({ title, searchText, onClearSearch }: NoSearchResultsProps) => {
  return (
    <div className="h-[calc(100vh-158px)] flex flex-col items-center justify-center text-center">
      <div className="text-6xl mb-2">🔍</div>

      <h3 className="text-xl font-medium">No matching {title}</h3>

      <p className="mt-1 text-muted-foreground max-w-sm">
        We couldn’t find any {title} matching{" "}
        <span className="font-medium text-foreground">“{searchText}”</span>
      </p>

      <Button variant="outline" className="mt-3" onClick={onClearSearch}>
        Clear search
      </Button>
    </div>
  );
};

export default NoSearchResults;
