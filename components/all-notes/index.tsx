import { Plus } from "lucide-react";
import CardWrapper from "../common/cardWrapper";
import { Button } from "../ui/button";

const AllNotes = () => {
  return (
    <CardWrapper className="w-full">
      <div className="p-1 flex justify-between items-center border-b">
        <h2 className="font-semibold">All Notes</h2>
        <Button size={"icon-sm"}>
          <Plus />
        </Button>
      </div>
    </CardWrapper>
  );
};

export default AllNotes;
