"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoveDown } from "lucide-react";

import { Separator } from "./ui/separator";

interface MobileNavProps {
  routes: {
    href: string;
    title: string;
    isActive: boolean;
  }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ routes }) => {
  // const [isMounted, setisMounted] = useState(false);
  // useEffect(() => {
  //   setisMounted(true);
  // }, []);
  // if (!isMounted) return null;
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center h-full w-full">
        Your store
        <MoveDown className="h-4 w-4 ml-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuGroup>
          {routes.map((route) => (
            <>
              <DropdownMenuItem
                key={route.href}
                onClick={() => router.push(route.href)}
                className="cursor-pointer"
              >
                {route.title}
              </DropdownMenuItem>
              <Separator />
            </>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
