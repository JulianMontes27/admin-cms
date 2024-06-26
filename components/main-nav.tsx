"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";

interface Route {
  href: string;
  title: string;
  isActive: boolean;
}
type RouteList = Route[];

const MainNav = () => {
  const params = useParams();
  const pathname = usePathname();

  const routes: RouteList = [
    {
      href: `/${params.storeId}`, //the settings page is dynamic, so depends on the current store id
      title: "Overview",
      isActive: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards/`, //the settings page is dynamic, so depends on the current store id
      title: "Billboards",
      isActive:
        pathname === `/${params.storeId}/billboards` ||
        pathname.includes("/billboards"),
    },
    {
      href: `/${params.storeId}/categories/`, //the settings page is dynamic, so depends on the current store id
      title: "Categories",
      isActive:
        pathname === `/${params.storeId}/categories` ||
        pathname.includes("/categories"),
    },
    {
      href: `/${params.storeId}/sizes/`, //the settings page is dynamic, so depends on the current store id
      title: "Sizes",
      isActive:
        pathname === `/${params.storeId}/sizes` || pathname.includes("/sizes"),
    },
    {
      href: `/${params.storeId}/colors/`, //the settings page is dynamic, so depends on the current store id
      title: "Colors",
      isActive:
        pathname === `/${params.storeId}/colors` ||
        pathname.includes("/colors"),
    },
    {
      href: `/${params.storeId}/products`, //the settings page is dynamic, so depends on the current store id
      title: "Products",
      isActive:
        pathname === `/${params.storeId}/products` ||
        pathname.includes("/products"),
    },
    {
      href: `/${params.storeId}/collages`, //the settings page is dynamic, so depends on the current store id
      title: "Collages",
      isActive:
        pathname === `/${params.storeId}/collages` ||
        pathname.includes("/collages"),
    },
    {
      href: `/${params.storeId}/orders`, //the settings page is dynamic, so depends on the current store id
      title: "Orders",
      isActive:
        pathname === `/${params.storeId}/orders` ||
        pathname.includes("/orders"),
    },
    {
      href: `/${params.storeId}/settings/`, //the settings page is dynamic, so depends on the current store id
      title: "Settings",
      isActive: pathname === `/${params.storeId}/settings`,
    },
  ];

  //fetch the stores of the currently signed-in user

  return (
    <div className="max-w-xl ">
      {/* {mobile nav} */}
      <ul className="xl:flex h-full items-center md:gap-6 hidden ">
        {routes.map((route) => (
          <Link
            key={route.title}
            href={route.href}
            className={`${route.isActive ? "font-bold dark:text-white" : ""}`}
          >
            {route.title}
          </Link>
        ))}
      </ul>
      <div className="xl:hidden h-full w-full  ">
        <MobileNav routes={routes} />
      </div>
    </div>
  );
};

export default MainNav;
