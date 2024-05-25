"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";

import { StoreCombobox } from "./store-combobox";
import { useEffect, useState } from "react";
import prisma from "@/lib/prisma";
import axios from "axios";

interface Route {
  href: string;
  title: string;
  isActive: boolean;
}
type RouteList = Route[];

const MainNav = () => {
  const [items, setitems] = useState([]);
  useEffect(() => {
    const getStores = async () => {
      const res = await axios.get("/api/stores");
      if (!res.data) {
        return "no data";
      }
      // console.log(res.data);
      setitems(res.data);
    };
    getStores();
  }, []);
  const params = useParams();
  const pathname = usePathname();

  const routes: RouteList = [
    {
      href: `/${params.id}/settings`, //the settings page is dynamic, so depends on the current store id
      title: "Settings",
      isActive: pathname === `/${params.storeId}/settings`,
    },
  ];

  //fetch the stores of the currently signed-in user

  return (
    <div className="flex flex-row gap-4 items-center">
      <StoreCombobox items={items} />
      <ul>
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
    </div>
  );
};

export default MainNav;
