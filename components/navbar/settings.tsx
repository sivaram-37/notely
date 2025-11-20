import { Button } from "../ui/button";
import { Settings as SettingsLogo } from "lucide-react";

const Settings = () => {
  return (
    <Button className="flex">
      <SettingsLogo />
      <span>Settings</span>
    </Button>
  );
};

export default Settings;
