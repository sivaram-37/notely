import useTimeAgo from "@/hooks/use-time-ago";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const cardColors = [
  "bg-[#E3F2FD]", // Light Blue
  "bg-[#E8F5E9]", // Mint Green
  "bg-[#E0F7FA]", // Aqua
  "bg-[#F1F8E9]", // Light Lime
  "bg-[#EDE7F6]", // Lavender
  "bg-[#E8EAF6]", // Soft Indigo
  "bg-[#F3F4F6]", // Cool Gray
  "bg-[#E0F2F1]", // Teal Mist
  "bg-[#F0F4C3]", // Soft Lemon Green
  "bg-[#E6EEFA]", // Soft Cornflower Blue
];

const NoteCard = ({ note, index }: { note: any; index: number }) => {
  const timeAgo = useTimeAgo(note.modifiedOn);

  const colorClass = useMemo(() => {
    return cardColors[index % cardColors.length];
  }, [index]);

  return (
    <div
      className={cn(
        "p-4 h-36 rounded-lg shadow-sm border cursor-pointer transition-all flex flex-col select-none",
        "hover:shadow-md hover:scale-[1.02] hover:shadow-primary hover:border-primary",
        colorClass
      )}>
      {/* Title */}
      <h3 className="text-primary font-semibold line-clamp-1">{note.title}</h3>

      {/* Added On */}
      <span className="mt-1 text-xs text-gray-600">{note.addedOn}</span>

      {/* Content */}
      <p className="mt-2 text-sm text-gray-700 line-clamp-2">{note.content}</p>

      {/* Time Ago */}
      <p className="text-xs text-gray-600 text-right mt-auto">{timeAgo}</p>
    </div>
  );
};

export default NoteCard;
