import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
      <ArrowLeft size={18} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default BackButton;
