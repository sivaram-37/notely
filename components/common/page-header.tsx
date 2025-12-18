import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import SearchBar from "./search-bar";
import { Dispatch, SetStateAction } from "react";
const PageHeader = ({
  searchOpen,
  setSearchOpen,
  searchbarPlaceholder,
  addBtnOnClick,
  searchText,
  setSearchText,
}: {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  searchbarPlaceholder: string;
  addBtnOnClick: () => void;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="pb-3 flex justify-end items-center gap-2 border-b">
      <SearchBar
        open={searchOpen}
        setOpen={setSearchOpen}
        placeholder={searchbarPlaceholder}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Button size={"icon"} className="h-9 w-9 rounded-full shadow-md" onClick={addBtnOnClick}>
        <Plus strokeWidth={3} />
      </Button>
    </div>
  );
};

export default PageHeader;
