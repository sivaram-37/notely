import { Save } from "lucide-react";
import { Button } from "../ui/button";

const SaveButton = ({ formId }: { formId: string }) => {
  return (
    <Button
      className="inline-flex items-center gap-2 px-4 py-2 active:scale-[0.98] transition-all"
      form={formId}>
      <Save />
      Save
    </Button>
  );
};

export default SaveButton;
