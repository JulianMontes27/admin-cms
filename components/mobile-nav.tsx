"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface MobileNavProps {
  routes: {
    href: string;
    title: string;
    isActive: boolean;
  }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ routes }) => {
  const params = useParams();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Manage store</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 gap-4 w-[250px]">
              {routes.map((route) => (
                <NavigationMenuLink
                  key={route.title}
                  className={cn(
                    "cursor-pointer",
                    route.isActive && "font-bold"
                  )}
                  href={route.href}
                >
                  {route.title}
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
