import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type Routes = {
  href: string;
  label: string;
};

const NavbarDropdownMenu = ({ routes }: { routes: Routes[] }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu color="white" />
      </SheetTrigger>
      <SheetContent className="bg-gray-900 w-full text-white border-none">
        <SheetHeader className="flex flex-col items-center justify-center text-white">
          <SheetTitle className="text-white text-xl">Admin-CMS</SheetTitle>
          <SheetDescription className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-lg font-extrabold text-transparent ">
            Manage everything in your website!
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 mt-9">
          {routes.map((route, index) => (
            <Link
              href={route.href}
              className={cn(
                "w-full px-4 shadow-sm hover:shadow-indigo-600 transition border-b-white "
              )}
              key={route.href}
            >
              {route.label}

              {/* {index < routes.length - 1 && <Separator />} */}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarDropdownMenu;
