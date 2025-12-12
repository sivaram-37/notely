import { Notebook } from "lucide-react";
import { Button } from "../ui/button";

const EmptyNote = ({ handleAddNote }: { handleAddNote: () => void }) => {
  return (
    <div className="h-[calc(100vh-158px)] flex flex-col items-center justify-center">
      <div className="text-6xl">📝</div>
      <h3 className="mt-4 text-xl font-medium">No notes yet</h3>
      <p className="text-muted-foreground mt-1">Create your first note to get started.</p>
      <Button className="mt-2" onClick={handleAddNote}>
        Add Note <Notebook />
      </Button>
    </div>
  );
};

export default EmptyNote;
