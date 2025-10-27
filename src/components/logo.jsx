import { ClapperboardIcon } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <ClapperboardIcon className="size-6" />
      <span className="font-bold text-xl">AnimeList</span>
    </div>
  );
};
export default Logo;
