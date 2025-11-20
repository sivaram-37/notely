import { NotelyLogo } from "./notely-logo";
import MenuTab from "./menus-tab";
import Settings from "./settings";
import CardWrapper from "./cardWrapper";

const Navbar = () => {
  return (
    <CardWrapper className="flex items-center justify-between">
      <NotelyLogo />
      <MenuTab />
      <Settings />
    </CardWrapper>
  );
};

export default Navbar;
