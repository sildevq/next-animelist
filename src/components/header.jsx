import Link from "next/link";
import AnimeSearch from "./anime-search";
import AvatarDropdown from "./avatar-dropdown";
import Logo from "./logo";
import { auth } from "@/utils/auth";
import { Button } from "./ui/button";

const Header = async () => {
  const session = await auth();

  return (
    <header className="py-7">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex gap-5 items-center">
            <AnimeSearch />
            {session?.user ? (
              <AvatarDropdown />
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
