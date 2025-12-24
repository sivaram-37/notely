type HighlightTextProps = {
  text: string;
  query: string;
};

export default function HighlightText({ text, query }: HighlightTextProps) {
  if (!query) return <>{text}</>;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return (
    <>
      {text.split(regex).map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-black rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
