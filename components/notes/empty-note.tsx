import { NotepadText, Plus } from "lucide-react";
import { Button } from "../ui/button";

const EmptyNote = ({ handleAddNote }: { handleAddNote: () => void }) => {
  return (
    <div className="h-[calc(100vh-158px)] flex flex-col items-center justify-center">
      <NotepadText className="w-16 h-16 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-medium">No notes yet</h3>
      <p className="text-muted-foreground mt-1">Create your first note to get started.</p>
      <Button className="mt-2" onClick={handleAddNote}>
        <Plus /> Add Note <NotepadText />
      </Button>
    </div>
  );
};

export default EmptyNote;
