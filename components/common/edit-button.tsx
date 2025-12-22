import Link from "next/link";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

const EditButton = ({ href }: { href: string }) => {
  return (
    <Button
      asChild
      className="inline-flex items-center gap-2 px-4 py-2 active:scale-[0.98] transition-all">
      <Link href={href}>
        <Edit />
        Edit
      </Link>
    </Button>
  );
};

export default EditButton;
