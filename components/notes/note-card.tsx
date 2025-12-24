import useTimeAgo from "@/hooks/use-time-ago";
import { cn } from "@/lib/utils";
import { Note } from "@/stores/use-notes-store";
import { Pencil, Trash2 } from "lucide-react";
import HighlightText from "../common/highlight-text";

const NoteCard = ({
  note,
  searchText,
  handleCardClick,
  handleEditNote,
  handleDeleteNote,
}: {
  note: Note;
  searchText: string;
  handleCardClick: () => void;
  handleEditNote: () => void;
  handleDeleteNote: () => void;
}) => {
  const timeAgo = useTimeAgo(note.modifiedOn);

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "group relative p-4 h-36 rounded-xl border shadow-sm cursor-pointer",
        "transition-all hover:shadow-md hover:border-primary hover:shadow-primary",
        note.cardColor
      )}>
      {/* Floating action pill */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute -top-4 right-1.5 z-10",
          "opacity-0 group-hover:opacity-100",
          "translate-y-1 group-hover:translate-y-0",
          "transition-all duration-200"
        )}>
        <div className="relative flex items-center gap-1 rounded-full px-1.5 py-1 shadow-sm bg-white border">
          <button
            onClick={handleEditNote}
            className="p-1.5 rounded-full hover:bg-muted transition cursor-pointer">
            <Pencil size={14} />
          </button>

          <button
            onClick={handleDeleteNote}
            className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition cursor-pointer">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-1 text-primary font-semibold line-clamp-1">
        <HighlightText text={note.title} query={searchText} />
      </h3>

      {/* Content */}
      <p className="mt-2 text-sm text-gray-700 line-clamp-3">
        <HighlightText text={note.contentText.replace(/\n+/g, " ✶ ")} query={searchText} />
      </p>

      {/* Time */}
      <p className="text-xs text-gray-600 text-right mt-auto">{timeAgo}</p>
    </div>
  );
};
export default NoteCard;
