import { cn } from "@/lib/utils";

const CardWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-2 bg-background rounded-lg border shadow-md", className)}>{children}</div>
  );
};

export default CardWrapper;
