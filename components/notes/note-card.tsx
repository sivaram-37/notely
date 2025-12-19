import useTimeAgo from "@/hooks/use-time-ago";
import { cn } from "@/lib/utils";
import { Note } from "@/stores/use-notes-store";
import { Pencil, Trash2 } from "lucide-react";

const NoteCard = ({
  note,
  searchText,
  handleCardClick,
}: {
  note: Note;
  searchText: string;
  handleCardClick: () => void;
}) => {
  const timeAgo = useTimeAgo(note.modifiedOn);

  return (
    <div
      className={cn(
        "group relative p-4 h-36 rounded-lg shadow-sm border cursor-pointer transition-all flex flex-col select-none",
        "hover:shadow-md hover:scale-[1.02] hover:shadow-primary hover:border-primary",
        note.cardColor
      )}
      onClick={handleCardClick}>
      {/* Actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button onClick={() => {}} className="p-1.5 rounded-md bg-white/70 hover:bg-white shadow">
          <Pencil size={14} />
        </button>

        <button
          onClick={() => {}}
          className="p-1.5 rounded-md bg-white/70 hover:bg-white text-red-600 shadow">
          <Trash2 size={14} />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-primary font-semibold line-clamp-1">
        {highlightText(note.title, searchText)}
      </h3>

      {/* Content */}
      <p className="mt-2 text-sm text-gray-700 line-clamp-3">
        {highlightText(note.contentText.replace(/\n+/g, " ✶ "), searchText)}
      </p>

      {/* Time Ago */}
      <p className="text-xs text-gray-600 text-right mt-auto">{timeAgo}</p>
    </div>
  );
};

export default NoteCard;

const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-gray-50 text-black rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
};
