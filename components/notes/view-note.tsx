import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import RichTextViewer from "../common/rich-text-viewer";
import { Note } from "@/stores/use-notes-store";
import EditButton from "../common/edit-button";
import BackButton from "../common/back-button";

const ViewNote = ({ noteData }: { noteData: Note }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mt-2 mb-4 flex items-center justify-between">
        <BackButton href="/notes" label="Back to notes" />
        <EditButton href={`/notes/${noteData.id}?edit=true`} />
      </div>

      <div className={cn("flex-1 flex flex-col rounded-md border shadow-sm", noteData.cardColor)}>
        {/* Title */}
        <h1 className="px-3 pt-3 text-2xl font-semibold leading-tight wrap-break-word">
          {noteData.title}
        </h1>

        {/* Content */}
        {!!noteData.contentText ? (
          <RichTextViewer value={noteData.contentHtml} />
        ) : (
          <div className="flex-1 px-3 pb-2 mt-2 flex justify-center items-center">
            <div className="bg-white w-80 p-2 rounded-md flex flex-col gap-2 items-center">
              <h2 className="text-primary flex gap-2">
                <AlertCircle />
                Empty Note!
              </h2>
              <span>Click Edit to edit the note</span>
              <EditButton href={`/notes/${noteData.id}?edit=true`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNote;
