import { getUserFromToken } from "@/api/authApi";
import { UserEnum } from "@/interfaces/User";
import React from "react";

import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  sidebar: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ sidebar }) => {
  const user = getUserFromToken()?.user;

  const location = useLocation();
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "add-fertilizer",
      label: "Add Fertilizer",
      path: "/dashboard/add-fertilizer",
    },
    {
      id: "add-seed",
      label: "Add Seed",
      path: "/dashboard/add-seed",
    },
    {
      id: "add-land",
      label: "Add Land",
      path: "/dashboard/add-land",
    },
    {
      id: "order",
      label: "Order",
      path: "/dashboard/order",
    },
    {
      id: "view-orders",
      label: "View Orders",
      path: "/dashboard/view-orders",
    },
  ];

  let allowedNavItems = navItems;
  if (user.category === UserEnum.FARMER) {
    allowedNavItems = navItems.filter((item) =>
      ["add-land", "order", "view-orders"].includes(item.id),
    );
  } else if (user.category === UserEnum.AGRO_STORE) {
    allowedNavItems = navItems.filter((item) => item.id !== "add-land");
  }

  return (
    <div className="w-64 fixed top-14 left-0 z-10 dark:bg-slate-700 backdrop-blur-sm">
      {sidebar && (
        <aside
          id="logo-sidebar"
          className={`h-screen transition-transform py-4 backdrop-blur-sm ${
            sidebar ? "-translate-x-0" : "-translate-x-full"
          }  bg-white dark:bg-slate-700 border-r border-gray-200 dark:border-slate-700 sm:translate-x-0 `}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-700 dark:text-blue-600">
            <ul className="space-y-2 font-medium">
              {allowedNavItems.map((navItem) => (
                <li key={navItem.id}>
                  <Link
                    key={navItem.id}
                    to={navItem.path}
                    className={`${
                      location.pathname === navItem.path
                        ? "bg-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700"
                        : ""
                    } flex items-center p-2 text-blue-700 rounded-lg dark:text-indigo hover:bg-indigo-500 dark:hover:bg-blue-600 dark:text-white hover:text-white`}
                  >
                    <span className="ml-3">{navItem.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
