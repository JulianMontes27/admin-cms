import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });
  return formatter.format(price);
}
