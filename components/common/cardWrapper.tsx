import { cn } from "@/lib/utils";

const CardWrapper = ({
  children,
  outerClassName,
  className,
  title,
  customBtn,
}: {
  children: React.ReactNode;
  outerClassName?: string;
  className?: string;
  title?: string;
  customBtn?: React.ReactNode;
}) => {
  return (
    <div className={cn("relative rounded-lg border shadow-md bg-background", outerClassName)}>
      {!!title && (
        <h2 className="h-[38px] bg-secondary text-primary flex justify-center items-center text-lg font-bold rounded-t-md border border-b-primary">
          {title}
        </h2>
      )}
      {!!customBtn && <div className="absolute top-0.5 right-0.5">{customBtn}</div>}

      <div className={cn("p-2 rounded-b-lg", !title && "rounded-lg", className)}>{children}</div>
    </div>
  );
};

export default CardWrapper;
