import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
];

export const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Categories", href: "/dashboard/categories" },
  { label: "Dishes", href: "/dashboard/dishes" },
  { label: "Users", href: "/dashboard/users" },
];

export const handleUpdate = async (categoryId, setLoading, value) => {
  setLoading(true);
  const response = await fetch(`/api/admin/category/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify({ categoryId, value }),
    headers: { "Content-Type": "application/json" },
  });
  setLoading(false);
  window.location.reload();
  if (response.status === 400) {
    toast.error("Category already exist");
  }
};

export const handleDelete = async (categoryId, setLoading) => {
  setLoading(true);
  await fetch(`/api/admin/category/${categoryId}`, {
    method: "DELETE",
    body: JSON.stringify({ categoryId }),
    headers: { "Content-Type": "application/json" },
  });
  setLoading(false);
  window.location.reload();
};
