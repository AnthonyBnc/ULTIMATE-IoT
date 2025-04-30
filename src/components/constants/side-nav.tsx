import { BookOpenCheck, LayoutDashboard } from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    title: "Table",
    icon: BookOpenCheck,
    href: "/table",
    color: "text-orange-500",
    isChildren: true,
    children: [
      {
        title: "Table",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/table",
      },
      // {
      //   title: "Example-02",
      //   icon: BookOpenCheck,
      //   color: "text-red-500",
      //   href: "/example/example-02",
      // },
      // {
      //   title: "Example-03",
      //   icon: BookOpenCheck,
      //   color: "text-red-500",
      //   href: "/example/example-03",
      // },
    ],
  },
];
