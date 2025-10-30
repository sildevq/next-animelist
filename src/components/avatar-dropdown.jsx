"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOutIcon, UserRoundIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

const AvatarDropdown = ({ userId }) => {
  const { status, data } = useSession();
  const router = useRouter();

  const handleProfile = () => {
    router.push(`/profile/${userId}`);
  };
  const handleSignOut = () => {
    signOut();
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={
              data.user?.image ||
              "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
            }
            alt="avatar"
            width={0}
            height={0}
            sizes="100vw"
            className="h-8 w-8 rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfile}>
            <UserRoundIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-destructive focus:text-destructive"
          >
            <LogOutIcon className="text-destructive" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarDropdown;
