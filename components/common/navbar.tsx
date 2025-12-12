import { NotelyLogo } from "./notely-logo";
import MenuTab from "./menus-tab";
import Settings from "./settings";

const Navbar = () => {
  return (
    <div className="p-2 bg-background shadow-md border flex items-center justify-between">
      <NotelyLogo />
      <MenuTab />
      <Settings />
    </div>
  );
};

export default Navbar;
