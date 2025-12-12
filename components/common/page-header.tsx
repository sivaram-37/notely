import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import SearchBar from "./search-bar";
import { Dispatch, SetStateAction } from "react";
const PageHeader = ({
  searchbarPlaceholder,
  addBtnOnClick,
  setSearchText,
}: {
  searchbarPlaceholder: string;
  addBtnOnClick: () => void;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="pb-3 flex justify-end items-center gap-2 border-b">
      <SearchBar placeholder={searchbarPlaceholder} setSearchText={setSearchText} />
      <Button size={"icon"} className="h-10 w-10 rounded-full shadow-md" onClick={addBtnOnClick}>
        <Plus strokeWidth={3} />
      </Button>
    </div>
  );
};

export default PageHeader;
