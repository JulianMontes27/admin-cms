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
import { useParams, useRouter } from "next/navigation";

interface MobileNavProps {
  routes: {
    href: string;
    title: string;
    isActive: boolean;
  }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ routes }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Manage store</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col gap-4 w-[300px]">
            {routes.map((route) => (
              <NavigationMenuLink
                key={route.title}
                className="cursor-pointer"
                href={route.href}
              >
                {route.title}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
