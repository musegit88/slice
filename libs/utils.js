import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const links = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Location & Hours", href: "/location" },
];
