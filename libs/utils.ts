import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const trancate = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.slice(0, maxLength - 1) + "...." : str;
};
